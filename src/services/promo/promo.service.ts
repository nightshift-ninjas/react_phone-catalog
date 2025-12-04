import type { User } from '../auth';
import { promoRepository } from './promo.repository';
import type { PromoCode, PromoCodeCreate } from './promo.types';

export const promoService = {
  async createPromo(
    code: string,
    discountPercent: number,
    maxActivations: number,
  ): Promise<PromoCode> {
    const data: PromoCodeCreate = {
      code,
      discountPercent,
      maxActivations,
      usedBy: [],
      createdAt: new Date().toISOString(),
    };

    return promoRepository.createPromo(data);
  },

  async activatePromo(
    code: string,
    userId: User['id'],
  ): Promise<number | undefined> {
    const promo = await promoRepository.getPromoByCode(code);

    if (!promo) return undefined;

    if (promo.usedBy.includes(userId)) return undefined;

    if (promo.maxActivations <= 0) return undefined;

    await promoRepository.updatePromo(promo.id, {
      maxActivations: promo.maxActivations - 1,
      usedBy: [...promo.usedBy, userId],
    });

    return promo.discountPercent;
  },
};
