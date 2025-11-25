import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { type Order } from '../../../../services/order';
import './OrderCharts.scss';
import {
  getCategoryStats,
  getSalesPerDayThisWeek,
  getOrdersPerDayByStatus,
  getStatusStats,
  getWeekDayLabels,
} from './OrderChartUtils';
import { useTranslation } from 'react-i18next';
import { SlideIn } from '../../../../shared/animation/SlideIn';

type Props = {
  orders: Order[];
};

export const OrderCharts: React.FC<Props> = ({ orders }) => {
  const { t } = useTranslation('profile');
  const ordersPerDayByStatus = getOrdersPerDayByStatus(orders);
  const salesPerDay = getSalesPerDayThisWeek(orders);
  const categoryStats = getCategoryStats(orders);
  const statusStats = getStatusStats(orders);
  const daysLabels = getWeekDayLabels();

  return (
    <div className="order-charts">
      <SlideIn beforeAnimationState={{ opacity: 0, scale: 0.5 }}>
        <div className="chart">
          <h3>{t('chart.ordersPerDay')}</h3>
          <ReactApexChart
            type="line"
            series={[
              { name: 'Fulfilled', data: ordersPerDayByStatus.fulfilled },
              { name: 'Pending', data: ordersPerDayByStatus.pending },
              { name: 'Canceled', data: ordersPerDayByStatus.canceled },
            ]}
            options={{
              chart: { height: 350 },
              xaxis: { categories: daysLabels },
              stroke: { curve: 'smooth' },
              markers: { size: 5 },
              colors: ['#28a745', '#ffc107', '#dc3545'],
              legend: { position: 'top' },
            }}
          />
        </div>
      </SlideIn>

      <SlideIn beforeAnimationState={{ delay: 0.2, opacity: 0, scale: 0.5 }}>
        <div className="chart">
          <h3>{t('chart.salesPerDay')}</h3>
          <ReactApexChart
            type="line"
            series={[
              {
                name: 'Sales $',
                data: salesPerDay,
              },
            ]}
            options={{
              chart: { height: 350 },
              xaxis: { categories: daysLabels },
            }}
          />
        </div>
      </SlideIn>

      <SlideIn beforeAnimationState={{ delay: 0.4, opacity: 0, scale: 0.5 }}>
        <div className="chart">
          <h3>{t('chart.ordersByCategory')}</h3>
          <ReactApexChart
            type="pie"
            series={categoryStats.series}
            options={{
              labels: categoryStats.labels,
            }}
          />
        </div>
      </SlideIn>

      <SlideIn beforeAnimationState={{ delay: 0.6, opacity: 0, scale: 0.5 }}>
        <div className="chart">
          <h3>{t('chart.orderStatus')}</h3>
          <ReactApexChart
            type="donut"
            series={statusStats.series}
            options={{
              labels: statusStats.labels,
            }}
          />
        </div>
      </SlideIn>
    </div>
  );
};
