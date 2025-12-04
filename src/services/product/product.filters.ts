import type { Product } from './product.types';

const LIMIT = 15;

export function getHotProducts(products: Product[]): Product[] {
  return [...products]
    .filter((p) => p.priceDiscount && p.priceDiscount < p.priceRegular)
    .sort((a, b) => {
      const discountA = a.priceRegular - (a.priceDiscount ?? a.priceRegular);
      const discountB = b.priceRegular - (b.priceDiscount ?? b.priceRegular);
      return discountB - discountA;
    })
    .slice(0, LIMIT);
}

export function getPremiumProducts(products: Product[]): Product[] {
  return [...products]
    .sort((a, b) => b.priceRegular - a.priceRegular)
    .slice(0, LIMIT);
}

export function getPopularProducts(products: Product[]): Product[] {
  return products
    .filter((p) => p.name.toLowerCase().includes('plus'))
    .slice(0, LIMIT);
}

export function getRandomProducts(products: Product[]): Product[] {
  return products.filter((p) => p.ram && parseInt(p.ram) >= 8).slice(0, LIMIT);
}
