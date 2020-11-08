module Geometry
    exposing
    -- todo make these types opaque
    -- todo are there any private functions
    ( BoundingBox(..)
    , Matrix(..)
    , Point(..)
    , Ray(..)
    , Shape
    , ShapeConfig(..)
    , Vector(..)
    , aabbAll
    , aabbIntersectBoundingBox
    , aabbIntersectRay
    , aabbNone
    , aabbTransform
    , aabbUnionBoundingBox
    , aabbUnionPoint
    , matInvert
    , matListProduct
    , matNewIdentity
    , matNewRotateX
    , matNewRotateY
    , matNewRotateZ
    , matNewScale
    , matNewShear
    , matNewTranslate
    , matProduct
    , matTranspose
    , pairs
    , pntAlongRay
    , pntNewPoint
    , pntTransform
    , rayNewRay
    , rayTransform
    , shpNewShape
    , triples
    , vecBetweenPoints
    , vecCross
    , vecDot
    , vecLength
    , vecNewUnit
    , vecNewVector
    , vecReflect
    , vecScaleBy
    , vecSubtract
    , vecTransform
    , vecUnit
    )


type Point
    = Point Float Float Float


type Vector
    = Vector Float Float Float


type Ray
    = Ray Point Vector


type Matrix
    = Matrix Float Float Float Float Float Float Float Float Float Float Float Float Float Float Float Float


type BoundingBox
    = Aabb Point Point



{- Helpers -}


pairs xs ys =
    List.concatMap (\fn -> List.map fn ys) (List.map Tuple.pair xs)


triples xs ys zs =
    List.concatMap (\( x, y ) -> List.map (\z -> ( x, y, z )) zs) (pairs xs ys)



{-
   Shapes have two functions:
     intersectRay : Ray -> List Float
     normalAt : Point -> Vector

   Some shapes require configuration, but mostly they are configured at a
   higher level by transforms and materials.

   intersectRay takes a ray in object/model space and calculates a list of
   t values where the ray intersects the shape. Recall that a ray is
   essentially a parametric function pntAlongRay : Ray -> Float -> Point

   normalAt calculates the unit normal at a given point
-}


type ShapeConfig
    = Plane
    | Sphere
    | Cube
    | Cylinder { ymin : Float, ymax : Float, capped : Bool }
    | Cone { ymin : Float, ymax : Float, capped : Bool }
    | Triangle { a : Point, b : Point, c : Point }
    | SmoothTriangle { a : Point, b : Point, c : Point, na : Vector, nb : Vector, nc : Vector }


type alias Shape =
    { config : ShapeConfig
    , normalAt : Point -> Vector
    , intersectRay : Ray -> List Float
    , aabb : BoundingBox
    }


shpNewShape shapeConfig =
    let
        newObject normalFn intersectFn aabb =
            { config = shapeConfig
            , normalAt = normalFn
            , intersectRay = intersectFn
            , aabb = aabb
            }
    in
    case shapeConfig of
        Sphere ->
            newObject
                vectorSphereNormalAt
                intersectSphere
                (Aabb (Point -1 -1 -1) (Point 1 1 1))

        Plane ->
            newObject
                vectorPlaneNormalAt
                intersectPlane
                (Aabb (Point (-1 / 0) 0 (-1 / 0)) (Point (1 / 0) 0 (1 / 0)))

        Cube ->
            newObject
                vectorCubeNormalAt
                intersectCube
                (Aabb (Point -1 -1 -1) (Point 1 1 1))

        Cylinder config ->
            newObject
                (vectorCylinderNormalAt config)
                (intersectCylinder config)
                (Aabb (Point -1 config.ymin -1) (Point 1 config.ymax 1))

        Cone config ->
            let
                bound =
                    max (abs config.ymin) (abs config.ymax)
            in
            newObject
                (vectorConeNormalAt config)
                (intersectCone config)
                (Aabb (Point -bound config.ymin -bound) (Point bound config.ymax bound))

        Triangle config ->
            newObject
                (vectorTriangleNormalAt config)
                (intersectTriangle config)
                (aabbNone |> aabbUnionPoint config.a |> aabbUnionPoint config.b |> aabbUnionPoint config.c)

        SmoothTriangle config ->
            newObject
                (vectorSmoothTriangleNormalAt config)
                (intersectTriangle config)
                (aabbNone |> aabbUnionPoint config.a |> aabbUnionPoint config.b |> aabbUnionPoint config.c)



{- Plane -}


vectorPlaneNormalAt _ =
    Vector 0 1 0


intersectPlane (Ray (Point _ y _) (Vector _ dy _)) =
    [ -y / dy ]



{- Sphere -}


vectorSphereNormalAt (Point x y z) =
    Vector x y z


intersectSphere (Ray rpoint vector) =
    let
        s =
            vecBetweenPoints (Point 0 0 0) rpoint

        ( a, b, c ) =
            ( vecDot vector vector
            , 2 * vecDot vector s
            , vecDot s s - 1
            )

        ( r1, r2 ) =
            quadraticRoots a b c
    in
    [ min r1 r2, max r1 r2 ]



{- Cube -}


vectorCubeNormalAt (Point x y z) =
    if abs y < abs x && abs z < abs x then
        Vector 1 0 0

    else if abs z < abs y then
        Vector 0 1 0

    else
        Vector 0 0 1


intersectCube (Ray (Point x y z) (Vector dx dy dz)) =
    let
        intersect v dv =
            if 0 <= dv then
                ( -(v + 1) / dv, -(v - 1) / dv )

            else
                ( -(v - 1) / dv, -(v + 1) / dv )

        pick ( a, b ) ( c, d ) =
            ( max a c, min b d )

        ( tmin, tmax ) =
            intersect x dx
                |> pick (intersect y dy)
                |> pick (intersect z dz)
    in
    if tmin <= tmax then
        [ tmin, tmax ]

    else
        []



{- Cylinder -}


vectorCylinderNormalAt config (Point x y z) =
    -- todo: simplify?
    let
        epsilon =
            1.0e-6

        distanceSq =
            -- sqrt not needed for this purpose: d < 1 same as d^2 < 1^2 same as d^2 < 1
            ((x * x) + (z * z)) < 1
    in
    if distanceSq && (config.ymax - epsilon) <= y then
        Vector 0 1 0

    else if distanceSq && y <= (config.ymin + epsilon) then
        Vector 0 -1 0

    else
        Vector x 0 z


quadraticRoots a b c =
    let
        d =
            sqrt ((b * b) - (4 * a * c))
    in
    if 0 < b then
        ( (2 * c) / (-b - d), (-b - d) / (2 * a) )

    else
        ( (-b + d) / (2 * a), (2 * c) / (-b + d) )


intersectCylinder config ((Ray (Point x y z) (Vector dx dy dz)) as ray) =
    let
        ( tmin, tmax ) =
            let
                ( a, b, c ) =
                    -- todo: relate back to sphere (y==0)
                    ( (dx * dx) + (dz * dz)
                    , (2 * x * dx) + (2 * z * dz)
                    , (x * x) + (z * z) - 1
                    )

                ( r1, r2 ) =
                    quadraticRoots a b c
            in
            ( min r1 r2, max r1 r2 )

        ( side0, side1 ) =
            let
                intersect t =
                    let
                        (Point _ iy _) =
                            pntAlongRay ray t
                    in
                    if config.ymin < iy && iy < config.ymax then
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
                            (yend - y) / dy

                        distanceSq =
                            let
                                (Point ix _ iz) =
                                    pntAlongRay ray t
                            in
                            ((ix * ix) + (iz * iz)) <= 1
                    in
                    if distanceSq then
                        [ t ]

                    else
                        []
            in
            ( intersect config.ymin, intersect config.ymax )
    in
    List.concat
        (if config.capped then
            [ side0, side1, cap0, cap1 ]

         else
            [ side0, side1 ]
        )



{- Cone -}


vectorConeNormalAt config (Point x y z) =
    let
        distanceSq =
            (x * x) + (z * z) <= (y * y)

        sgn n =
            if 0 <= n then
                1

            else
                -1
    in
    if distanceSq && config.ymax <= y then
        Vector 0 1 0

    else if distanceSq && y <= config.ymin then
        Vector 0 -1 0

    else
        Vector x (sgn -y * sqrt (x * x + z * z)) z


intersectCone config ((Ray (Point x y z) (Vector dx dy dz)) as ray) =
    let
        sides =
            let
                ts =
                    let
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
                        (Point _ iy _) =
                            pntAlongRay ray t
                    in
                    if config.ymin < iy && iy < config.ymax then
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
                            (yend - y) / dy

                        distanceSq =
                            let
                                (Point ix iy iz) =
                                    pntAlongRay ray t
                            in
                            (ix * ix) + (iz * iz) <= (iy * iy)
                    in
                    if distanceSq then
                        [ t ]

                    else
                        []
            in
            ( intersect config.ymin, intersect config.ymax )
    in
    List.concat
        (if config.capped then
            [ sides, cap0, cap1 ]

         else
            [ sides ]
        )



{- Triangle -}


intersectTriangle config (Ray rpoint vector) =
    let
        scalarTripleProduct v1 v2 v3 =
            vecDot (vecCross v1 v2) v3

        ( e1, e2, e3 ) =
            ( vecBetweenPoints config.a config.b
            , vecBetweenPoints config.a config.c
            , vecBetweenPoints config.a rpoint
            )

        determinant =
            scalarTripleProduct vector e2 e1

        ( t, u, v ) =
            ( scalarTripleProduct e3 e1 e2 / determinant
            , scalarTripleProduct vector e2 e3 / determinant
            , scalarTripleProduct e3 e1 vector / determinant
            )
    in
    if 0 <= u && u <= 1 && 0 <= v && v <= (1 - u) then
        [ t ]

    else
        []


vectorTriangleNormalAt config _ =
    let
        e1 =
            vecBetweenPoints config.a config.b

        e2 =
            vecBetweenPoints config.a config.c
    in
    vecCross e2 e1


vectorSmoothTriangleNormalAt config rpoint =
    -- todo is this the best config structure?
    let
        ( e1, e2, e3 ) =
            ( vecBetweenPoints config.a config.b
            , vecBetweenPoints config.a config.c
            , vecBetweenPoints config.a rpoint
            )

        area =
            vecLength (vecCross e1 e2)

        ( u, v ) =
            ( vecLength (vecCross e2 e3) / area
            , vecLength (vecCross e1 e3) / area
            )
    in
    vecScaleBy u config.nb
        |> vecSubtract (vecScaleBy -v config.nc)
        |> vecSubtract (vecScaleBy (1 - u - v) config.na)



{- Vectors, Transforms, Points, and Rays ------------------------------------- -}
{- Transforms are most intuitively calculated as follows:
     transform = translation * rotation * scaling
   Read right to left, first scale the object, then rotate it, and finally,
   move it into position.
   identity |> mul scale |> mul rotate |> mul translate
-}
{- Matrix -}


matNewIdentity : Matrix
matNewIdentity =
    Matrix 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 1


matNewTranslate x y z =
    Matrix 1 0 0 x 0 1 0 y 0 0 1 z 0 0 0 1


matNewScale sx sy sz =
    Matrix sx 0 0 0 0 sy 0 0 0 0 sz 0 0 0 0 1


matNewRotateX radians =
    Matrix 1 0 0 0 0 (cos radians) -(sin radians) 0 0 (sin radians) (cos radians) 0 0 0 0 1


matNewRotateY radians =
    Matrix (cos radians) 0 (sin radians) 0 0 1 0 0 -(sin radians) 0 (cos radians) 0 0 0 0 1


matNewRotateZ radians =
    Matrix (cos radians) -(sin radians) 0 0 (sin radians) (cos radians) 0 0 0 0 1 0 0 0 0 1


matNewShear xy xz yx yz zx zy =
    Matrix 1 xy xz 0 yx 1 yz 0 zx zy 1 0 0 0 0 1


matInvert : Matrix -> Matrix
matInvert (Matrix j11 j12 j13 j14 j21 j22 j23 j24 j31 j32 j33 j34 j41 j42 j43 j44) =
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
    Matrix
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


matTranspose : Matrix -> Matrix
matTranspose (Matrix j11 j12 j13 j14 j21 j22 j23 j24 j31 j32 j33 j34 j41 j42 j43 j44) =
    Matrix j11 j21 j31 j41 j12 j22 j32 j42 j13 j23 j33 j43 j14 j24 j34 j44


matListProduct : List Matrix -> Matrix
matListProduct =
    List.foldr matProduct matNewIdentity


matProduct : Matrix -> Matrix -> Matrix
matProduct (Matrix a11 a12 a13 a14 a21 a22 a23 a24 a31 a32 a33 a34 a41 a42 a43 a44) (Matrix b11 b12 b13 b14 b21 b22 b23 b24 b31 b32 b33 b34 b41 b42 b43 b44) =
    {- 64 multiplies and 48 additions
       Some identities:
          C * (B * (A * object)) == (C * B * A) * object =/= (A * B * C) * object
          (inv A)(inv B) == inv (BA)
    -}
    Matrix
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



{- Vector -}


vecNewVector dx dy dz =
    Vector dx dy dz


vecNewUnit dx dy dz =
    vecUnit (Vector dx dy dz)


vecBetweenPoints : Point -> Point -> Vector
vecBetweenPoints (Point x0 y0 z0) (Point x1 y1 z1) =
    Vector (x1 - x0) (y1 - y0) (z1 - z0)


vecCross : Vector -> Vector -> Vector
vecCross (Vector dx0 dy0 dz0) (Vector dx1 dy1 dz1) =
    {- left-hand rule: +X cross +Y points into the screen
       also note, (cross a b) == neg (cross b a), i.e. not commutative
    -}
    Vector (dy0 * dz1 - dz0 * dy1) (dz0 * dx1 - dx0 * dz1) (dx0 * dy1 - dy0 * dx1)


vecLength : Vector -> Float
vecLength v =
    sqrt (vecDot v v)


vecUnit : Vector -> Vector
vecUnit vector =
    vecScaleBy (1 / vecLength vector) vector


vecReflect : Vector -> Vector -> Vector
vecReflect normal inbound =
    normal
        |> vecScaleBy (2 * vecDot inbound normal)
        |> vecSubtract inbound


vecDot : Vector -> Vector -> Float
vecDot (Vector dx0 dy0 dz0) (Vector dx1 dy1 dz1) =
    {- Some interesting applications:
       dot a a == (mag a) * (mag a)
       if a and b are unit vectors then dot a b == cos angle
       if a is a unit vector then dot a b == the component of b in the a direction
       obviously, dot a b == dot b a
    -}
    (dx0 * dx1) + (dy0 * dy1) + (dz0 * dz1)


vecScaleBy : Float -> Vector -> Vector
vecScaleBy s (Vector dx dy dz) =
    Vector (s * dx) (s * dy) (s * dz)


vecSubtract : Vector -> Vector -> Vector
vecSubtract (Vector dx0 dy0 dz0) (Vector dx1 dy1 dz1) =
    Vector (dx0 - dx1) (dy0 - dy1) (dz0 - dz1)


vecTransform : Matrix -> Vector -> Vector
vecTransform (Matrix j11 j12 j13 _ j21 j22 j23 _ j31 j32 j33 _ _ _ _ _) (Vector dx dy dz) =
    Vector
        ((j13 * dz) + (j12 * dy) + (j11 * dx))
        ((j23 * dz) + (j22 * dy) + (j21 * dx))
        ((j33 * dz) + (j32 * dy) + (j31 * dx))



{- Point -}


pntNewPoint x y z =
    Point x y z


pntTransform : Matrix -> Point -> Point
pntTransform (Matrix j11 j12 j13 j14 j21 j22 j23 j24 j31 j32 j33 j34 _ _ _ _) (Point x y z) =
    Point
        (j14 + (j13 * z) + (j12 * y) + (j11 * x))
        (j24 + (j23 * z) + (j22 * y) + (j21 * x))
        (j34 + (j33 * z) + (j32 * y) + (j31 * x))


pntAlongRay : Ray -> Float -> Point
pntAlongRay (Ray (Point x y z) (Vector dx dy dz)) t =
    -- todo Instead of constructing a ray data object, could we just...
    -- construct this function? Would it matter? Would it be harder or
    -- easier to use? Ans: no need, can construct it from this function,
    -- but maybe this function needs a better name, eg rayOfT = pntAlongRay ray
    -- pntAlongRay ray 0 == ray.point
    -- vectc
    Point (x + (t * dx)) (y + (t * dy)) (z + (t * dz))



{- Ray -}


rayNewRay rpoint vector =
    Ray rpoint vector


rayTransform transform (Ray rpoint vector) =
    Ray (pntTransform transform rpoint) (vecTransform transform vector)



{- Axis Aligned Bounding Box (AABB) -}


aabbNone =
    Aabb (Point (1 / 0) (1 / 0) (1 / 0)) (Point (-1 / 0) (-1 / 0) (-1 / 0))


aabbAll =
    Aabb (Point (-1 / 0) (-1 / 0) (-1 / 0)) (Point (1 / 0) (1 / 0) (1 / 0))


aabbUnionPoint (Point x y z) (Aabb (Point x0 y0 z0) (Point x1 y1 z1)) =
    Aabb
        (Point (min x0 x) (min y0 y) (min z0 z))
        (Point (max x1 x) (max y1 y) (max z1 z))


aabbUnionBoundingBox (Aabb (Point x0 y0 z0) (Point x1 y1 z1)) (Aabb (Point x2 y2 z2) (Point x3 y3 z3)) =
    Aabb
        (Point (min x0 x2) (min y0 y2) (min z0 z2))
        (Point (max x1 x3) (max y1 y3) (max z1 z3))


aabbIntersectBoundingBox : BoundingBox -> BoundingBox -> BoundingBox
aabbIntersectBoundingBox (Aabb (Point x0 y0 z0) (Point x1 y1 z1)) (Aabb (Point x2 y2 z2) (Point x3 y3 z3)) =
    let
        bound amin amax bmin bmax =
            if bmin < amin then
                bound bmin bmax amin amax

            else if amax < bmin then
                ( 1 / 0, -1 / 0 )

            else if amax <= bmax then
                ( bmin, amax )

            else
                ( bmin, bmax )

        ( xmin, xmax ) =
            bound x0 x1 x2 x3

        ( ymin, ymax ) =
            bound y0 y1 y2 y3

        ( zmin, zmax ) =
            bound z0 z1 z2 z3
    in
    if List.member (1 / 0) [ xmin, ymin, zmin ] || List.member (-1 / 0) [ xmax, ymax, zmax ] then
        aabbNone

    else
        Aabb (Point xmin ymin zmin) (Point xmax ymax zmax)


aabbIntersectRay (Aabb (Point x0 y0 z0) (Point x1 y1 z1)) (Ray (Point x y z) (Vector dx dy dz)) =
    let
        intersect v dv v0 v1 =
            if 0 <= dv then
                ( (v0 - v) / dv, (v1 - v) / dv )

            else
                ( (v1 - v) / dv, (v0 - v) / dv )

        pick ( a, b ) ( c, d ) =
            ( max a c, min b d )

        ( tmin, tmax ) =
            intersect x dx x0 x1
                |> pick (intersect y dy y0 y1)
                |> pick (intersect z dz z0 z1)
    in
    tmin <= tmax


aabbTransform transform (Aabb (Point x1 y1 z1) (Point x2 y2 z2)) =
    let
        corners =
            triples [ x1, x2 ] [ y1, y2 ] [ z1, z2 ]

        newCorners =
            List.map (\( x, y, z ) -> pntTransform transform (pntNewPoint x y z)) corners
    in
    List.foldl aabbUnionPoint aabbNone newCorners
