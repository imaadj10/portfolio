import { Carousel } from '@mantine/carousel';
import { useId } from '@mantine/hooks';
import {
  // Card,
  // Image,
  // Text,
  // Badge,
  // Button,
  Group,
  rem,
} from '@mantine/core';
import { useStyles } from '../styles/ProjectsStyles';
import {
  Card,
  Stack,
  Heading,
  Text,
  CardBody,
  Divider,
  CardFooter,
  Image,
  Badge,
  ButtonGroup,
  Button,
  Box,
  HStack,
  Wrap,
  WrapItem
} from '@chakra-ui/react';

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
      description: `This was my first end-to-end machine learning project,
                    where I trained and tested my own classification model
                    to determine whether or not a text was spam. The project
                    involved developing my own custom transformer to clean and process
                    the data, refining the model with cross validation, and finally testing
                    it on the test data. The model ended up performing with 100% precision, 94% recall, 
                    and 97% accuracy; an impressive showing!`,
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
      description: `Spotify Collage is a web application I developed during a hackathon
                    that gives users a clean and stylish interface with which they
                    can interact with a variety of different playlists. The application
                    makes use of the Spotify Web API and was built entirely in Flask.
                    All styling in the application was done by me in vanilla CSS, long
                    after the hackathon was complete so I could develop my frontend skills.`,
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
      description: `The Virtual Drumset is just as it sounds, an object-oriented virtual
                    drumset built entirely with Java. The program features 9 instruments that
                    make up a complete drumset, and allows users to record, save, and play tracks!
                    JUnit testing was used throughout the development of the project to ensure
                    code quality, and led to a streamlined design process.`,
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
    <WrapItem key={tool.id}>
    <Badge borderRadius="full" px="2" key={tool.id} colorScheme={tool.color}>
      {tool.name}
    </Badge>
    </WrapItem>
  ));

  return (
    <Card bg="#141517" style={{ overflowY: 'auto' }} height={'85vh'}>
      <CardBody>
        <Image src={image} alt={name} borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading color="white" size="md">{name}</Heading>
          <Text color="white ">{description}</Text>
        </Stack>
      </CardBody>
      <Divider color="white"/>
      <CardFooter>
        <Wrap spacing={3}>{features}</Wrap>
      </CardFooter>
    </Card>
  );
}

export default Projects;
