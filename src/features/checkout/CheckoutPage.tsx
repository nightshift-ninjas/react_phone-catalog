import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../shared/hooks';
import { useNavigate } from 'react-router-dom';
import { CheckoutForm } from './components/CheckoutForm';
import { CheckoutList } from './components/CheckoutList';
import { CheckoutInfo } from './components/CheckoutInfo';
import { SuccessAnimation } from './components/SuccessAnimation';
import { PaymentMethod } from '../../services/order';
import { useCheckoutCart } from './hooks/useCheckoutCart';
import { useSubmitOrder } from './hooks/useSubmitOrder';
import { ROUTES } from '../../shared/config/routes';
import './CheckoutPage.scss';
import { useLanguage } from '../../shared/context/language';
import { promoService } from '../../services/promo';
import { useCartCount } from '../../shared/context/cart';
import { SlideIn } from '../../shared/animation/SlideIn';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const { language: lng } = useLanguage();

  const { user, loading: authLoading } = useAuth();
  const { set: setCartCount } = useCartCount();

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

  const handleQuantityChange = (id: string, qty: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item)),
    );
  };

  const totalAmount = cartItems.reduce(
    (sum, item) =>
      sum +
      (item.product?.priceDiscount ?? item.product?.priceRegular ?? 0) *
        item.quantity,
    0,
  );

  const discountAmount = totalAmount * (promoDiscount / 100);
  const finalTotalAmount =
    Math.round((totalAmount - discountAmount) * 100) / 100;

  const handlePromoApply = async (promoCode: string): Promise<void> => {
    if (!user) return;

    try {
      const percentage = await promoService.activatePromo(promoCode, user.uid);

      if (!percentage) {
        alert('Invalid or expired promocode');
        return;
      }

      setPromoDiscount(percentage);
      alert(`Promocode applied! Discount ${percentage}%`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!cart) return;

    try {
      await submitOrder(
        cart,
        cartItems,
        new FormData(event.currentTarget),
        finalTotalAmount,
      );

      setCartItems([]);
      setShowAnimation(true);
      setCartCount(0);
      event.currentTarget.reset();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      setCartCount(updated.length); // ← ось цього не вистачало
      return updated;
    });
  };

  // Redirect if user is not logged in
  useEffect(() => {
    if (!authLoading && !user) navigate('/auth');
  }, [user, authLoading, navigate]);

  // Redirect if cart is empty after loading
  useEffect(() => {
    if (!cartLoading && cart && cartItems.length === 0 && !showAnimation) {
      navigate('/');
    }
  }, [cartLoading, cart, cartItems, navigate, showAnimation]);

  return (
    <section className="checkout">
      {showAnimation && (
        <SuccessAnimation
          onBackToCatalog={() => navigate(`/${lng}/${ROUTES.profile}`)}
        />
      )}

      <div className="checkout__section">
        <SlideIn
          trigger="load"
          beforeAnimationState={{ x: 0, y: 0, opacity: 0, duration: 0.4 }}
        >
          <CheckoutForm
            ref={formRef}
            user={user}
            onSubmit={handleSubmit}
            onPaymentMethodChange={setPaymentMethod}
          />
        </SlideIn>
      </div>

      <div className="checkout__section">
        <CheckoutList
          cartItems={cartItems}
          noProducts={!cartItems.length || !!error}
          isLoading={cartLoading}
          onRemoveItem={handleRemoveItem}
          onQuantityChange={handleQuantityChange}
        />
      </div>

      <div className="checkout__section">
        <SlideIn
          trigger="load"
          beforeAnimationState={{ x: 0, y: 0, opacity: 0, duration: 0.4 }}
        >
          <CheckoutInfo
            onPromoApply={handlePromoApply}
            totalAmount={totalAmount}
            discountAmount={discountAmount}
            finalTotalAmount={finalTotalAmount}
            paymentMethod={paymentMethod}
            formRef={formRef}
          />
        </SlideIn>
      </div>
    </section>
  );
};
