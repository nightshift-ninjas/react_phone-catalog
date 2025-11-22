import React from 'react';
import USDSVG from '../../shared/assets/icons/USD.svg?react';
import EURSVG from '../../shared/assets/icons/EUR.svg?react';
import CADSVG from '../../shared/assets/icons/CAD.svg?react';
import GBPSVG from '../../shared/assets/icons/GBP.svg?react';
import JPYSVG from '../../shared/assets/icons/JPY.svg?react';

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  CAD = 'CAD',
  GBP = 'GBP',
  JPY = 'JPY',
}

export const CurrencyLabels: Record<Currency, string> = {
  [Currency.USD]: 'Dollar',
  [Currency.EUR]: 'Euro',
  [Currency.CAD]: 'Canadian dollar',
  [Currency.GBP]: 'British Pound',
  [Currency.JPY]: 'Japanese Yen',
};

export const CurrencyIcons: Record<Currency, React.ReactNode> = {
  [Currency.USD]: <USDSVG />,
  [Currency.EUR]: <EURSVG />,
  [Currency.CAD]: <CADSVG />,
  [Currency.GBP]: <GBPSVG />,
  [Currency.JPY]: <JPYSVG />,
};

export const CurrencySymbols: Record<Currency, string> = {
  [Currency.USD]: '$',
  [Currency.EUR]: '€',
  [Currency.CAD]: 'CA$',
  [Currency.GBP]: '£',
  [Currency.JPY]: '¥',
};

const ICON_WIDTH = 20;

export const currencyOptions = Object.values(Currency).map((currency) => ({
  label: CurrencyLabels[currency],
  icon: CurrencyIcons[currency],
  value: currency,
  optionIconWidth: ICON_WIDTH,
}));
