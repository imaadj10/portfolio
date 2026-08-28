import { Center, Text3D, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

const MODEL = '/planet_models/Satellite.glb';
const SCALE = 0.18;
const POSITION: [number, number, number] = [40, 18, 15];

// Slow tumble on top of the same kind of loose, organic drift as
// FloatingBanner (SolarSystem.tsx) — X/Y/roll each on their own period and
// phase offset rather than a single in-phase bob.
const ROTATION_SPEED = 0.15;
const BOB_AMPLITUDE_Y = 0.7;
const BOB_AMPLITUDE_X = 0.5;
const BOB_ROLL = 0.05;

// Hover feedback matches the orbit labels (OrbitLine.tsx): letters spread
// apart rather than recolor. Same rate/values, same golden metallic look
// (white material lit by a warm point light) for visual consistency.
const HOVER_RATE = 6;
const LETTER_SPACING_REST = -0.06;
const LETTER_SPACING_HOVER = 0.18;
const LETTER_SPACING_EPSILON = 0.001;
const LABEL_Y_OFFSET = -3.5;
const RESUME_URL = '/resume.pdf';

function Satellite() {
  // Bob (position) lives on the outer group, shared with the label below;
  // tumble/roll (rotation) is confined to the inner group so the text
  // drifts along with the satellite without spinning with it.
  const groupRef = useRef<THREE.Group>(null!);
  const modelRef = useRef<THREE.Group>(null!);
  const textRef = useRef<THREE.Mesh>(null!);
  const gltf = useGLTF(MODEL, '/draco/');
  const [hovered, setHovered] = useState(false);
  const [letterSpacing, setLetterSpacing] = useState(LETTER_SPACING_REST);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    modelRef.current.rotation.y = t * ROTATION_SPEED;
    modelRef.current.rotation.z = Math.sin(t * 0.8 + 0.7) * BOB_ROLL;
    groupRef.current.position.y = POSITION[1] + Math.sin(t * 0.95) * BOB_AMPLITUDE_Y;
    groupRef.current.position.x = POSITION[0] + Math.sin(t * 0.68 + 1.3) * BOB_AMPLITUDE_X;

    const hoverAlpha = 1 - Math.exp(-HOVER_RATE * delta);
    const spacingTarget = hovered ? LETTER_SPACING_HOVER : LETTER_SPACING_REST;
    setLetterSpacing((current) => {
      if (current === spacingTarget) return current;
      const next = THREE.MathUtils.lerp(current, spacingTarget, hoverAlpha);
      return Math.abs(spacingTarget - next) < LETTER_SPACING_EPSILON
        ? spacingTarget
        : next;
    });
  });

  const handleHoverOver = () => setHovered(true);
  const handleHoverOut = () => setHovered(false);
  const handleClick = () => window.open(RESUME_URL, '_blank', 'noopener,noreferrer');

  // Memoized so it's created once per mount rather than every render —
  // matches OrbitLine's reasoning for the same material.
  const textMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        metalness: 1,
        roughness: 0.5,
        color: 'white',
      }),
    []
  );

  return (
    <group ref={groupRef} position={POSITION}>
      <group ref={modelRef}>
        <primitive
          scale={SCALE}
          object={gltf.scene}
          onPointerOver={handleHoverOver}
          onPointerOut={handleHoverOut}
          onClick={handleClick}
        />
      </group>

      {/* Invisible, oversized hit target: Text3D's concave letterform
          geometry doesn't raycast reliably on its own (same reason
          OrbitLine's ring uses a dedicated invisible Line for hover/click
          instead of relying on its Text3D), so hovering the label itself
          needs this plane to pick up the pointer. */}
      <mesh
        position={[0, LABEL_Y_OFFSET, 1]}
        rotation={[-0.3, -0.75, -0.05]}
        visible={false}
        onPointerOver={handleHoverOver}
        onPointerOut={handleHoverOut}
        onClick={handleClick}
      >
        <planeGeometry args={[12, 5]} />
      </mesh>

      <Center
        position={[0, LABEL_Y_OFFSET, 1]}
        rotation={[-0.3, -0.75, -0.05]}
        // Re-measures the bounding box as letterSpacing changes, so the
        // word grows evenly from its middle instead of only to one side —
        // see OrbitLine.tsx's identical use of cacheKey for the same fix.
        cacheKey={letterSpacing}
      >
        <Text3D
          ref={textRef}
          letterSpacing={letterSpacing}
          size={1.5}
          font="/fonts/EngraversGothic BT_Regular.json"
          material={textMaterial}
        >
          {'resume'}
        </Text3D>
        <pointLight position={[0, 0, 2]} intensity={175} color="#edd59e" />
      </Center>
    </group>
  );
}

export default Satellite;
