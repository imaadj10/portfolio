// @ts-nocheck
import * as THREE from 'three';
import { useContext } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import '../css/SolarSystem.css';
import StellarObjectGeometry from './StellarObjectGeometry';
import StellarObject from './StellarObject';
import { OrbitContext, SelectedPageContext } from '../App';
import { CloseButton, Group } from '@mantine/core';

const about: StellarObject = new StellarObject(
  'About',
  2.5,
  '/planet_models/Planet_20.glb',
  0.2,
  []
);
const subletter: StellarObject = new StellarObject(
  'subletter',
  1,
  '/planet_models/Planet_47.glb',
  0.06,
  []
);
const right_angle: StellarObject = new StellarObject(
  'right_angle',
  1,
  '/planet_models/Planet_48.glb',
  0.06,
  []
);
const spotify_collage: StellarObject = new StellarObject(
  'spotify_collage',
  1,
  '/planet_models/Planet_46.glb',
  0.06,
  []
);
const virtual_drumset: StellarObject = new StellarObject(
  'virtual_drumset',
  1,
  '/planet_models/Planet_44.glb',
  0.06,
  []
);
const projects: StellarObject = new StellarObject(
  'Projects',
  2.5,
  '/planet_models/Planet_12.glb',
  0.2,
  [subletter, right_angle, spotify_collage, virtual_drumset]
);
const intel: StellarObject = new StellarObject(
  'intel',
  1,
  '/planet_models/Planet_31.glb',
  0.06,
  []
);
const ubc: StellarObject = new StellarObject(
  'ubc',
  1,
  '/planet_models/Planet_45.glb',
  0.06,
  []
);
const experience: StellarObject = new StellarObject(
  'Experience',
  5,
  '/planet_models/Planet_34.glb',
  0.2,
  [intel, ubc]
);
const contact: StellarObject = new StellarObject(
  'Contact',
  2,
  '/planet_models/Planet_43.glb',
  0.2,
  []
);
const sun: StellarObject = new StellarObject(
  'home',
  10,
  '/planet_models/Sun.glb',
  10,
  [about, projects, experience, contact]
);

function SolarSystem() {
  const { moving, setMoving } = useContext(OrbitContext);
  const { page, setPage } = useContext(SelectedPageContext);

  const handleClick = () => {
    setMoving(true);
    setPage('home');
  };

  return (
    <Canvas>
      {moving && <CameraPos />}
      <Html fullscreen>
        {!moving && (
           <CloseButton size="xl" iconSize={20} onClick={handleClick} />
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
      <ambientLight intensity={1} />
      <StellarObjectGeometry
        position={[0, 0, 0]}
        isStar={true}
        model={sun.model}
        scale={sun.scale}
        current_page={sun.page}
      />

      {sun.orbiters.map((planet, p_index) => (
        <>
          <StellarObjectGeometry
            position={[(p_index + 1) * 10 + 10, 0, (p_index + 1) * 10 + 10]}
            key={p_index}
            model={planet.model}
            scale={planet.scale}
            current_page={planet.page_name}
          />
          {planet.orbiters.map((moon, m_index) => (
            <StellarObjectGeometry
              key={`${p_index}-${m_index}`}
              position={[
                (p_index + 1) * 10 + 10,
                m_index + 1 + 3,
                (p_index + 1) * 10 + 10,
              ]}
              isMoon={true}
              model={moon.model}
              scale={moon.scale}
              current_page={moon.page_name}
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
    state.camera.position.lerp(dummy.set(85, 25, 0), step);
    state.camera.lookAt(0, 0, 0);
    state.camera.updateProjectionMatrix();
  });
}

export default SolarSystem;
