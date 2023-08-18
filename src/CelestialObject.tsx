import * as THREE from 'three'
import { useRef } from 'react'
import { ThreeElements } from '@react-three/fiber'

type CelestialObjectProps = {
  color: string,
  isStar?: boolean;
} & ThreeElements['mesh'];

function CelestialObject(props: CelestialObjectProps) {
  const { color, isStar, ...meshProps } = props;
  const meshRef = useRef<THREE.Mesh>(null!)
  return (
    <mesh
      {...meshProps}
      ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial roughness={0.5} color={color} />
    </mesh>
  )
}

export default CelestialObject;