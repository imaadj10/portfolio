import { rem, createStyles } from '@mantine/core';

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

export { useStyles };