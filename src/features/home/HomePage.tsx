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
import { SlideIn } from '../../shared/animation/SlideIn';
import { AnimatedTitle } from '../../shared/animation/AnimatedTitle/AnimatedTitle'

const HomePage: React.FC = () => {
  const { products, isLoading } = useAllProducts();

  const hot = getHotProducts(products);
  const premium = getPremiumProducts(products);
  const popular = getPopularProducts(products);
  const random = getRandomProducts(products);
  const { t } = useTranslation('homePage');

  return (
    <div className="home">
     <AnimatedTitle text={t('welcomeMessage')} />

      <SlideIn>
        <ImageSlider />
      </SlideIn>

      <SlideIn>
        <ProductSlider
          layoutText={t('brandNewModels')}
          products={random}
          isLoading={isLoading}
        />
      </SlideIn>

      <SlideIn>
        <CategoryList sectionTitle={t('shopByCategory')} />
      </SlideIn>

      <SlideIn>
        <ProductSlider
          layoutText={t('hotPrices')}
          products={hot}
          isLoading={isLoading}
        />
      </SlideIn>

      <SlideIn>
        <ProductSlider
          layoutText={t('premiumDevices')}
          products={premium}
          isLoading={isLoading}
        />
      </SlideIn>

      <SlideIn>
        <ProductSlider
          layoutText={t('popularDevices')}
          products={popular}
          isLoading={isLoading}
        />
      </SlideIn>
    </div>
  );
};

export default HomePage;
