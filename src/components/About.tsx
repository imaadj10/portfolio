import {
  Flex,
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Avatar, 
} from '@mantine/core';
import { useStyles } from '../styles/AboutStyles';

function About() {
  return <AboutCard />;
}

function AboutCard() {
  const { classes } = useStyles();

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Flex gap="lg" align={'center'} justify={'center'}>
        <Text fz="50px" fw={500}>Hi, i'm Imaad</Text>
        <Avatar
          src={'/images/imaad.jpg'}
          alt={'Imaad Junaidi'}
          size="150px"
          radius={'300px'}
        />
      </Flex>

      <Card.Section className={classes.section} mt="md">
        <Text fz="md" mt="xs">
          {'I am currently a third year Computer Science student at the University of British Columbia.'}
        </Text>
      </Card.Section>
    </Card>
  );
}

export default About;
