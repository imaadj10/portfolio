import { Carousel } from '@mantine/carousel';
import { useId } from '@mantine/hooks';
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  rem,
  Flex,
  Box,
  BackgroundImage,
  createStyles,
  getStylesRef,
} from '@mantine/core';

interface tool {
  name: string;
  color: string;
  id: string;
}

interface project {
  name: string;
  description: string;
  year: number;
  image: string;
  tech: tool[];
  id: string;
}

const useStyles = createStyles((theme) => ({
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

  card: {

    [theme.fn.smallerThan('xl')]: {

    },

  }
}));

function Projects() {
  const { classes } = useStyles();

  const projectArray: project[] = [
    {
      name: 'Subletter',
      description: `Amidst the ever-changing landscape of technology, my
                  fascination for innovation continues to thrive. From crafting
                  elegant lines of code to diving deep into complex algorithms,
                  I find solace in the art of problem-solving. Each challenge
                  presents an opportunity to create, learn, and grow. With an
                  unwavering curiosity, I embrace the digital realm, driven to
                  shape the future one algorithm at a time.`,
      year: 2023,
      image:
        'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
      tech: [
        { name: 'JavaScript', color: 'yellow', id: useId() },
        { name: 'Node.js', color: 'green', id: useId() },
        { name: 'Express.js', color: 'teal', id: useId() },
        { name: 'React.js', color: 'blue', id: useId() },
        { name: 'ChakraUI', color: 'teal', id: useId() },
        { name: 'MySQL', color: 'orange', id: useId() },
      ],
      id: useId(),
    },
    {
      name: 'Right Angle',
      description: `Amidst the ever-changing landscape of technology, my
                  fascination for innovation continues to thrive. From crafting
                  elegant lines of code to diving deep into complex algorithms,
                  I find solace in the art of problem-solving. Each challenge
                  presents an opportunity to create, learn, and grow. With an
                  unwavering curiosity, I embrace the digital realm, driven to
                  shape the future one algorithm at a time.`,
      year: 2023,
      image:
        'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
      tech: [
        { name: 'JavaScript', color: 'yellow', id: useId() },
        { name: 'Python', color: 'blue', id: useId() },
        { name: 'Flask', color: 'teal', id: useId() },
        { name: 'React.js', color: 'blue', id: useId() },
        { name: 'OpenCV', color: 'red', id: useId() },
        { name: 'Tailwind CSS', color: 'teal', id: useId() },
      ],
      id: useId(),
    },
    {
      name: 'Spotify Collage',
      description: `Amidst the ever-changing landscape of technology, my
                  fascination for innovation continues to thrive. From crafting
                  elegant lines of code to diving deep into complex algorithms,
                  I find solace in the art of problem-solving. Each challenge
                  presents an opportunity to create, learn, and grow. With an
                  unwavering curiosity, I embrace the digital realm, driven to
                  shape the future one algorithm at a time.`,
      year: 2023,
      image:
        'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
      tech: [
        { name: 'Python', color: 'blue', id: useId() },
        { name: 'Flask', color: 'teal', id: useId() },
        { name: 'HTML', color: 'orange', id: useId() },
        { name: 'CSS', color: 'purple', id: useId() },
      ],
      id: useId(),
    },
    {
      name: 'Virtual Drumset',
      description: `Amidst the ever-changing landscape of technology, my
                  fascination for innovation continues to thrive. From crafting
                  elegant lines of code to diving deep into complex algorithms,
                  I find solace in the art of problem-solving. Each challenge
                  presents an opportunity to create, learn, and grow. With an
                  unwavering curiosity, I embrace the digital realm, driven to
                  shape the future one algorithm at a time.`,
      year: 2023,
      image:
        'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
      tech: [
        { name: 'Java', color: 'orange', id: useId() },
      ],
      id: useId(),
    },
  ];

  return (
    <>
      <Carousel
        loop
        withIndicators
        draggable={false}
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
        {projectArray.map((project) => (
          <Carousel.Slide>
            <Card key={project.id} shadow="lg" radius="lg">
              <Flex h="100%" gap="10px" justify="space-between" mb="25px">
                <Box pl="30px" w="70%">
                  <Flex justify="space-between" pr="20px">
                    <Text style={{ paddingBottom: '0', fontSize: '2rem' }}>
                      {project.name}
                    </Text>
                  </Flex>
                  <Flex
                    h="200px"
                    direction="column"
                    style={{ position: 'relative' }}
                  >
                    <Text mt="5px">{project.description}</Text>
                  </Flex>
                  <Flex
                      mb="45px"
                      gap="sm"
                      style={{ position: 'absolute', bottom: '0' }}
                    >
                      {project.tech.map((tool) => (
                        <Badge key={tool.id} color={tool.color}>
                          {tool.name}
                        </Badge>
                      ))}
                    </Flex>
                </Box>
                <Box
                  pr="30px"
                  w="500px"
                  h="255px"
                  style={{ borderRadius: '10px' }}
                >
                  <BackgroundImage
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    radius="md"
                    src={project.image}
                  />
                </Box>
              </Flex>
            </Card>
          </Carousel.Slide>
        ))}
      </Carousel>
    </>
  );
}

export default Projects;
