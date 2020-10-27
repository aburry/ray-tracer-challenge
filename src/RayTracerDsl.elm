module RayTracerDsl exposing
    ( camera
    , cone
    , cube
    , cylinder
    , group
    , insert
    , intersect
    , light
    , material
    , objParse
    , pairs
    , plane
    , point
    , primitive
    , render
    , rotateX
    , rotateY
    , rotateZ
    , scale
    , sphere
    , subtract
    , toBitmap
    , translate
    , triangle
    , triples
    , union
    , vector
    )

import Geometry as G
import RayTracer as R



{--
  "Simple things should be simple, complex things should be possible."
     -- Alan Kay
--}


render =
    R.imageRender


toBitmap =
    R.imageToBitmap


light =
    R.newLight


camera =
    R.newCamera


objParse =
    R.objParse


scale x y z =
    applyTransform (G.matNewScale x y z)


rotateX a =
    applyTransform (G.matNewRotateX a)


rotateY a =
    applyTransform (G.matNewRotateY a)


rotateZ a =
    applyTransform (G.matNewRotateZ a)


translate x y z  =
    applyTransform (G.matNewTranslate x y z)


group =
    R.Group []


subtract a1 a2 =
    R.CSG [] R.Difference a2 a1


csgFromList op =
    \assembly ->
        case assembly of
            [] ->
                R.Empty

            x :: xs ->
                List.foldl (R.CSG [] op) x xs


union =
    csgFromList R.Union


intersect =
    csgFromList R.Intersect


pairs xs ys =
    List.concatMap (\fn -> List.map fn ys) (List.map Tuple.pair xs)


triples xs ys zs =
    List.concatMap (\( x, y ) -> List.map (\z -> ( x, y, z )) zs) (pairs xs ys)


point =
    G.pntNewPoint


vector =
    G.vecNewUnit


cube =
    -- unit cube centered at the origin
    R.Primitive []
        { id = 0
        , geometry = G.shpNewShape G.Cube
        , material = R.defaultMaterial
        , worldToObject = G.matNewIdentity
        }
        |> scale 0.5 0.5 0.5


plane =
    -- x-z plane
    R.Primitive []
        { id = 0
        , geometry = G.shpNewShape G.Plane
        , material = R.defaultMaterial
        , worldToObject = G.matNewIdentity
        }


sphere =
    -- sphere (r = 0.5) centered at the origin
    R.Primitive []
        { id = 0
        , geometry = G.shpNewShape G.Sphere
        , material = R.defaultMaterial
        , worldToObject = G.matNewIdentity
        }
        |> scale 0.5 0.5 0.5


cylinder =
    -- capped cylinder (r = 0.5, h = 1) centered at the origin, y-axis of rotation
    R.Primitive []
        { id = 0
        , geometry = G.shpNewShape (G.Cylinder { ymin = -1, ymax = 1, capped = True })
        , material = R.defaultMaterial
        , worldToObject = G.matNewIdentity
        }
        |> scale 0.5 0.5 0.5


cone =
    -- capped cone (r = 0.5, h = 1) centered at the origin, y-axis of rotation
    R.Primitive []
        { id = 0
        , geometry = G.shpNewShape (G.Cone { ymin = -1, ymax = 0, capped = True })
        , material = R.defaultMaterial
        , worldToObject = G.matNewIdentity
        }
        |> scale 0.5 1 0.5
        |> translate 0 0.5 0


triangle =
    -- right-triangle (b = 1, h = 1) in x-z plane, right angle at origin
    R.Primitive []
        { id = 0
        , geometry = G.shpNewShape (G.Triangle { a = point 0 0 0, b = point 1 0 0, c = point 0 0 1 })
        , material = R.defaultMaterial
        , worldToObject = G.matNewIdentity
        }


primitive config =
    -- todo what is a nice way to expose the configs
    R.Primitive []
        { id = 0
        , geometry = G.shpNewShape config
        , material = R.defaultMaterial
        , worldToObject = G.matNewIdentity
        }


material =
    R.applyMaterial


applyTransform transform assembly =
    case assembly of
        R.Empty ->
            R.Empty

        R.Primitive transformList shape ->
            R.Primitive (transformList ++ [ transform ]) shape

        R.CSG transformList op left right ->
            R.CSG (transformList ++ [ transform ]) op left right

        R.Group transformList list ->
            R.Group (transformList ++ [ transform ]) list


insert =
    R.insertAssembly
