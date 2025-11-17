import type { User } from '../auth';
import { firestoreClient } from '../../shared/config/firebase';
import type { Cart, CartItem, CartItemCreate } from './cart.types';

const CART_COLLECTION = 'carts';
const CART_ITEM_COLLECTION = 'cartItems';

export const cartRepository = {
  // --- Cart operations ---
  async createCart(userId: User['id']): Promise<Cart> {
    const data: Omit<Cart, 'id'> = {
      userId,
      createdAt: new Date().toISOString(),
    };

    const ref = await firestoreClient.createDoc<Omit<Cart, 'id'>>(
      CART_COLLECTION,
      data,
    );

    return { id: ref.id, ...data };
  },

  getCartByUserId(userId: string): Promise<Cart[]> {
    return firestoreClient.getCollectionByField<Cart>(
      CART_COLLECTION,
      'userId',
      userId,
    );
  },

  async getItemById(id: string): Promise<CartItem | null> {
    return firestoreClient.getDocById<CartItem>(CART_ITEM_COLLECTION, id);
  },
  
  // --- CartItem operations ---
  getItemsByCartId(cartId: string): Promise<CartItem[]> {
    return firestoreClient.getCollectionByField<CartItem>(
      CART_ITEM_COLLECTION,
      'cartId',
      cartId,
    );
  },

  async addItem(data: CartItemCreate): Promise<CartItem> {
    const ref = await firestoreClient.createDoc<CartItemCreate>(
      CART_ITEM_COLLECTION,
      data,
    );
    return { id: ref.id, ...data };
  },

  async updateItem(id: string, data: Partial<CartItem>) {
    return firestoreClient.updateDocById<CartItem>(
      CART_ITEM_COLLECTION,
      id,
      data,
    );
  },

  async findItemByCartIdAndProductId(cartId: string, productId: string) {
    const items = await firestoreClient.getCollectionByField<CartItem>(
      CART_ITEM_COLLECTION,
      'cartId',
      cartId,
    );

    return items.find((item) => item.productId === productId) || null;
  },

  deleteItem(id: string) {
    return firestoreClient.deleteDocById(CART_ITEM_COLLECTION, id);
  },
};
