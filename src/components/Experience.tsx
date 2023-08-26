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

interface tool {
  name: string;
  color: string;
  id: string;
}

interface experience {
  title: string;
  company: string;
  description: string;
  year: number;
  image: string;
  tools: tool[];
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
    [theme.fn.smallerThan('xl')]: {
      width: '40%',
      left: '55%',
    },
  },

  card: {
    backgroundColor: theme.colors.dark[8],
    height: '85vh',
  },

  section: {
    borderBottom: `${rem(1)} solid ${theme.colors.dark[4]}`,
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

function Experience() {
  const { classes } = useStyles();

  const experiences: experience[] = [
    {
      title: 'Software Engineer Intern',
      company: 'Intel',
      description: `Subletter is a virtual marketplace for university students created
                    to ensure that only fellow students
                    respond to a student's listings. This project allowed me to branch out and 
                    truly develop my full-stack ability, especially since it is the first project in which I 
                    designed and implemented a databse. In this project, I implemented
                    was the live messaging interface, designed using Socket.IO. I also fully developed
                    the login system, leveraging tools such as JSON Web Tokens
                    and bcrypt to securely authenticate users.`,
      year: 2023,
      image: '/images/intel.png',
      tools: [
        { name: 'JavaScript', color: 'yellow', id: useId() },
        { name: 'Node.js', color: 'green', id: useId() },
        { name: 'Express.js', color: 'teal', id: useId() },
        { name: 'React.js', color: 'blue', id: useId() },
        { name: 'ChakraUI', color: 'teal', id: useId() },
        { name: 'MySQL', color: 'orange', id: useId() },
      ],
      color: '#ffffff',
      id: useId(),
    },
    {
      title: 'Computer Science Teaching Assistant',
      company: 'University of British Columbia',
      description: `Amidst the ever-changing landscape of technology, my
                  fascination for innovation continues to thrive. From crafting
                  elegant lines of code to diving deep into complex algorithms,
                  I find solace in thallenge
                  presents an opportunity to create, learn, and grow. With an
                  unwavering curiosity, I embrace the digital realm, driven to
                  shape the future one algorithm at a time.`,
      year: 2022,
      image: '/images/ubc.png',
      tools: [
        { name: 'JavaScript', color: 'yellow', id: useId() },
        { name: 'Python', color: 'blue', id: useId() },
        { name: 'Flask', color: 'teal', id: useId() },
        { name: 'React.js', color: 'blue', id: useId() },
        { name: 'OpenCV', color: 'red', id: useId() },
        { name: 'Tailwind CSS', color: 'teal', id: useId() },
      ],
      color: '#0C2344',
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
      {experiences.map((experience) => (
        <Carousel.Slide>
          <ExperienceCard
            key={experience.id}
            image={experience.image}
            title={experience.title}
            company={experience.company}
            description={experience.description}
            year={experience.year}
            color={experience.color}
            tools={experience.tools}
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}

interface ExperienceCardProps {
  image: string;
  title: string;
  company: string;
  year: number;
  description: string;
  color: string;
  tools: tool[];
}

function ExperienceCard({
  image,
  title,
  company,
  description,
  year,
  color,
  tools,
}: ExperienceCardProps) {
  const { classes } = useStyles();

  const features = tools.map((tool) => (
    <Badge key={tool.id} color={tool.color}>
      {tool.name}
    </Badge>
  ));

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section style={{ backgroundColor: color }}>
        <Image src={image} alt={company} height={180} fit="contain" />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group>
          <Text fz="lg" fw={500}>
            {title}
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
          Skills Used
        </Text>
        <Group spacing={7} mt={5}>
          {features}
        </Group>
      </Card.Section>
    </Card>
  );
}

export default Experience;
