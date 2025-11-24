import { productService } from '../product';
import { favoriteRepository } from './favorite.repository';
import type { FavoriteItem, FavoriteItemCreate } from './favorite.types';

export const favoriteService = {
  // return all favorites of the user
  async fetchFavoritesByUser(userId: string): Promise<FavoriteItem[]> {
    const favorites = await favoriteRepository.getByUserId(userId);

    // Enrich each favorite with product details
    const enriched = await Promise.all(
      favorites.map(async (fav) => {
        const product = await productService.fetchProductById(fav.productId);
        return { ...fav, product };
      }),
    );

    return enriched;
  },

  // add a favorite item
  async addFavorite(userId: string, productId: string): Promise<FavoriteItem> {
    const data: FavoriteItemCreate = {
      userId,
      productId,
      createdAt: new Date().toISOString(),
    };

    const ref = await favoriteRepository.add(data);

    return { id: ref.id, ...data };
  },

  async findFavorite(userId: string, productId: string) {
    const items = await favoriteRepository.getByUserId(userId);
    return items.find((item) => item.productId === productId) || null;
  },

  // remove a favorite by Firestore ID
  async removeFavoriteByProduct(userId: string, productId: string) {
    const existing = await this.findFavorite(userId, productId);
    if (!existing) return;

    return favoriteRepository.delete(existing.id);
  },

  async getFavoriteCountByUserId(userId: string): Promise<number> {
    const favorites = await favoriteRepository.getByUserId(userId);
    return favorites.length;
  },
};
