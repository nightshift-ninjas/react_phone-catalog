import type { User } from "../auth";
import type { Product } from "../product";

export type Cart = {
  id: string;
  userId: User["id"];
  createdAt: string;
};

export type CartItem = {
  id: string;
  cartId: Cart["id"];
  productId: Product["id"];
  quantity: number;
  createdAt: string;
  product?: Product;
};

export type CartItemCreate = {
  cartId: Cart["id"];
  productId: Product["id"];
  quantity: number;
  createdAt: string;
};
