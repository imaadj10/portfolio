import { createStyles, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colors.dark[8],
    width: '25%',
    left: '65%',
    top: 200,
    overflowY: 'auto',
    [theme.fn.smallerThan('xl')]: {
      width: '40%',
      left: '55%',
      top: 100,
    },
    [theme.fn.smallerThan('md')]: {
      width: '40%',
      left: '55%',
      top: 0,
    },
  },

  section: {
    borderBottom: `${rem(1)} solid ${theme.colors.dark[4]}`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  label: {
    fontSize: theme.fontSizes.lg,
    [theme.fn.smallerThan('xl')]: {
      fontSize: theme.fontSizes.md,
    },
  },

  buttonLabel: {
    fontSize: theme.fontSizes.sm,
    [theme.fn.smallerThan('xl')]: {
      fontSize: theme.fontSizes.xs,
    },
  },
}));

export { useStyles };
