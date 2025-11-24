import React, { useState, useEffect } from 'react';
import { FavoriteCountContext } from '../../shared/context/favorite';
import { useAuth } from '../../shared/hooks/useAuth';
import { favoriteService } from '../../services/favorite';

type Props = {
  children: React.ReactNode;
};

export const FavoriteCountProvider: React.FC<Props> = ({ children }) => {
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

      const initialCount = await favoriteService.getFavoriteCountByUserId(
        user.uid,
      );
      setCount(() => initialCount);
    };

    fetchCount();
  }, [user]);

  return (
    <FavoriteCountContext.Provider
      value={{ count, increase, decrease, clear, set: setCount }}
    >
      {children}
    </FavoriteCountContext.Provider>
  );
};
