import type { User } from "../auth";
import type { Product } from "../product";

export type FavoriteItem  = {
  id: string;
  userId: User["id"];
  productId: Product["id"];
  createdAt: string;
  product?: Product;
};

export type FavoriteItemCreate = {
  userId: string;
  productId: string;
  createdAt: string;
};
