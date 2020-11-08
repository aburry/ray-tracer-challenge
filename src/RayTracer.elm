module RayTracer exposing
    ( Camera
    , CameraConfig
    , Light
    , Scene
    , applyMaterial
    , colourBlack
    , colourWhite
    , defaultMaterial
    , defaultTriangle
    , imageRender
    , imageToBitmap
    , insertAssembly
    , newCamera
    , newLight
    , objParse
    , patternAtObject
    , patternCheckered
    )

import Array
import Assembly exposing (Assembly(..), Colour, ColourFn, CsgOp(..), Shape)
import Geometry as G
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

   Matrix Multiplication

   Unlike scalar multiplication, matrix multiplication is not commutative
   (order matters). For example, 3 * 4 is the same as 4 * 3 for scalar
   multiplication, but A * B is not the same as B * A for matrix multiplication.
   Therefore, if you want to rotate something and then translate it, in
   what order do they need to be multiplied? What happens when you get the order
   wrong?

   Object transformations are calculated like this:

     O_world == X3 * X2 * X1 * O_model

   In other words, transforms are read right-to-left (backwards). Therefore,
   to scale(S), then rotate(R), and finally translate(T), your transform(X)
   is X == T * R * S. That is the mathematics of it, and we need to know these
   details to write the code properly, however, we do not need to expose all
   these details all the time. We will make it simple to define a scene by
   requiring that transforms be provided as lists of operations that you read in
   left-to-right order. You want to scale, rotate and translate? No problem,
   we will convert [S, R, T] to X == T * R * S.

   Because we can create trees of assemblies, we need to know what order to
   multiply multiple lists of transforms. For example,

     Assembly X2 [Assembly X1 [Primitive O]]

   Is that O_world == X1 * X2 * O_model, or O_world == X2 * X1 * O_model? And what
   does it mean that the transforms are actually lists in reverse order? The way
   I wrote it down should give you a big hint, we want to do X1 first obviously!
   And we can convert them into our intuitive list as X = X1 ++ X2. Easy.

   Another tricky detail here is that we have been talking about how to specify
   a transform to put objects where we want them, but in fact, that is not the
   way the ray tracer works. All the model intersection and normal calculation
   algorithms are written using model coordinates. We do not actually want to
   be able to move the models at all! We want to be able to transform all the
   world stuff into model coordinates. In other words, if we have a ray in the
   world, we want to be able to transform that, so that it is in model space.
   That means we actually want the opposite (inverse) of the transform used to
   specify the scene. Happily, there is a function, matInvert, to do that. But
   there are a few details to know about calculating with inverses first, to
   make sure we get it right. The most important one is:
     inv (B * A) == (inv A) * (inv B)


-}
{--TYPES ---------------------------------------------------------------------}


type alias Scene =
    { assembly : Assembly
    , lights : List Light
    , camera : Camera
    }


type alias CameraConfig =
    { imageWidth : Int
    , imageHeight : Int
    , fieldOfView : Float
    , viewFrom : G.Point
    , viewTo : G.Point
    , viewUp : G.Vector
    , maxRecursion : Int
    }


type alias Image =
    { width : Int
    , height : Int
    , data : Array.Array Colour
    }


type alias Light =
    { point : G.Point
    , colour : Colour
    }


newLight point =
    { point = point
    , colour = colourWhite
    }


type alias Pixel =
    { x : Int
    , y : Int
    }



{--CONSTANTS -----------------------------------------------------------------}


defaultHit : Hit
defaultHit =
    { object = { id = 0, geometry = G.shpNewShape G.Sphere, material = defaultMaterial, worldToObject = G.matNewIdentity }
    , ray = G.rayNewRay (G.pntNewPoint 0 0 0) (G.vecNewUnit 1 0 0)
    , t = 0
    , point = G.pntNewPoint 0 0 0
    , eyev = G.vecNewUnit 1 0 0
    , normalv = G.vecNewUnit 1 0 0
    , overPoint = G.pntNewPoint 0 0 0
    , underPoint = G.pntNewPoint 0 0 0
    , inside = False
    , reflectv = G.vecNewUnit 1 0 0
    , n1 = 1
    , n2 = 1
    }


defaultMaterial =
    { colour = always { red = 0.9, green = 0.9, blue = 0.9 }
    , ambient = 0.3
    , diffuse = 0.9
    , specular = 0.9
    , shininess = 200
    , reflective = 0
    , transparency = 0
    , refractiveIndex = 1
    , shadow = True
    }


applyMaterial material assembly =
    case assembly of
        Empty ->
            Empty

        Primitive aabb transform shape ->
            Primitive aabb transform { shape | material = material }

        CSG aabb transform op left right ->
            CSG aabb transform op (applyMaterial material left) (applyMaterial material right)

        Group aabb transform list ->
            Group aabb transform (List.map (applyMaterial material) list)


defaultTriangle : Shape
defaultTriangle =
    let
        config =
            { a = G.pntNewPoint 0 0 0
            , b = G.pntNewPoint 1 0 0
            , c = G.pntNewPoint 0 1 0
            }
    in
    { id = 0
    , geometry = G.shpNewShape (G.Triangle config)
    , material = defaultMaterial
    , worldToObject = G.matNewIdentity
    }



{--FUNCTIONS -----------------------------------------------------------------}
{- Scene creation -}


insertAssembly world assembly =
    -- todo simplify this and let the compiler sort it out
    case world of
        Group aabb [] list ->
            Group aabb [] (assembly :: list)

        _ ->
            Group G.aabbAll [] [ assembly, world ]



{- OBJ parser -}


objParse =
    ObjParser.parse >> Result.withDefault [] >> objToAssembly


objToAssembly : List ObjParser.ObjLine -> Assembly
objToAssembly objList =
    -- todo: Should this return the errors too?
    let
        vertexToPoint : ObjParser.ObjLine -> Maybe G.Point
        vertexToPoint obj =
            case obj of
                ObjParser.Vertex [ x, y, z ] ->
                    Just (G.pntNewPoint x y z)

                _ ->
                    Nothing

        vertexNormalToVector obj =
            case obj of
                ObjParser.VertexNormal [ dx, dy, dz ] ->
                    Just (G.vecNewVector dx dy dz)

                _ ->
                    Nothing

        vertices =
            objList
                |> List.map vertexToPoint
                |> List.filter ((/=) Nothing)
                |> List.map (Maybe.withDefault (G.pntNewPoint 0 0 0))
                |> Array.fromList

        vertexNormals =
            objList
                |> List.map vertexNormalToVector
                |> List.filter ((/=) Nothing)
                |> List.map (Maybe.withDefault (G.vecNewUnit 0 1 0))
                |> Array.fromList

        faceToTriangle : ObjParser.ObjLine -> Maybe Assembly
        faceToTriangle obj =
            let
                faceVertex : List (Maybe Int) -> ( Maybe G.Point, Maybe G.Vector )
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
                    Just (Primitive G.aabbAll [] { defaultTriangle | geometry = G.shpNewShape (G.Triangle config) })

                smoothTriangle config =
                    Just (Primitive G.aabbAll [] { defaultTriangle | geometry = G.shpNewShape (G.SmoothTriangle config) })

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

                        makeAllTri : List ( Maybe G.Point, Maybe G.Vector ) -> Maybe (List Assembly)
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
                    makeAllTri (List.map faceVertex x) |> Maybe.map (Group G.aabbAll [])
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
        |> List.map (Maybe.withDefault (Primitive G.aabbAll [] defaultTriangle))
        |> Group G.aabbAll []



{- Colours and Patterns -}


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


patternAtObject : G.Matrix -> G.Matrix -> ColourFn -> ColourFn
patternAtObject worldToObject objectToPattern pattern point =
    {- (inv A)(inv B) == inv (BA) -}
    point
        |> G.pntTransform (G.matProduct objectToPattern worldToObject)
        |> pattern


patternCheckered colourA colourB point =
    -- todo: how to do this with an opaque point type?
    let
        parity =
            point
                |> (\(G.Point x y z) -> [ x, y, z ])
                |> List.map (round >> modBy 2)
                |> List.sum
                |> (modBy 2 >> (==) 0)
    in
    if parity then
        colourA

    else
        colourB



{- Image -}


imageRender : { assembly : Assembly, lights : List Light, camera : Camera } -> Image
imageRender { assembly, lights, camera } =
    let
        pixelAtIndex index =
            { x = modBy camera.imageWidth index
            , y = index // camera.imageWidth
            }

        colourAtIndex index =
            index
                |> pixelAtIndex
                |> cameraRayForPixel camera
                |> colourAtRay (Assembly.asmCompile assembly) lights camera.maxRecursion
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


colourAtRay : Assembly -> List Light -> Int -> G.Ray -> Colour
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
                    G.rayNewRay hit.overPoint hit.reflectv
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
            |> intersectAssembly world
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
                |> G.vecBetweenPoints hit.point
                |> G.vecUnit

        lightDotNormal =
            -- <= 0 if light is behind the surface
            G.vecDot lightv hit.normalv

        reflectDotEye =
            -- <= 0 if light reflecting away from eye
            G.vecDot
                (G.vecReflect hit.normalv (G.vecScaleBy -1 lightv))
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


pointInShadow : Assembly -> G.Point -> Light -> Bool
pointInShadow world point light =
    let
        vec =
            G.vecBetweenPoints light.point point
    in
    G.rayNewRay light.point (G.vecUnit vec)
        |> intersectAssembly world
        |> List.filter (.object >> .material >> .shadow)
        |> hitFromIntersections
        |> Maybe.map (\hit -> hit.t < G.vecLength vec)
        |> Maybe.withDefault False


refractedRay : Hit -> G.Ray
refractedRay hit =
    let
        ratio =
            hit.n1 / hit.n2

        cos_i =
            G.vecDot hit.eyev hit.normalv

        sin2_t =
            (ratio ^ 2) * (1 - (cos_i ^ 2))

        cos_t =
            sqrt (1 - sin2_t)

        direction =
            G.vecUnit
                (G.vecSubtract
                    (G.vecScaleBy ((ratio * cos_i) - cos_t) hit.normalv)
                    (G.vecScaleBy ratio hit.eyev)
                )
    in
    G.rayNewRay hit.underPoint direction


schlickReflectance hit =
    let
        r0 =
            ((hit.n1 - hit.n2) / (hit.n1 + hit.n2)) ^ 2

        eyeDotNormal =
            G.vecDot hit.eyev hit.normalv

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


type alias Camera =
    { imageWidth : Int
    , imageHeight : Int
    , fieldOfView : Float
    , viewTransform : G.Matrix
    , pixelSize : Float
    , offsetWidth : Float
    , offsetHeight : Float
    , maxRecursion : Int
    }


newCamera : CameraConfig -> Camera
newCamera config =
    let
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

        cameraViewTransform : G.Point -> G.Point -> G.Vector -> G.Matrix
        cameraViewTransform from to upApprox =
            -- todo perspective transformations
            -- todo: expose a way from the Geometry module to achieve this
            {- The camera view transform converts the world into the camera's
               coordinate system. Even though we specify the from and to positions
               in world coordinates, in truth, the camera is always at the origin and
               the world is transformed as required to make everything correct
               relatively.
               also called: look-at
            -}
            let
                forward =
                    G.vecUnit (G.vecBetweenPoints from to)

                left =
                    G.vecUnit (G.vecCross forward upApprox)

                up =
                    G.vecUnit (G.vecCross left forward)

                orientation (G.Vector lx ly lz) (G.Vector ux uy uz) (G.Vector fx fy fz) =
                    G.Matrix lx ly lz 0 ux uy uz 0 -fx -fy -fz 0 0 0 0 1

                (G.Point fromx fromy fromz) =
                    from
            in
            G.matNewTranslate -fromx -fromy -fromz
                |> G.matProduct (orientation left up forward)
                |> G.matInvert
    in
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


cameraRayForPixel : Camera -> Pixel -> G.Ray
cameraRayForPixel camera pixel =
    {- Create a ray (in world space) for a given pixel. -}
    let
        toWorldSpace : G.Point -> G.Point
        toWorldSpace =
            G.pntTransform camera.viewTransform

        target : G.Point
        target =
            toWorldSpace
                (G.pntNewPoint
                    (camera.offsetWidth - (camera.pixelSize * toFloat pixel.x))
                    (camera.offsetHeight - (camera.pixelSize * toFloat pixel.y))
                    -1
                )

        origin =
            toWorldSpace (G.pntNewPoint 0 0 0)
    in
    target
        |> G.vecBetweenPoints origin
        |> G.vecUnit
        |> G.rayNewRay origin



{- Intersections ------------------------------------------------------------- -}


type alias Intersection =
    { object : Shape
    , ray : G.Ray
    , t : Float
    }


type alias Hit =
    --AKA prepared computations
    { object : Shape
    , ray : G.Ray
    , t : Float
    , point : G.Point
    , eyev : G.Vector
    , normalv : G.Vector
    , overPoint : G.Point
    , underPoint : G.Point
    , inside : Bool
    , reflectv : G.Vector
    , n1 : Float
    , n2 : Float
    }


hitFromIntersections : List Intersection -> Maybe Hit
hitFromIntersections intersections =
    -- AKA prepare_computations
    -- todo: "inside" needed?
    -- todo: does "refraction" need to be called so much?
    -- todo re-hide ray internals
    -- todo make it easier to read
    let
        epsilon =
            1.0e-6
    in
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
                >> (\h -> { h | point = G.pntAlongRay h.ray h.t })
                >> (\h ->
                        let
                            (G.Ray _ vector) =
                                h.ray
                        in
                        { h | eyev = G.vecUnit (G.vecScaleBy -1 vector) }
                   )
                >> (\h -> { h | normalv = vectorNormalAt h.object h.point })
                >> (\h -> { h | inside = G.vecDot h.normalv h.eyev <= 0 })
                >> (\h ->
                        { h
                            | normalv =
                                if h.inside then
                                    G.vecUnit (G.vecScaleBy -1 h.normalv)

                                else
                                    h.normalv
                        }
                   )
                >> (\h ->
                        let
                            (G.Ray _ vector) =
                                h.ray
                        in
                        { h | reflectv = G.vecReflect h.normalv vector }
                   )
                >> (\h -> { h | overPoint = G.pntAlongRay (G.rayNewRay h.point h.normalv) epsilon })
                >> (\h -> { h | underPoint = G.pntAlongRay (G.rayNewRay h.point h.normalv) -epsilon })
                >> refractionIndices intersections
            )



{- intersect and normal -}


vectorNormalAt : Shape -> G.Point -> G.Vector
vectorNormalAt shape point =
    point
        |> G.pntTransform shape.worldToObject
        |> shape.geometry.normalAt
        |> G.vecTransform (G.matTranspose shape.worldToObject)
        |> G.vecUnit


intersectAssembly : Assembly -> G.Ray -> List Intersection
intersectAssembly assembly ray =
    let
        intersectGroup aabb =
            if G.aabbIntersectRay aabb ray then
                List.concatMap (\i -> intersectAssembly i ray)

            else
                always []

        intersections =
            case assembly of
                Empty ->
                    []

                Primitive _ _ shape ->
                    ray
                        |> G.rayTransform shape.worldToObject
                        |> shape.geometry.intersectRay
                        |> List.map (Intersection shape ray)

                Group aabb _ list ->
                    intersectGroup aabb list

                CSG aabb _ op left right ->
                    if G.aabbIntersectRay aabb ray then
                        intersectCsg op (intersectAssembly left ray) (intersectAssembly right ray)

                    else
                        []
    in
    intersections
        |> List.filter (not << isNaN << .t)
        |> List.filter (not << isInfinite << .t)
        |> List.sortBy .t


intersectCsg : CsgOp -> List Intersection -> List Intersection -> List Intersection
intersectCsg operand leftIntersections rightIntersections =
    -- todo: simplify
    let
        csgOperator : Bool -> Bool -> Bool -> Bool
        csgOperator lhit inl inr =
            case operand of
                Union ->
                    (lhit && not inr) || (not lhit && not inl)

                Intersect ->
                    (lhit && inr) || (not lhit && inl)

                Difference ->
                    (lhit && not inr) || (not lhit && inl)

        merge : List Intersection -> List Intersection -> Bool -> Bool -> List Intersection
        merge lt rt inl inr =
            let
                update intersection include rest =
                    if include then
                        intersection :: rest

                    else
                        rest
            in
            case ( lt, rt ) of
                ( [], [] ) ->
                    []

                ( l :: left, [] ) ->
                    update l (csgOperator True inl inr) (merge left [] (not inl) inr)

                ( [], r :: right ) ->
                    update r (csgOperator False inl inr) (merge [] right inl (not inr))

                ( l :: left, r :: right ) ->
                    if l.t < r.t then
                        update l (csgOperator True inl inr) (merge left (r :: right) (not inl) inr)

                    else
                        update r (csgOperator False inl inr) (merge (l :: left) right inl (not inr))
    in
    merge leftIntersections rightIntersections False False
