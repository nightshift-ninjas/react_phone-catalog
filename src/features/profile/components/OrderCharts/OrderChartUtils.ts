import { type Order, OrderStatus } from '../../../../services/order';
import { Category } from '../../../../services/product';

export const getOrdersPerDayByStatus = (orders: Order[]) => {
  const now = new Date();
  const currentDay = now.getDay();
  const diff = now.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
  const monday = new Date(now.setDate(diff));
  monday.setHours(0, 0, 0, 0);

  const fulfilled: number[] = [0, 0, 0, 0, 0, 0, 0];
  const pending: number[] = [0, 0, 0, 0, 0, 0, 0];
  const canceled: number[] = [0, 0, 0, 0, 0, 0, 0];

  orders.forEach((order) => {
    const d = new Date(order.createdAt);

    for (let i = 0; i < 7; i++) {
      const dayStart = new Date(monday);
      const dayEnd = new Date(monday);

      dayStart.setDate(monday.getDate() + i);
      dayStart.setHours(0, 0, 0, 0);

      dayEnd.setDate(monday.getDate() + i);
      dayEnd.setHours(23, 59, 59, 999);

      if (d >= dayStart && d <= dayEnd) {
        if (order.status === OrderStatus.FULFILLED) fulfilled[i]++;
        else if (order.status === OrderStatus.PENDING) pending[i]++;
        else if (order.status === OrderStatus.CANCELED) canceled[i]++;
        break;
      }
    }
  });

  return { fulfilled, pending, canceled };
};

export const getSalesPerDayThisWeek = (orders: Order[]) => {
  const now = new Date();
  const currentDay = now.getDay();
  const diff = now.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
  const monday = new Date(now.setDate(diff));
  monday.setHours(0, 0, 0, 0);

  const result = [0, 0, 0, 0, 0, 0, 0];

  orders.forEach((order) => {
    const d = new Date(order.createdAt);
    const dayStart = new Date(monday);
    const dayEnd = new Date(monday);

    for (let i = 0; i < 7; i++) {
      dayStart.setDate(monday.getDate() + i);
      dayStart.setHours(0, 0, 0, 0);

      dayEnd.setDate(monday.getDate() + i);
      dayEnd.setHours(23, 59, 59, 999);

      if (d >= dayStart && d <= dayEnd) {
        result[i] += order.totalAmount;
        break;
      }
    }
  });

  return result;
};

export const getCategoryStats = (orders: Order[]) => {
  const categoryMap: Record<Category, number> = {
    [Category.PHONES]: 0,
    [Category.TABLETS]: 0,
    [Category.Accessory]: 0,
  };

  orders.forEach((order) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    order.items.forEach((item: any) => {
      const category = item.product.category as Category;
      categoryMap[category]++;
    });
  });

  return {
    labels: Object.keys(categoryMap),
    series: Object.values(categoryMap),
  };
};

export const getStatusStats = (orders: Order[]) => {
  const fulfilled = orders.filter(
    (o) => o.status === OrderStatus.FULFILLED,
  ).length;
  const pending = orders.filter((o) => o.status === OrderStatus.PENDING).length;
  const canceled = orders.filter(
    (o) => o.status === OrderStatus.CANCELED,
  ).length;

  return {
    labels: ['Fulfilled', 'Pending', 'Canceled'],
    series: [fulfilled, pending, canceled],
  };
};

export const getWeekDayLabels = () => {
  return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
};
