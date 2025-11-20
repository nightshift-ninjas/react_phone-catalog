import React from 'react';
import type { CartItem as CartItemType } from '../../../../services/cart';
import { CartItem } from '../../../cart/components/CartItem';
import './CheckoutList.scss';

type Props = {
  cartItems: CartItemType[];
};

export const CheckoutList: React.FC<Props> = ({ cartItems }) => {
  return (
    <ul className="checkout-list">
      {cartItems.map((item) => (
        <li key={item.id} className="checkout-list__item">
          <CartItem item={item} />
        </li>
      ))}
    </ul>
  );
};
