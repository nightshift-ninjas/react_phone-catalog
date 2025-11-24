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
import { useTranslation } from 'react-i18next';

const HomePage: React.FC = () => {
  const { products, isLoading } = useAllProducts();

  const hot = getHotProducts(products);
  const premium = getPremiumProducts(products);
  const popular = getPopularProducts(products);
  const random = getRandomProducts(products);
  const { t } = useTranslation('homePage');

  return (
    <div className="home">
      <h1>{t('welcomeMessage')}</h1>

      <ImageSlider />

      <ProductSlider
        layoutText={t('brandNewModels')}
        products={random}
        isLoading={isLoading}
      />

      <CategoryList sectionTitle={t('shopByCategory')} />

      <ProductSlider
        layoutText={t('hotPrices')}
        products={hot}
        isLoading={isLoading}
      />
      <ProductSlider
        layoutText={t('premiumDevices')}
        products={premium}
        isLoading={isLoading}
      />
      <ProductSlider
        layoutText={t('popularDevices')}
        products={popular}
        isLoading={isLoading}
      />
    </div>
  );
};

export default HomePage;
