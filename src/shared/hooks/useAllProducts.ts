import { useState, useEffect } from 'react';
import { productService, type Product } from '../../services/product';

let cachedProducts: Product[] | null = null;

export const useAllProducts = () => {
  const [products, setProducts] = useState<Product[]>(cachedProducts ?? []);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (cachedProducts) return;

    const loadProducts = async () => {
      setIsLoading(true);

      try {
        const productsFromServer = await productService.fetchAll();
        setProducts(productsFromServer);
        cachedProducts = productsFromServer;
      } catch (error) {
        console.log(`Something went wrong during loading data: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return { products, isLoading };
};
