import React, { useEffect, useState, useContext } from 'react';
import { useAuth } from '../../shared/hooks';
import type {
  Cart,
  CartItem as CartItemType,
} from '../../services/cart/cart.types';
import { cartService } from '../../services/cart/cart.services';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../../shared/ui/Breadcrumb';
import { CartItem } from './components/CartItem';
import { CartInfo } from './components/CartInfo';
import { LanguageContext } from '../../shared/context/language';
import { ROUTES } from '../../shared/config/routes';
import './CartPage.scss';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { language: lng } = useContext(LanguageContext)!;
  const { user, loading: authLoading } = useAuth();

  const [, setCart] = useState<Cart | null>(null);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [, setIsLoading] = useState(false);
  const [, setError] = useState('');

  const handleRemoveFromCart = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const totalAmount = cartItems.reduce((sum, item) => {
    const price =
      item.product?.priceDiscount ?? item.product?.priceRegular ?? 0;
    return sum + price * item.quantity;
  }, 0);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate(`/${lng}/${ROUTES.auth}`);
    }

    const loadCartAndItems = async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await cartService.getOrCreateCart(user!.uid);
        setCart(response);

        const items = await cartService.fetchCartItems(response.id);
        setCartItems(items);
      } catch (err) {
        setError(`Something went wrong while fetching cart: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadCartAndItems();
  }, [user, authLoading, navigate, lng]);

  return (
    <div className="cart">
      <div className="cart__breadcrumbs">
        <Breadcrumb
          items={[{ text: 'cart', link: `/${lng}/${ROUTES.cart}` }]}
        />
      </div>

      <h1 className="cart__title">Your Cart</h1>

      <div className="cart__grid">
        <div className="cart__block">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className="cart__items-wrapper">
              {cartItems.map((item) => (
                <li key={item.id}>
                  <CartItem
                    item={item}
                    onRemove={() => handleRemoveFromCart(item.id)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="cart__block">
          <CartInfo total={totalAmount} itemsCount={cartItems.length} />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
