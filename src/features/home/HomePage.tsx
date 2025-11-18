import React, { useEffect, useState } from 'react';
import { ProductSlider } from '../../widgets/ProductSlider';
import { productService } from '../../services/product/product.service';
import type { Product } from '../../services/product';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError('');

      try {
        const productsFromServer = await productService.fetchAll();
        setProducts(productsFromServer);
      } catch (error) {
        setError(`Something went wrong during loading data: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <>
      {products !== null && (
        <ProductSlider layoutText="Default" products={products} />
      )}
    </>
  );
};

export default HomePage;
