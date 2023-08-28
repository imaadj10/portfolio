import { createStyles, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colors.dark[8],
    height: '85vh',
    width: '35%',
    left: '55%',
    overflowY: 'auto',
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
}));

export { useStyles };
