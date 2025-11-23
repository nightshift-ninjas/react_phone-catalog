import React from 'react';
import USDSVG from '../../shared/assets/icons/USD.svg?react';
import PLNSVG from '../../shared/assets/icons/PLN.svg?react';
import EURSVG from '../../shared/assets/icons/EUR.svg?react';
import CADSVG from '../../shared/assets/icons/CAD.svg?react';
import GBPSVG from '../../shared/assets/icons/GBP.svg?react';
import JPYSVG from '../../shared/assets/icons/JPY.svg?react';

export enum Currency {
  USD = 'USD',
  PLN = 'PLN',
  EUR = 'EUR',
  CAD = 'CAD',
  JPY = 'JPY',
  GBP = 'GBP',
}

export const CurrencyIcons: Record<Currency, React.ReactNode> = {
  [Currency.USD]: <USDSVG />,
  [Currency.PLN]: <PLNSVG />,
  [Currency.EUR]: <EURSVG />,
  [Currency.CAD]: <CADSVG />,
  [Currency.GBP]: <GBPSVG />,
  [Currency.JPY]: <JPYSVG />,
};

export const CurrencySymbols: Record<Currency, string> = {
  [Currency.USD]: '$',
  [Currency.PLN]: 'zł',
  [Currency.EUR]: '€',
  [Currency.CAD]: 'CA$',
  [Currency.GBP]: '£',
  [Currency.JPY]: '¥',
};
