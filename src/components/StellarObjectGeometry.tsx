import { useGLTF } from '@react-three/drei';
import { ThreeElements, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { useOrbitContext, usePositionContext, useSelectedPageContext } from '../App';
import { slugFor } from '../routes';
import OrbitLine from './OrbitLine';

const ROTATION_SPEED = isMobile ? 0.6 : 0.24; // radians per second
// Self-rotation varies per object within this factor range around
// ROTATION_SPEED, so bodies don't all spin in perfect lockstep.
const ROTATION_SPEED_VARIABILITY = 0.25;

// Kepler's third law: orbital period² is proportional to radius³, so
// angular speed (period is inversely proportional to speed) scales with
// radius^-1.5. Bases are tuned so the innermost planet/moon keep roughly
// the pace the old flat sqrt(radius) falloff gave them; farther bodies
// fall off faster than before, same as real orbits do.
const PLANET_ORBIT_SPEED_BASE = 30;
const MOON_ORBIT_SPEED_BASE = 8;
// Orbit speed also varies per body (planets share one factor with their
// moons — see SolarSystem.tsx — moons additionally vary on top of that
// for their own path around the planet).
const ORBIT_SPEED_VARIABILITY = 0.3;

// Caps a single frame's contribution to rotation/orbit advancement, so a
// main-thread stall (e.g. a heavy React re-render elsewhere) doesn't show
// up as one big visible teleport on the next frame — see SolarSystem.tsx's
// MAX_FRAME_DELTA for the fuller explanation.
const MAX_FRAME_DELTA = 0.05;

// Random factor centered on 1, spread ± half of `variability`.
const randomFactor = (variability: number) =>
  1 - variability / 2 + Math.random() * variability;

type StellarObjectProps = {
  isStar?: boolean;
  isMoon?: boolean;
  model: string;
  scale?: number;
  current_page: string;
  // Shared with this planet's moons (see SolarSystem.tsx) so a moon's
  // redundant recomputation of its parent planet's position — done this
  // way instead of reading the planet's actual position, to avoid a
  // cross-component dependency — lands on the same point the planet
  // itself is actually orbiting to.
  orbitPhase?: number;
  orbitSpeedFactor?: number;
} & ThreeElements['mesh'];

function StellarObjectGeometry(props: StellarObjectProps) {
  const {
    isStar,
    isMoon,
    model,
    scale,
    current_page,
    orbitPhase = 0,
    orbitSpeedFactor = 1,
    ...meshProps
  } = props;
  const initialPosition: number[] = meshProps.position as number[];
  const meshRef = useRef<THREE.Mesh>(null!);
  // '/draco/' matches where copy-draco-decoder.js (run via the
  // "postinstall" npm script) places the decoder — needed so
  // Draco-compressed models (see the "compress-models" npm script)
  // actually decode; useGLTF transparently passes through
  // non-Draco-compressed .glb files too.
  const gltf = useGLTF(model, '/draco/');
  const { moving, setMoving } = useOrbitContext();
  const { setPosition } = usePositionContext();
  const currentPositionRef = useRef(initialPosition);
  const { setPage } = useSelectedPageContext();
  const navigate = useNavigate();
  // Accumulates only while moving, so orbit position freezes on pause and
  // resumes from exactly where it left off instead of jumping ahead by
  // however long the planet was paused (performance.now() keeps ticking
  // regardless of `moving`, which caused a jump-cut on resume).
  const orbitTimeRef = useRef(0);

  // Fixed once per mount (lazy initializer), not re-rolled every render.
  const [rotationSpeedFactor] = useState(() =>
    randomFactor(ROTATION_SPEED_VARIABILITY)
  );
  // Only meaningful for moons: their own path around the planet, on top
  // of the phase/speed factor shared with the planet above.
  const [moonPhase] = useState(() => Math.random() * Math.PI * 2);
  const [moonSpeedFactor] = useState(() =>
    randomFactor(ORBIT_SPEED_VARIABILITY)
  );

  useFrame((_state, rawDelta) => {
    const delta = Math.min(rawDelta, MAX_FRAME_DELTA);
    const mesh = meshRef.current;
    mesh.rotation.y -= ROTATION_SPEED * rotationSpeedFactor * delta;

    if (!moving) return;
    orbitTimeRef.current += delta;

    if (mesh && !isStar) {
      const time = orbitTimeRef.current;
      const planetRadius = initialPosition[0];
      const planetSpeed =
        (PLANET_ORBIT_SPEED_BASE / Math.pow(planetRadius, 1.5)) *
        orbitSpeedFactor;
      const planetAngle = time * planetSpeed + orbitPhase;

      const planetX = Math.cos(planetAngle) * planetRadius;
      const planetZ = Math.sin(planetAngle) * planetRadius;

      if (isMoon) {
        const moonRadius = initialPosition[1];
        const moonSpeed =
          (MOON_ORBIT_SPEED_BASE / Math.pow(moonRadius, 1.5)) *
          moonSpeedFactor;
        const moonAngle = time * moonSpeed + moonPhase;

        const moonY = Math.cos(moonAngle) * moonRadius;
        const moonZ = Math.sin(moonAngle) * moonRadius + planetZ;

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
      const slug = slugFor(current_page);
      if (slug) navigate(`/${slug}`);
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
