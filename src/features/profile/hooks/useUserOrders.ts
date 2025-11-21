import { useEffect, useState, useMemo } from 'react';
import {
  orderService,
  OrderStatus,
  PaymentMethod,
  type Order,
} from '../../../services/order';
import {
  OrderFilterMethods,
  OrderSortFields,
} from '../components/OrderFilter/types';

const rawOrdersCache = new Map<string, Order[]>();
const processedCache = new Map<string, Order[]>();

export function useUserOrders(
  userId: string | undefined,
  filter: OrderFilterMethods,
  sort: OrderSortFields,
) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const cacheKey = `${userId}-${filter}-${sort}`;

  const filteredOrders = useMemo(() => {
    if (!orders.length) return [];
    if (processedCache.has(cacheKey)) return processedCache.get(cacheKey)!;

    let result = [...orders];

    result = result.filter((order) => {
      switch (filter) {
        case OrderFilterMethods.UNFULFILLED:
          return order.status === OrderStatus.PENDING;
        case OrderFilterMethods.UNPAID:
          return (
            order.paymentMethod === PaymentMethod.CASH_ON_DELIVERY ||
            order.paymentMethod === PaymentMethod.POS_ON_DELIVERY
          );
        case OrderFilterMethods.OPEN:
          return order.status === OrderStatus.PENDING;
        case OrderFilterMethods.CLOSED:
          return order.status === OrderStatus.CANCELED;
        default:
          return true;
      }
    });

    switch (sort) {
      case OrderSortFields.CREATED_AT:
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case OrderSortFields.ITEMS:
        result.sort((a, b) => b.items.length - a.items.length);
        break;
      case OrderSortFields.TOTAL:
        result.sort((a, b) => b.totalAmount - a.totalAmount);
        break;
    }

    processedCache.set(cacheKey, result);
    return result;
  }, [orders, filter, sort]);

  useEffect(() => {
    if (!userId) return;

    const cached = rawOrdersCache.get(userId);
    if (cached) {
      setOrders(cached);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        setError('');
        const response = await orderService.getUserOrders(userId);
        rawOrdersCache.set(userId, response);
        setOrders(response);
      } catch (err) {
        setError(`Failed to load orders: ${err}`);
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  return { orders: filteredOrders, loading, error };
}
