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

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colors.dark[8],
    height: '85vh',
    width: '35%',
    left: '55%',
    [theme.fn.smallerThan('xl')]: {
      width: '40%',
      left: '55%',
    },
  },

  section: {
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
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
        <Image src={image} alt={name} height={180} fit="contain" />
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
