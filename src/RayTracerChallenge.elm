module RayTracerChallenge exposing
    ( Assembly(..)
    , Point(..)
    , Vector(..)
    , colourBlack
    , colourWhite
    , defaultCube
    , defaultCylinder
    , defaultLight
    , defaultMaterial
    , defaultPlane
    , defaultSphere
    , defaultTriangle
    , defaultWorld
    , imageRender
    , imageToBitmap
    , intersectCylinder
    , makeCamera
    , objParserVertices
    , objToAssembly
    , patternAtObject
    , patternCheckered
    , transformIdentity
    , transformInverse
    , transformMul
    , transformRotateX
    , transformRotateY
    , transformRotateZ
    , transformScale
    , transformShear
    , transformTranslate
    , vectorCylinderNormalAt
    , worldInsertAssembly
    , worldInsertShape
    )

import Array
import ObjParser



{-
   Implementation derived from:

       Jamis Buck, "The ray tracer challenge : a test-driven guide to
           your first 3D renderer", Raleigh, North Carolina : The
           Pragmatic Bookshelf, 2019.

   There you can find many juicy details, tests, examples, and references to
   further reading. Here I will only outline the general ideas and
   perhaps highlight some ways this code differs from that of the book.

   A ray tracer is a program that enables you to draw beautiful pictures. By
   combining primitive shapes (sphere, plane, cube, cylinder, cone, etc.) you
   describe a 3D scene. Then you can take pictures of it by controlling the
   lights and the camera. You can adjust everything until you have exactly the
   picture you want, the only trouble will be that sometimes arranging each
   picture can take longer than you'd like.

   A ray tracer works by modelling the way rays of light bounce around the
   scene. That allows you to create cool reflections, and transparent and shiny
   surfaces. But remember, models are not the same as the real thing, in many
   cases not even close. Models emphasize some features of a thing and paper
   over others, they provide enough detail to be useful for a purpose. If you
   create a transparent prism do not expect this ray tracer to show you a
   rainbow! It is a very limited model.

   This ray tracer models light as a single colour of constant intensity
   travelling in a straight line (a ray). Object surfaces are illuminated
   (coloured) according to a superposition (sum) of different light models. The
   models are ambient light, diffuse light, specular light, reflected light,
   refracted light, and shadow.

   An object light by ambient light shows a single colour, all over, from
   no matter where you look at it.

   Diffuse light models the roughness of a surface and its angle relative to
   the camera; diffuse light gives objects a 3D look by making things that
   are facing you brighter than things that are facing away.

   Specular light is very similar to diffuse light in that it models the surface
   roughness and its angle relative to the viewer, but is intended to model very
   shiny surfaces such as Christmas ornaments.

   Reflected light models mirror-like surfaces. It causes the ray tracer to
   calculate more rays to find the colour contribution from other objects in
   front of the surface.

   Refracted light models translucent objects. Similar to reflected light,
   it causes the ray tracer to calculate more rays to find the colour
   contribution from objects behind the surface. Rays are bent at the surface
   according to the specified index of refraction. Refraction allows you to model
   the way a pencil appears bent when you put it in a glass of water.

   Finally, shadows are... shadows. Keep in mind though, that the model for
   shadows is very weak. For example, translucent shapes cast no shadow at
   all, none, even if they are barely transparent.

-}
{--TYPES ---------------------------------------------------------------------}


type alias Image =
    { width : Int
    , height : Int
    , data : Array.Array Colour
    }


type alias Light =
    { point : Point TagWorldSpace
    , colour : Colour
    }


type alias ColourFn =
    Point TagWorldSpace -> Colour


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


type alias Pixel =
    { x : Int
    , y : Int
    }


type ShapeType
    = Plane
    | Sphere
    | Cube
    | Cylinder
    | Cone
    | Triangle
    | SmoothTriangle


type alias Shape =
    { id : Int
    , shapeType : ShapeType
    , material : Material
    , worldToObject : Transform TagToObjectSpace
    , normalAt : Point TagObjectSpace -> Vector TagAny
    , intersectRay : Ray TagObjectSpace TagAny -> List Float
    }


type alias CylinderConfig =
    { ymin : Float
    , ymax : Float
    , capped : Bool
    }



{--CONSTANTS -----------------------------------------------------------------}


epsilon =
    1.0e-6


defaultHit : Hit
defaultHit =
    { object = defaultSphere
    , ray = Ray defaultPoint (Vector { dx = 1, dy = 0, dz = 0 })
    , t = 0
    , point = defaultPoint
    , eyev = Vector { dx = 1, dy = 0, dz = 0 }
    , normalv = Vector { dx = 1, dy = 0, dz = 0 }
    , overPoint = defaultPoint
    , underPoint = defaultPoint
    , inside = False
    , reflectv = Vector { dx = 1, dy = 0, dz = 0 }
    , n1 = 1
    , n2 = 1
    }


defaultLight =
    { point = defaultPoint
    , colour = colourWhite
    }


defaultMaterial =
    { colour = always { red = 0.9, green = 0.9, blue = 0.9 }
    , ambient = 0.1
    , diffuse = 0.9
    , specular = 0.9
    , shininess = 200
    , reflective = 0
    , transparency = 0
    , refractiveIndex = 1
    , shadow = True
    }


defaultSphere : Shape
defaultSphere =
    { id = 0
    , shapeType = Sphere
    , material = defaultMaterial
    , worldToObject = transformIdentity
    , normalAt = vectorSphereNormalAt
    , intersectRay = intersectSphere
    }


defaultPlane : Shape
defaultPlane =
    { id = 0
    , shapeType = Plane
    , material = defaultMaterial
    , worldToObject = transformIdentity
    , normalAt = vectorPlaneNormalAt
    , intersectRay = intersectPlane
    }


defaultCube : Shape
defaultCube =
    { id = 0
    , shapeType = Cube
    , material = defaultMaterial
    , worldToObject = transformIdentity
    , normalAt = vectorCubeNormalAt
    , intersectRay = intersectCube
    }


defaultCylinder : Shape
defaultCylinder =
    { id = 0
    , shapeType = Cylinder
    , material = defaultMaterial
    , worldToObject = transformIdentity
    , normalAt = vectorCylinderNormalAt { ymin = -1, ymax = 1, capped = True }
    , intersectRay = intersectCylinder { ymin = -1, ymax = 1, capped = True }
    }


defaultCone : Shape
defaultCone =
    { id = 0
    , shapeType = Cone
    , material = defaultMaterial
    , worldToObject = transformIdentity
    , normalAt = vectorConeNormalAt { ymin = -1, ymax = 1, capped = True }
    , intersectRay = intersectCone { ymin = -1, ymax = 1, capped = True }
    }


defaultTriangle : Shape
defaultTriangle =
    let
        config =
            { a = Point { x = 0, y = 0, z = 0 }
            , b = Point { x = 1, y = 0, z = 0 }
            , c = Point { x = 0, y = 1, z = 0 }
            }
    in
    { id = 0
    , shapeType = Triangle
    , material = defaultMaterial
    , worldToObject = transformIdentity
    , normalAt = vectorTriangleNormalAt config
    , intersectRay = intersectTriangle config
    }


defaultSmoothTriangle : Shape
defaultSmoothTriangle =
    let
        config =
            { a = Point { x = 0, y = 0, z = 0 }
            , b = Point { x = 1, y = 0, z = 0 }
            , c = Point { x = 0, y = 1, z = 0 }
            , na = vectorNormalize (Vector { dx = -0.1, dy = -0.1, dz = -1 })
            , nb = vectorNormalize (Vector { dx = 0.1, dy = -0.1, dz = -1 })
            , nc = vectorNormalize (Vector { dx = -0.1, dy = 0.1, dz = -1 })
            }
    in
    { id = 0
    , shapeType = Triangle
    , material = defaultMaterial
    , worldToObject = transformIdentity
    , normalAt = vectorSmoothTriangleNormalAt config
    , intersectRay = intersectTriangle config
    }


defaultVector =
    Vector { dx = 0, dy = 1, dz = 0 }



{--FUNCTIONS -----------------------------------------------------------------}
{- Scene creation -}


type alias World =
    { nextId : Int
    , objects : List Shape
    }


type Assembly
    = Empty
    | Primitive Shape
    | Assembly (Transform TagToObjectSpace) (List Assembly)


defaultWorld =
    { nextId = 1
    , objects = []
    }


worldInsertShape : Shape -> World -> World
worldInsertShape shape world =
    { world
        | nextId = world.nextId + 1
        , objects = { shape | id = world.nextId } :: world.objects
    }


worldInsertAssembly : Assembly -> World -> World
worldInsertAssembly assembly world =
    let
        mulInverseTransforms parentTransform childTransform =
            {- inv (BA) == (inv A)(inv B) -}
            transformMul childTransform parentTransform

        transformChild parentTransform childAssembly =
            case childAssembly of
                Primitive shape ->
                    Primitive
                        { shape
                            | worldToObject = mulInverseTransforms parentTransform shape.worldToObject
                        }

                Assembly transform list ->
                    Assembly (mulInverseTransforms parentTransform transform) list

                _ ->
                    Empty
    in
    case assembly of
        Primitive shape ->
            worldInsertShape shape world

        Assembly transform list ->
            list
                |> List.map (transformChild transform)
                |> List.foldl worldInsertAssembly world

        _ ->
            world



{- OBJ parser -}


objParserVertices data =
    case ObjParser.parse data of
        Ok lst ->
            lst

        _ ->
            []


objToAssembly : List ObjParser.ObjLine -> Assembly
objToAssembly objList =
    -- todo: Should this return the errors too?
    let
        vertexToPoint : ObjParser.ObjLine -> Maybe (Point frame)
        vertexToPoint obj =
            case obj of
                ObjParser.Vertex [ x, y, z ] ->
                    Just (Point { x = x, y = y, z = z })

                _ ->
                    Nothing

        vertexNormalToVector obj =
            case obj of
                ObjParser.VertexNormal [ dx, dy, dz ] ->
                    Just (Vector { dx = dx, dy = dy, dz = dz })

                _ ->
                    Nothing

        vertices =
            objList
                |> List.map vertexToPoint
                |> List.filter ((/=) Nothing)
                |> List.map (Maybe.withDefault defaultPoint)
                |> Array.fromList

        vertexNormals =
            objList
                |> List.map vertexNormalToVector
                |> List.filter ((/=) Nothing)
                |> List.map (Maybe.withDefault defaultVector)
                |> Array.fromList

        faceToTriangle : ObjParser.ObjLine -> Maybe Assembly
        faceToTriangle obj =
            let
                faceVertex : List (Maybe Int) -> ( Maybe (Point t), Maybe (Vector u) )
                faceVertex x =
                    case x of
                        [ Just a, _, Just c ] ->
                            ( Array.get (a - 1) vertices, Array.get (c - 1) vertexNormals )

                        [ Just a, _ ] ->
                            ( Array.get (a - 1) vertices, Nothing )

                        [ Just a ] ->
                            ( Array.get (a - 1) vertices, Nothing )

                        _ ->
                            ( Nothing, Nothing )

                triangle config =
                    Just
                        (Primitive
                            { defaultTriangle
                                | normalAt = vectorTriangleNormalAt config
                                , intersectRay = intersectTriangle config
                            }
                        )

                smoothTriangle config =
                    Just
                        (Primitive
                            { defaultTriangle
                                | normalAt = vectorSmoothTriangleNormalAt config
                                , intersectRay = intersectTriangle config
                            }
                        )

                faceToShape : List (List (Maybe Int)) -> Maybe Assembly
                faceToShape x =
                    let
                        makeTri lst =
                            case lst of
                                [ ( Just p1, Nothing ), ( Just p2, Nothing ), ( Just p3, Nothing ) ] ->
                                    triangle { a = p1, b = p2, c = p3 }

                                [ ( Just p1, Just v1 ), ( Just p2, Just v2 ), ( Just p3, Just v3 ) ] ->
                                    smoothTriangle { a = p1, b = p2, c = p3, na = v1, nb = v2, nc = v3 }

                                _ ->
                                    Nothing

                        makeAllTri : List ( Maybe (Point TagObjectSpace), Maybe (Vector TagUnit) ) -> Maybe (List Assembly)
                        makeAllTri lst =
                            case lst of
                                a :: b :: c :: rest ->
                                    makeTri [ a, b, c ]
                                        |> Maybe.map
                                            (\s ->
                                                s
                                                    :: (makeAllTri (a :: c :: rest)
                                                            |> Maybe.withDefault []
                                                       )
                                            )

                                _ ->
                                    Nothing
                    in
                    makeAllTri (List.map faceVertex x) |> Maybe.map (Assembly transformIdentity)
            in
            case obj of
                ObjParser.Face lst ->
                    faceToShape lst

                _ ->
                    Nothing
    in
    objList
        |> List.map faceToTriangle
        |> List.filter ((/=) Nothing)
        |> List.map (Maybe.withDefault (Primitive defaultTriangle))
        --|> List.indexedMap Tuple.pair
        --|> List.filter (\(n,t)->modBy 5 n == 0)
        --|> List.map Tuple.second
        |> Assembly transformIdentity



{- Colours and Patterns -}


type alias Colour =
    { red : Float
    , green : Float
    , blue : Float
    }


colourBlack =
    -- additive identity
    { red = 0
    , green = 0
    , blue = 0
    }


colourWhite =
    -- multiplicative identity
    { red = 1
    , green = 1
    , blue = 1
    }


colourMul : Colour -> Colour -> Colour
colourMul a b =
    { red = a.red * b.red
    , green = a.green * b.green
    , blue = a.blue * b.blue
    }


colourScaleBy : Float -> Colour -> Colour
colourScaleBy scale colour =
    colourMul { red = scale, green = scale, blue = scale } colour


colourSum : Colour -> Colour -> Colour
colourSum a b =
    { red = a.red + b.red
    , green = a.green + b.green
    , blue = a.blue + b.blue
    }


patternAtObject : Transform a -> Transform a -> ColourFn -> ColourFn
patternAtObject worldToObject objectToPattern pattern point =
    {- (inv A)(inv B) == inv (BA) -}
    point
        |> pointTransform (transformMul objectToPattern worldToObject)
        |> pattern


patternCheckered colourA colourB point =
    let
        parity =
            point
                |> (\(Point { x, y, z }) -> [ x, y, z ])
                |> List.map (round >> modBy 2)
                |> List.sum
                |> (modBy 2 >> (==) 0)
    in
    if parity then
        colourA

    else
        colourB



{- Image -}


imageRender : { world : World, lights : List Light, camera : Camera } -> Image
imageRender { world, lights, camera } =
    let
        pixelAtIndex index =
            { x = modBy camera.imageWidth index
            , y = index // camera.imageWidth
            }

        colourAtIndex index =
            index
                |> pixelAtIndex
                |> cameraRayForPixel camera
                |> colourAtRay world lights camera.maxRecursion
    in
    { width = camera.imageWidth
    , height = camera.imageHeight
    , data = Array.initialize (camera.imageWidth * camera.imageHeight) colourAtIndex
    }


imageToBitmap : Image -> { width : Int, height : Int, data : List ( Int, Int, Int ) }
imageToBitmap image =
    let
        colourToTuple { red, green, blue } =
            let
                convert =
                    clamp 0 1 >> (*) 255 >> round
            in
            ( convert red, convert green, convert blue )
    in
    { width = image.width
    , height = image.height
    , data =
        image.data
            |> Array.map colourToTuple
            |> Array.toList
    }


imageToPpmString : Image -> String
imageToPpmString image =
    let
        header =
            "P3 " ++ String.fromInt image.width ++ " " ++ String.fromInt image.height ++ " 255"

        colourToString { red, green, blue } =
            let
                convert =
                    clamp 0 1 >> (*) 255 >> round >> String.fromInt
            in
            convert red ++ " " ++ convert green ++ " " ++ convert blue

        body =
            image.data
                |> Array.map colourToString
                |> Array.toList
                |> String.join "\n"
    in
    header ++ "\n" ++ body ++ "\n"



{- Ray tracing -}


colourAtRay : World -> List Light -> Int -> Ray TagWorldSpace TagUnit -> Colour
colourAtRay world lights rayNo ray =
    -- todo Complete colour sources.
    -- todo Fix shadows for transparent objects.
    let
        colourAtHit : Hit -> Colour
        colourAtHit hit =
            -- AKA shade_hit
            let
                forLights : (Light -> Colour) -> Colour
                forLights fn =
                    lights
                        |> List.map fn
                        |> List.foldl colourSum colourBlack

                phongColour : Light -> Colour
                phongColour light =
                    let
                        ( ambient, diffuse, specular ) =
                            phongLighting hit light
                    in
                    if pointInShadow world hit.overPoint light then
                        ambient

                    else
                        ambient
                            |> colourSum diffuse
                            |> colourSum specular

                reflectedColour : Colour
                reflectedColour =
                    Ray hit.overPoint hit.reflectv
                        |> colourAtRay world lights (rayNo - 1)
                        |> colourScaleBy hit.object.material.reflective

                refractedColour : Colour
                refractedColour =
                    refractedRay hit
                        |> colourAtRay world lights (rayNo - 1)
                        |> colourScaleBy hit.object.material.transparency
            in
            if 0 < hit.object.material.reflective && 0 < hit.object.material.transparency then
                let
                    reflectance =
                        schlickReflectance hit
                in
                forLights phongColour
                    |> colourSum (colourScaleBy reflectance reflectedColour)
                    |> colourSum (colourScaleBy (1 - reflectance) refractedColour)

            else
                forLights phongColour
                    |> colourSum reflectedColour
                    |> colourSum refractedColour
    in
    if 0 < rayNo then
        ray
            |> intersectShapesByRay world.objects
            |> hitFromIntersections
            |> Maybe.map colourAtHit
            |> Maybe.withDefault colourBlack

    else
        colourBlack


phongLighting : Hit -> Light -> ( Colour, Colour, Colour )
phongLighting hit light =
    {-
       ambient reflection is the background light, it is a constant over the object surface
       diffuse reflection depends on the angle between the light and the surface normal
       specular reflection depends on the angle between the eye and the reflection vector
    -}
    let
        lightv =
            light.point
                |> vectorBetweenPoints hit.point
                |> vectorNormalize

        lightDotNormal =
            -- <= 0 if light is behind the surface
            vectorDot lightv hit.normalv

        reflectDotEye =
            -- <= 0 if light reflecting away from eye
            vectorDot
                (vectorReflect hit.normalv (vectorScaleBy -1 lightv))
                hit.eyev

        ambient =
            hit.object.material.colour hit.point
                |> colourMul light.colour
                |> colourScaleBy hit.object.material.ambient

        diffuse =
            hit.object.material.colour hit.point
                |> colourMul light.colour
                |> colourScaleBy (hit.object.material.diffuse * lightDotNormal)

        specular =
            colourWhite
                |> colourMul light.colour
                |> colourScaleBy (hit.object.material.specular * (reflectDotEye ^ hit.object.material.shininess))
    in
    ( ambient
    , if lightDotNormal <= 0 then
        colourBlack

      else
        diffuse
    , if lightDotNormal <= 0 || reflectDotEye <= 0 then
        colourBlack

      else
        specular
    )


pointInShadow : World -> Point TagWorldSpace -> Light -> Bool
pointInShadow world point light =
    let
        vec =
            vectorBetweenPoints light.point point
    in
    Ray light.point (vectorNormalize vec)
        |> intersectShapesByRay (List.filter (.material >> .shadow) world.objects)
        |> hitFromIntersections
        |> Maybe.map (\hit -> hit.t < vectorMagnitude vec)
        |> Maybe.withDefault False


refractedRay : Hit -> Ray TagWorldSpace TagUnit
refractedRay hit =
    let
        ratio =
            hit.n1 / hit.n2

        cos_i =
            vectorDot hit.eyev hit.normalv

        sin2_t =
            (ratio ^ 2) * (1 - (cos_i ^ 2))

        cos_t =
            sqrt (1 - sin2_t)

        direction =
            vectorNormalize
                (vectorSubtract
                    (vectorScaleBy ((ratio * cos_i) - cos_t) hit.normalv)
                    (vectorScaleBy ratio hit.eyev)
                )
    in
    Ray hit.underPoint direction


schlickReflectance hit =
    let
        r0 =
            ((hit.n1 - hit.n2) / (hit.n1 + hit.n2)) ^ 2

        eyeDotNormal =
            vectorDot hit.eyev hit.normalv

        cos =
            if hit.n1 <= hit.n2 then
                eyeDotNormal

            else
                sqrt (1 - (((hit.n1 / hit.n2) ^ 2) * (1 - (eyeDotNormal ^ 2))))

        reflectance =
            r0 + ((1 - r0) * ((1 - cos) ^ 5))
    in
    if isNaN reflectance then
        1

    else
        reflectance


refractionIndices : List Intersection -> Hit -> Hit
refractionIndices intersections hit =
    -- todo: There has to be a better (clearer) way.
    let
        refractiveIndex shapes =
            shapes
                |> List.head
                |> Maybe.map (.object >> .material >> .refractiveIndex)
                -- default to refractive index of a vacuum
                |> Maybe.withDefault 1

        loop exiting listIntersections =
            case listIntersections of
                intersection :: remainingIntersections ->
                    let
                        entering =
                            if List.any (.object >> .id >> (==) intersection.object.id) exiting then
                                List.filter (.object >> .id >> (/=) intersection.object.id) exiting

                            else
                                intersection :: exiting
                    in
                    if intersection.t == hit.t then
                        { hit
                            | n1 = refractiveIndex exiting
                            , n2 = refractiveIndex entering
                        }

                    else
                        loop entering remainingIntersections

                _ ->
                    hit
    in
    loop [] intersections



{- Camera -------------------------------------------------------------------- -}


type alias CameraConfig t =
    { imageWidth : Int
    , imageHeight : Int
    , fieldOfView : Float
    , viewFrom : Point TagWorldSpace
    , viewTo : Point TagWorldSpace
    , viewUp : Vector t
    , maxRecursion : Int
    }


type alias Camera =
    { imageWidth : Int
    , imageHeight : Int
    , fieldOfView : Float
    , viewTransform : Transform TagToObjectSpace
    , pixelSize : Float
    , offsetWidth : Float
    , offsetHeight : Float
    , maxRecursion : Int
    }


makeCamera : CameraConfig t -> Camera
makeCamera config =
    cameraFOV
        { imageWidth = config.imageWidth
        , imageHeight = config.imageHeight
        , fieldOfView = config.fieldOfView
        , viewTransform = cameraViewTransform config.viewFrom config.viewTo config.viewUp
        , pixelSize = 0
        , offsetWidth = 0
        , offsetHeight = 0
        , maxRecursion = config.maxRecursion
        }


cameraFOV : Camera -> Camera
cameraFOV camera =
    let
        halfView =
            tan (camera.fieldOfView / 2)

        aspect =
            toFloat camera.imageHeight / toFloat camera.imageWidth

        ( halfWidth, halfHeight ) =
            if 1 <= aspect then
                ( halfView, halfView / aspect )

            else
                ( halfView * aspect, halfView )

        pixelSize =
            2 * (halfWidth / toFloat camera.imageHeight)

        offsetWidth =
            halfWidth - (halfWidth / toFloat camera.imageHeight)

        offsetHeight =
            halfHeight - (halfWidth / toFloat camera.imageHeight)
    in
    { camera
        | pixelSize = pixelSize
        , offsetWidth = offsetWidth
        , offsetHeight = offsetHeight
    }


cameraViewTransform : Point TagWorldSpace -> Point TagWorldSpace -> Vector t -> Transform TagToObjectSpace
cameraViewTransform (Point from) to up =
    {- The camera view transform converts the world into the camera's
       coordinate system. Even though we specify the from and to positions
       in world coordinates, in truth, the camera is always at the origin and
       the world is transformed as required to make everything correct
       relatively.
    -}
    let
        forward =
            vectorNormalize (vectorBetweenPoints (Point from) to)

        left =
            vectorCross forward (vectorNormalize up)

        trueUp =
            vectorCross left forward

        orientation (Vector l) (Vector u) (Vector f) =
            Transform l.dx l.dy l.dz 0 u.dx u.dy u.dz 0 -f.dx -f.dy -f.dz 0 0 0 0 1
    in
    transformTranslate -from.x -from.y -from.z
        |> transformMul (orientation left trueUp forward)
        |> transformInverse


cameraRayForPixel : Camera -> Pixel -> Ray TagWorldSpace TagUnit
cameraRayForPixel camera pixel =
    let
        toWorldSpace : Point TagObjectSpace -> Point TagWorldSpace
        toWorldSpace =
            pointTransform camera.viewTransform

        target =
            toWorldSpace
                (Point
                    { x = camera.offsetWidth - (camera.pixelSize * toFloat pixel.x)
                    , y = camera.offsetHeight - (camera.pixelSize * toFloat pixel.y)
                    , z = -1
                    }
                )

        origin =
            toWorldSpace defaultPoint
    in
    target
        |> vectorBetweenPoints origin
        |> vectorNormalize
        |> Ray origin



{- Intersections ------------------------------------------------------------- -}


type alias Intersection =
    { object : Shape
    , ray : Ray TagWorldSpace TagUnit
    , t : Float
    }


type alias Hit =
    --AKA prepared computations
    { object : Shape
    , ray : Ray TagWorldSpace TagUnit
    , t : Float
    , point : Point TagWorldSpace
    , eyev : Vector TagUnit
    , normalv : Vector TagUnit
    , overPoint : Point TagWorldSpace
    , underPoint : Point TagWorldSpace
    , inside : Bool
    , reflectv : Vector TagUnit
    , n1 : Float
    , n2 : Float
    }


hitFromIntersections : List Intersection -> Maybe Hit
hitFromIntersections intersections =
    -- AKA prepare_computations
    -- todo: "inside" needed?
    -- todo: does "refraction" need to be called so much?
    intersections
        |> List.filter (.t >> (<=) 0)
        |> List.head
        |> Maybe.map
            ((\intersect ->
                { defaultHit
                    | object = intersect.object
                    , ray = intersect.ray
                    , t = intersect.t
                }
             )
                >> (\h -> { h | point = pointAlongRay h.ray h.t })
                >> (\h -> { h | eyev = vectorNormalize (vectorScaleBy -1 h.ray.vector) })
                >> (\h -> { h | normalv = vectorNormalAt h.object h.point })
                >> (\h -> { h | inside = vectorDot h.normalv h.eyev <= 0 })
                >> (\h ->
                        { h
                            | normalv =
                                if h.inside then
                                    vectorNormalize (vectorScaleBy -1 h.normalv)

                                else
                                    h.normalv
                        }
                   )
                >> (\h -> { h | reflectv = vectorReflect h.normalv h.ray.vector })
                >> (\h -> { h | overPoint = pointAlongRay (Ray h.point h.normalv) epsilon })
                >> (\h -> { h | underPoint = pointAlongRay (Ray h.point h.normalv) -epsilon })
                >> refractionIndices intersections
            )


intersectShapesByRay : List Shape -> Ray TagWorldSpace TagUnit -> List Intersection
intersectShapesByRay shapes ray =
    let
        intersectShape shape =
            let
                toObjectSpace : Ray TagWorldSpace b -> Ray TagObjectSpace TagAny
                toObjectSpace r =
                    Ray (pointTransform shape.worldToObject r.point) (vectorTransform shape.worldToObject r.vector)
            in
            ray
                |> toObjectSpace
                |> shape.intersectRay
                |> List.filter (isNaN >> not)
                |> List.filter (isInfinite >> not)
                |> List.map (Intersection shape ray)
    in
    shapes
        |> List.concatMap intersectShape
        |> List.sortBy .t


vectorNormalAt : Shape -> Point TagWorldSpace -> Vector TagUnit
vectorNormalAt shape point =
    let
        toObjectSpace : Point TagWorldSpace -> Point TagObjectSpace
        toObjectSpace =
            pointTransform shape.worldToObject
    in
    point
        |> toObjectSpace
        |> shape.normalAt
        |> vectorTransform (transformTranspose shape.worldToObject)
        |> vectorNormalize



{- Geometry ------------------------------------------------------------------ -}
{- Plane -}


vectorPlaneNormalAt : Point TagObjectSpace -> Vector TagAny
vectorPlaneNormalAt _ =
    Vector
        { dx = 0
        , dy = 1
        , dz = 0
        }


intersectPlane : Ray TagObjectSpace t -> List Float
intersectPlane ray =
    let
        ( Point { y }, Vector { dy } ) =
            ( ray.point, ray.vector )
    in
    [ -y / dy ]



{- Sphere -}


vectorSphereNormalAt : Point TagObjectSpace -> Vector TagAny
vectorSphereNormalAt (Point { x, y, z }) =
    Vector
        { dx = x
        , dy = y
        , dz = z
        }


intersectSphere : Ray TagObjectSpace t -> List Float
intersectSphere ray =
    let
        s =
            vectorBetweenPoints defaultPoint ray.point

        a =
            vectorDot ray.vector ray.vector

        b =
            2 * vectorDot ray.vector s

        c =
            vectorDot s s - 1

        discriminant =
            (b * b) - (4 * a * c)
    in
    [ (-b - sqrt discriminant) / (2 * a), (-b + sqrt discriminant) / (2 * a) ]



{- Cube -}


vectorCubeNormalAt : Point TagObjectSpace -> Vector TagAny
vectorCubeNormalAt (Point { x, y, z }) =
    if abs y < abs x && abs z < abs x then
        Vector { dx = x, dy = 0, dz = 0 }

    else if abs z < abs y then
        Vector { dx = 0, dy = y, dz = 0 }

    else
        Vector { dx = 0, dy = 0, dz = z }


intersectCube : Ray TagObjectSpace t -> List Float
intersectCube ray =
    let
        intersect v dv =
            if 0 <= dv then
                ( -(v + 1) / dv, -(v - 1) / dv )

            else
                ( -(v - 1) / dv, -(v + 1) / dv )

        pick ( a, b ) ( c, d ) =
            ( max a c, min b d )

        ( tmin, tmax ) =
            let
                ( Point { x, y, z }, Vector { dx, dy, dz } ) =
                    ( ray.point, ray.vector )
            in
            intersect x dx
                |> pick (intersect y dy)
                |> pick (intersect z dz)
    in
    if tmin <= tmax then
        [ tmin, tmax ]

    else
        []



{- Cylinder -}


vectorCylinderNormalAt : CylinderConfig -> Point TagObjectSpace -> Vector TagAny
vectorCylinderNormalAt cylinder (Point { x, y, z }) =
    let
        distanceSq =
            -- sqrt not needed for this purpose: d < 1 same as d^2 < 1^2 same as d^2 < 1
            (x * x) + (z * z) < 1
    in
    if distanceSq && (cylinder.ymax - epsilon) <= y then
        Vector { dx = 0, dy = 1, dz = 0 }

    else if distanceSq && y <= (cylinder.ymin + epsilon) then
        Vector { dx = 0, dy = -1, dz = 0 }

    else
        Vector { dx = x, dy = 0, dz = z }


intersectCylinder : CylinderConfig -> Ray TagObjectSpace t -> List Float
intersectCylinder cylinder ray =
    let
        ( side0, side1 ) =
            let
                ( tmin, tmax ) =
                    let
                        ( Point { x, z }, Vector { dx, dz } ) =
                            ( ray.point, ray.vector )

                        ( a, b, c ) =
                            ( (dx * dx) + (dz * dz)
                            , (2 * x * dx) + (2 * z * dz)
                            , (x * x) + (z * z) - 1
                            )

                        discriminant =
                            b * b - 4 * a * c
                    in
                    ( (-b - sqrt discriminant) / (2 * a), (-b + sqrt discriminant) / (2 * a) )

                intersect t =
                    let
                        (Point { y }) =
                            pointAlongRay ray t
                    in
                    if cylinder.ymin < y && y < cylinder.ymax then
                        [ t ]

                    else
                        []
            in
            ( intersect tmin, intersect tmax )

        ( cap0, cap1 ) =
            let
                intersect yend =
                    let
                        t =
                            let
                                ( Point { y }, Vector { dy } ) =
                                    ( ray.point, ray.vector )
                            in
                            (yend - y) / dy

                        distanceSq =
                            let
                                (Point { x, z }) =
                                    pointAlongRay ray t
                            in
                            (x * x) + (z * z) <= 1
                    in
                    if distanceSq then
                        [ t ]

                    else
                        []
            in
            ( intersect cylinder.ymin, intersect cylinder.ymax )
    in
    List.concat
        (if cylinder.capped then
            [ side0, side1, cap0, cap1 ]

         else
            [ side0, side1 ]
        )



{- Cone -}


vectorConeNormalAt : CylinderConfig -> Point TagObjectSpace -> Vector TagAny
vectorConeNormalAt cone (Point { x, y, z }) =
    let
        distanceSq =
            (x * x) + (z * z) <= (y * y)
    in
    if distanceSq && cone.ymax <= y then
        Vector { dx = 0, dy = 1, dz = 0 }

    else if distanceSq && y <= cone.ymin then
        Vector { dx = 0, dy = -1, dz = 0 }

    else
        let
            dy =
                if 0 <= y then
                    -(sqrt (x * x + z * z))

                else
                    sqrt (x * x + z * z)
        in
        Vector { dx = x, dy = dy, dz = z }


intersectCone : CylinderConfig -> Ray TagObjectSpace t -> List Float
intersectCone cone ray =
    let
        sides =
            let
                ts =
                    let
                        ( Point { x, y, z }, Vector { dx, dy, dz } ) =
                            ( ray.point, ray.vector )

                        ( a, b, c ) =
                            ( (dx * dx) - (dy * dy) + (dz * dz)
                            , (2 * x * dx) - (2 * y * dy) + (2 * z * dz)
                            , (x * x) - (y * y) + (z * z)
                            )

                        discriminant =
                            b * b - 4 * a * c
                    in
                    if 0 < a then
                        [ (-b - sqrt discriminant) / (2 * a), (-b + sqrt discriminant) / (2 * a) ]

                    else if 0 == a && 0 /= b then
                        [ -c / (2 * b) ]

                    else
                        []

                intersect t =
                    let
                        (Point { y }) =
                            pointAlongRay ray t
                    in
                    if cone.ymin < y && y < cone.ymax then
                        [ t ]

                    else
                        []
            in
            List.concatMap intersect ts

        ( cap0, cap1 ) =
            let
                intersect yend =
                    let
                        t =
                            let
                                ( Point { y }, Vector { dy } ) =
                                    ( ray.point, ray.vector )
                            in
                            (yend - y) / dy

                        distanceSq =
                            let
                                (Point { x, y, z }) =
                                    pointAlongRay ray t
                            in
                            (x * x) + (z * z) <= (y * y)
                    in
                    if distanceSq then
                        [ t ]

                    else
                        []
            in
            ( intersect cone.ymin, intersect cone.ymax )
    in
    List.concat
        (if cone.capped then
            [ sides, cap0, cap1 ]

         else
            [ sides ]
        )



{- Triangle -}


type alias TriangleConfig =
    { a : Point TagObjectSpace
    , b : Point TagObjectSpace
    , c : Point TagObjectSpace
    }


type alias SmoothTriangleConfig =
    { a : Point TagObjectSpace
    , b : Point TagObjectSpace
    , c : Point TagObjectSpace
    , na : Vector TagUnit
    , nb : Vector TagUnit
    , nc : Vector TagUnit
    }


intersectTriangle : { a | a : Point TagObjectSpace, b : Point TagObjectSpace, c : Point TagObjectSpace } -> Ray TagObjectSpace t -> List Float
intersectTriangle { a, b, c } ray =
    let
        scalarTripleProduct v1 v2 v3 =
            vectorDot (vectorCross v1 v2) v3

        ( e1, e2, e3 ) =
            ( vectorBetweenPoints a b
            , vectorBetweenPoints a c
            , vectorBetweenPoints a ray.point
            )

        determinant =
            scalarTripleProduct ray.vector e2 e1

        ( t, u, v ) =
            ( scalarTripleProduct e3 e1 e2 / determinant
            , scalarTripleProduct ray.vector e2 e3 / determinant
            , scalarTripleProduct e3 e1 ray.vector / determinant
            )
    in
    if 0 <= u && u <= 1 && 0 <= v && v <= (1 - u) then
        [ t ]

    else
        []


vectorTriangleNormalAt : TriangleConfig -> Point TagObjectSpace -> Vector TagAny
vectorTriangleNormalAt { a, b, c } _ =
    let
        e1 =
            vectorBetweenPoints a b

        e2 =
            vectorBetweenPoints a c
    in
    vectorCross e2 e1


vectorSmoothTriangleNormalAt : SmoothTriangleConfig -> Point TagObjectSpace -> Vector TagAny
vectorSmoothTriangleNormalAt { a, b, c, na, nb, nc } point =
    let
        ( e1, e2, e3 ) =
            ( vectorBetweenPoints a b
            , vectorBetweenPoints a c
            , vectorBetweenPoints a point
            )

        area =
            vectorMagnitude (vectorCross e1 e2)

        ( u, v ) =
            ( vectorMagnitude (vectorCross e2 e3) / area
            , vectorMagnitude (vectorCross e1 e3) / area
            )
    in
    vectorScaleBy u nb
        |> vectorSubtract (vectorScaleBy -v nc)
        |> vectorSubtract (vectorScaleBy (1 - u - v) na)



{- Vectors, Transforms, Points, and Rays ------------------------------------- -}


type TagWorldSpace
    = TagAbs


type TagAny
    = TagAny


type TagObjectSpace
    = TagRel


type TagToAbs
    = TagToAbs


type TagToObjectSpace
    = TagToRel


type TagUnit
    = TagUnit


type Point frame
    = Point
        { x : Float
        , y : Float
        , z : Float
        }


type Transform frame
    = Transform Float Float Float Float Float Float Float Float Float Float Float Float Float Float Float Float


type Vector norm
    = Vector
        { dx : Float
        , dy : Float
        , dz : Float
        }


type alias Ray frame norm =
    { point : Point frame
    , vector : Vector norm
    }


defaultPoint =
    Point { x = 0, y = 0, z = 0 }


transformIdentity =
    Transform 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1



{- Transforms are most intuitively calculated as follows:
     transform = translation * rotation * scaling
   Read right to left, first scale the object, then rotate it, and finally,
   move it into position.
   identity |> mul scale |> mul rotate |> mul translate
-}


transformTranslate x y z =
    Transform 1 0 0 x 0 1 0 y 0 0 1 z 0 0 0 1


transformScale x y z =
    Transform x 0 0 0 0 y 0 0 0 0 z 0 0 0 0 1


transformRotateX radians =
    Transform 1 0 0 0 0 (cos radians) -(sin radians) 0 0 (sin radians) (cos radians) 0 0 0 0 1


transformRotateY radians =
    Transform (cos radians) 0 (sin radians) 0 0 1 0 0 -(sin radians) 0 (cos radians) 0 0 0 0 1


transformRotateZ radians =
    Transform (cos radians) -(sin radians) 0 0 (sin radians) (cos radians) 0 0 0 0 1 0 0 0 0 1


transformShear xy xz yx yz zx zy =
    Transform 1 xy xz 0 yx 1 yz 0 zx zy 1 0 0 0 0 1


transformInverse : Transform frame1 -> Transform frame2
transformInverse (Transform j11 j12 j13 j14 j21 j22 j23 j24 j31 j32 j33 j34 j41 j42 j43 j44) =
    {- To invert a 4x4 matrix requires 104 multiplications and 61 additions. Phew!

    -}
    let
        det22 =
            { -- 2x2 determinants
              d21322231 = (j21 * j32) - (j22 * j31)
            , d21332331 = (j21 * j33) - (j23 * j31)
            , d21342431 = (j21 * j34) - (j24 * j31)
            , d21422241 = (j21 * j42) - (j22 * j41)
            , d21432341 = (j21 * j43) - (j23 * j41)
            , d21442441 = (j21 * j44) - (j24 * j41)
            , d22332332 = (j22 * j33) - (j23 * j32)
            , d22342432 = (j22 * j34) - (j24 * j32)
            , d22432342 = (j22 * j43) - (j23 * j42)
            , d22442442 = (j22 * j44) - (j24 * j42)
            , d23342433 = (j23 * j34) - (j24 * j33)
            , d23442443 = (j23 * j44) - (j24 * j43)
            , d31423241 = (j31 * j42) - (j32 * j41)
            , d31433341 = (j31 * j43) - (j33 * j41)
            , d31443441 = (j31 * j44) - (j34 * j41)
            , d32433342 = (j32 * j43) - (j33 * j42)
            , d32443442 = (j32 * j44) - (j34 * j42)
            , d33443443 = (j33 * j44) - (j34 * j43)
            }

        term =
            { t1 = (j22 * det22.d33443443) - (j23 * det22.d32443442) + (j24 * det22.d32433342)
            , t2 = (j21 * det22.d33443443) - (j23 * det22.d31443441) + (j24 * det22.d31433341)
            , t3 = (j21 * det22.d32443442) - (j22 * det22.d31443441) + (j24 * det22.d31423241)
            , t4 = (j21 * det22.d32433342) - (j22 * det22.d31433341) + (j23 * det22.d31423241)
            }

        determinant =
            (j11 * term.t1) - (j12 * term.t2) + (j13 * term.t3) - (j14 * term.t4)
    in
    Transform
        (term.t1 / determinant)
        (((j12 * det22.d33443443) - (j13 * det22.d32443442) + (j14 * det22.d32433342)) / -determinant)
        (((j12 * det22.d23442443) - (j13 * det22.d22442442) + (j14 * det22.d22432342)) / determinant)
        (((j12 * det22.d23342433) - (j13 * det22.d22342432) + (j14 * det22.d22332332)) / -determinant)
        (term.t2 / -determinant)
        (((j11 * det22.d33443443) - (j13 * det22.d31443441) + (j14 * det22.d31433341)) / determinant)
        (((j11 * det22.d23442443) - (j13 * det22.d21442441) + (j14 * det22.d21432341)) / -determinant)
        (((j11 * det22.d23342433) - (j13 * det22.d21342431) + (j14 * det22.d21332331)) / determinant)
        (term.t3 / determinant)
        (((j11 * det22.d32443442) - (j12 * det22.d31443441) + (j14 * det22.d31423241)) / -determinant)
        (((j11 * det22.d22442442) - (j12 * det22.d21442441) + (j14 * det22.d21422241)) / determinant)
        (((j11 * det22.d22342432) - (j12 * det22.d21342431) + (j14 * det22.d21322231)) / -determinant)
        (term.t4 / -determinant)
        (((j11 * det22.d32433342) - (j12 * det22.d31433341) + (j13 * det22.d31423241)) / determinant)
        (((j11 * det22.d22432342) - (j12 * det22.d21432341) + (j13 * det22.d21422241)) / -determinant)
        (((j11 * det22.d22332332) - (j12 * det22.d21332331) + (j13 * det22.d21322231)) / determinant)


transformTranspose : Transform frame -> Transform frame
transformTranspose (Transform j11 j12 j13 j14 j21 j22 j23 j24 j31 j32 j33 j34 j41 j42 j43 j44) =
    Transform j11 j21 j31 j41 j12 j22 j32 j42 j13 j23 j33 j43 j14 j24 j34 j44


transformMul : Transform frame -> Transform frame -> Transform frame
transformMul (Transform a11 a12 a13 a14 a21 a22 a23 a24 a31 a32 a33 a34 a41 a42 a43 a44) (Transform b11 b12 b13 b14 b21 b22 b23 b24 b31 b32 b33 b34 b41 b42 b43 b44) =
    {- 64 multiplies and 48 additions
       Some identities:
          C * (B * (A * object)) == (C * B * A) * object =/= (A * B * C) * object
          (inv A)(inv B) == inv (BA)
    -}
    Transform
        ((a14 * b41) + (a13 * b31) + (a12 * b21) + (a11 * b11))
        ((a14 * b42) + (a13 * b32) + (a12 * b22) + (a11 * b12))
        ((a14 * b43) + (a13 * b33) + (a12 * b23) + (a11 * b13))
        ((a14 * b44) + (a13 * b34) + (a12 * b24) + (a11 * b14))
        ((a24 * b41) + (a23 * b31) + (a22 * b21) + (a21 * b11))
        ((a24 * b42) + (a23 * b32) + (a22 * b22) + (a21 * b12))
        ((a24 * b43) + (a23 * b33) + (a22 * b23) + (a21 * b13))
        ((a24 * b44) + (a23 * b34) + (a22 * b24) + (a21 * b14))
        ((a34 * b41) + (a33 * b31) + (a32 * b21) + (a31 * b11))
        ((a34 * b42) + (a33 * b32) + (a32 * b22) + (a31 * b12))
        ((a34 * b43) + (a33 * b33) + (a32 * b23) + (a31 * b13))
        ((a34 * b44) + (a33 * b34) + (a32 * b24) + (a31 * b14))
        ((a44 * b41) + (a43 * b31) + (a42 * b21) + (a41 * b11))
        ((a44 * b42) + (a43 * b32) + (a42 * b22) + (a41 * b12))
        ((a44 * b43) + (a43 * b33) + (a42 * b23) + (a41 * b13))
        ((a44 * b44) + (a43 * b34) + (a42 * b24) + (a41 * b14))


vectorBetweenPoints : Point t -> Point t -> Vector TagAny
vectorBetweenPoints (Point from) (Point to) =
    Vector
        { dx = to.x - from.x
        , dy = to.y - from.y
        , dz = to.z - from.z
        }


vectorCross : Vector a -> Vector b -> Vector TagAny
vectorCross (Vector a) (Vector b) =
    {- left-hand rule: +X cross +Y points into the screen
       also note, (cross a b) == neg (cross b a), i.e. not commutative
    -}
    Vector
        { dx = a.dy * b.dz - a.dz * b.dy
        , dy = a.dz * b.dx - a.dx * b.dz
        , dz = a.dx * b.dy - a.dy * b.dx
        }


vectorMagnitude : Vector t -> Float
vectorMagnitude v =
    sqrt (vectorDot v v)


vectorNormalize : Vector t -> Vector TagUnit
vectorNormalize v =
    let
        (Vector vec) =
            vectorScaleBy (1 / vectorMagnitude v) v
    in
    Vector vec


vectorReflect : Vector TagUnit -> Vector t -> Vector t
vectorReflect normal inbound =
    let
        (Vector vec) =
            normal
                |> vectorScaleBy (2 * vectorDot inbound normal)
                |> vectorSubtract inbound
    in
    Vector vec


vectorDot : Vector t -> Vector u -> Float
vectorDot (Vector a) (Vector b) =
    {- Some interesting applications:
       dot a a == (mag a) * (mag a)
       if a and b are unit vectors then dot a b == cos angle
       if a is a unit vector then dot a b == the component of b in the a direction
       obviously, dot a b == dot b a
    -}
    (a.dx * b.dx) + (a.dy * b.dy) + (a.dz * b.dz)


vectorScaleBy : Float -> Vector t -> Vector TagAny
vectorScaleBy s (Vector { dx, dy, dz }) =
    Vector
        { dx = s * dx
        , dy = s * dy
        , dz = s * dz
        }


vectorSubtract : Vector a -> Vector b -> Vector TagAny
vectorSubtract (Vector a) (Vector b) =
    Vector
        { dx = a.dx - b.dx
        , dy = a.dy - b.dy
        , dz = a.dz - b.dz
        }


vectorTransform : Transform a -> Vector b -> Vector TagAny
vectorTransform (Transform j11 j12 j13 j14 j21 j22 j23 j24 j31 j32 j33 j34 j41 j42 j43 j44) (Vector { dx, dy, dz }) =
    Vector
        { dx = (j13 * dz) + (j12 * dy) + (j11 * dx)
        , dy = (j23 * dz) + (j22 * dy) + (j21 * dx)
        , dz = (j33 * dz) + (j32 * dy) + (j31 * dx)
        }


pointTransform : Transform a -> Point b -> Point c
pointTransform (Transform j11 j12 j13 j14 j21 j22 j23 j24 j31 j32 j33 j34 j41 j42 j43 j44) (Point { x, y, z }) =
    Point
        { x = j14 + (j13 * z) + (j12 * y) + (j11 * x)
        , y = j24 + (j23 * z) + (j22 * y) + (j21 * x)
        , z = j34 + (j33 * z) + (j32 * y) + (j31 * x)
        }


pointAlongRay : Ray a b -> Float -> Point a
pointAlongRay ray t =
    let
        ( Point { x, y, z }, Vector { dx, dy, dz } ) =
            ( ray.point, vectorScaleBy t ray.vector )
    in
    Point
        { x = x + dx
        , y = y + dy
        , z = z + dz
        }
