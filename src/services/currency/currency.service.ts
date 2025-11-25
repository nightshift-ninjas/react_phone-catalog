import { Currency } from '../../widgets/CurrencyButton';
import type { Rate } from './currency.types';

const API_KEY = 'fca_live_Y6XNZgnzlOXthKhQ4j7QB6fw4d4CZ0JpW8UkQ7v0';
const BASE_URL = `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}`;

async function getCashRates(
  currencies: string[] = Object.values(Currency),
): Promise<Rate[]> {
  try {
    let url = BASE_URL;
    if (currencies.length > 0) {
      const params = new URLSearchParams({
        currencies: currencies.join(','),
      });
      url += `&${params.toString()}`;
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch rates');

    const data = await response.json();

    const ratesArray: Rate[] = Object.entries(data.data).map(
      ([currency, rate]) => ({
        currency,
        rate: Number(rate),
      }),
    );

    return ratesArray;
  } catch (error) {
    console.error('Error fetching currency rates:', error);
    return [];
  }
}

// Export as a service object
export const currencyService = {
  getCashRates,
};
