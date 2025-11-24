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
  const { products } = useAllProducts();

  const hot = getHotProducts(products);
  const premium = getPremiumProducts(products);
  const popular = getPopularProducts(products);
  const random = getRandomProducts(products);

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
