import { useEffect, useState, useMemo } from 'react';
import {
  type Product,
  productService,
  Category,
} from '../../../services/product';
import { useSearchParams } from 'react-router-dom';
import { ProductSortTypes } from '../components/CatalogFilter/type';

const cache: Record<string, Product[]> = {};

export const useCatalogProducts = (category: Category | undefined) => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const sortType = searchParams.get('sort') as ProductSortTypes | null;
  const perPage = Number(searchParams.get('perPage')) || 10;

  useEffect(() => {
    if (!category) return;

    if (cache[category]) {
      setProducts(cache[category]);
      return;
    }

    const load = async () => {
      try {
        setIsLoading(true);
        setError('');
        const fetched = await productService.fetchByCategory(category);
        cache[category] = fetched;
        setProducts(fetched);
      } catch (err) {
        setError(String(err));
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [category]);

  const sorted = useMemo(() => {
    const copy = [...products];

    switch (sortType) {
      case ProductSortTypes.PRICE_ASC:
        return copy.sort((a, b) => a.priceRegular - b.priceRegular);

      case ProductSortTypes.PRICE_DESC:
        return copy.sort((a, b) => b.priceRegular - a.priceRegular);

      case ProductSortTypes.DISCOUNT_ASC:
        return copy.sort((a, b) => {
          const dA = a.priceDiscount ?? a.priceRegular;
          const dB = b.priceDiscount ?? b.priceRegular;
          return dA - dB;
        });

      case ProductSortTypes.DISCOUNT_DESC:
        return copy.sort((a, b) => {
          const dA = a.priceDiscount ?? a.priceRegular;
          const dB = b.priceDiscount ?? b.priceRegular;
          return dB - dA;
        });

      case ProductSortTypes.NAME_ASC:
        return copy.sort((a, b) => a.name.localeCompare(b.name));

      case ProductSortTypes.NAME_DESC:
        return copy.sort((a, b) => b.name.localeCompare(a.name));

      default:
        return copy;
    }
  }, [products, sortType]);

  const page = Number(searchParams.get('page')) || 1;

  const start = (page - 1) * perPage;
  const end = start + perPage;

  const paginated = sorted.slice(start, end);

  return {
    products: paginated,
    isLoading,
    error,
    page,
    perPage,
    total: sorted.length,
  };
};
