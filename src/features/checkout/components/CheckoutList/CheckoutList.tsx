import React from 'react';
import type { CartItem as CartItemType } from '../../../../services/cart';
import { CartItem } from '../../../cart/components/CartItem';
import './CheckoutList.scss';
import { Spinner } from '../../../../shared/ui/Spinner';
import { CurrencyRatesChart } from '../CurrencyRatesChart';
import { useTranslation } from 'react-i18next';

type Props = {
  cartItems: CartItemType[];
  noProducts?: boolean;
  isLoading: boolean;
  onRemoveItem?: (id: string) => void;
  onQuantityChange?: (id: string, qty: number) => void;
};

export const CheckoutList: React.FC<Props> = ({
  cartItems,
  isLoading,
  noProducts = false,
  onQuantityChange,
  onRemoveItem,
}) => {
  const { t } = useTranslation('checkoutList');
  return (
    <div className="checkout-list">
      {isLoading && <Spinner />}

      {!isLoading && !noProducts && (
        <ul className="checkout-list__list">
          {cartItems.map((item) => (
            <li key={item.id} className="checkout-list__item">
              <CartItem 
                item={item} 
                onQuantityChange={onQuantityChange} 
                onRemove={() => onRemoveItem?.(item.id)} 
              />
            </li>
          ))}
        </ul>
      )}

      {!isLoading && noProducts && (
        <h4 className="checkout-list__text">
          {t('noProducts')}
        </h4>
      )}

      <div className="checkout-list__currency-chart">
        <CurrencyRatesChart />
      </div>
    </div>
  );
};
