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
    scale?: number;
  };
  once?: boolean;
  trigger?: 'view' | 'load';
};

export const SlideIn: React.FC<Props> = ({
  children,
  beforeAnimationState,
  once = true,
  trigger = 'view',
}) => {
  const {
    x = 0,
    y = 30,
    scale = 1,
    opacity = 0.7,
    delay = 0,
    duration = 0.3,
  } = beforeAnimationState || {};

  const transition = { delay, duration };

  const animationProps =
    trigger === 'view'
      ? { whileInView: { x: 0, y: 0, opacity: 1, scale: 1, transition } }
      : { animate: { x: 0, y: 0, opacity: 1, scale: 1, transition } };

  return (
    <motion.div
      initial={{ x, y, opacity, scale }}
      {...animationProps}
      viewport={{ once }}
    >
      {children}
    </motion.div>
  );
};
