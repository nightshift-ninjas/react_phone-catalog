import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productService, type Product } from '../../services/product';
import { Breadcrumb } from '../../shared/ui/Breadcrumb';
import ProductDescription from './components/ProductDescription/ProductDescription';
import { ProductSlider } from '../../widgets/ProductSlider';
import { ProductImageGallery } from './components/ProductImageGallery';
import { ProductNavigation } from './components/ProductNavigation';
import { ImageGallerySkeleton } from './components/ImageGallerySkeleton';
import './ProductDetailPage.scss';
import { TextSkeleton } from '../../shared/ui/TextSkeleton';
import { NavigationSkeleton } from './components/NavigationSkeleton';
import { ProductDescriptionSkeleton } from './components/ProductDescriptionSkeleton';
import { BlurReveal } from './components/BlurReveal';
import { useLanguage } from '../../shared/context/language';
import { Language } from '../../widgets/LanguageButton';
import { SlideIn } from '../../shared/animation/SlideIn';
import { useTranslation } from 'react-i18next';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { language: lng } = useLanguage();
  const { t } = useTranslation('productDetail');

  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      setIsLoading(true);

      try {
        const response = await productService.fetchProductById(id);
        setProduct(response);

        if (response.namespaceId) {
          const relatedResponse = await productService.fetchByNamespaceId(
            response.namespaceId,
          );
          setRelatedProducts(relatedResponse);
        } else {
          setRelatedProducts([]);
        }
      } catch (err) {
        console.log(`Something went wrong: ${err}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  return (
    <div className="product-detail">
      <div className="product-detail__breadcrumbs">
        <Breadcrumb
          items={[
            {
              text: `${product?.category}`,
              link: `/catalog/${product?.category}`,
            },
            {
              text: product?.name || 'loading',
              link: `/catalog/${product?.category}/product/${product?.name}`,
            },
          ]}
        />
      </div>

      <SlideIn>
        {!isLoading && product ? (
          <h1 className="product-detail__title">{product.name}</h1>
        ) : (
          <TextSkeleton height={'40px'} widths={['40%', '15%', '5%', '20%']} />
        )}
      </SlideIn>

      <SlideIn beforeAnimationState={{ delay: 0.2 }}>
        <div className="product-detail__section">
          {!isLoading && product ? (
            <>
              <ProductImageGallery images={product.images} />
              <ProductNavigation product={product} />
            </>
          ) : (
            <>
              <ImageGallerySkeleton />
              <NavigationSkeleton />
            </>
          )}
        </div>
      </SlideIn>

      <SlideIn beforeAnimationState={{ delay: 0.4 }}>
        {!isLoading && product ? (
          <>
            {lng !== Language.EN ? (
              <BlurReveal>
                <ProductDescription product={product} />
              </BlurReveal>
            ) : (
              <ProductDescription product={product} />
            )}
          </>
        ) : (
          <ProductDescriptionSkeleton />
        )}
      </SlideIn>

      <SlideIn>
        <div className="product-detail__related">
          <ProductSlider
            layoutText={t("youMayAlsoLike")}
            products={relatedProducts}
            isLoading={isLoading}
          />
        </div>
      </SlideIn>
    </div>
  );
};

export default ProductDetailPage;
