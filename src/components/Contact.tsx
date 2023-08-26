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
import { IconBrandLinkedin, IconMailFilled } from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colors.dark[8],
    height: '52vh',
    width: '35%',
    left: '55%',
    top: 155,
    [theme.fn.smallerThan('xl')]: {
      width: '40%',
      left: '55%',
      top: 100,
    },
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

function Contact() {
  return <ContactCard name={'Hi, I am Imaad'} description={'What is up'} />;
}

interface ContactCardProps {
  name: string;
  description: string;
}

function ContactCard({ name, description }: ContactCardProps) {
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
              title="Code"
            >
              <Image
                src={'images/github.png'}
                height="20px"
                radius="xl"
                fit="contain"
              />
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
              title="Code"
            >
              <IconBrandLinkedin />
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
              title="Code"
            >
              <IconMailFilled />
              <Text ml="xs">imaadjunaidi1011@gmail.com</Text>
            </Button>
          </Flex>
        </Flex>
      </Card.Section>
    </Card>
  );
}

export default Contact;
