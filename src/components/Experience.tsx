// @ts-nocheck
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useContext } from 'react';
import { OrbitContext, SelectedPageContext } from '../App';
import { Card, Image, Text, Badge, Button, Group, CloseButton, } from '@mantine/core';

function Experience() {
  const { moving, setMoving } = useContext(OrbitContext);
  const { page, setPage } = useContext(SelectedPageContext);

  const handleResume = () => {
    setMoving(true);
    setPage('home');
  };

  return (
    <>
      <CloseButton
        title="Close popover"
        onClick={handleResume}
        size="xl"
        iconSize={20}
      />
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
          with tours and activities on and around the fjords of Norway With
          Fjord Tours you can explore more of the magical fjord landscapes with
          tours and activities on and around the fjords of Norway With Fjord
          Tours you can explore more of the magical fjord landscapes with tours
          and activities on and around the fjords of Norway With Fjord Tours you
          can explore more of the magical fjord landscapes with tours and
          activities on and around the fjords of Norway With Fjord Tours you can
          explore more of the magical fjord landscapes with tours and activities
          on and around the fjords of Norway With Fjord Tours you can explore
          more of the magical fjord landscapes with tours and activities on and
          around the fjords of Norway With Fjord Tours you can explore more of
          the magical fjord landscapes with tours and activities on and around
          the fjords of Norway With Fjord Tours you can explore more of the
          magical fjord landscapes with tours and activities on and around the
          fjords of Norway With Fjord Tours you can explore more of the magical
          fjord landscapes with tours and activities on and around the fjords of
          Norway v v With Fjord Tours you can explore more of the magical fjord
          landscapes with tours and activities on and around the fjords of
          Norway v v
        </Text>

        <Button
          onClick={() => console.log('clicked')}
          variant="light"
          color="blue"
          fullWidth
          mt="md"
          radius="md"
        >
          Book classic tour now
        </Button>
      </Card>
    </>
  );
}

export default Experience;
