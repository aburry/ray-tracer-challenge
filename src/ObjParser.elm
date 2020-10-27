module ObjParser exposing
    ( ObjLine(..)
    , parse
    )

import Parser exposing (..)


type ObjLine
    = Vertex (List Float)
    | VertexNormal (List Float)
    | Face (List (List (Maybe Int)))
    | Empty


parse =
    run parseObj


parseObj =
    let
        junk =
            oneOf
                [ chompIf ((==) ' ') |. chompWhile ((==) ' ')
                , token "\n"
                , chompUntilEndOr "\n"
                ]

        lines =
            loop []
                (\lst ->
                    oneOf
                        [ map (always (Done (List.reverse lst))) end
                        , map (\v -> Loop (v :: lst)) (parseFloats Vertex "v")
                        , map (\v -> Loop (v :: lst)) (parseFloats VertexNormal "vn")
                        , map (\v -> Loop (v :: lst)) (parseFace Face "f")
                        , map (always (Loop lst)) junk
                        ]
                )
    in
    lines


parseFloats ctor tag =
    let
        negfloat =
            oneOf
                [ succeed negate |. symbol "-" |= float
                , float
                ]

        floats =
            loop []
                (\lst ->
                    oneOf
                        [ map (always (Loop lst)) (chompIf ((==) ' ') |. chompWhile ((==) ' '))
                        , map (\v -> Loop (v :: lst)) negfloat
                        , map (always (Done (List.reverse lst))) (succeed ())
                        ]
                )
    in
    succeed ctor
        |. keyword tag
        |= floats


parseFace ctor tag =
    let
        vertices =
            loop []
                (\lst ->
                    oneOf
                        [ map (\v -> Loop (Just v :: lst)) int
                        , map (always (Loop (Nothing :: lst))) (token "//")
                        , map (always (Loop lst)) (token "/")
                        , map (always (Done (List.reverse lst))) (succeed ())
                        ]
                )

        faces =
            loop []
                (\lst ->
                    oneOf
                        [ map (always (Loop lst)) (chompIf ((==) ' ') |. chompWhile ((==) ' '))
                        , map (always (Done (List.reverse lst))) (oneOf [ end, token "\n" ])
                        , map (\v -> Loop (v :: lst)) vertices
                        ]
                )
    in
    succeed ctor
        |. keyword tag
        |. spaces
        |= faces
