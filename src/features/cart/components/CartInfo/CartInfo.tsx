import { useNavigate } from "react-router-dom";
import { Button } from "../../../../shared/ui/Button";
import type React from "react";

import './CartInfo.scss';

type Props = {
  total: number;
  itemsCount: number;
};

export const CatrInfo: React.FC<Props> = ({ total, itemsCount }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate('/checkout');

  return (
    <div className="cart-info">
      <div className="cart-info__wrapper">
        <div className="cart-info__total-price">${total}</div>
        <div className="cart-info__total-items">Total for {itemsCount} items</div>
      </div>
      <div className="cart-info__divider" />
      <Button onClick={handleClick}>Checkout</Button>
    </div>
  );
};