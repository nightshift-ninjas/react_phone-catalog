import { useContext } from 'react';
import { FavoriteCountContext } from './FavoriteCountContext';

export function useFavoriteCount() {
  const ctx = useContext(FavoriteCountContext);

  if (!ctx) {
    throw new Error(
      'useFavoriteCount must be used inside FavoriteCountProvider',
    );
  }

  return ctx;
}
