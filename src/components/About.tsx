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
  return <AboutCard />;
}

function AboutCard() {
  const { classes } = useStyles();

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      {/* <Card.Section> */}
        <Image
          src={'/images/imaad.jpg'}
          alt={'Imaad Junaidi'}
          height={300}
          fit="contain"
          radius={120}
          style={{ borderRadius: "50px"}}
        />
      {/* </Card.Section> */}

      <Card.Section className={classes.section} mt="md">
        <Group>
          <Text fz="lg" fw={500}>
            {'Imaad Junaidi'}
          </Text>
          {/* <Badge size="sm">{year}</Badge> */}
        </Group>
        <Text fz="sm" mt="xs">
          {'Imaad Junaidi'}
        </Text>
      </Card.Section>
    </Card>
  );
}

export default About;
