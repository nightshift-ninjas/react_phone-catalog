import { useEffect, useState } from 'react';
import { cartService } from '../../../services/cart/cart.services';
import type { Cart, CartItem } from '../../../services/cart';

export function useCheckoutCart(userId?: string) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!userId) return;

    const load = async () => {
      setLoading(true);
      setError('');

      try {
        const cart = await cartService.getOrCreateCart(userId);
        setCart(cart);
        setCartItems(await cartService.fetchCartItems(cart.id));
      } catch (err) {
        setError(`Failed to load cart: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [userId]);

  return { cart, cartItems, loading, error, setCartItems };
}
