import type { User } from '../auth';
import type { CartItem } from '../cart/cart.types';

export enum OrderStatus {
  CANCELED = 'canceled',
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
}

export enum PaymentMethod {
  ONLINE_PAYMENT = 'online_payment',
  CASH_ON_DELIVERY = 'cash_on_delivery',
  POS_ON_DELIVERY = 'pos_on_delivery',
}

export type Order = {
  id: string;
  userId: User['id'];

  items: CartItem[];
  totalAmount: number;

  firstName: string;
  lastName: string;
  email: string;
  mobile: string;

  city: string;
  warehouse?: string;

  isScheduled: boolean;
  deliveryDate?: string;
  deliveryTime?: string;
  deliveryNotes?: string;

  paymentMethod: PaymentMethod;
  status: OrderStatus;

  createdAt: string;
};

export type OrderCreate = Omit<Order, 'id' | 'createdAt' | 'status'>;
