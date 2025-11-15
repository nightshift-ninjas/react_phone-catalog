import React, { useEffect, useState } from "react";
import { authClient } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import type { Cart } from "../../services/cart/cart.types";
import type { CartItem } from "../../services/cart/cart.types";
import { cartService } from "../../services/cart/cart.services";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const currentUser = authClient.getCurrentUser();

  useEffect(() => {
    if (!currentUser) {
      navigate("/auth/login");
    }
  }, [currentUser, navigate]);

  const [cart, setCart] = useState<Cart | null>(null);
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCartAndItems = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await cartService.getOrCreateCart(currentUser!.uid);
        setCart(response);

        const cartItems = await cartService.fetchCartItems(response.id);
        setItems(cartItems);
      } catch (error) {
        setError(`Something went wrong while fetching cart: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadCartAndItems();
  }, [currentUser]);

  if (isLoading) return <p>Loading cart...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Your Cart</h1>
      {cart && <p>Cart ID: {cart.id}</p>}

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.product?.name} — Quantity: {item.quantity} — Price: $
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;
