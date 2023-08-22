// @ts-nocheck
import { Html } from '@react-three/drei';
import { Card } from '@mantine/core';
import * as THREE from 'three';
import { useContext } from 'react';
import { PositionContext } from '../App';

function Projects() {
  const { position, setPosition } = useContext(PositionContext);
  const dummy = new THREE.Vector3();

  return (
    <Html center position={dummy.set(position[0], 0, position[2] + 5)} style={{position: 'absolute'}} >
      <Card color={'black'}>Projects</Card>
    </Html>
  );
}

export default Projects;