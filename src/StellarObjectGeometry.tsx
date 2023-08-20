// @ts-nocheck
import { useContext, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { ThreeElements, useFrame, useThree } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitContext, PositionContext } from './SolarSystem';

type StellarObjectProps = {
  isStar?: boolean;
  isMoon?: boolean;
  model: string;
  scale?: number;
} & ThreeElements['mesh'];

const dummy = new THREE.Vector3()
const lookAtPos = new THREE.Vector3()

function StellarObjectGeometry(props: StellarObjectProps) {
  const { isStar, isMoon, model, scale, ...meshProps } = props;
  const initialPosition: number[] = meshProps.position as number[];
  const meshRef = useRef<THREE.Mesh>(null!);
  const gltf = useLoader(GLTFLoader, model);
  const { gl, camera } = useThree();
  const { moving, setMoving } = useContext(OrbitContext);
  const { position, setPosition } = useContext(PositionContext);

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
      setPosition(initialPosition);
    }
  };

  useFrame((state, delta) => {
    if(!moving) {
      const step = 0.1
      state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, 42, step)
      state.camera.position.lerp(dummy.set(position[0], position[1], position[2]), step)

      lookAtPos.x = Math.sin(state.clock.getElapsedTime() * 2)

      state.camera.lookAt(lookAtPos)
      state.camera.updateProjectionMatrix()
    }
  })

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
      {!isMoon && (
        <OrbitLine handleClick={handleClick} radius={initialPosition[0]} />
      )}
    </>
  );
}

function OrbitLine({ radius = 1, handleClick }) {
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
    <group>
      <Line
        points={points}
        color={'gray'}
        onPointerUp={handleClick}
        lineWidth={lineWidth}
      />
      <Line
        points={points}
        color={'gray'}
        onPointerOver={(e) => setLineWidth(2)}
        onPointerOut={(e) => setLineWidth(0.5)}
        onPointerUp={handleClick}
        visible={false}
        lineWidth={16}
      />
    </group>
  );
}

export default StellarObjectGeometry;
