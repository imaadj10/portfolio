import * as THREE from 'three'
import { ThreeElements } from '@react-three/fiber'

type StellarObjectProps = {
  color: string,
  isStar?: boolean;
} & ThreeElements['mesh'];

function StellarObjectGeometry(props: StellarObjectProps) {
  const { color, isStar, ...meshProps } = props;
  return (
    <mesh
      {...meshProps}
      >
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial roughness={0.5} color={color} />
    </mesh>
  )
}

export default StellarObjectGeometry;