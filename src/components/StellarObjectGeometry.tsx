// @ts-nocheck
import { ThreeElements, useFrame, useLoader } from '@react-three/fiber';
import { useContext, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitContext, PositionContext, SelectedPageContext } from '../App';
import OrbitLine from './OrbitLine';

const ROTATION_SPEED = isMobile ? 0.6 : 0.24; // radians per second
// Caps a single frame's contribution to rotation/orbit advancement, so a
// main-thread stall (e.g. a heavy React re-render elsewhere) doesn't show
// up as one big visible teleport on the next frame — see SolarSystem.tsx's
// MAX_FRAME_DELTA for the fuller explanation.
const MAX_FRAME_DELTA = 0.05;

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
  // Accumulates only while moving, so orbit position freezes on pause and
  // resumes from exactly where it left off instead of jumping ahead by
  // however long the planet was paused (performance.now() keeps ticking
  // regardless of `moving`, which caused a jump-cut on resume).
  const orbitTimeRef = useRef(0);

  useFrame((_state, rawDelta) => {
    const delta = Math.min(rawDelta, MAX_FRAME_DELTA);
    const mesh = meshRef.current;
    mesh.rotation.y -= ROTATION_SPEED * delta;

    if (!moving) return;
    orbitTimeRef.current += delta;

    if (mesh && !isStar) {
      const time = orbitTimeRef.current;
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
