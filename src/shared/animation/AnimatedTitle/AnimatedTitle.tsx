import { motion } from 'framer-motion';
import React from 'react';

type Props = {
  text: string;
};

export const AnimatedTitle: React.FC<Props> = ({ text }) => {
  const words = text.split(' ');

  let globalIndex = 0;

  const letterVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
      },
    }),
  };

  return (
    <h1
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
      }}
    >
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          style={{
            display: 'inline-flex',
          }}
        >
          {word.split('').map((letter, letterIndex) => {
            const currentIndex = globalIndex++;
            return (
              <motion.span
                key={letterIndex}
                variants={letterVariant}
                initial="hidden"
                animate="visible"
                custom={currentIndex}
              >
                {letter}
              </motion.span>
            );
          })}
        </span>
      ))}
    </h1>
  );
};
