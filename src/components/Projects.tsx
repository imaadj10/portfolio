// @ts-nocheck
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useContext } from 'react';
import { PositionContext } from '../App';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';


function Projects() {
  const { position, setPosition } = useContext(PositionContext);
  const dummy = new THREE.Vector3();

  return (
    <Html
      transform
      distanceFactor={3}
      zIndexRange={[99999999, 0]}
      sprite
      position={dummy.set(position[0], 0, position[2] + 7)}
      style={{ width: "50%", height: "50%" }}
    >
      <Card shadow="sm" radius="md">
        <Card.Section component="a" href="https://mantine.dev/">
          <Image
            src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
            height={160}
            alt="Norway"
          />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>Norway Fjord Adventures</Text>
          <Badge color="pink" variant="light">
            On Sale
          </Badge>
        </Group>

        <Text size="sm" color="dimmed">
          With Fjord Tours you can explore more of the magical fjord landscapes
          with tours and activities on and around the fjords of Norway
        </Text>

        <Button onClick={() => console.log('clicked')} variant="light" color="blue" fullWidth mt="md" radius="md">
          Book classic tour now
        </Button>
      </Card>
    </Html>
  );
}

export default Projects;
