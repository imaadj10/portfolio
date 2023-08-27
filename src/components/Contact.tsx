import { Button, Card, Flex, Group, Text } from '@mantine/core';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { useStyles } from '../styles/ContactStyles';

function Contact() {
  return <ContactCard />;
}

function ContactCard() {
  const { classes } = useStyles();

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section className={classes.section} mt="md">
        <Group position="center">
          <Text style={{ fontSize: '36px' }} mt="md" fw={500}>
            Reach out to me!
          </Text>
        </Group>
        <Flex direction="column" align={'center'} gap="xl">
          <Flex direction="column" align="center">
            <Text>Follow me on GitHub:</Text>
            <Button
              size="xs"
              color="dark"
              radius="md"
              variant="default"
              component="a"
              href={'https://www.github.com/imaadj10/'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
              <Text ml="xs">imaadj10</Text>
            </Button>
          </Flex>

          <Flex direction="column" align="center">
            <Text>Connect with me on LinkedIn:</Text>
            <Button
              size="xs"
              color="blue"
              radius="md"
              variant="filled"
              component="a"
              href={'https://www.linkedin.com/in/imaad-junaidi/'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
              <Text ml="xs">Imaad Junaidi</Text>
            </Button>
          </Flex>

          <Flex direction="column" align="center">
            <Text>Send me an email:</Text>
            <Button
              size="xs"
              color="green"
              radius="md"
              variant="filled"
              component="a"
              href={'mailto:imaadjunaidi1011@gmail.com'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <EmailIcon />
              <Text ml="xs">imaadjunaidi1011@gmail.com</Text>
            </Button>
          </Flex>
        </Flex>
      </Card.Section>
    </Card>
  );
}

export default Contact;
