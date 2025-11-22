import type { Rate } from '../../services/currency';
import { CurrencySymbols, type Currency } from '../../widgets/CurrencyButton';

export const convertPrice = (
  price: number | undefined,
  rates: Rate[],
  currency: Currency,
): string => {
  if (price === undefined) return '-';

  const rateObj = rates.find((r) => r.currency === currency);

  const converted = rateObj ? price * rateObj.rate : price;

  const symbol = CurrencySymbols[currency] || '';

  return `${symbol}${converted.toFixed(2)}`;
};
