import { useContext } from 'react';
import { CartCountContext } from './CartCountContext';

export function useCartCount() {
  const ctx = useContext(CartCountContext);

  if (!ctx) {
    throw new Error('useCartCount must be used inside CartCountProvider');
  }

  return ctx;
}
