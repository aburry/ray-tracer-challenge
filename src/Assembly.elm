module Assembly exposing
    ( Assembly(..)
    , Colour
    , ColourFn
    , CsgOp(..)
    , Material
    , Shape
    , asmCompile
    , asmTransform
    )

import Geometry as G


type Assembly
    = Group G.BoundingBox (List G.Matrix) (List Assembly)
    | CSG G.BoundingBox (List G.Matrix) CsgOp Assembly Assembly
    | Primitive G.BoundingBox (List G.Matrix) Shape
    | Empty


type CsgOp
    = Union
    | Intersect
    | Difference


type alias Shape =
    { id : Int
    , geometry : G.Shape
    , material : Material
    , worldToObject : G.Matrix
    }


type alias Material =
    { colour : ColourFn
    , ambient : Float
    , diffuse : Float
    , specular : Float
    , shininess : Float
    , reflective : Float
    , transparency : Float
    , refractiveIndex : Float
    , shadow : Bool
    }


type alias ColourFn =
    G.Point -> Colour


type alias Colour =
    { red : Float
    , green : Float
    , blue : Float
    }


asmCompile assembly =
    assembly
        |> asmLabel
        |> asmCachePrimitives []
        |> asmFlatten
        |> (asmPrune G.aabbAll >> Tuple.second)
        |> asmSimplify


asmTransform transform assembly =
    case assembly of
        Empty ->
            Empty

        Primitive aabb transformList shape ->
            Primitive aabb (transform ++ transformList) shape

        CSG aabb transformList op left right ->
            CSG aabb (transform ++ transformList) op left right

        Group aabb transformList list ->
            Group aabb (transform ++ transformList) list


asmSimplify assembly =
    let
        step ass =
            case ass of
                Group _ _ [] ->
                    Empty

                Group aabb transform list ->
                    list
                        |> List.map step
                        |> List.filter ((/=) Empty)
                        |> Group aabb transform

                CSG aabb transform Union l Empty ->
                    step (Group aabb transform [ l ])

                CSG aabb transform Union Empty r ->
                    step (Group aabb transform [ r ])

                CSG _ _ Intersect _ Empty ->
                    Empty

                CSG _ _ Intersect Empty _ ->
                    Empty

                CSG aabb transform Difference l Empty ->
                    step (Group aabb transform [ l ])

                CSG _ _ Difference Empty _ ->
                    Empty

                CSG aabb transform op l r ->
                    CSG aabb transform op (step l) (step r)

                Primitive aabb transform shape ->
                    Primitive aabb transform shape

                Empty ->
                    Empty

        loop max previous current =
            if 0 == max || (current == previous) then
                current

            else
                loop (max - 1) current (step current)
    in
    loop 10 Empty assembly


asmFlatten assembly =
    let
        flattenList parentList =
            case parentList of
                [] ->
                    []

                (Group _ transform list) :: xs ->
                    flattenList (List.map (asmTransform transform) list) ++ flattenList xs

                x :: xs ->
                    asmFlatten x :: flattenList xs
    in
    case assembly of
        Group aabb transform list ->
            Group aabb transform (flattenList list)

        CSG aabb transform op l r ->
            CSG aabb transform op (asmFlatten l) (asmFlatten r)

        Primitive _ _ _ ->
            assembly

        Empty ->
            assembly


asmLabel assembly =
    let
        labelList value0 global0 =
            case value0 of
                [] ->
                    ( global0, value0 )

                x :: xs ->
                    let
                        ( global1, value1 ) =
                            labelAssembly x global0

                        ( global2, value2 ) =
                            labelList xs global1
                    in
                    ( global2, value1 :: value2 )

        labelCsg aabb transform op left0 right0 global0 =
            let
                ( global1, left1 ) =
                    labelAssembly left0 global0

                ( global2, right1 ) =
                    labelAssembly right0 global1
            in
            ( global2, CSG aabb transform op left1 right1 )

        labelGroup aabb transform list0 global0 =
            let
                ( global1, list1 ) =
                    labelList list0 global0
            in
            ( global1, Group aabb transform list1 )

        labelPrimitive aabb transform value0 global0 =
            ( global0 + 1, Primitive aabb transform { value0 | id = global0 } )

        labelAssembly value0 global0 =
            case value0 of
                Primitive aabb transform shape0 ->
                    labelPrimitive aabb transform shape0 global0

                Group aabb transform list0 ->
                    labelGroup aabb transform list0 global0

                CSG aabb transform op left0 right0 ->
                    labelCsg aabb transform op left0 right0 global0

                Empty ->
                    ( global0, value0 )
    in
    Tuple.second (labelAssembly assembly 1)


asmCachePrimitives : List G.Matrix -> Assembly -> Assembly
asmCachePrimitives parentTransform assembly =
    case assembly of
        Empty ->
            Empty

        Primitive _ transform shape ->
            let
                transformSteps =
                    parentTransform ++ transform

                objectToWorld =
                    G.matListProduct transformSteps

                worldToObject =
                    G.matInvert objectToWorld

                newAabb =
                    G.aabbTransform objectToWorld shape.geometry.aabb
            in
            Primitive newAabb transformSteps { shape | worldToObject = worldToObject }

        CSG aabb transform op l r ->
            CSG aabb [] op (asmCachePrimitives (parentTransform ++ transform) l) (asmCachePrimitives (parentTransform ++ transform) r)

        Group aabb transform list ->
            Group aabb [] (List.map (asmCachePrimitives (parentTransform ++ transform)) list)


asmPrune parentAabb assembly =
    case assembly of
        Empty ->
            ( G.aabbNone, Empty )

        Primitive aabb transform shape ->
            let
                intersection =
                    G.aabbIntersectBoundingBox parentAabb aabb
            in
            if G.aabbNone == intersection then
                ( G.aabbNone, Empty )

            else
                ( intersection, Primitive intersection transform shape )

        Group _ transform assemblies ->
            let
                ( newAabbList, newList ) =
                    List.unzip (List.map (asmPrune parentAabb) assemblies)

                newAabb =
                    List.foldl G.aabbUnionBoundingBox G.aabbNone newAabbList

                intersection =
                    G.aabbIntersectBoundingBox parentAabb newAabb
            in
            if G.aabbNone == intersection then
                ( G.aabbNone, Empty )

            else
                -- todo add partitioning here to create useful/efficient groupings
                ( intersection, Group intersection transform newList )

        CSG _ transform csgOp left right ->
            let
                ( leftAabb, leftAssembly ) =
                    asmPrune parentAabb left

                ( rightAabb, rightAssembly ) =
                    asmPrune parentAabb right

                siblingIntersection =
                    G.aabbIntersectBoundingBox leftAabb rightAabb

                newAabb =
                    G.aabbIntersectBoundingBox parentAabb
                        (case csgOp of
                            Union ->
                                G.aabbUnionBoundingBox leftAabb rightAabb

                            Intersect ->
                                siblingIntersection

                            Difference ->
                                leftAabb
                        )
            in
            if G.aabbNone == newAabb then
                ( G.aabbNone, Empty )

            else if G.aabbNone == siblingIntersection then
                case csgOp of
                    Union ->
                        asmPrune parentAabb (Group newAabb transform [ leftAssembly, rightAssembly ])

                    Intersect ->
                        ( G.aabbNone, Empty )

                    Difference ->
                        asmPrune parentAabb (Group newAabb transform [ leftAssembly ])

            else
                ( newAabb, CSG newAabb transform csgOp leftAssembly rightAssembly )
