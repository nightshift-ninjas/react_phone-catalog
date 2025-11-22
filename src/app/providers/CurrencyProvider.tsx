import React, { useEffect, useState } from 'react';
import { currencyService, type Rate } from '../../services/currency';
import {
  CurrencyContext,
  type CurrencyContextType,
} from '../../shared/context/currency';
import { Currency } from '../../widgets/CurrencyButton';

interface Props {
  children: React.ReactNode;
}

const LOCAL_STORAGE_KEY = 'selectedCurrency';
const DEFAULT_CURRENCY = Currency.USD;

export const CurrencyProvider: React.FC<Props> = ({ children }) => {
  const [rates, setRates] = useState<Rate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentCurrency, setCurrentCurrencyState] = useState<string>(() => {
    return localStorage.getItem(LOCAL_STORAGE_KEY) || DEFAULT_CURRENCY;
  });

  const setCurrentCurrency = (currency: string) => {
    setCurrentCurrencyState(currency);
    localStorage.setItem(LOCAL_STORAGE_KEY, currency);
  };

  useEffect(() => {
    const fetchRatesAsync = async () => {
      setLoading(true);
      try {
        const data = await currencyService.getCashRates();
        setRates(data);
      } catch {
        setError('Something went wrong while fetching currency rates');
      } finally {
        setLoading(false);
      }
    };
    fetchRatesAsync();
  }, []);

  const contextValue: CurrencyContextType = {
    rates,
    loading,
    error,
    currentCurrency,
    setCurrentCurrency,
    refreshRates: async () => {
      setLoading(true);
      try {
        const data = await currencyService.getCashRates();
        setRates(data);
      } catch {
        setError('Something went wrong while fetching currency rates');
      } finally {
        setLoading(false);
      }
    },
  };

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
};
