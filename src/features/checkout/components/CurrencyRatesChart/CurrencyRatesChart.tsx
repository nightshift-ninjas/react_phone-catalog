import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useCurrency } from '../../../../shared/context/currency';
import './CurrencyRatesChart.scss';
import { useTranslation } from 'react-i18next';

export const CurrencyRatesChart: React.FC = () => {
  const { rates, loading, error } = useCurrency();
  const { t } = useTranslation('currencyRatesChart');

  if (loading) return <div>Loading currency rates...</div>;
  if (error) return <div>Error: {error}</div>;

  const labels = rates.map((r) => r.currency);
  const data = rates.map((r) => Number((r.rate / 10).toFixed(4)));

  const colors = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#4BC0C0',
    '#9966FF',
    '#FF9F40',
    '#00C49F',
    '#FF7F50',
    '#9A6324',
    '#469990',
  ];

  const markers = data.map((_, index) => ({
    seriesIndex: 0,
    dataPointIndex: index,
    fillColor: colors[index % colors.length],
    strokeColor: colors[index % colors.length],
    size: 6,
  }));

  const series = [
    {
      name: 'Rate',
      data,
    },
  ];

  return (
    <div className="currency-chart">
      <h3>{t('currencyRates')}</h3>

      <ReactApexChart
        type="area"
        series={series}
        options={{
          chart: {
            height: 350,
            width: '100%',
            zoom: { enabled: true },
            toolbar: { show: true },
          },
          xaxis: {
            categories: labels,
            type: 'category',
          },
          stroke: {
            curve: 'smooth',
            width: 3,
          },
          markers: {
            size: 0,
            discrete: markers,
          },
          fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 0.3,
              opacityFrom: 0.3,
              opacityTo: 0.05,
            },
          },
          colors: ['#ff8787'], 
          yaxis: {
            labels: {
              formatter: (value: number) => value.toFixed(2),
            },
          },
          legend: { position: 'top' },
          grid: { borderColor: '#eee' },
        }}
      />
    </div>
  );
};
