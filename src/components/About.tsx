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
import { useStyles } from '../styles/AboutStyles';

function About() {
  return (
    <AboutCard
      image={'/images/imaad.jpg'}
      name={'Hi, I am Imaad'}
      description={'What is up'}
    />
  );
}

interface AboutCardProps {
  image: string;
  name: string;
  description: string;
}

function AboutCard({
  image,
  name,
  description,
}: AboutCardProps) {
  const { classes } = useStyles();

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={image} alt={name} height={300} fit="contain" />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group>
          <Text fz="lg" fw={500}>
            {name}
          </Text>
          {/* <Badge size="sm">{year}</Badge> */}
        </Group>
        <Text fz="sm" mt="xs">
          {description}
        </Text>
      </Card.Section>
    </Card>
  );
}

export default About;
