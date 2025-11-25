import React from 'react';
import { motion, type Variants } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  transitionVariants?: Variants
};

const DEFAULT_VARIANTS = {
  initial: { opacity: 0, y: 20 },
  in: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'tween', duration: 0.7, ease: 'easeInOut' } 
  },
  out: { 
    opacity: 0, 
    y: -20, 
    transition: { type: 'tween', duration: 0.5, ease: 'easeInOut' } 
  }
};

export const PageSwitcher: React.FC<Props> = ({ children, transitionVariants = DEFAULT_VARIANTS as Props['transitionVariants']}) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={transitionVariants}
    >
      {children}
    </motion.div>
  );
};
