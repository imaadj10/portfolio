// @ts-nocheck
import * as THREE from 'three';
import { useContext } from 'react';
import { PositionContext } from '../App';
import { Carousel } from '@mantine/carousel';
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  rem,
  CloseButton,
} from '@mantine/core';

function About() {
  const { position, setPosition } = useContext(PositionContext);
  const dummy = new THREE.Vector3();

  return (
    <>
      <CloseButton title="Close popover" size="xl" iconSize={20} />
      <Carousel
        withIndicators
        styles={{
          indicator: {
            width: rem(12),
            height: rem(4),
            transition: 'width 250ms ease',

            '&[data-active]': {
              width: rem(40),
            },
          },
        }}
      >
        <Carousel.Slide>
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
              With Fjord Tours you can explore more of the magical fjord
              landscapes with tours and activities on and around the fjords of
              Norway
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
        </Carousel.Slide>
        <Carousel.Slide>
          <Card style={{ backgroundColor: 'black' }} shadow="sm" radius="md">
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
              With Fjord Tours you can explore more of the magical fjord
              landscapes with tours and activities on and around the fjords of
              Norway
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
        </Carousel.Slide>
        <Carousel.Slide>
          <Card style={{ backgroundColor: 'black' }} shadow="sm" radius="md">
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
              With Fjord Tours you can explore more of the magical fjord
              landscapes with tours and activities on and around the fjords of
              Norway
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
        </Carousel.Slide>
      </Carousel>
    </>
  );
}

export default About;
