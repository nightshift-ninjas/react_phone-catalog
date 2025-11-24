import { cartRepository } from './cart.repository';
import { productService, type Product } from '../product';
import type { Cart, CartItem, CartItemCreate } from './cart.types';
import type { User } from '../auth';

export const cartService = {
  // --- Cart operations ---
  async getOrCreateCart(userId: User['id']): Promise<Cart> {
    const carts = await cartRepository.getCartByUserId(userId);
    if (carts.length > 0) return carts[0];

    return cartRepository.createCart(userId);
  },

  // --- CartItem operations ---
  async fetchCartItems(cartId: Cart['id']): Promise<CartItem[]> {
    const items = await cartRepository.getItemsByCartId(cartId);

    // Enrich each item with product details
    const enriched = await Promise.all(
      items.map(async (item) => {
        const product = await productService.fetchProductById(item.productId);
        return { ...item, product };
      }),
    );

    return enriched;
  },

  async addItemToCart(
    cartId: string,
    productId: string,
    quantity = 1,
  ): Promise<CartItem> {
    const data: CartItemCreate = {
      cartId,
      productId,
      quantity,
      createdAt: new Date().toISOString(),
    };

    const ref = await cartRepository.addItem(data);
    const product = await productService.fetchProductById(productId);

    return { id: ref.id, ...data, product };
  },

  async updateCartItem(itemId: CartItem['id'], data: Partial<CartItem>) {
    return cartRepository.updateItem(itemId, data);
  },

  async removeCartItemById(itemId: CartItem['id']) {
    const existing = await cartRepository.getItemById(itemId);
    if (!existing) return;

    return cartRepository.deleteItem(itemId);
  },

  async removeCartItemByProduct(cartId: Cart['id'], productId: Product['id']) {
    const existing = await cartRepository.findItemByCartIdAndProductId(
      cartId,
      productId,
    );

    if (!existing) return;

    return cartRepository.deleteItem(existing.id);
  },

  async clearCartItems(cartId: Cart['id']): Promise<void> {
    const items = await cartRepository.getItemsByCartId(cartId);

    if (!items.length) return;

    const deletePromises = items.map((item) =>
      cartRepository.deleteItem(item.id),
    );

    await Promise.all(deletePromises);
  },

  async getCartItemCountByUserId(userId: User['id']): Promise<number> {
    const carts = await cartRepository.getCartByUserId(userId);
    if (carts.length === 0) return 0;

    const cartId = carts[0].id;
    const items = await cartRepository.getItemsByCartId(cartId);

    return items.reduce((total, item) => total + item.quantity, 0);
  },
};
