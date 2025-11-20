import React, { useEffect, useState } from 'react';
import { useAuth } from '../../shared/hooks';
import type {
  Cart,
  CartItem as CartItemType,
} from '../../services/cart/cart.types';
import { cartService } from '../../services/cart/cart.services';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../../shared/ui/Breadcrumb';
import { CartItem } from './components/CartItem';
import './CartPage.scss';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [cart, setCart] = useState<Cart | null>(null);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
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

  return (
    <div className="cart">
      <div className="cart__breadcrumbs">
        <Breadcrumb items={[{ text: 'cart', link: `/cart` }]} />
      </div>

      <h1 className="cart__title">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart__items-wrapper">
          {cartItems.map((item) => (
            <li key={item.id}>
              <CartItem item={item} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;
