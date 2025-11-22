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

export type Props = {
  item: CartItemType;
  onRemove?: () => void;
};

export const CartItem: React.FC<Props> = ({ item, onRemove }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const { language: lng } = useContext(LanguageContext)!;
  const { rates, currentCurrency } = useCurrency();

  const totalPrice = convertPrice(
    (item.product?.priceDiscount ?? item.product?.priceRegular ?? 0) * quantity,
    rates,
    currentCurrency as Currency,
  );

  const handleRemove = async () => {
    try {
      await cartService.removeCartItemById(item.id);
      onRemove?.();
    } catch (error) {
      console.error('Failed to remove cart item:', error);
    }
  };

  const handleIncrease = async () => {
    try {
      const updated = { ...item, quantity: quantity + 1 };
      await cartService.updateCartItem(item.id, updated);
      setQuantity((q) => q + 1);
    } catch (error) {
      console.error('Failed to increase quantity:', error);
    }
  };

  const handleDecrease = async () => {
    if (quantity === 1) return;

    try {
      const updated = { ...item, quantity: quantity - 1 };
      await cartService.updateCartItem(item.id, updated);
      setQuantity((q) => q - 1);
    } catch (error) {
      console.error('Failed to decrease quantity:', error);
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
                alt={item.product?.name || 'Product image'}
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
