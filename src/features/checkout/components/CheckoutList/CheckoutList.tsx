import React from 'react';
import type { CartItem as CartItemType } from '../../../../services/cart';
import { CartItem } from '../../../cart/components/CartItem';
import './CheckoutList.scss';
import Spinner from '../../../../shared/ui/Spinner/Spinner';
import { CurrencyRatesChart } from '../CurrencyRatesChart';

type Props = {
  cartItems: CartItemType[];
  noProducts?: boolean;
  isLoading: boolean;
};

export const CheckoutList: React.FC<Props> = ({
  cartItems,
  isLoading,
  noProducts = false,
}) => {
  return (
    <div className="checkout-list">
      {isLoading && <Spinner />}

      {!isLoading && !noProducts && (
        <ul className="checkout-list__list">
          {cartItems.map((item) => (
            <li key={item.id} className="checkout-list__item">
              <CartItem item={item} />
            </li>
          ))}
        </ul>
      )}

      {!isLoading && noProducts && (
        <h4 className="checkout-list__text">
          It seems like you have no products in your cart yet
        </h4>
      )}

      <div className="checkout-list__currency-chart">
        <CurrencyRatesChart />
      </div>
    </div>
  );
};
