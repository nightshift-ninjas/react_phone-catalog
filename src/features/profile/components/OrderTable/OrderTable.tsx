import React from 'react';
import {
  OrderStatus,
  PaymentMethod,
  type Order,
} from '../../../../services/order';
import { Badge, BadgeStatus } from '../../../../shared/ui/Badge';
import './OrderTable.scss';
import { formatDate, formatShortName } from '../../../../shared/utils';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { tableVariants } from './anims';

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
  const { t } = useTranslation('profile');

  return (
    <div className="order-table">
      <table className="order-table__table">
        <thead className="order-table__head">
          <tr className="order-table__row">
            <th className="order-table__heading">{t('table.order')}</th>
            <th className="order-table__heading">{t('table.date')}</th>
            <th className="order-table__heading">{t('table.customer')}</th>
            <th className="order-table__heading">{t('table.payment')}</th>
            <th className="order-table__heading">{t('table.total')}</th>
            <th className="order-table__heading">{t('table.delivery')}</th>
            <th className="order-table__heading">{t('table.items')}</th>
            <th className="order-table__heading">{t('table.fulfilment')}</th>
          </tr>
        </thead>

        <tbody className="order-table__body">
          <AnimatePresence>
            {orders.map((order) => (
              <motion.tr
                key={order.id}
                className="order-table__row"
                variants={tableVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                layout
              >
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
                      {t(`paymentMethod.${order.paymentMethod}`)}
                    </Badge>
                  </span>
                </td>

                <td className="order-table__cell">${order.totalAmount}</td>
                <td className="order-table__cell">
                  {order.deliveryDate ? formatDate(order.deliveryDate) : 'N/A'}
                </td>
                <td className="order-table__cell">
                  {t(`items`, { count: order.items.length })}
                </td>

                <td className="order-table__cell">
                  <span className="order-table__status">
                    <Badge status={OrderStatusBadgeMap[order.status]}>
                      {t(`orderStatus.${order.status}`)}
                    </Badge>
                  </span>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};
