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
  createStyles,
  getStylesRef,
} from '@mantine/core';
import { IconBrandGithubFilled } from '@tabler/icons-react';

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
  link: string;
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
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

function Projects() {
  const { classes } = useStyles();

  const projectArray: project[] = [
    {
      name: 'Subletter',
      description: `Subletter is a virtual marketplace for university students created
                    to ensure that only fellow students
                    respond to a student's listings. This project allowed me to branch out and 
                    truly develop my full-stack ability, especially since it is the first project in which I 
                    designed and implemented a databse. In this project, I implemented
                    was the live messaging interface, designed using Socket.IO. I also fully developed
                    the login system, leveraging tools such as JSON Web Tokens
                    and bcrypt to securely authenticate users.`,
      year: 2023,
      image:
        '/images/subletter.png',
      tech: [
        { name: 'JavaScript', color: 'yellow', id: useId() },
        { name: 'Node.js', color: 'green', id: useId() },
        { name: 'Express.js', color: 'teal', id: useId() },
        { name: 'React.js', color: 'blue', id: useId() },
        { name: 'ChakraUI', color: 'teal', id: useId() },
        { name: 'MySQL', color: 'orange', id: useId() },
      ],
      link: 'https://github.com/imaadj10/subletter',
      id: useId(),
    },
    {
      name: 'Right Angle',
      description: `Amidst the ever-changing landscape of technology, my
                  fascination for innovation continues to thrive. From crafting
                  elegant lines of code to diving deep into complex algorithms,
                  I find solace in thallenge
                  presents an opportunity to create, learn, and grow. With an
                  unwavering curiosity, I embrace the digital realm, driven to
                  shape the future one algorithm at a time.`,
      year: 2022,
      image:
        '/images/right-angle.png',
      tech: [
        { name: 'JavaScript', color: 'yellow', id: useId() },
        { name: 'Python', color: 'blue', id: useId() },
        { name: 'Flask', color: 'teal', id: useId() },
        { name: 'React.js', color: 'blue', id: useId() },
        { name: 'OpenCV', color: 'red', id: useId() },
        { name: 'Tailwind CSS', color: 'teal', id: useId() },
      ],
      link: 'https://github.com/imaadj10/right-angle',
      id: useId(),
    },
    {
      name: 'Spotify Collage',
      description: `Amidst the ever-changing landscape of technology, my
                  fascination for innovation continues to thrive. From crafting
                  elegant lines h an
                  unwavering curiosity, I embrace the digital realm, driven to
                  shape the future one algorithm at a time.`,
      year: 2022,
      image:
        '/images/spotify-collage.png',
      tech: [
        { name: 'Python', color: 'blue', id: useId() },
        { name: 'Flask', color: 'teal', id: useId() },
        { name: 'HTML', color: 'orange', id: useId() },
        { name: 'CSS', color: 'purple', id: useId() },
      ],
      link: 'https://github.com/imaadj10/spotify-collage',
      id: useId(),
    },
    {
      name: 'Virtual Drumset',
      description: `Amidst the ever-changing landscape of technology, my
                  fascination for innovation cw. With an
                  unwavering curiosity, I embrace the digital realm, driven to
                  shape the future one algorithm at a time.`,
      year: 2021,
      image:
        '/images/virtual-drumset.png',
      tech: [{ name: 'Java', color: 'orange', id: useId() }],
      link: 'https://github.com/imaadj10/virtual-drumset',
      id: useId(),
    },
  ];

  return (
    <Carousel
      loop
      withIndicators
      draggable={false}
      controlSize={34}
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
          <ProjectCard
            key={project.id}
            image={project.image}
            name={project.name}
            description={project.description}
            year={project.year}
            tools={project.tech}
            link={project.link}
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}

interface ProjectCardProps {
  image: string;
  name: string;
  year: number;
  description: string;
  tools: tool[];
  link: string;
}

function ProjectCard({
  image,
  name,
  description,
  year,
  tools,
  link,
}: ProjectCardProps) {
  const { classes } = useStyles();

  const features = tools.map((tool) => (
    <Badge key={tool.id} color={tool.color}>
      {tool.name}
    </Badge>
  ));

  return (
    <Card
      style={{ height: '85vh' }}
      withBorder
      radius="md"
      p="md"
      className={classes.card}
    >
      <Card.Section>
        <Image src={image} alt={name} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group position="apart">
          <Text fz="lg" fw={500}>
            {name}
          </Text>
          <Badge size="sm">{year}</Badge>
        </Group>
        <Text fz="sm" mt="xs">
          {description}
        </Text>
      </Card.Section>

      <Card.Section
        style={{ position: 'relative' }}
        className={classes.section}
      >
        <Text mt="xs" className={classes.label} c="dimmed">
          Tech Stack
        </Text>
        <Group spacing={7} mt={5}>
          {features}
        </Group>
      </Card.Section>
      <Flex w="100%" justify='center' style={{ position: 'absolute', bottom: 30 }}>
        <Button
          color="dark"
          radius="md"
          variant="default"
          w="%"
          component="a"
          href={link}
          target="_blank"
        >
          <Text mr="xs">Check it out on GitHub</Text>
          <IconBrandGithubFilled />
        </Button>
      </Flex>
    </Card>
  );
}

export default Projects;
