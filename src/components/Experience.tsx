import { Carousel } from '@mantine/carousel';
import { Card, Image, Text, Badge, Button, Group, rem } from '@mantine/core';

import { createStyles, getStylesRef } from '@mantine/core';

const useStyles = createStyles(() => ({
  controls: {
    ref: getStylesRef('controls'),
    transition: 'opacity 150ms ease',
    opacity: 0,
  },

  root: {
    '&:hover': {
      [`& .${getStylesRef('controls')}`]: {
        opacity: 1,
      },
    },
  },
}));

function Experience() {
  const { classes } = useStyles();

  return (
    <>
      <Carousel
        loop
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
        classNames={classes}
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
      </Carousel>
    </>
  );
}

export default Experience;
