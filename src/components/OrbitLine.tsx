// @ts-nocheck
import { Center, Line, Text3D } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function OrbitLine({ radius = 1, handleClick, moving, current_page }) {
  const [hovered, setHovered] = useState(false);
  const textRef = useRef();
  const lineRef = useRef();
  const color = new THREE.Color();

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  useFrame(() => {
    textRef.current.material.color.lerp(
      color.set(hovered ? 'pink' : 'white'),
      1.25
    );
  });

  useFrame(() => {
    lineRef.current.material.opacity = THREE.MathUtils.lerp(
      lineRef.current.material.opacity,
      moving ? 1 : 0,
      0.01
    );
    textRef.current.material.opacity = THREE.MathUtils.lerp(
      textRef.current.material.opacity,
      moving ? 1 : 0,
      0.02
    );
  });

  const handleHoverOver = () => {
    if (moving) setHovered(true);
  };

  const handleHoverOut = () => {
    if (moving) setHovered(false);
  };

  const handleOrbitClick = () => {
    setHovered(false);
    handleClick();
  };

  const points = [];
  for (let index = 0; index < 256; index++) {
    const angle = (index / 256) * 2 * Math.PI;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    points.push(new THREE.Vector3(x, 0, z));
  }
  points.push(points[0]);

  const textMaterial = new THREE.MeshStandardMaterial({
    transparent: true,
    metalness: 1,
    roughness: 0.5,
  });

  return (
    <>
      <Center rotation={[-0.25, 0, 0]} position={[0, 0, radius]}>
        <Text3D
          ref={textRef}
          letterSpacing={-0.06}
          size={1.5}
          font="/fonts/EngraversGothic BT_Regular.json"
          material={textMaterial}
        >
          {current_page}
        </Text3D>
        <pointLight
          position={[0, 0, radius - 2]}
          intensity={175}
          color="#edd59e"
        />
      </Center>

      <Line
        transparent={true}
        ref={lineRef}
        points={points}
        color={'#c9c6c9'}
        lineWidth={0.5}
      />
      <Line
        points={points}
        onPointerOver={handleHoverOver}
        onPointerOut={handleHoverOut}
        onClick={handleOrbitClick}
        visible={false}
        lineWidth={20}
      />
    </>
  );
}

export default OrbitLine;
