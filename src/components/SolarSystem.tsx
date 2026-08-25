// @ts-nocheck
import { Button, Text } from '@mantine/core';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Center, Stars, Text3D } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Fragment, Suspense, useContext } from 'react';
import { isMobile } from 'react-device-detect';
import * as THREE from 'three';
import { OrbitContext, PositionContext, SelectedPageContext } from '../App';
import '../css/App.css';
import { useStyles } from '../styles/SolarSystemStyles';
import About from './About';
import Contact from './Contact';
import Experience from './Experience';
import LoadingScreen from './LoadingScreen';
import Projects from './Projects';
import StellarObjectGeometry from './StellarObjectGeometry';

interface StellarObject {
  page_name: string;
  model: string;
  scale: number;
  orbiters: StellarObject[];
}

const about: StellarObject = {
  page_name: 'about me',
  model: '/planet_models/Planet_20.glb',
  scale: 0.2,
  orbiters: [],
};
const subletter: StellarObject = {
  page_name: 'subletter',
  model: '/planet_models/Planet_47.glb',
  scale: 0.06,
  orbiters: [],
};
const right_angle: StellarObject = {
  page_name: 'right_angle',
  model: '/planet_models/Planet_48.glb',
  scale: 0.06,
  orbiters: [],
};
const spam_text_classifier: StellarObject = {
  page_name: 'spam_text_classifier',
  model: '/planet_models/Planet_5.glb',
  scale: 0.06,
  orbiters: [],
};
const spotify_collage: StellarObject = {
  page_name: 'spotify_collage',
  model: '/planet_models/Planet_46.glb',
  scale: 0.06,
  orbiters: [],
};
const virtual_drumset: StellarObject = {
  page_name: 'virtual_drumset',
  model: '/planet_models/Planet_44.glb',
  scale: 0.06,
  orbiters: [],
};
const projects: StellarObject = {
  page_name: 'projects',
  model: '/planet_models/Planet_12.glb',
  scale: 0.2,
  orbiters: [
    subletter,
    right_angle,
    spam_text_classifier,
    spotify_collage,
    virtual_drumset,
  ],
};
const intel: StellarObject = {
  page_name: 'intel',
  model: '/planet_models/Planet_31.glb',
  scale: 0.06,
  orbiters: [],
};
const ubc: StellarObject = {
  page_name: 'ubc',
  model: '/planet_models/Planet_45.glb',
  scale: 0.06,
  orbiters: [],
};
const experience: StellarObject = {
  page_name: 'experience',
  model: '/planet_models/Planet_34.glb',
  scale: 0.2,
  orbiters: [intel, ubc],
};
const contact: StellarObject = {
  page_name: 'contact',
  model: '/planet_models/Planet_43.glb',
  scale: 0.2,
  orbiters: [],
};
const sun: StellarObject = {
  page_name: 'home',
  model: '/planet_models/Sun.glb',
  scale: 10,
  orbiters: [about, projects, experience, contact],
};

function SolarSystem() {
  const { moving, setMoving } = useContext(OrbitContext);
  const { page, setPage } = useContext(SelectedPageContext);
  const { classes } = useStyles();

  const handleResume = () => {
    setMoving(true);
    setPage('home');
  };

  return (
    <div className="content-container">
      <div
        style={{
          opacity: moving ? 0 : 1,
          transition: moving ? 'none' : 'opacity 0.5s ease 2s',
        }}
        className="back-button"
      >
        {!moving && (
          <Button
            variant="subtle"
            color="gray"
            radius="sm"
            size="md"
            onClick={handleResume}
            className={classes.button}
            classNames={classes}
          >
            <ArrowBackIcon />
            <Text color="white" ml={5}>
              Return to Homepage
            </Text>
          </Button>
        )}
      </div>
      <div
        style={{
          opacity: moving ? 0 : 1,
          transition: moving ? 'none' : 'opacity 1s ease 1.5s',
        }}
        className="info-container"
      >
        {page === 'about me' && <About />}
        {page === 'projects' && <Projects />}
        {page === 'experience' && <Experience />}
        {page === 'contact' && <Contact />}
      </div>

      <Canvas dpr={[1, 2]}>
        <Suspense fallback={null}>
          <Center position={[0, 29, 0]} rotation={[-0.5, 0, 0]}>
            <Text3D
              curveSegments={32}
              bevelEnabled
              bevelSize={0.04}
              bevelThickness={0.1}
              height={0.5}
              lineHeight={0.5}
              letterSpacing={-0.06}
              size={1.5}
              font="/fonts/ROCKETWILDNESS_Regular.json"
            >
              {`Welcome to`}
              <meshNormalMaterial />
            </Text3D>
          </Center>
          <Center position={[0, 25, 0]} rotation={[-0.5, 0, 0]}>
            <Text3D
              curveSegments={32}
              bevelEnabled
              bevelSize={0.04}
              bevelThickness={0.1}
              height={0.5}
              lineHeight={0.5}
              letterSpacing={-0.06}
              size={5}
              font="/fonts/ROCKETWILDNESS_Regular.json"
            >
              {`Imaad Junaidi's`}
              <meshNormalMaterial />
            </Text3D>
          </Center>

          <Center position={[4, 20, 0]} rotation={[-0.5, 0, 0]}>
            <Text3D
              curveSegments={32}
              bevelEnabled
              bevelSize={0.04}
              bevelThickness={0.1}
              height={0.5}
              lineHeight={0.5}
              letterSpacing={-0.06}
              size={2}
              font="/fonts/ROCKETWILDNESS_Regular.json"
            >
              {`Solar System`}
              <meshNormalMaterial />
            </Text3D>
          </Center>

          {moving && <CameraPos />}
          {!moving && <CameraFocus />}

          <Stars factor={6} fade speed={0} />
          <ambientLight intensity={1} />
          <StellarObjectGeometry
            key={'sun'}
            position={[0, 0, 0]}
            isStar={true}
            model={sun.model}
            scale={sun.scale}
            current_page={sun.page_name}
          />

          {sun.orbiters.map((planet, p_index) => (
            <Fragment key={p_index}>
              <StellarObjectGeometry
                position={[(p_index + 1) * 10 + 10, 0, (p_index + 1) * 10 + 10]}
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
            </Fragment>
          ))}
        </Suspense>
      </Canvas>
      <LoadingScreen />
    </div>
  );
}

// Rate is tuned in units of "convergence per second" so the camera eases
// toward its target at the same real-world speed regardless of frame rate.
const CAMERA_RATE = isMobile ? 4.5 : 1.8;

function CameraPos() {
  useFrame((state, delta) => {
    const dummy = new THREE.Vector3();
    const alpha = 1 - Math.exp(-CAMERA_RATE * delta);
    state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, 50, alpha);
    state.camera.position.lerp(dummy.set(0, 25, 85), alpha);
    state.camera.lookAt(0, 0, 0);
    state.camera.updateProjectionMatrix();
  });
  return null;
}

// Centralizes the camera-follow logic that used to be duplicated inside
// every StellarObjectGeometry instance (one redundant useFrame + point
// light per planet/moon, all fighting over the same shared camera).
function CameraFocus() {
  const { position } = useContext(PositionContext);

  useFrame((state, delta) => {
    const dummy = new THREE.Vector3();
    const alpha = 1 - Math.exp(-CAMERA_RATE * delta);
    state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, 25, alpha);
    state.camera.position.lerp(
      dummy.set(position[0] - 10, 0, position[2]),
      alpha
    );
    state.camera.lookAt(position[0], 0, position[2] + 2.5);
    state.camera.updateProjectionMatrix();
  });

  return (
    <pointLight
      position={[position[0] - 10, 0, position[2]]}
      intensity={5}
      color="#edd59e"
    />
  );
}

export default SolarSystem;
