// @ts-nocheck
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Center, Stars, Text3D } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Fragment, Suspense, useContext, useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import * as THREE from 'three';
import { OrbitContext, PositionContext, SelectedPageContext } from '../App';
import '../css/App.css';
import ContentPanel, { EXIT_DURATION } from './ContentPanel';
import LoadingScreen from './LoadingScreen';
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
  orbiters: [subletter, right_angle, spam_text_classifier, spotify_collage],
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
  orbiters: [intel, ubc, virtual_drumset],
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
  // Shared across CameraPos/CameraFocus (which mount/unmount as `moving`
  // flips) so the camera's look direction eases continuously between them
  // instead of snapping the instant one takes over from the other.
  const lookTargetRef = useRef(new THREE.Vector3(0, 0, 0));
  // True the instant "Return to Homepage" is clicked, so the card can
  // start its glitch-out right away while `moving` (and therefore the
  // camera) holds still until that animation has actually finished.
  const [returning, setReturning] = useState(false);
  const returnTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleResume = () => {
    if (returning) return;
    setReturning(true);
    returnTimerRef.current = setTimeout(() => {
      setMoving(true);
      setPage('home');
      setReturning(false);
    }, EXIT_DURATION);
  };

  useEffect(() => () => clearTimeout(returnTimerRef.current), []);

  return (
    <div className="content-container">
      {!moving && (
        <button type="button" className="back-button" onClick={handleResume}>
          <ArrowBackIcon fontSize="small" />
          Return to Homepage
        </button>
      )}

      <div className="info-container">
        <ContentPanel page={page} active={!moving && !returning} />
      </div>

      <Canvas dpr={[1, 2]}>
        <Suspense fallback={null}>
          <FloatingBanner>
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

            <Center position={[0, 20, 0]} rotation={[-0.5, 0, 0]}>
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
          </FloatingBanner>

          {moving && <CameraPos lookTargetRef={lookTargetRef} />}
          {!moving && <CameraFocus lookTargetRef={lookTargetRef} />}

          <Stars factor={4} fade speed={0.5} />
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

// Amplitudes for the welcome banner's idle drift, in scene units.
const BANNER_BOB_Y = 0.45;
const BANNER_BOB_X = 0.3;
const BANNER_BOB_ROLL = 0.015;

// Bobs the whole welcome banner gently, like it's drifting in zero-g.
// X/Y/roll each use a different period and phase offset (not simple
// in-phase back-and-forth), so the motion traces a loose, organic drift
// rather than a metronome swing.
function FloatingBanner({ children }) {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 0.6) * BANNER_BOB_Y;
    groupRef.current.position.x = Math.sin(t * 0.42 + 1.3) * BANNER_BOB_X;
    groupRef.current.rotation.z = Math.sin(t * 0.5 + 0.7) * BANNER_BOB_ROLL;
  });

  return <group ref={groupRef}>{children}</group>;
}

// Rate is tuned in units of "convergence per second" so the camera eases
// toward its target at the same real-world speed regardless of frame rate.
const CAMERA_RATE = isMobile ? 4.5 : 1.8;

// Caps how much elapsed time a single frame's easing step is allowed to
// account for. Clicking "Return to Homepage" triggers a fairly heavy React
// commit (unmounting the focused planet's info card/carousel, mounting the
// home camera rig), which can stall the main thread for a few hundred ms.
// Without this cap, the next frame's `delta` reflects that whole stall and
// the exponential-ease formula (correctly, but undesirably) converts it
// into one huge catch-up jump — which is what read as the camera "snapping"
// to the middle before zooming out. Clamping spreads that catch-up over
// several frames instead, so a stall costs a little extra real time rather
// than a visible teleport.
const MAX_FRAME_DELTA = 0.05;

const HOME_POSITION = new THREE.Vector3(0, 25, 85);
const HOME_LOOK = new THREE.Vector3(0, 0, 0);
const HOME_FOV = 50;

function CameraPos({ lookTargetRef }) {
  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, MAX_FRAME_DELTA);
    const alpha = 1 - Math.exp(-CAMERA_RATE * delta);
    state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, HOME_FOV, alpha);
    state.camera.position.lerp(HOME_POSITION, alpha);
    // Ease the look direction too, instead of snapping lookAt() straight to
    // its final target every frame — that instant reorientation (while
    // position/fov were still easing in) is what made the return trip look
    // like it "snapped to the middle" before pulling back.
    lookTargetRef.current.lerp(HOME_LOOK, alpha);
    state.camera.lookAt(lookTargetRef.current);
    state.camera.updateProjectionMatrix();
  });
  return null;
}

// Centralizes the camera-follow logic that used to be duplicated inside
// every StellarObjectGeometry instance (one redundant useFrame + point
// light per planet/moon, all fighting over the same shared camera).
function CameraFocus({ lookTargetRef }) {
  const { position } = useContext(PositionContext);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, MAX_FRAME_DELTA);
    const alpha = 1 - Math.exp(-CAMERA_RATE * delta);
    const targetPosition = new THREE.Vector3(position[0] - 10, 0, position[2]);
    const targetLook = new THREE.Vector3(position[0], 0, position[2] + 2.5);

    state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, 25, alpha);
    state.camera.position.lerp(targetPosition, alpha);
    lookTargetRef.current.lerp(targetLook, alpha);
    state.camera.lookAt(lookTargetRef.current);
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
