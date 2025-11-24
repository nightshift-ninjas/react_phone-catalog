import type { Variants } from 'framer-motion';

export const listItemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: index * 0.05, ease: "easeOut" },
  }),
  exit: { opacity: 0, y: 40, transition: { duration: 0.3, ease: "easeIn" } },
};
