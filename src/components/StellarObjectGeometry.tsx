// @ts-nocheck
import { ThreeElements, useFrame, useLoader } from '@react-three/fiber';
import { useContext, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitContext, PositionContext, SelectedPageContext } from '../App';
import OrbitLine from './OrbitLine';

const ROTATION_SPEED = isMobile ? 0.6 : 0.24; // radians per second

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
  const { setPosition } = useContext(PositionContext);
  const currentPositionRef = useRef(initialPosition);
  const { setPage } = useContext(SelectedPageContext);

  useFrame((_state, delta) => {
    const mesh = meshRef.current;
    mesh.rotation.y -= ROTATION_SPEED * delta;

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
        currentPositionRef.current = [planetX, initialPosition[1], planetZ];
      }
    }
  });

  const handlePause = () => {
    if (!isStar && !isMoon && moving) {
      setMoving(false);
      setPosition(currentPositionRef.current);
      setPage(current_page);
    }
  };

  return (
    <>
      <mesh ref={meshRef} {...meshProps}>
        <primitive scale={scale} object={gltf.scene} children-0-castShadow />
      </mesh>
      {isStar && (
        <pointLight position={[0, 0, 0]} intensity={1500} color="#edd59e" />
      )}
      {!isMoon && !isStar && (
        <OrbitLine
          handleClick={handlePause}
          radius={initialPosition[0]}
          moving={moving}
          current_page={current_page}
        />
      )}
    </>
  );
}

export default StellarObjectGeometry;
