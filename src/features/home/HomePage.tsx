import React from 'react';
import { ProductSlider } from '../../widgets/ProductSlider';
import {
  getHotProducts,
  getPopularProducts,
  getPremiumProducts,
  getRandomProducts,
} from '../../services/product';
import CategoryList from './components/CategoryList/CategoryList';
import './HomePage.scss';
import ImageSlider from './components/ImageSlider/ImageSlider';
import { useAllProducts } from '../../shared/hooks';

const HomePage: React.FC = () => {
  const { products, isLoading } = useAllProducts();

  const hot = getHotProducts(products);
  const premium = getPremiumProducts(products);
  const popular = getPopularProducts(products);
  const random = getRandomProducts(products);

  return (
    <div className="home">
      <h1>Welcome to Nice Gadgets store!</h1>

      <ImageSlider />

      <ProductSlider
        layoutText="Brand new models"
        products={random}
        isLoading={isLoading}
      />

      <CategoryList />

      <ProductSlider
        layoutText="Hot prices"
        products={hot}
        isLoading={isLoading}
      />
      <ProductSlider
        layoutText="Premium devices"
        products={premium}
        isLoading={isLoading}
      />
      <ProductSlider
        layoutText="Popular devices"
        products={popular}
        isLoading={isLoading}
      />
    </div>
  );
};

export default HomePage;
