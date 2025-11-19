import React from 'react';
import type { CartItem } from '../../../../services/cart';
import './CheckoutInfo.scss';
import PayPalCheckout from '../PayPalCheckout/PayPalCheckout';
import { PaymentMethod } from '../CheckoutForm';

type Props = {
  cartItems: CartItem[];
  paymentMethod: PaymentMethod;
};

export const CheckoutInfo: React.FC<Props> = ({ cartItems, paymentMethod }) => {
  const totalAmount = cartItems.reduce((sum, item) => {
    const price =
      item.product?.priceDiscount ?? item.product?.priceRegular ?? 0;
    return sum + price * item.quantity;
  }, 0);

  return (
    <section className="checkout-info" aria-labelledby="checkout-summary-title">
      <h2 className="checkout-info__title">Order Summary</h2>

      <dl className="checkout-info__list">
        <div className="checkout-info__row">
          <dt>Subtotal</dt>
          <dd>${totalAmount}</dd>
        </div>

        <div className="checkout-info__row">
          <dt>Shipping</dt>
          <dd>--</dd>
        </div>

        <hr className="checkout-info__divider" />

        <div className="checkout-info__row checkout-info__row--total">
          <dt>Total (USD)</dt>
          <dd>${totalAmount}</dd>
        </div>
      </dl>

      {paymentMethod === PaymentMethod.ONLINE_PAYMENT && (
        <PayPalCheckout totalAmount={totalAmount} />
      )}
    </section>
  );
};
