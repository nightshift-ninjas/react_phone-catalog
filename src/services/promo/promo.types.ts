import type { User } from 'firebase/auth';

export type PromoCode = {
  id: string;
  code: string;
  discountPercent: number;
  maxActivations: number;
  usedBy: User['uid'][];
  createdAt: string;
};

export type PromoCodeCreate = {
  code: string;
  discountPercent: number;
  maxActivations: number;
  usedBy: User['uid'][];
  createdAt: string;
};
