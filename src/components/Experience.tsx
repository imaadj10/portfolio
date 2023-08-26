import { Carousel } from '@mantine/carousel';
import { useId } from '@mantine/hooks';
import {
  Card,
  Image,
  Text,
  Badge,
  Group,
  rem,
} from '@mantine/core';
import { useStyles } from '../styles/ExperienceStyles';

interface tool {
  name: string;
  color: string;
  id: string;
}

interface experience {
  title: string;
  company: string;
  description: string;
  date: string;
  image: string;
  tools: tool[];
  color: string;
  id: string;
}

function Experience() {
  const { classes } = useStyles();

  const experiences: experience[] = [
    {
      title: 'Software Engineer Intern',
      company: 'Intel',
      description: `As a software engineer intern at Intel, I had the opportunity
                    to work on embedded software for network interface cards and
                    infrastructure processing units. Some of my accomplishments include
                    increasing code coverage by 40% for device reset unit tests, embedding
                    a new manageability feature and adding over 500 tests to CI, and refactoring
                    various tests written in C# to adhere to object-oriented design principles.`,
      date: 'Sep 2022 - Apr 2023',
      image: '/images/intel.png',
      tools: [
        { name: 'C', color: 'blue', id: useId() },
        { name: 'C#', color: 'violet', id: useId() },
        { name: '.NET', color: 'grape', id: useId() },
        { name: 'Jira', color: 'blue', id: useId() },
        { name: 'Scrum/Agile', color: 'indigo', id: useId() },
        { name: 'Debugging', color: 'yellow', id: useId() },
        { name: 'Problem Solving', color: 'pink', id: useId() },
      ],
      color: '#ffffff',
      id: useId(),
    },
    {
      title: 'Computer Science Teaching Assistant',
      company: 'University of British Columbia',
      description: `Being a TA for an introductory programming course has allowed me
                    to strengthen the foundation of my computer science education through
                    helping others learn. As a TA I support the learning of over 30 students
                    in weekly labs, and am available for all students in weekly office hours.
                    I have recently taken on a more administrative role and have helped plan
                    different elements of the course and provided assistance on redefining
                    it's structure.`,
      date: 'Sep 2021 - Present',
      image: '/images/ubc.png',
      tools: [
        { name: 'C', color: 'blue', id: useId() },
        { name: 'Teaching', color: 'cyan', id: useId() },
        { name: 'Teamwork', color: 'teal', id: useId() },
        { name: 'Communication', color: 'green', id: useId() },
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
            date={experience.date}
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
  date: string;
  description: string;
  color: string;
  tools: tool[];
}

function ExperienceCard({
  image,
  title,
  company,
  description,
  date,
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
          <Badge size="sm">{date}</Badge>
        </Group>
        <Text italic fz="sm">
          {company}
        </Text>
        <Text fz="sm" mt="xs">
          {description}
        </Text>
      </Card.Section>

      <Card.Section
        style={{ position: 'relative' }}
        className={classes.section}
      >
        <Text mt="xs" className={classes.label} c="dimmed">
          Applicable Skills
        </Text>
        <Group spacing={7} mt={5}>
          {features}
        </Group>
      </Card.Section>
    </Card>
  );
}

export default Experience;
