import React, { useEffect, useRef, useState } from 'react';
import type { Cart, CartItem } from '../../services/cart';
import { useAuth } from '../../shared/hooks';
import { useNavigate } from 'react-router-dom';
import { cartService } from '../../services/cart/cart.services';
import { CheckoutForm, PaymentMethod } from './components/CheckoutForm';
import { CheckoutList } from './components/CheckoutList';
import { CheckoutInfo } from './components/CheckoutInfo';
import './CheckoutPage.scss';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();

  const { user, loading: authLoading } = useAuth();

  const [cart, setCart] = useState<Cart | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate('/auth');
    }

    const loadCartAndItems = async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await cartService.getOrCreateCart(user!.uid);
        setCart(response);

        const cartItems = await cartService.fetchCartItems(response.id);
        setCartItems(cartItems);
      } catch (error) {
        setError(`Something went wrong while fetching cart: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadCartAndItems();
  }, [user, authLoading, navigate]);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const dataObject = Object.fromEntries(formData.entries());
    console.log('Checkout form data:', dataObject);
  };

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.ONLINE_PAYMENT,
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
        <CheckoutList cartItems={cartItems} />
      </div>

      <div className="checkout__section">
        <CheckoutInfo cartItems={cartItems} paymentMethod={paymentMethod} />
      </div>
    </section>
  );
};
