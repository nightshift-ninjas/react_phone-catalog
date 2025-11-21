import React from 'react';
import {
  OrderStatus,
  PaymentMethod,
  type Order,
} from '../../../../services/order';
import { Badge, BadgeStatus } from '../../../../shared/ui/Badge';
import './OrderTable.scss';
import { formatDate, formatShortName } from '../../../../shared/utils';

interface Props {
  orders: Order[];
}

const OrderStatusBadgeMap: Record<OrderStatus, BadgeStatus> = {
  [OrderStatus.CANCELED]: BadgeStatus.ERROR,
  [OrderStatus.PENDING]: BadgeStatus.PENDING,
  [OrderStatus.FULFILLED]: BadgeStatus.SUCCESS,
};

const OrderPaymentBadgeMap: Record<PaymentMethod, BadgeStatus> = {
  [PaymentMethod.CASH_ON_DELIVERY]: BadgeStatus.PENDING,
  [PaymentMethod.POS_ON_DELIVERY]: BadgeStatus.PENDING,
  [PaymentMethod.ONLINE_PAYMENT]: BadgeStatus.SUCCESS,
};

export const OrderTable: React.FC<Props> = ({ orders }) => {
  return (
    <div className="order-table">
      <table className="order-table__table">
        <thead className="order-table__head">
          <tr className="order-table__row">
            <th className="order-table__heading">Order</th>
            <th className="order-table__heading">Date</th>
            <th className="order-table__heading">Customer</th>
            <th className="order-table__heading">Payment</th>
            <th className="order-table__heading">Total</th>
            <th className="order-table__heading">Delivery</th>
            <th className="order-table__heading">Items</th>
            <th className="order-table__heading">Fulfilment</th>
          </tr>
        </thead>

        <tbody className="order-table__body">
          {orders.map((order) => (
            <tr className="order-table__row" key={order.id}>
              <td className="order-table__cell">#{order.id.slice(0, 5)}</td>
              <td className="order-table__cell">
                {formatDate(order.createdAt)}
              </td>
              <td className="order-table__cell">
                {formatShortName(`${order.firstName} ${order.lastName}`)}
              </td>

              <td className="order-table__cell">
                <span className="order-table__badge">
                  <Badge status={OrderPaymentBadgeMap[order.paymentMethod]}>
                    {order.paymentMethod}
                  </Badge>
                </span>
              </td>

              <td className="order-table__cell">${order.totalAmount}</td>
              <td className="order-table__cell">
                {order.deliveryDate ? formatDate(order.deliveryDate) : 'N/A'}
              </td>
              <td className="order-table__cell">{order.items.length} items</td>

              <td className="order-table__cell">
                <span className="order-table__status">
                  <Badge status={OrderStatusBadgeMap[order.status]}>
                    {order.status}
                  </Badge>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
