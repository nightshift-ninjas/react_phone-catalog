import React from 'react';
import { IconDropdown } from '../../shared/ui/IconDropdown';
import { Currency, CurrencyIcons } from './types';
import { useCurrency } from '../../shared/context/currency';
import './CurrencyButton.scss';
import { useTranslation } from 'react-i18next';

const ICON_WIDTH = 20;

export const CurrencyButton: React.FC = () => {
  const { t } = useTranslation('currency');
  const { currentCurrency, setCurrentCurrency } = useCurrency();

  const handleChange = (currency: string) => {
    setCurrentCurrency(currency as Currency);
  };

  const currencyOptions = Object.values(Currency).map((currency) => ({
    label: t(`currencies.${currency}`),
    icon: CurrencyIcons[currency],
    value: currency,
    optionIconWidth: ICON_WIDTH,
  }));

  return (
    <div className="currency-btn">
      <IconDropdown
        options={currencyOptions}
        icon={CurrencyIcons[currentCurrency as Currency]}
        onChange={handleChange}
      />
    </div>
  );
};
