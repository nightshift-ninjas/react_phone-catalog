import emailjs from "emailjs-com";
import { orderService, PaymentMethod, type Order } from '../../../services/order';
import { cartService } from '../../../services/cart/cart.services';
import type { Cart, CartItem } from '../../../services/cart';

export function useSubmitOrder() {
  const submitOrder = async (
    cart: Cart,
    cartItems: CartItem[],
    formData: FormData,
    finalTotalAmount: number,
  ) => {
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;

    const subtotal = cartItems.reduce((sum, item) => {
      const price =
        item.product?.priceDiscount ??
        item.product?.priceRegular ??
        0;

      return sum + price * item.quantity;
    }, 0);

    const discountAmount = subtotal - finalTotalAmount;

    const order = {
      userId: cart.userId,
      items: cartItems,
      products: cartItems.map((i) => i.product!).filter(Boolean),

      totalAmount: finalTotalAmount,

      firstName: data['first-name'],
      lastName: data['last-name'],
      email: data['email'],
      mobile: data['phone'],

      city: data['city'],
      warehouse: data['warehouse'],

      isScheduled: !!data['delivery-date'],
      deliveryDate: data['delivery-date'],
      deliveryTime: data['delivery-time'],
      deliveryNotes: data['delivery-notes'],

      paymentMethod: data['payment-method'] as PaymentMethod,
    };

    const createdOrder = await orderService.createOrder(order);

    await sendReceiptEmail(createdOrder, cartItems, subtotal, discountAmount);
    await cartService.clearCartItems(cart.id);
  };

  return { submitOrder };
}

async function sendReceiptEmail(
  order: Order,
  cartItems: CartItem[],
  subtotal: number,
  discountAmount: number
) {
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_RECEIPT_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ordersArray = cartItems.map((item: any) => {
    const price =
      item.product.priceDiscount ??
      item.product.priceRegular;

    return {
      name: item.product.name,
      units: item.quantity,
      price,
      itemTotal: price * item.quantity,
    };
  });

  const templateParams = {
    order_id: order.id,
    email: order.email,

    orders: ordersArray,

    cost: {
      subtotal,
      discount: discountAmount,
      shipping: 0,
      tax: 0,
      total: order.totalAmount,
    },
  };

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
}
