import React, { useEffect, useState } from 'react';
import { ProductSlider } from '../../widgets/ProductSlider';
import { productService } from '../../services/product/product.service';
import {
  getHotProducts,
  getPopularProducts,
  getPremiumProducts,
  getRandomProducts,
  type Product,
} from '../../services/product';
import CategoryList from './components/CategoryList/CategoryList';
import './HomePage.scss';
import ImageSlider from './components/ImageSlider/ImageSlider';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const hot = getHotProducts(products);
  const premium = getPremiumProducts(products);
  const popular = getPopularProducts(products);
  const random = getRandomProducts(products);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);

      try {
        const productsFromServer = await productService.fetchAll();
        setProducts(productsFromServer);
      } catch (error) {
        console.log(`Something went wrong during loading data: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="home">
      <h1>Welcome to Nice Gadgets store!</h1>

      <ImageSlider />

      {products && (
        <ProductSlider layoutText="Brand new models" products={random} />
      )}

      <CategoryList />

      {products && <ProductSlider layoutText="Hot prices" products={hot} />}

      {products && (
        <ProductSlider layoutText="Premium devices" products={premium} />
      )}

      {products && (
        <ProductSlider layoutText="Popular devices" products={popular} />
      )}
    </div>
  );
};

export default HomePage;
