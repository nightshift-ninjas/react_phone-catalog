import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../shared/hooks';
import { useNavigate } from 'react-router-dom';

import { CheckoutForm } from './components/CheckoutForm';
import { CheckoutList } from './components/CheckoutList';
import { CheckoutInfo } from './components/CheckoutInfo';

import { PaymentMethod } from '../../services/order';
import { useCheckoutCart } from './hooks/useCheckoutCart';
import { useSubmitOrder } from './hooks/useSubmitOrder';

import './CheckoutPage.scss';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const { user, loading: authLoading } = useAuth();

  const {
    cart,
    cartItems,
    loading: cartLoading,
    error,
    setCartItems,
  } = useCheckoutCart(user?.uid);

  const { submitOrder } = useSubmitOrder();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.ONLINE_PAYMENT,
  );

  // Redirect if user is not logged in
  useEffect(() => {
    if (!authLoading && !user) navigate('/auth');
  }, [user, authLoading, navigate]);

  // Redirect if cart is empty after loading
  useEffect(() => {
    if (!cartLoading && cart && cartItems.length === 0) {
      navigate('/');
    }
  }, [cartLoading, cart, cartItems, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!cart) return;

    try {
      await submitOrder(cart, cartItems, new FormData(event.currentTarget));
      setCartItems([]);
      event.currentTarget.reset();
      navigate('/profile');
    } catch (err) {
      console.error(err);
    }
  };

  const totalAmount = cartItems.reduce(
    (sum, item) =>
      sum +
      (item.product?.priceDiscount ?? item.product?.priceRegular ?? 0) *
        item.quantity,
    0,
  );

  return (
    <section className="checkout">
      <div className="checkout__section">
        <CheckoutForm
          ref={formRef}
          user={user}
          onSubmit={handleSubmit}
          onPaymentMethodChange={setPaymentMethod}
        />
      </div>

      <div className="checkout__section">
        <CheckoutList
          cartItems={cartItems}
          noProducts={!cartItems.length || !!error}
          isLoading={cartLoading}
        />
      </div>

      <div className="checkout__section">
        <CheckoutInfo
          totalAmount={totalAmount}
          paymentMethod={paymentMethod}
          formRef={formRef}
        />
      </div>
    </section>
  );
};
