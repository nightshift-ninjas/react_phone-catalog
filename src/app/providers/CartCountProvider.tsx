import React, { useState, useEffect } from 'react';
import { CartCountContext } from '../../shared/context/cart';
import { useAuth } from '../../shared/hooks/useAuth';
import { cartService } from '../../services/cart/cart.services';

type Props = {
  children: React.ReactNode;
};

export const CartCountProvider: React.FC<Props> = ({ children }) => {
  const { user } = useAuth();
  const [count, setCount] = useState(0);

  const increase = () => setCount((c) => c + 1);
  const decrease = () => setCount((c) => Math.max(0, c - 1));
  const clear = () => setCount(0);

  useEffect(() => {
    const fetchCount = async () => {
      if (!user) {
        setCount(() => 0);
        return;
      }

      const initialCount = await cartService.getCartItemCountByUserId(user.uid);
      setCount(() => initialCount);
    };

    fetchCount();
  }, [user]);

  return (
    <CartCountContext.Provider
      value={{ count, increase, decrease, clear, set: setCount }}
    >
      {children}
    </CartCountContext.Provider>
  );
};
