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
  date: string;
  image: string;
  tools: tool[];
  link: string;
  color: string;
  id: string;
}

const useStyles = createStyles((theme) => ({
  controls: {
    ref: getStylesRef('controls'),
    width: '120%',
    position: 'absolute',
    top: '50%',
    left: '-10%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.fn.smallerThan('lg')]: {
      width: '130%',
      left: '-15%',
    },
  },

  root: {
    '&:hover': {
      [`& .${getStylesRef('controls')}`]: {
        opacity: 1,
      },
    },
  },

  carousel: {
    width: '35%',
    left: '55%',
    top: 155,
    [theme.fn.smallerThan('xl')]: {
      width: '40%',
      top: 0,
    },
  },

  card: {
    backgroundColor: theme.colors.dark[8],
    height: '50vh',
    overflowY: 'auto',
    [theme.fn.smallerThan('xl')]: {
      height: '85vh',
    },
  },

  section: {
    borderBottom: `${rem(1)} solid ${theme.colors.dark[4]}`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

function Projects() {
  const { classes } = useStyles();

  const projects: project[] = [
    {
      name: 'Subletter',
      description: `Subletter is a virtual marketplace for university students created
                    to ensure that only fellow students
                    respond to a student's listings. This project allowed me to branch out and 
                    truly develop my full-stack ability, especially since it was the first project in which I 
                    designed and implemented a database. In this project, I am most proud that I implemented
                    a live messaging interface, designed using Socket.IO. I also fully developed
                    the login system, leveraging tools such as JSON Web Tokens
                    and bcrypt to securely authenticate users.`,
      date: 'Jul - Aug 2023',
      image: '/images/subletter.png',
      tools: [
        { name: 'JavaScript', color: 'yellow', id: useId() },
        { name: 'Node.js', color: 'green', id: useId() },
        { name: 'Express.js', color: 'teal', id: useId() },
        { name: 'React.js', color: 'blue', id: useId() },
        { name: 'ChakraUI', color: 'teal', id: useId() },
        { name: 'MySQL', color: 'orange', id: useId() },
      ],
      color: '#ffffff',
      link: 'https://github.com/imaadj10/subletter',
      id: useId(),
    },
    {
      name: 'Right Angle',
      description: `Born from the constant discomfort of an intern sitting at a desk
                    for 8 hours a day, Right Angle is a web application that helps users
                    correct their posture. It works by using OpenCV with MediaPipe to
                    calculate whether or not a user is slouching, and if they are, the program alerts them.
                    I worked on the backend of this application, with a special focus on enabling a
                    livestream from OpenCV to the browser.`,
      date: 'Oct 2022',
      image: '/images/right-angle.png',
      tools: [
        { name: 'JavaScript', color: 'yellow', id: useId() },
        { name: 'Python', color: 'blue', id: useId() },
        { name: 'Flask', color: 'teal', id: useId() },
        { name: 'React.js', color: 'blue', id: useId() },
        { name: 'OpenCV', color: 'red', id: useId() },
        { name: 'Tailwind CSS', color: 'teal', id: useId() },
      ],
      color: '#B39EFC',
      link: 'https://github.com/imaadj10/right-angle',
      id: useId(),
    },
    {
      name: 'Spam Text Classifier',
      description: `Amidst the ever-changing landscape of technology, my
                  fascination for innovation continues to thrive. From crafting
                  elegant lines h an
                  unwavering curiosity, I embrace the digital realm, driven to
                  shape the future one algorithm at a time.`,
      date: 'Aug 2022',
      image: '/images/spam-text-classifier.png',
      tools: [
        { name: 'Python', color: 'blue', id: useId() },
        { name: 'Jupyter', color: 'orange', id: useId() },
        { name: 'Scikit-Learn', color: 'blue', id: useId() },
        { name: 'Pandas', color: 'gray', id: useId() },
      ],
      color: '#000000',
      link: 'https://github.com/imaadj10/spam-text-classifier',
      id: useId(),
    },
    {
      name: 'Spotify Collage',
      description: `Amidst the ever-changing landscape of technology, my
                  fascination for innovation continues to thrive. From crafting
                  elegant lines h an
                  unwavering curiosity, I embrace the digital realm, driven to
                  shape the future one algorithm at a time.`,
      date: 'Jan - Feb 2022',
      image: '/images/spotify-collage.png',
      tools: [
        { name: 'Python', color: 'blue', id: useId() },
        { name: 'Flask', color: 'teal', id: useId() },
        { name: 'HTML', color: 'orange', id: useId() },
        { name: 'CSS', color: 'purple', id: useId() },
      ],
      color: '#15110E',
      link: 'https://github.com/imaadj10/spotify-collage',
      id: useId(),
    },
    {
      name: 'Virtual Drumset',
      description: `Amidst the ever-changing landscape of technology, my
                  fascination for innovation cw. With an
                  unwavering curiosity, I embrace the digital realm, driven to
                  shape the future one algorithm at a time.`,
      date: 'Oct - Nov 2021',
      image: '/images/virtual-drumset.png',
      tools: [{ name: 'Java', color: 'orange', id: useId() }],
      color: '#C0C0C0',
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
      className={classes.carousel}
      classNames={{ root: classes.root, controls: classes.controls }}
    >
      {projects.map((project) => (
        <Carousel.Slide>
          <ProjectCard
            key={project.id}
            image={project.image}
            name={project.name}
            description={project.description}
            date={project.date}
            tools={project.tools}
            color={project.color}
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
  date: string;
  description: string;
  tools: tool[];
  color: string;
  link: string;
}

function ProjectCard({
  image,
  name,
  description,
  date,
  tools,
  color,
  link,
}: ProjectCardProps) {
  const { classes } = useStyles();

  const features = tools.map((tool) => (
    <Badge key={tool.id} color={tool.color}>
      {tool.name}
    </Badge>
  ));

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section style={{ backgroundColor: color }}>
        <Image src={image} alt={name} height={180} fit="contain" />
      </Card.Section>
      <Card.Section className={classes.section} mt="md">
        <Group position="apart">
          <Group>
            <Text fz="lg" fw={500}>
              {name}
            </Text>
            <Badge size="sm">{date}</Badge>
          </Group>
          <Button
            size="xs"
            color="dark"
            radius="md"
            variant="default"
            component="a"
            href={link}
            target="_blank"
            title="Code"
          >
            <Text mr="xs">View Code</Text>
            <Image
              src={'images/github.png'}
              height="20px"
              radius="xl"
              fit="contain"
            />
          </Button>
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
    </Card>
  );
}

export default Projects;
