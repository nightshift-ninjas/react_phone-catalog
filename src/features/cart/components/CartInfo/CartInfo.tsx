import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../shared/ui/Button';
import type React from 'react';
import { useContext } from 'react';
import { LanguageContext } from '../../../../shared/context/language';
import { ROUTES } from '../../../../shared/config/routes';

import './CartInfo.scss';

type Props = {
  total: number;
  itemsCount: number;
};

export const CartInfo: React.FC<Props> = ({ total, itemsCount }) => {
  const navigate = useNavigate();
  const { language: lng } = useContext(LanguageContext)!;

  const handleClick = () => navigate(`/${lng}/${ROUTES.checkout}`);

  return (
    <div className="cart-info">
      <div className="cart-info__wrapper">
        <div className="cart-info__total-price">${total}</div>
        <div className="cart-info__total-items">
          Total for {itemsCount} items
        </div>
      </div>

      <div className="cart-info__divider" />

      <Button onClick={handleClick}>Checkout</Button>
    </div>
  );
};
