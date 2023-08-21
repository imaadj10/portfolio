// @ts-nocheck
import { useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Line, Text3D, Center } from '@react-three/drei';

function OrbitLine({ radius = 1, handleClick, moving, current_page }) {
    const [lineWidth, setLineWidth] = useState(0.5);
    const [hovered, setHovered] = useState(false);
    const { camera } = useThree();
  
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
      <>
        {moving && (
          <Center position={[0, 0, radius]}>
            <Text3D letterSpacing={-0.06} size={1} font="/Inter_Bold.json">
              {current_page}
              <meshStandardMaterial color="white" />
            </Text3D>
          </Center>
        )}
        <Line points={points} color={'#c9c6c9'} lineWidth={lineWidth} />
        <Line
          points={points}
          onPointerOver={handleHoverOver}
          onPointerOut={handleHoverOut}
          onClick={handleClick}
          visible={false}
          lineWidth={20}
        />
      </>
    );
  }

  export default OrbitLine;