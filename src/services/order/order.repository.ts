import { firestoreClient } from '../../shared/config/firebase';
import { OrderStatus, type Order, type OrderCreate } from './order.types';

const ORDER_COLLECTION = 'orders';

export const orderRepository = {
  // Create order
  async createOrder(data: OrderCreate): Promise<Order> {
    // Automatically add createdAt and status
    const fullData: Omit<Order, 'id'> = {
      ...data,
      createdAt: new Date().toISOString(),
      status: OrderStatus.PENDING,
    };

    const ref = await firestoreClient.createDoc(ORDER_COLLECTION, fullData);
    return { id: ref.id, ...fullData };
  },

  getOrdersByUserId(userId: string): Promise<Order[]> {
    return firestoreClient.getCollectionByField<Order>(
      ORDER_COLLECTION,
      'userId',
      userId,
    );
  },

  getOrderById(id: string): Promise<Order | null> {
    return firestoreClient.getDocById<Order>(ORDER_COLLECTION, id);
  },

  updateOrderStatus(id: string, status: OrderStatus) {
    return firestoreClient.updateDocById<Order>(ORDER_COLLECTION, id, {
      status,
    });
  },

  deleteOrder(id: string) {
    return firestoreClient.deleteDocById(ORDER_COLLECTION, id);
  },
};
