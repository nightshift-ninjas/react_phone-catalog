import { createContext } from 'react';
import { type Rate } from '../../../services/currency';

export interface CurrencyContextType {
  rates: Rate[];
  loading: boolean;
  error: string | null;
  currentCurrency: string;
  setCurrentCurrency: (currency: string) => void;
  refreshRates: () => void;
}

export const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined,
);
