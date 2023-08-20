// @ts-nocheck
import { useContext, useRef, useState } from 'react';
import * as THREE from 'three';
import { ThreeElements, useFrame, useThree } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitContext } from './SolarSystem';

type StellarObjectProps = {
  isStar?: boolean;
  isMoon?: boolean;
  model: string;
  scale?: number;
} & ThreeElements['mesh'];

function StellarObjectGeometry(props: StellarObjectProps) {
  const { isStar, isMoon, model, scale, ...meshProps } = props;
  const initialPosition: number[] = meshProps.position as number[];
  const meshRef = useRef<THREE.Mesh>(null!);
  const gltf = useLoader(GLTFLoader, model);
  const { gl, camera } = useThree();
  const { moving, setMoving } = useContext(OrbitContext);

  useFrame((_state, delta) => {
    const mesh = meshRef.current;
    mesh.rotation.y -= 0.004;

    if (!moving) return;

    if (mesh && !isStar) {
      const time = performance.now() * 0.001;
      const planetRadius = initialPosition[0];
      const planetSpeed = 1 / Math.sqrt(planetRadius);

      const planetX = Math.cos(time * planetSpeed) * planetRadius;
      const planetZ = Math.sin(time * planetSpeed) * planetRadius;

      if (isMoon) {
        const moonRadius = initialPosition[1] * 1.2;
        const moonSpeed = (planetSpeed * 7) / Math.sqrt(moonRadius);

        const moonY = Math.cos(time * moonSpeed) * moonRadius;
        const moonZ = Math.sin(time * moonSpeed) * moonRadius + planetZ;

        mesh.position.set(planetX, moonY, moonZ);
      } else {
        mesh.position.set(planetX, initialPosition[1], planetZ);
      }
    }
  });

  const handleClick = () => {
    if (!isStar) {
      setMoving(false);
    }
    // camera.position.x = initialPosition[0];
    // camera.position.y = initialPosition[1];
    // camera.position.z = initialPosition[2];
  };

  return (
    <>
      <mesh ref={meshRef} {...meshProps} onClick={handleClick}>
        <meshStandardMaterial color="black" />
        <primitive
          scale={scale ? scale : 1}
          object={gltf.scene}
          children-0-castShadow
        />
      </mesh>
      {isStar && (
        <pointLight position={[0, 0, 0]} intensity={500} color="#edd59e" />
      )}
      {!isMoon && <OrbitLine onClick={handleClick} radius={initialPosition[0]} />}
    </>
  );
}

function OrbitLine({ radius = 1 }) {
  const [lineWidth, setLineWidth] = useState(0.5);
  const points = [];
  for (let index = 0; index < 64; index++) {
    const angle = (index / 64) * 2 * Math.PI;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    points.push(new THREE.Vector3(x, 0, z));
  }
  points.push(points[0]);

  return (
    <Line
      points={points}
      color={'gray'}
      onPointerOver={(e) => setLineWidth(4)}
      onPointerOut={(e) => setLineWidth(0.5)}
      lineWidth={lineWidth}
    />
  );
}

export default StellarObjectGeometry;
