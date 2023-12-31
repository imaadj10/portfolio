// @ts-nocheck
import { ThreeElements, useFrame, useLoader } from '@react-three/fiber';
import { useContext, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitContext, PositionContext, SelectedPageContext } from '../App';
import OrbitLine from './OrbitLine';

type StellarObjectProps = {
  isStar?: boolean;
  isMoon?: boolean;
  model: string;
  scale?: number;
  current_page: string;
} & ThreeElements['mesh'];

function StellarObjectGeometry(props: StellarObjectProps) {
  const { isStar, isMoon, model, scale, current_page, ...meshProps } = props;
  const initialPosition: number[] = meshProps.position as number[];
  const meshRef = useRef<THREE.Mesh>(null!);
  const gltf = useLoader(GLTFLoader, model);
  const { moving, setMoving } = useContext(OrbitContext);
  const { position, setPosition } = useContext(PositionContext);
  const [currentPosition, setCurrentPosition] = useState(initialPosition);
  const { setPage } = useContext(SelectedPageContext);

  useFrame((_state, delta) => {
    const mesh = meshRef.current;
    mesh.rotation.y -= isMobile ? 0.01 : 0.004;

    if (!moving) return;

    if (mesh && !isStar) {
      const time = performance.now() * 0.001;
      const planetRadius = initialPosition[0];
      const planetSpeed = 1.5 / Math.sqrt(planetRadius);

      const planetX = Math.cos(time * planetSpeed) * planetRadius;
      const planetZ = Math.sin(time * planetSpeed) * planetRadius;

      if (isMoon) {
        const moonRadius = initialPosition[1];
        const moonSpeed = (planetSpeed * 7) / Math.sqrt(moonRadius);

        const moonY = Math.cos(time * moonSpeed) * moonRadius;
        const moonZ = Math.sin(time * moonSpeed) * moonRadius + planetZ;

        mesh.position.set(planetX, moonY, moonZ);
      } else {
        mesh.position.set(planetX, initialPosition[1], planetZ);
        setCurrentPosition([planetX, initialPosition[1], planetZ]);
      }
    }
  });

  const handlePause = () => {
    if (!isStar && !isMoon && moving) {
      setMoving(false);
      setPosition(currentPosition);
      setPage(current_page);
    }
  };

  useFrame((state, delta) => {
    if (!moving) {
      const dummy = new THREE.Vector3();
      const step = isMobile ? 0.0025 : 0.001;
      state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, 25, step);
      state.camera.position.lerp(
        dummy.set(position[0] - 10, 0, position[2]),
        step
      );
      state.camera.lookAt(position[0], 0, position[2] + 2.5);
      state.camera.updateProjectionMatrix();
    }
  });

  return (
    <>
      <mesh ref={meshRef} {...meshProps}>
        <meshStandardMaterial color="black" />
        <primitive scale={scale} object={gltf.scene} children-0-castShadow />
      </mesh>
      {isStar && (
        <pointLight position={[0, 0, 0]} intensity={1500} color="#edd59e" />
      )}
      {!isMoon && (
        <OrbitLine
          handleClick={handlePause}
          radius={initialPosition[0]}
          moving={moving}
          current_page={current_page}
        />
      )}
      {!moving && (
        <pointLight
          position={[position[0] - 10, 0, position[2]]}
          intensity={5}
          color="#edd59e"
        />
      )}
    </>
  );
}

export default StellarObjectGeometry;
