// @ts-nocheck
import { useContext, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { ThreeElements, useFrame } from '@react-three/fiber';
import { useSpring, config, animated } from '@react-spring/three';
import { Html, Line } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitContext, PositionContext, SelectedPageContext } from '../App';

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
  const { page, setPage } = useContext(SelectedPageContext);

  useFrame((_state, delta) => {
    const mesh = meshRef.current;
    mesh.rotation.y -= 0.004;

    if (!moving) return;

    if (mesh && !isStar) {
      const time = performance.now() * 0.001;
      const planetRadius = initialPosition[0];
      const planetSpeed = 1 / Math.sqrt(planetRadius);

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
        setCurrentPosition([planetX, initialPosition[1] + 10, planetZ]);
      }
    }
  });

  const handleClick = () => {
    if (!isStar && !isMoon && moving) {
      setMoving(false);
      setPosition(currentPosition);
      setPage(current_page);
    }
  };

  useFrame((state, delta) => {
    if (!moving) {
      const dummy = new THREE.Vector3();
      const step = 0.001;
      state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, 25, step);
      state.camera.position.lerp(
        dummy.set(position[0] - 10, 0, position[2]),
        step
      );
      state.camera.lookAt(position[0], 0, position[2] + 3);
      state.camera.updateProjectionMatrix();
    }
  });

  return (
    <>
      {!isMoon && moving && (
        <Html center position={[initialPosition[0], 0, 0]}>
          <h1 style={{ color: 'white' }}>{current_page}</h1>
        </Html>
      )}
      <mesh ref={meshRef} {...meshProps} onClick={handleClick}>
        <meshStandardMaterial color="black" />
        <primitive
          scale={scale ? scale : 1}
          object={gltf.scene}
          children-0-castShadow
        />
      </mesh>
      {isStar && (
        <pointLight position={[0, 0, 0]} intensity={500} color="#edd59e" />
      )}
      {!isMoon && (
        <OrbitLine handleClick={handleClick} radius={initialPosition[0]} />
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

function OrbitLine({ radius = 1, handleClick }) {
  const [lineWidth, setLineWidth] = useState(0.5);
  const [hovered, setHovered] = useState(false);

  // const { lineWidth } = useSpring({
  //   lineWidth: hovered ? 2 : 0.5,
  //   config: { tension: 500, friction: 20 }, // Adjust these values for the desired easing
  // });

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  const handleHoverOver = () => {
    setHovered(true);
    setLineWidth(2);
  };

  const handleHoverOut = () => {
    setHovered(false);
    setLineWidth(0.5);
  };

  const points = [];
  for (let index = 0; index < 64; index++) {
    const angle = (index / 64) * 2 * Math.PI;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    points.push(new THREE.Vector3(x, 0, z));
  }
  points.push(points[0]);

  return (
    <animated.mesh>
      <Line points={points} color={'#c9c6c9'} lineWidth={lineWidth} />
      <Line
        points={points}
        onPointerOver={handleHoverOver}
        onPointerOut={handleHoverOut}
        onClick={handleClick}
        visible={false}
        lineWidth={16}
      />
    </animated.mesh>
  );
}

export default StellarObjectGeometry;
