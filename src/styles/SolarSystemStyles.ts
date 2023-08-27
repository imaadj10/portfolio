import { createStyles, getStylesRef } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  button: {
    ref: getStylesRef('button'),
    transition: 'opacity 150ms ease',
    opacity: 0.5,
    background: 'transparent'
  },

  image: {
    ref: getStylesRef('image'),
    transition: 'opacity 150ms ease',
    opacity: 0.5,
  },

  root: {
    '&:hover': {
      [`& .${getStylesRef('image')}`]: {
        opacity: 1,
      },
      opacity: 1,
    },
  },
}));

export { useStyles };
