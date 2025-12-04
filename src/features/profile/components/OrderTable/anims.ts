import { type Variants } from 'framer-motion';

export const tableVariants: Variants = {
  initial: {
    opacity: 0.5,
    y: 40,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: 40,
  },
};
