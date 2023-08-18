import * as THREE from 'three'
import { useRef, useState } from 'react'
import { useFrame, ThreeElements } from '@react-three/fiber'

function Box(props: ThreeElements['mesh']) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame((state, delta) => (meshRef.current.rotation.x += delta))
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}>
      <sphereGeometry args={[3, 64, 64]} />
      <meshStandardMaterial roughness={0.2} color={hovered ? 'blue' : 'orange'} />
    </mesh>
  )
}

export default Box;