import { createStyles, getStylesRef, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  controls: {
    ref: getStylesRef('controls'),
    width: '120%',
    position: 'absolute',
    top: '50%',
    left: '-10%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.fn.smallerThan('md')]: {
      width: '130%',
      left: '-15%',
    },
  },

  root: {
    '&:hover': {
      [`& .${getStylesRef('controls')}`]: {
        opacity: 1,
      },
    },
  },

  carousel: {
    width: '35%',
    left: '55%',
    top: 155,
    [theme.fn.smallerThan('xl')]: {
      width: '40%',
      top: 0,
    },
  },

  card: {
    backgroundColor: theme.colors.dark[8],
    height: '52vh',
    overflowY: 'auto',
    [theme.fn.smallerThan('xl')]: {
      height: '85vh',
    },
  },

  section: {
    borderBottom: `${rem(1)} solid ${theme.colors.dark[4]}`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  title: {
    fontSize: theme.fontSizes.xl,
    [theme.fn.smallerThan('xl')]: {
      fontSize: theme.fontSizes.lg,
    },
  },

  description: {
    fontSize: theme.fontSizes.md,
    [theme.fn.smallerThan('xl')]: {
      fontSize: theme.fontSizes.sm,
    },
  },

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

export { useStyles };
