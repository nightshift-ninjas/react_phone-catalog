import React from 'react';
import { motion } from "framer-motion";
import { microFade, microFadeDelay } from "../../../../shared/animation/micro";
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
    <motion.div className="checkout-list" {...microFade}>
      
      {isLoading && <Spinner />}

      {!isLoading && !noProducts && (
        <ul className="checkout-list__list">
          {cartItems.map((item, index) => (
            <motion.li
              key={item.id}
              className="checkout-list__item"
              {...microFadeDelay(index * 0.05)}
            >
              <CartItem 
                item={item}
                onQuantityChange={onQuantityChange}
                onRemove={() => onRemoveItem?.(item.id)}
              />
            </motion.li>
          ))}
        </ul>
      )}

      {!isLoading && noProducts && (
        <motion.h4 className="checkout-list__text" {...microFade}>
          {t('noProducts')}
        </motion.h4>
      )}

      <motion.div
        className="checkout-list__currency-chart"
        {...microFadeDelay(0.2)}
      >
        <CurrencyRatesChart />
      </motion.div>
    </motion.div>
  );
};
