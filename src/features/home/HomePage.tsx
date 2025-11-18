import React, { useEffect, useState } from 'react';
import { ProductSlider } from '../../widgets/ProductSlider';
import { productService } from '../../services/product/product.service';
import type { Product } from '../../services/product';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsFromServer = await productService.fetchAll(); 
        setProducts(productsFromServer);
      } catch (error) {
        console.log(error);
        throw new Error("Something went wrong during loading data");
      }
    };

    loadProducts();
  }, []);

  return (
    <>
      {products !== null && <ProductSlider layoutText='Default' products={products} />}
    </>
  );
};

export default HomePage;
