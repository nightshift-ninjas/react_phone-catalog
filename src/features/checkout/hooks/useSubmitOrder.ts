import { orderService, PaymentMethod } from '../../../services/order';
import { cartService } from '../../../services/cart/cart.services';
import type { Cart, CartItem } from '../../../services/cart';

export function useSubmitOrder() {
  const submitOrder = async (
    cart: Cart,
    cartItems: CartItem[],
    formData: FormData,
    finalTotalAmount: number,
  ) => {
    const data = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    const order = {
      userId: cart.userId,
      items: cartItems,
      products: cartItems.map((i) => i.product!).filter(Boolean),
      totalAmount: finalTotalAmount,
      firstName: data['first-name'],
      lastName: data['last-name'],
      email: data['email'],
      mobile: data['phone'],
      country: data['country'],
      city: data['city'],
      state: data['state'],
      zip: data['zip'],
      address: data['address'],
      isScheduled: !!data['delivery-date'],
      deliveryDate: data['delivery-date'],
      deliveryTime: data['delivery-time'],
      deliveryNotes: data['delivery-notes'],
      paymentMethod: data['payment-method'] as PaymentMethod,
    };

    await orderService.createOrder(order);
    await cartService.clearCartItems(cart.id);
  };

  return { submitOrder };
}
