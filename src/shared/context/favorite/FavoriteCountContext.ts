import { createContext } from 'react';

export type FavoriteCountContextType = {
  count: number;
  increase: () => void;
  decrease: () => void;
  clear: () => void;
  set: (value: number) => void;
};

export const FavoriteCountContext =
  createContext<FavoriteCountContextType | null>(null);
