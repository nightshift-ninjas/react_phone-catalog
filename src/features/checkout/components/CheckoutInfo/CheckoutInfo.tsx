import React from 'react';
import './CheckoutInfo.scss';
import PayPalCheckout from '../PayPalCheckout/PayPalCheckout';
import { Button } from '../../../../shared/ui/Button';
import { PaymentMethod } from '../../../../services/order';

type Props = {
  totalAmount: number;
  paymentMethod: PaymentMethod;
  formRef: React.RefObject<HTMLFormElement | null>;
};

export const CheckoutInfo: React.FC<Props> = ({
  paymentMethod,
  formRef,
  totalAmount,
}) => {
  const submitOrder = () => {
    formRef.current?.requestSubmit();
  };

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

      {paymentMethod === PaymentMethod.ONLINE_PAYMENT ? (
        <PayPalCheckout totalAmount={totalAmount} onSuccess={submitOrder} />
      ) : (
        <Button onClick={submitOrder}>Confirm Order</Button>
      )}
    </section>
  );
};
