import { createStyles, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colors.dark[8],
    width: '35%',
    left: '55%',
    overflowY: 'auto',
    top: '20vh',
    maxHeight: 'clamp(320px, 60vh, 620px)',
    [theme.fn.smallerThan('xl')]: {
      width: '40%',
      left: '55%',
      top: 0,
    },
    [theme.fn.smallerThan('lg')]: {
      maxHeight: 'clamp(280px, 80vh, 620px)',
    },
  },

  section: {
    borderBottom: `${rem(1)} solid ${theme.colors.dark[4]}`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  description: {
    fontSize: theme.fontSizes.md,
    [theme.fn.smallerThan('xl')]: {
      fontSize: theme.fontSizes.sm,
    },
  },
}));

export { useStyles };
