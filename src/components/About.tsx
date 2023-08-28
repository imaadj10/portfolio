import { Avatar, Card, Flex, Text } from '@mantine/core';
import { useStyles } from '../styles/AboutStyles';

function About() {
  return <AboutCard />;
}

function AboutCard() {
  const { classes } = useStyles();

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Flex gap="lg" align={'center'} justify={'center'}>
        <Text fz="50px" fw={500}>
          Hi, i'm Imaad
        </Text>
        <Avatar
          src={'/images/imaad.jpg'}
          alt={'Imaad Junaidi'}
          size="150px"
          radius={'300px'}
        />
      </Flex>

      <Card.Section className={classes.section} mt="md">
        <Text mt="xs" className={classes.description}>
          {`I'm from Peoria, Illinois, and am currently a third year Computer Science student at the University of British Columbia.
            When I took my first introductory programming course in school, I instantly fell in love with the field.
            I knew that the combination of intense problem solving and creative freedom characteristic of software engineering
            was perfect for me. Now I spend my days working on projects, learning new technologies, and just enjoying
            everything programming has to offer.`}
          <br />
          <br />
          {`When I'm not typing away at a computer I love to play the drums, hyperanalyze TV shows (I could talk for days
              about Succession), and, if you couldn't tell by the website, learn about space.`}
          <br />
          <br />
          {`I'm always looking for new internship opportunities, so please feel free to message me if you're interested, or if
            you'd just like to chat!`}
        </Text>
      </Card.Section>
    </Card>
  );
}

export default About;
