import React, { useState, useContext } from 'react';
import './CartItem.scss';
import type { CartItem as CartItemType } from '../../../../services/cart';
import { cartService } from '../../../../services/cart/cart.services';
import { QuantityControl } from '../QuantityControl/QuantityControl';
import { BASE_URL } from '../../../../widgets/ProductCard';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../../../../shared/context/language';
import { ROUTES } from '../../../../shared/config/routes';
import { useCurrency } from '../../../../shared/context/currency';
import { convertPrice } from '../../../../shared/utils';
import type { Currency } from '../../../../widgets/CurrencyButton';
import { useCartCount } from '../../../../shared/context/cart';
import { useTranslation } from 'react-i18next';

export type Props = {
  item: CartItemType;
  onRemove?: () => void;
  onQuantityChange?: (id: string, quantity: number) => void;
};

export const CartItem: React.FC<Props> = ({
  item,
  onRemove,
  onQuantityChange,
}) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const { language: lng } = useContext(LanguageContext)!;
  const { rates, currentCurrency } = useCurrency();
  const { decrease: decreaseCart } = useCartCount();
  const { t } = useTranslation('cartPage');

  const totalPrice = convertPrice(
    (item.product?.priceDiscount ?? item.product?.priceRegular ?? 0) * quantity,
    rates,
    currentCurrency as Currency,
  );

  const [isProcessing, setIsProcessing] = useState(false);

  const handleRemove = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      await cartService.removeCartItemById(item.id);
      onRemove?.();
      decreaseCart();
    } catch (error) {
      console.error('Failed to remove cart item:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleIncrease = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const newQty = quantity + 1;
      const updated = { ...item, quantity: newQty };
      await cartService.updateCartItem(item.id, updated);

      setQuantity(newQty);
      onQuantityChange?.(item.id, newQty);
    } catch (error) {
      console.error('Failed to increase quantity:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDecrease = async () => {
    if (quantity === 1 || isProcessing) return;
    setIsProcessing(true);

    try {
      const newQty = quantity - 1;
      const updated = { ...item, quantity: newQty };
      await cartService.updateCartItem(item.id, updated);

      setQuantity(newQty);
      onQuantityChange?.(item.id, newQty);
    } catch (error) {
      console.error('Failed to decrease quantity:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const productLink = `/${lng}/${ROUTES.catalog}/${item.product?.category}/product/${item.product?.id}`;

  return (
    <div className="cart-item">
      <div className="cart-item__top">
        <button className="cart-item__remove" onClick={handleRemove}>
          ×
        </button>

        <Link to={productLink} className="cart-item__title">
          <div className="cart-item__link-wrapper">
            <div className="cart-item__image_wrapper">
              <img
                src={`${BASE_URL}${item.product?.images?.[0] ?? 'placeholder.png'}`}
                alt={item.product?.name || t('productImageAlt')}
                className="cart-item__image"
              />
            </div>

            <p>{item.product?.name}</p>
          </div>
        </Link>
      </div>

      <div className="cart-item__bottom">
        <div className="cart-item__quantity">
          <QuantityControl
            quantity={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />
        </div>

        <div className="cart-item__price">{totalPrice}</div>
      </div>
    </div>
  );
};
