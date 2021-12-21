import React, { Suspense, useRef, useState } from 'react'
import { Canvas, extend, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Effects, Loader, useTexture } from '@react-three/drei'
import { LUTPass } from 'three/examples/jsm/postprocessing/LUTPass'
import { LUTCubeLoader } from 'three/examples/jsm/loaders/LUTCubeLoader'

extend({ LUTPass })

function Grading() {
  const { texture3D } = useLoader(LUTCubeLoader, '/cubicle-99.CUBE')
  return <Effects children={<lUTPass attachArray="passes" lut={texture3D} />} />
}

function Sphere(props) {
  const texture = useTexture('/terrazo.png')
  const [hovered, hover] = useState(false)
  const ref = useRef(null)
  useFrame((state, delta) => ref.current && (ref.current.rotation.x += 0.01))

  return (
    <mesh 
    {...props} 
    ref={ref}
    onPointerOver={(event) => hover(true)}
    onPointerOut={(event) => hover(false)}
    >
      <sphereBufferGeometry args={[1, 64, 64]} />
      <meshPhysicalMaterial envMapIntensity={hovered ? 20 : 0.6} map={texture} clearcoat={0.8} clearcoatRoughness={0} roughness={2} metalness={1} />
    </mesh>
  )
}

export default function Spheres() {
  return (
    <>
    {/* @ts-ignore  */}
      <Canvas frameloop="demand" dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
        <spotLight intensity={4} angle={0.2} penumbra={1} position={[5, 15, 10]} />
        <Suspense fallback={null}>
          <Sphere />
          <Grading />
          <Environment preset="warehouse" />
        </Suspense>
        <OrbitControls />
      </Canvas>
      <Loader />
    </>
  )
}