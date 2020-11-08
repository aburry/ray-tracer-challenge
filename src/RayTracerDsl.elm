module RayTracerDsl exposing
    ( camera
    , cone
    , cube
    , cylinder
    , group
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

import Assembly as A
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
    A.asmTransform [ G.matNewScale x y z ]


rotateX a =
    A.asmTransform [ G.matNewRotateX a ]


rotateY a =
    A.asmTransform [ G.matNewRotateY a ]


rotateZ a =
    A.asmTransform [ G.matNewRotateZ a ]


translate x y z =
    A.asmTransform [ G.matNewTranslate x y z ]


group =
    A.Group G.aabbAll []


subtract a1 a2 =
    A.CSG G.aabbAll [] A.Difference a2 a1


union =
    csgFromList A.Union


intersect =
    csgFromList A.Intersect


triples =
    G.triples


pairs =
    G.pairs


point =
    G.pntNewPoint


vector =
    G.vecNewUnit


cube =
    -- unit cube centered at the origin
    primitive G.Cube
        |> scale 0.5 0.5 0.5


plane =
    -- x-z plane
    primitive G.Plane


sphere =
    -- sphere (r = 0.5) centered at the origin
    primitive G.Sphere
        |> scale 0.5 0.5 0.5


cylinder =
    -- capped cylinder (r = 0.5, h = 1) centered at the origin, y-axis of rotation
    primitive (G.Cylinder { ymin = -1, ymax = 1, capped = True })
        |> scale 0.5 0.5 0.5


cone =
    -- capped cone (r = 0.5, h = 1) centered at the origin, y-axis of rotation
    primitive (G.Cone { ymin = -1, ymax = 0, capped = True })
        |> scale 0.5 1 0.5
        |> translate 0 0.5 0


triangle =
    -- right-triangle (b = 1, h = 1) in x-z plane, right angle at origin
    primitive (G.Triangle { a = point 0 0 0, b = point 1 0 0, c = point 0 0 1 })


primitive config =
    -- todo what is a nice way to expose the configs
    A.Primitive G.aabbAll
        []
        { id = 0
        , geometry = G.shpNewShape config
        , material = R.defaultMaterial
        , worldToObject = G.matNewIdentity
        }


material =
    R.applyMaterial



{- Helpers -}


csgFromList op =
    \assembly ->
        case assembly of
            [] ->
                A.Empty

            x :: xs ->
                List.foldl (A.CSG G.aabbAll [] op) x xs
