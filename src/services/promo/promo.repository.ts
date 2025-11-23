import { firestoreClient } from '../../shared/config/firebase';
import type { PromoCode, PromoCodeCreate } from './promo.types';

const PROMO_COLLECTION = 'promocodes';

export const promoRepository = {
  async createPromo(data: PromoCodeCreate): Promise<PromoCode> {
    const ref = await firestoreClient.createDoc<PromoCodeCreate>(
      PROMO_COLLECTION,
      data,
    );
    return { id: ref.id, ...data };
  },

  async getPromoByCode(code: string): Promise<PromoCode | null> {
    const results = await firestoreClient.getCollectionByField<PromoCode>(
      PROMO_COLLECTION,
      'code',
      code,
    );

    if (results.length === 0) return null;

    return results[0];
  },

  async updatePromo(id: string, data: Partial<PromoCode>) {
    return firestoreClient.updateDocById(PROMO_COLLECTION, id, data);
  },
};
