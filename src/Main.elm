port module Main exposing (brick, compiler1, main)

import Browser
import Geometry as G
import Html
import Html.Attributes
import RayTracerDsl exposing (..)


port cmdRender :
    { elementId : String
    , image :
        { width : Int
        , height : Int
        , data : List ( Int, Int, Int )
        }
    }
    -> Cmd msg


main : Program () () ()
main =
    let
        canvas id =
            Html.canvas
                [ Html.Attributes.id id
                , Html.Attributes.style "border" "1px solid black"
                , Html.Attributes.style "height" "320px"
                , Html.Attributes.style "width" "320px"
                ]
                []

        view id example =
            cmdRender
                { elementId = id
                , image = render example |> toBitmap
                }
    in
    Browser.element
        { init =
            \_ ->
                ( ()
                , Cmd.batch
                    [ view "canvas0" (viewer compiler1) -- (viewer basic)

                    {- , view "canvas1" (viewer brick)
                       , view "canvas2" (viewer teapot)
                       , view "canvas3" (viewer csg)
                       , view "canvas4" (viewer hex)
                       , view "canvas5" (viewer csghex)
                       , view "canvas6" cover
                       , view "canvas7" infobubble
                       , view "canvas8" (viewer primitives)
                    -}
                    ]
                )
        , view =
            \_ ->
                Html.div []
                    (List.map canvas
                        [ "canvas0"
                        , "canvas1"
                        , "canvas2"
                        , "canvas3"
                        , "canvas4"
                        , "canvas5"
                        , "canvas6"
                        , "canvas7"
                        , "canvas8"
                        ]
                    )
        , update = \_ _ -> ( (), Cmd.none )
        , subscriptions = \_ -> Sub.none
        }


viewer assembly =
    { assembly = assembly
    , lights = [ light (point -25 25 -60) ]
    , camera =
        camera
            { viewFrom = point 50 20 -60
            , viewTo = point 0 0 0
            , viewUp = vector 0 1 0
            , imageWidth = 320
            , imageHeight = 320
            , fieldOfView = pi / 5
            , maxRecursion = 6
            }
    }


compiler1 =
    let
        thing1 =
            union
                [ sphere |> scale 2 2 2 |> translate 1.5 0 0
                , sphere |> scale 2 2 2 |> translate -1.5 0 0
                ]

        thing2 =
            intersect
                [ sphere |> scale 2 2 2 |> translate 1.5 0 0
                , sphere |> scale 2 2 2 |> translate -1.5 0 0
                ]

        thing3 =
            (sphere |> scale 2 2 2 |> translate -1.5 0 0)
                |> subtract
                    (sphere |> scale 2 2 2 |> translate 1.5 0 0)
    in
    [ thing1 |> translate 0 3 0
    , thing2
    , thing3 |> translate 0 -3 0
    ]
        |> group
        |> scale 5 5 5


lightcycle =
    [ sphere |> translate -2 0 0 |> scale 1 1 0.3
    , sphere |> translate 2 0 0
    , cube |> scale 1.8 1 0.25 |> translate 0 0.5 0
    , cone |> translate 0 -0.5 0 |> rotateZ (pi / 2)
    ]
        |> group
        |> scale 8 8 8
        |> translate 0 -10 0


brick =
    union
        [ (cube |> scale 31.8 9.6 15.8) |> subtract (cube |> scale 29.4 9.6 13.4 |> translate 0 -1 0)
        , (triples [ -12, -4, 4, 12 ] [ -0.5 ] [ 6.7, -6.7 ] ++ triples [ -14.7, 14.7 ] [ -0.5 ] [ 4, -4 ])
            |> List.map (\( x, y, z ) -> cube |> scale 0.6 8.6 0.6 |> translate x y z)
            |> group
        , triples [ -8, 0, 8 ] [ -0.5 ] [ 0 ]
            |> List.map (\( x, y, z ) -> cylinder |> scale 6.51 8.6 6.51 |> subtract (cylinder |> scale 4.8 8.8 4.8) |> translate x y z)
            |> group
        , triples [ -12, -4, 4, 12 ] [ 5.6 ] [ 4, -4 ]
            |> List.map (\( x, y, z ) -> cylinder |> scale 4.8 2 4.8 |> translate x y z)
            |> group
        ]
        |> subtract
            (triples [ -12, -4, 4, 12 ] [ 4.6 ] [ 4, -4 ]
                |> List.map (\( x, y, z ) -> cylinder |> scale 2.6 2 2.6 |> translate x y z)
                |> group
            )
        |> material
            { colour = always { red = 0.3, green = 0.3, blue = 0.32 }
            , ambient = 0.3
            , diffuse = 0.8
            , specular = 0.3
            , shininess = 100
            , reflective = 0.6
            , transparency = 0.8
            , refractiveIndex = 1.5
            , shadow = False
            }


basic =
    sphere |> scale 20 20 20


primitives =
    [ plane
    , cube |> translate -1 0.5 -1
    , sphere |> translate 2 0.5 -3.5
    , cylinder |> translate 1 0.5 0
    , cone |> translate 3 0.5 -1.5
    , triangle |> rotateX (-pi / 4) |> translate -3 1 2
    ]
        |> group
        |> scale 10 10 10


teapot =
    objParse objTeapot
        |> rotateX (-pi / 2)
        |> rotateY (-5 * pi / 16)
        |> scale 1.5 1.5 1.5
        |> translate 0 -12 0
        |> material
            { colour = always { red = 1, green = 1, blue = 0.5 }
            , ambient = 0.3
            , diffuse = 0.8
            , specular = 0.3
            , shininess = 100
            , reflective = 0.1
            , transparency = 0
            , refractiveIndex = 1.5
            , shadow = True
            }


csg =
    let
        mat =
            { colour = always { red = 1, green = 1, blue = 0.5 }
            , ambient = 0.3
            , diffuse = 0.8
            , specular = 0.3
            , shininess = 100
            , reflective = 0
            , transparency = 0
            , refractiveIndex = 1
            , shadow = False
            }
    in
    (cube |> material mat)
        |> subtract
            (sphere
                |> translate 0.4 0.4 -0.4
                |> material { mat | colour = always { red = 0.5, green = 1, blue = 1 } }
            )
        |> scale 30 30 30


infobubble =
    let
        mat =
            { colour = always { red = 0.9, green = 0.7, blue = 0.8 }
            , ambient = 0.2
            , diffuse = 0.6
            , specular = 0
            , shininess = 300
            , reflective = 0
            , transparency = 0
            , refractiveIndex = 1
            , shadow = True
            }

        cylinder =
            primitive (G.Cylinder { ymin = 0, ymax = 1, capped = True })
    in
    { assembly =
        [ plane
            |> translate 0 -0.25 0
            |> material
                { mat
                    | colour = always { red = 1, green = 1, blue = 1 }
                    , ambient = 0.5
                    , diffuse = 1
                    , reflective = 0.4
                }
        , sphere
            |> scale 2 2 2
            |> translate 0 10 10
            |> material
                { mat
                    | colour = always { red = 0.5, green = 0.5, blue = 1 }
                    , ambient = 0
                    , diffuse = 1
                    , reflective = 0.1
                }
        , sphere
            |> scale 8 8 8
            |> translate 0 2.5 0
            |> material
                { mat
                    | colour = always { red = 0.3, green = 0.3, blue = 0.36 }
                    , ambient = 0.4
                    , diffuse = 0.1
                    , reflective = 0.2
                    , transparency = 0.9
                    , refractiveIndex = 1.00025
                    , shadow = False
                }
        , group
            [ sphere |> scale 100 100 100 |> translate 0 500 0
            , cylinder |> scale 10 25 10 |> translate 0 425 0
            , cylinder |> scale 10 400 10 |> rotateZ (pi / 2) |> translate 200 400 0
            , sphere |> scale 120 160 80 |> translate 0 250 0
            , sphere |> scale 120 160 80 |> translate 0 350 0
            , sphere |> scale 60 30 120 |> translate 160 -25 0
            , sphere |> scale 50 50 20 |> translate 200 400 0
            , cylinder |> scale 10 300 10 |> rotateZ (7 * pi / 6) |> translate 0 250 0
            , sphere |> scale 60 30 120 |> translate 160 -25 0 |> scale -1 1 1
            , sphere |> scale 50 50 20 |> translate 200 400 0 |> scale -1 1 1
            , cylinder |> scale 10 300 10 |> rotateZ (7 * pi / 6) |> translate 0 250 0 |> scale -1 1 1
            ]
            |> scale 0.01 0.01 0.01
            |> material mat
        ]
            |> group
    , lights = [ light (point -20 30 -60) ]
    , camera =
        camera
            { viewFrom = point 50 5.5 -60
            , viewTo = point 3 4 0
            , viewUp = vector 0 1 0
            , imageWidth = 160 * 2
            , imageHeight = 160 * 2
            , fieldOfView = pi / 15
            , maxRecursion = 3
            }
    }


hex =
    List.range 0 5
        |> List.map (\i -> (pi / 3) * toFloat i)
        |> List.map
            (\i ->
                [ sphere |> scale 2 2 2
                , primitive (G.Cylinder { ymin = 0, ymax = 4, capped = False })
                ]
                    |> group
                    |> translate 3.5 -2 0
                    |> rotateZ i
            )
        |> group
        |> rotateX (pi / 3)
        |> scale 5 5 5
        |> material
            { colour = always { red = 0.9, green = 0.5, blue = 0.5 }
            , ambient = 0.2
            , diffuse = 0.8
            , specular = 0.8
            , shininess = 300
            , reflective = 0.7
            , transparency = 0.5
            , refractiveIndex = 1.3
            , shadow = False
            }


csghex =
    let
        oldmat =
            { colour = always { red = 0.25, green = 0.1, blue = 0.1 }
            , ambient = 0.6
            , diffuse = 0.9
            , specular = 0.99
            , shininess = 300
            , reflective = 0
            , transparency = 0.999
            , refractiveIndex = 1
            , shadow = False
            }
    in
    List.range 0 5
        |> List.map (\i -> toFloat i * pi / 3)
        |> List.map
            (\i ->
                [ primitive (G.Cylinder { ymin = 0, ymax = 4, capped = True })
                , sphere |> scale 2 2 2
                ]
                    |> union
                    |> translate 3.5 -2 0
                    |> rotateZ i
            )
        |> union
        |> rotateX (pi / 3)
        |> scale 5 5 5
        |> material
            { colour = always { red = 0.9, green = 0.5, blue = 0.5 }
            , ambient = 0.2
            , diffuse = 0.8
            , specular = 0.8
            , shininess = 300
            , reflective = 0.7
            , transparency = 0.5
            , refractiveIndex = 1.3
            , shadow = False
            }



{--------- COVER ---------}


coverAssembly =
    let
        white =
            { colour = always { red = 1, green = 1, blue = 1 }
            , diffuse = 0.7
            , ambient = 0.1
            , specular = 0.0
            , reflective = 0.1
            , shininess = 200
            , transparency = 0
            , refractiveIndex = 1.5
            , shadow = True
            }

        ( blue, red, purple ) =
            ( { white | colour = always { red = 0.537, green = 0.831, blue = 0.914 } }
            , { white | colour = always { red = 0.941, green = 0.322, blue = 0.388 } }
            , { white | colour = always { red = 0.373, green = 0.404, blue = 0.55 } }
            )
    in
    [ plane
        |> rotateX (pi / 2)
        |> translate 0 0 500
        |> material { white | ambient = 1, diffuse = 0, reflective = 0 }
    , sphere
        |> scale 14 14 14
        |> translate 2 34 2
        |> material
            { purple
                | diffuse = 0.2
                , ambient = 0
                , specular = 1
                , reflective = 0.7
                , transparency = 0.7
            }
    , group
        [ cube |> scale 8 8 8 |> translate 15 37 15
        , cube |> scale 8 8 8 |> translate 31 45 47
        , cube |> scale 8 8 8 |> translate 79 41 35
        , cube |> scale 12 12 12 |> translate 17 35 1
        , cube |> scale 12 12 12 |> translate 0 36 33
        , cube |> scale 14 14 14 |> translate 36 18 2
        , cube |> scale 14 14 14 |> translate 2 18 18
        , cube |> scale 14 14 14 |> translate 2 2 18
        , cube |> scale 14 14 14 |> translate 0 0 34
        ]
        |> material white
    , group
        [ cube |> scale 14 14 14 |> translate 36 40 0
        , cube |> scale 14 14 14 |> translate 18 38 32
        , cube |> scale 14 14 14 |> translate 0 14 3
        ]
        |> material blue
    , group
        [ cube |> scale 12 12 12 |> translate 41 43 31
        , cube |> scale 14 14 14 |> translate 18 18 2
        , cube |> scale 14 14 14 |> translate 2 34 18
        ]
        |> material red
    , group
        [ cube |> scale 12 12 12 |> translate 31 37 17
        , cube |> scale 14 14 14 |> translate 0 16 34
        ]
        |> material purple
    ]
        |> group
        |> scale 0.25 0.25 0.25
        |> translate 1.25 -10.25 1.25


cover =
    { assembly = coverAssembly
    , lights =
        [ light (point 50 100 -50)
        , { colour = { red = 0.2, green = 0.2, blue = 0.2 }
          , point = point -400 50 -10
          }
        ]
    , camera =
        camera
            { viewFrom = point -6 6 -10
            , viewTo = point 6 0 6
            , viewUp = vector -0.45 1 0
            , imageWidth = 320
            , imageHeight = 320
            , fieldOfView = pi / 4
            , maxRecursion = 5
            }
    }


objTeapot =
    """
    #
    # object Teapot001
    #

    v  7.0000 0.0000 12.0000
    v  4.9700 -4.9700 12.0000
    v  4.9811 -4.9811 12.4922
    v  7.0156 0.0000 12.4922
    v  5.3250 -5.3250 12.0000
    v  7.5000 0.0000 12.0000
    v  0.0000 -7.0000 12.0000
    v  0.0000 -7.0156 12.4922
    v  0.0000 -7.5000 12.0000
    v  -5.1387 -4.9700 12.0000
    v  -5.0022 -4.9811 12.4922
    v  -5.3250 -5.3250 12.0000
    v  -7.0000 0.0000 12.0000
    v  -7.0156 0.0000 12.4922
    v  -7.5000 0.0000 12.0000
    v  -4.9700 4.9700 12.0000
    v  -4.9811 4.9811 12.4922
    v  -5.3250 5.3250 12.0000
    v  0.0000 7.0000 12.0000
    v  0.0000 7.0156 12.4922
    v  0.0000 7.5000 12.0000
    v  4.9700 4.9700 12.0000
    v  4.9811 4.9811 12.4922
    v  5.3250 5.3250 12.0000
    v  6.5453 -6.5453 8.1094
    v  9.2188 0.0000 8.1094
    v  7.1000 -7.1000 4.5000
    v  10.0000 0.0000 4.5000
    v  0.0000 -9.2188 8.1094
    v  0.0000 -10.0000 4.5000
    v  -6.5453 -6.5453 8.1094
    v  -7.1000 -7.1000 4.5000
    v  -9.2188 0.0000 8.1094
    v  -10.0000 0.0000 4.5000
    v  -6.5453 6.5453 8.1094
    v  -7.1000 7.1000 4.5000
    v  0.0000 9.2188 8.1094
    v  0.0000 10.0000 4.5000
    v  6.5453 6.5453 8.1094
    v  7.1000 7.1000 4.5000
    v  6.2125 -6.2125 1.9219
    v  8.7500 0.0000 1.9219
    v  5.3250 -5.3250 0.7500
    v  7.5000 0.0000 0.7500
    v  0.0000 -8.7500 1.9219
    v  0.0000 -7.5000 0.7500
    v  -6.2125 -6.2125 1.9219
    v  -5.3250 -5.3250 0.7500
    v  -8.7500 0.0000 1.9219
    v  -7.5000 0.0000 0.7500
    v  -6.2125 6.2125 1.9219
    v  -5.3250 5.3250 0.7500
    v  0.0000 8.7500 1.9219
    v  0.0000 7.5000 0.7500
    v  6.2125 6.2125 1.9219
    v  5.3250 5.3250 0.7500
    v  4.5595 -4.5595 0.2344
    v  6.4219 0.0000 0.2344
    v  0.0000 0.0000 0.0000
    v  0.0000 -6.4219 0.2344
    v  -4.5595 -4.5595 0.2344
    v  -6.4219 0.0000 0.2344
    v  -4.5595 4.5595 0.2344
    v  0.0000 6.4219 0.2344
    v  4.5595 4.5595 0.2344
    v  -8.0000 0.0000 10.1250
    v  -7.7500 -1.1250 10.6875
    v  -12.5938 -1.1250 10.4766
    v  -12.0625 0.0000 9.9844
    v  -14.2500 -1.1250 9.0000
    v  -13.5000 0.0000 9.0000
    v  -7.5000 0.0000 11.2500
    v  -13.1250 0.0000 10.9688
    v  -15.0000 0.0000 9.0000
    v  -7.7500 1.1250 10.6875
    v  -12.5938 1.1250 10.4766
    v  -14.2500 1.1250 9.0000
    v  -13.1719 -1.1250 6.2695
    v  -12.6875 0.0000 6.7500
    v  -9.7500 -1.1250 3.7500
    v  -13.6563 0.0000 5.7891
    v  -9.5000 0.0000 3.0000
    v  -13.1719 1.1250 6.2695
    v  -9.7500 1.1250 3.7500
    v  8.5000 0.0000 7.1250
    v  8.5000 -2.4750 5.0625
    v  12.6875 -1.7062 8.1094
    v  11.9375 0.0000 9.0000
    v  15.0000 -0.9375 12.0000
    v  13.5000 0.0000 12.0000
    v  8.5000 0.0000 3.0000
    v  13.4375 0.0000 7.2187
    v  16.5000 0.0000 12.0000
    v  8.5000 2.4750 5.0625
    v  12.6875 1.7062 8.1094
    v  15.0000 0.9375 12.0000
    v  15.6328 -0.7500 12.3340
    v  14.1250 0.0000 12.2813
    v  15.0000 -0.5625 12.0000
    v  14.0000 0.0000 12.0000
    v  17.1406 0.0000 12.3867
    v  16.0000 0.0000 12.0000
    v  15.6328 0.7500 12.3340
    v  15.0000 0.5625 12.0000
    v  1.1552 -1.1552 14.9063
    v  1.6250 0.0000 14.9063
    v  0.0000 0.0000 15.7500
    v  0.7100 -0.7100 13.5000
    v  1.0000 0.0000 13.5000
    v  0.0000 -1.6250 14.9063
    v  0.0000 -1.0000 13.5000
    v  -1.1552 -1.1552 14.9063
    v  -0.7100 -0.7100 13.5000
    v  -1.6250 0.0000 14.9063
    v  -1.0000 0.0000 13.5000
    v  -1.1552 1.1552 14.9063
    v  -0.7100 0.7100 13.5000
    v  0.0000 1.6250 14.9063
    v  0.0000 1.0000 13.5000
    v  1.1552 1.1552 14.9063
    v  0.7100 0.7100 13.5000
    v  2.9288 -2.9288 12.7500
    v  4.1250 0.0000 12.7500
    v  4.6150 -4.6150 12.0000
    v  6.5000 0.0000 12.0000
    v  0.0000 -4.1250 12.7500
    v  0.0000 -6.5000 12.0000
    v  -2.9288 -2.9288 12.7500
    v  -4.6150 -4.6150 12.0000
    v  -4.1250 0.0000 12.7500
    v  -6.5000 0.0000 12.0000
    v  -2.9288 2.9288 12.7500
    v  -4.6150 4.6150 12.0000
    v  0.0000 4.1250 12.7500
    v  0.0000 6.5000 12.0000
    v  2.9288 2.9288 12.7500
    v  4.6150 4.6150 12.0000
    # 137 vertices

    vn -0.9995 -0.0000 0.0317
    vn -0.7067 0.7067 0.0319
    vn -0.0966 0.0966 0.9906
    vn -0.1416 0.0000 0.9899
    vn 0.5936 -0.5936 0.5435
    vn 0.8400 0.0000 0.5425
    vn -0.0010 0.9996 0.0283
    vn -0.0008 0.1421 0.9899
    vn 0.0000 -0.8400 0.5425
    vn 0.7268 0.6636 -0.1773
    vn 0.0816 0.2165 0.9729
    vn -0.5949 -0.5971 0.5381
    vn 0.9994 -0.0148 0.0317
    vn 0.1496 -0.0134 0.9886
    vn -0.8403 0.0004 0.5422
    vn 0.7067 -0.7067 0.0319
    vn 0.0966 -0.0966 0.9906
    vn -0.5936 0.5936 0.5435
    vn 0.0000 -0.9995 0.0317
    vn -0.0000 -0.1416 0.9899
    vn -0.0000 0.8400 0.5425
    vn -0.7067 -0.7067 0.0319
    vn -0.0966 -0.0966 0.9906
    vn 0.5936 0.5936 0.5435
    vn 0.6738 -0.6738 0.3034
    vn 0.9532 -0.0000 0.3025
    vn 0.7028 -0.7028 -0.1107
    vn 0.9939 -0.0000 -0.1105
    vn -0.0000 -0.9532 0.3025
    vn -0.0000 -0.9939 -0.1105
    vn -0.6738 -0.6738 0.3034
    vn -0.7028 -0.7028 -0.1107
    vn -0.9532 0.0000 0.3025
    vn -0.9939 0.0000 -0.1105
    vn -0.6738 0.6738 0.3034
    vn -0.7028 0.7028 -0.1107
    vn 0.0000 0.9532 0.3025
    vn 0.0000 0.9939 -0.1105
    vn 0.6738 0.6738 0.3034
    vn 0.7028 0.7028 -0.1107
    vn 0.5792 -0.5792 -0.5735
    vn 0.8198 0.0000 -0.5726
    vn 0.4157 -0.4157 -0.8089
    vn 0.5888 -0.0000 -0.8083
    vn 0.0000 -0.8198 -0.5726
    vn -0.0000 -0.5888 -0.8083
    vn -0.5792 -0.5792 -0.5735
    vn -0.4157 -0.4157 -0.8089
    vn -0.8198 -0.0000 -0.5726
    vn -0.5888 0.0000 -0.8083
    vn -0.5792 0.5792 -0.5735
    vn -0.4157 0.4157 -0.8089
    vn -0.0000 0.8198 -0.5726
    vn 0.0000 0.5888 -0.8083
    vn 0.5792 0.5792 -0.5735
    vn 0.4157 0.4157 -0.8089
    vn 0.2016 -0.2016 -0.9585
    vn 0.2850 -0.0000 -0.9585
    vn 0.0000 -0.0000 -1.0000
    vn -0.0000 -0.2850 -0.9585
    vn -0.2016 -0.2016 -0.9585
    vn -0.2850 0.0000 -0.9585
    vn -0.2016 0.2016 -0.9585
    vn 0.0000 0.2850 -0.9585
    vn 0.2016 0.2016 -0.9585
    vn 0.0384 0.0031 -0.9993
    vn -0.0182 -0.9619 0.2727
    vn -0.0190 -0.9786 0.2047
    vn 0.2817 0.0145 -0.9594
    vn -0.2938 -0.9475 0.1264
    vn 0.9324 0.0422 -0.3590
    vn -0.0473 -0.0015 0.9989
    vn -0.4420 -0.0127 0.8969
    vn -0.9859 -0.0106 0.1669
    vn -0.0177 0.9631 0.2685
    vn -0.0097 0.9839 0.1786
    vn -0.2735 0.9565 0.1013
    vn -0.1217 -0.9875 -0.0998
    vn 0.8176 0.0138 0.5756
    vn -0.3352 -0.7946 -0.5061
    vn 0.6216 0.0294 0.7828
    vn -0.7747 -0.0079 -0.6322
    vn -0.5711 -0.0076 -0.8208
    vn -0.1055 0.9904 -0.0889
    vn -0.3009 0.8200 -0.4869
    vn -0.4862 0.0074 0.8738
    vn 0.3271 -0.9145 -0.2382
    vn 0.1595 -0.9869 0.0246
    vn -0.6970 -0.0236 0.7167
    vn -0.0062 -0.9245 0.3812
    vn -0.7234 -0.0562 0.6881
    vn 0.6538 0.0025 -0.7567
    vn 0.7677 0.0173 -0.6406
    vn 0.6465 0.0447 -0.7616
    vn 0.3456 0.9087 -0.2343
    vn 0.1845 0.9828 0.0081
    vn 0.0506 0.9476 0.3154
    vn 0.2319 -0.5821 0.7793
    vn 0.0415 -0.0704 0.9967
    vn 0.3158 0.9477 -0.0454
    vn 0.9011 -0.0135 -0.4334
    vn 0.9533 0.0371 0.2997
    vn -0.3219 0.0032 0.9468
    vn 0.3655 0.5783 0.7294
    vn 0.3394 -0.9333 -0.1174
    vn 0.6774 -0.6773 0.2871
    vn 0.9576 -0.0001 0.2882
    vn 0.0000 0.0000 1.0000
    vn 0.5955 -0.5952 0.5396
    vn 0.8436 -0.0002 0.5370
    vn -0.0001 -0.9576 0.2882
    vn -0.0002 -0.8436 0.5370
    vn -0.6773 -0.6774 0.2871
    vn -0.5952 -0.5955 0.5396
    vn -0.9576 0.0001 0.2882
    vn -0.8436 0.0002 0.5370
    vn -0.6774 0.6773 0.2871
    vn -0.5955 0.5952 0.5396
    vn 0.0001 0.9576 0.2882
    vn 0.0002 0.8436 0.5370
    vn 0.6773 0.6774 0.2871
    vn 0.5952 0.5955 0.5396
    vn 0.1942 -0.1942 0.9616
    vn 0.2754 0.0000 0.9613
    vn 0.2121 -0.2121 0.9539
    vn 0.3011 0.0000 0.9536
    vn 0.0000 -0.2754 0.9613
    vn 0.0000 -0.3011 0.9536
    vn -0.1942 -0.1942 0.9616
    vn -0.2121 -0.2121 0.9539
    vn -0.2754 -0.0000 0.9613
    vn -0.3011 -0.0000 0.9536
    vn -0.1942 0.1942 0.9616
    vn -0.2121 0.2121 0.9539
    vn -0.0000 0.2754 0.9613
    vn -0.0000 0.3011 0.9536
    vn 0.1942 0.1942 0.9616
    vn 0.2121 0.2121 0.9539
    # 138 vertex normals

    g Teapot001
    f 1/1/1 2/2/2 3/3/3 4/4/4
    f 4/4/4 3/3/3 5/5/5 6/6/6
    f 2/2/2 7/7/7 8/8/8 3/3/3
    f 3/3/3 8/8/8 9/9/9 5/5/5
    f 7/7/7 10/10/10 11/11/11 8/8/8
    f 8/8/8 11/11/11 12/12/12 9/9/9
    f 10/10/10 13/13/13 14/14/14 11/11/11
    f 11/11/11 14/14/14 15/15/15 12/12/12
    f 13/1/13 16/2/16 17/3/17 14/4/14
    f 14/4/14 17/3/17 18/5/18 15/6/15
    f 16/2/16 19/7/19 20/8/20 17/3/17
    f 17/3/17 20/8/20 21/9/21 18/5/18
    f 19/7/19 22/10/22 23/11/23 20/8/20
    f 20/8/20 23/11/23 24/12/24 21/9/21
    f 22/10/22 1/13/1 4/14/4 23/11/23
    f 23/11/23 4/14/4 6/15/6 24/12/24
    f 6/6/6 5/5/5 25/16/25 26/17/26
    f 26/17/26 25/16/25 27/18/27 28/19/28
    f 5/5/5 9/9/9 29/20/29 25/16/25
    f 25/16/25 29/20/29 30/21/30 27/18/27
    f 9/9/9 12/12/12 31/22/31 29/20/29
    f 29/20/29 31/22/31 32/23/32 30/21/30
    f 12/12/12 15/15/15 33/24/33 31/22/31
    f 31/22/31 33/24/33 34/25/34 32/23/32
    f 15/6/15 18/5/18 35/16/35 33/17/33
    f 33/17/33 35/16/35 36/18/36 34/19/34
    f 18/5/18 21/9/21 37/20/37 35/16/35
    f 35/16/35 37/20/37 38/21/38 36/18/36
    f 21/9/21 24/12/24 39/22/39 37/20/37
    f 37/20/37 39/22/39 40/23/40 38/21/38
    f 24/12/24 6/15/6 26/24/26 39/22/39
    f 39/22/39 26/24/26 28/25/28 40/23/40
    f 28/19/28 27/18/27 41/26/41 42/27/42
    f 42/27/42 41/26/41 43/28/43 44/29/44
    f 27/18/27 30/21/30 45/30/45 41/26/41
    f 41/26/41 45/30/45 46/31/46 43/28/43
    f 30/21/30 32/23/32 47/32/47 45/30/45
    f 45/30/45 47/32/47 48/33/48 46/31/46
    f 32/23/32 34/25/34 49/34/49 47/32/47
    f 47/32/47 49/34/49 50/35/50 48/33/48
    f 34/19/34 36/18/36 51/26/51 49/27/49
    f 49/27/49 51/26/51 52/28/52 50/29/50
    f 36/18/36 38/21/38 53/30/53 51/26/51
    f 51/26/51 53/30/53 54/31/54 52/28/52
    f 38/21/38 40/23/40 55/32/55 53/30/53
    f 53/30/53 55/32/55 56/33/56 54/31/54
    f 40/23/40 28/25/28 42/34/42 55/32/55
    f 55/32/55 42/34/42 44/35/44 56/33/56
    f 44/29/44 43/28/43 57/36/57 58/37/58
    f 58/37/58 57/36/57 59/38/59
    f 43/28/43 46/31/46 60/39/60 57/36/57
    f 57/36/57 60/39/60 59/40/59
    f 46/31/46 48/33/48 61/41/61 60/39/60
    f 60/39/60 61/41/61 59/42/59
    f 48/33/48 50/35/50 62/43/62 61/41/61
    f 61/41/61 62/43/62 59/44/59
    f 50/29/50 52/28/52 63/36/63 62/37/62
    f 62/37/62 63/36/63 59/38/59
    f 52/28/52 54/31/54 64/39/64 63/36/63
    f 63/36/63 64/39/64 59/40/59
    f 54/31/54 56/33/56 65/41/65 64/39/64
    f 64/39/64 65/41/65 59/42/59
    f 56/33/56 44/35/44 58/43/58 65/41/65
    f 65/41/65 58/43/58 59/44/59
    f 66/21/66 67/45/67 68/46/68 69/47/69
    f 69/47/69 68/46/68 70/48/70 71/49/71
    f 67/45/67 72/23/72 73/50/73 68/46/68
    f 68/46/68 73/50/73 74/51/74 70/48/70
    f 72/23/72 75/52/75 76/53/76 73/50/73
    f 73/50/73 76/53/76 77/54/77 74/51/74
    f 75/52/75 66/25/66 69/55/69 76/53/76
    f 76/53/76 69/55/69 71/56/71 77/54/77
    f 71/49/71 70/48/70 78/57/78 79/58/79
    f 79/58/79 78/57/78 80/59/80 34/40/81
    f 70/48/70 74/51/74 81/60/82 78/57/78
    f 78/57/78 81/60/82 82/42/83 80/59/80
    f 74/51/74 77/54/77 83/61/84 81/60/82
    f 81/60/82 83/61/84 84/62/85 82/42/83
    f 77/54/77 71/56/71 79/63/79 83/61/84
    f 83/61/84 79/63/79 34/44/81 84/62/85
    f 85/42/86 86/59/87 87/64/88 88/65/89
    f 88/65/89 87/64/88 89/66/90 90/67/91
    f 86/59/87 91/40/92 92/68/93 87/64/88
    f 87/64/88 92/68/93 93/69/94 89/66/90
    f 91/44/92 94/62/95 95/70/96 92/71/93
    f 92/71/93 95/70/96 96/72/97 93/73/94
    f 94/62/95 85/42/86 88/65/89 95/70/96
    f 95/70/96 88/65/89 90/67/91 96/72/97
    f 90/67/91 89/66/90 97/74/98 98/75/99
    f 98/75/99 97/74/98 99/45/100 100/23/101
    f 89/66/90 93/69/94 101/76/102 97/74/98
    f 97/74/98 101/76/102 102/21/103 99/45/100
    f 93/73/94 96/72/97 103/77/104 101/78/102
    f 101/78/102 103/77/104 104/52/105 102/25/103
    f 96/72/97 90/67/91 98/75/99 103/77/104
    f 103/77/104 98/75/99 100/23/101 104/52/105
    f 105/48/106 106/49/107 107/21/108
    f 106/49/107 105/48/106 108/59/109 109/40/110
    f 110/51/111 105/48/106 107/45/108
    f 105/48/106 110/51/111 111/42/112 108/59/109
    f 112/54/113 110/51/111 107/23/108
    f 110/51/111 112/54/113 113/62/114 111/42/112
    f 114/56/115 112/54/113 107/52/108
    f 112/54/113 114/56/115 115/44/116 113/62/114
    f 116/48/117 114/49/115 107/21/108
    f 114/49/115 116/48/117 117/59/118 115/40/116
    f 118/51/119 116/48/117 107/45/108
    f 116/48/117 118/51/119 119/42/120 117/59/118
    f 120/54/121 118/51/119 107/23/108
    f 118/51/119 120/54/121 121/62/122 119/42/120
    f 106/56/107 120/54/121 107/52/108
    f 120/54/121 106/56/107 109/44/110 121/62/122
    f 109/21/110 108/45/109 122/48/123 123/49/124
    f 123/49/124 122/48/123 124/59/125 125/40/126
    f 108/45/109 111/23/112 126/51/127 122/48/123
    f 122/48/123 126/51/127 127/42/128 124/59/125
    f 111/23/112 113/52/114 128/54/129 126/51/127
    f 126/51/127 128/54/129 129/62/130 127/42/128
    f 113/52/114 115/25/116 130/56/131 128/54/129
    f 128/54/129 130/56/131 131/44/132 129/62/130
    f 115/21/116 117/45/118 132/48/133 130/49/131
    f 130/49/131 132/48/133 133/59/134 131/40/132
    f 117/45/118 119/23/120 134/51/135 132/48/133
    f 132/48/133 134/51/135 135/42/136 133/59/134
    f 119/23/120 121/52/122 136/54/137 134/51/135
    f 134/51/135 136/54/137 137/62/138 135/42/136
    f 121/52/122 109/25/110 123/56/124 136/54/137
    f 136/54/137 123/56/124 125/44/126 137/62/138
    # 112 polygons - 16 triangles
    """
