import { createContext } from 'react';

export type CartCountContextType = {
  count: number;
  increase: () => void;
  decrease: () => void;
  clear: () => void;
  set: (value: number) => void;
};

export const CartCountContext = createContext<CartCountContextType | null>(
  null,
);
