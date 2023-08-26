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
  return (
    <ContactCard
      name={'Hi, I am Imaad'}
      description={'What is up'}
    />
  );
}

interface ContactCardProps {
  name: string;
  description: string;
}

function ContactCard({
  name,
  description,
}: ContactCardProps) {
  const { classes } = useStyles();

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
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

export default Contact;
