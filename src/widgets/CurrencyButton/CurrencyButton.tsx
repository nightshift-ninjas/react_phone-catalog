import React from 'react';
import { IconDropdown } from '../../shared/ui/IconDropdown';
import { Currency, CurrencyIcons, currencyOptions } from './types';
import { useCurrency } from '../../shared/context/currency';
import './CurrencyButton.scss';

export const CurrencyButton: React.FC = () => {
  const { currentCurrency, setCurrentCurrency } = useCurrency();

  const handleChange = (currency: string) => {
    setCurrentCurrency(currency as Currency);
  };

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
