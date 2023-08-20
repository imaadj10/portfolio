// @ts-nocheck
import * as THREE from 'three';
import { useContext } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import '../css/SolarSystem.css';
import StellarObjectGeometry from './StellarObjectGeometry';
import StellarObject from './StellarObject';
import { OrbitContext } from '../App';

const moon: StellarObject = new StellarObject(
  1,
  '/planet_models/Planet_32.glb',
  0.05,
  []
);
const mercury: StellarObject = new StellarObject(
  1,
  '/planet_models/Planet_3.glb',
  0.05,
  []
);
const earth: StellarObject = new StellarObject(
  2.5,
  '/planet_models/Planet_2.glb',
  0.1,
  [moon, mercury]
);

const venus: StellarObject = new StellarObject(
  2.5,
  '/planet_models/Planet_4.glb',
  0.1,
  []
);
const mars: StellarObject = new StellarObject(
  2,
  '/planet_models/Planet_5.glb',
  0.1,
  []
);
const jupiter: StellarObject = new StellarObject(
  5,
  '/planet_models/Planet_6.glb',
  0.1,
  []
);
const saturn: StellarObject = new StellarObject(
  4.5,
  '/planet_models/Planet_7.glb',
  0.1,
  []
);
const uranus: StellarObject = new StellarObject(
  3,
  '/planet_models/Planet_8.glb',
  0.1,
  []
);
const neptune: StellarObject = new StellarObject(
  3,
  '/planet_models/Planet_9.glb',
  0.1,
  []
);
const sun: StellarObject = new StellarObject(10, '/planet_models/Sun.glb', 4, [
  venus,
  earth,
  mars,
  jupiter,
  saturn,
  uranus,
  neptune,
]);

function SolarSystem() {
  const { moving, setMoving } = useContext(OrbitContext);

  const handleClick = () => {
    setMoving(true);
  };

  return (
    <Canvas>
      {moving && <CameraPos />}
      <Html fullscreen>
        {!moving && (
          <button
            style={{ position: 'absolute', zIndex: 9999 }}
            onClick={handleClick}
          >
            Resume Orbits
          </button>
        )}
      </Html>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={moving}
        enableDamping
        dampingFactor={0.1}
        rotateSpeed={0.5}
      />
      <Stars factor={6} fade speed={0} />
      <ambientLight intensity={1.5} />
      <StellarObjectGeometry
        position={[0, 0, 0]}
        isStar={true}
        model={sun.model}
        scale={sun.scale}
      />

      {sun.orbiters.map((planet, p_index) => (
        <>
          <StellarObjectGeometry
            position={[(p_index + 1) * 5, 0, (p_index + 1) * 5]}
            key={p_index}
            model={planet.model}
            scale={planet.scale}
          />
          {planet.orbiters.map((moon, m_index) => (
            <StellarObjectGeometry
              key={`${p_index}-${m_index}`}
              position={[
                (p_index + 1) * 5,
                (m_index + 1) * 1.5,
                (p_index + 1) * 5,
              ]}
              isMoon={true}
              model={moon.model}
              scale={moon.scale}
            />
          ))}
        </>
      ))}
    </Canvas>
  );
}

function CameraPos() {
  useFrame((state, delta) => {
    const dummy = new THREE.Vector3();
    const step = 0.01;
    state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, 50, step);
    state.camera.position.lerp(dummy.set(60, 25, 0), step);
    state.camera.lookAt(0, 0, 0);
    state.camera.updateProjectionMatrix();
  });
}

export default SolarSystem;
