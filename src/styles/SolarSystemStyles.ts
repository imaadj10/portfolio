import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  button: {
    transition: 'opacity 150ms ease',
    opacity: 0.5,
    background: 'transparent',
  },

  root: {
    '&:hover': {
      opacity: 1,
    },
  },
}));

export { useStyles };
