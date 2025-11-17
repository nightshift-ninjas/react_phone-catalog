import { cartRepository } from './cart.repository';
import { productService } from '../product';
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

  async updateCartItem(itemId: string, data: Partial<CartItem>) {
    return cartRepository.updateItem(itemId, data);
  },

  async removeCartItemByProduct(cartId: string, productId: string) {
    const existing = await cartRepository.findItemByCartIdAndProductId(
      cartId,
      productId,
    );

    if (!existing) return;

    return cartRepository.deleteItem(existing.id);
  },
};
