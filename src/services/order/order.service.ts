import { orderRepository } from './order.repository';
import { OrderStatus, type Order, type OrderCreate } from './order.types';

export const orderService = {
  async createOrder(orderData: OrderCreate): Promise<Order> {
    return await orderRepository.createOrder(orderData);
  },

  getUserOrders(userId: string): Promise<Order[]> {
    return orderRepository.getOrdersByUserId(userId);
  },

  getOrder(id: string): Promise<Order | null> {
    return orderRepository.getOrderById(id);
  },

  updateStatus(orderId: string, status: OrderStatus) {
    return orderRepository.updateOrderStatus(orderId, status);
  },

  cancelOrder(orderId: string) {
    return orderRepository.updateOrderStatus(orderId, OrderStatus.CANCELED);
  },

  fulfillOrder(orderId: string) {
    return orderRepository.updateOrderStatus(orderId, OrderStatus.FULFILLED);
  },

  deleteOrder(orderId: string) {
    return orderRepository.deleteOrder(orderId);
  },
};
