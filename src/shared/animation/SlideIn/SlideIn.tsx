import React from 'react';
import { motion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  beforeAnimationState?: {
    opacity?: number;
    y?: number;
    x?: number;
    delay?: number;
    duration?: number;
  };
};

export const SlideIn: React.FC<Props> = ({
  children,
  beforeAnimationState,
}) => {
  const {
    x = 0,
    y = 30,
    opacity = 0.7,
    delay = 0,
    duration = 0.3,
  } = beforeAnimationState || {};

  return (
    <motion.div
      initial={{ x, y, opacity }}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      transition={{ delay, duration }}
    >
      {children}
    </motion.div>
  );
};
