import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productService, type Product } from '../../services/product';
import { Breadcrumb } from '../../shared/ui/Breadcrumb';
import ProductDescription from './components/ProductDescription/ProductDescription';
import { ProductSlider } from '../../widgets/ProductSlider';
import { ProductImageGallery } from './components/ProductImageGallery';
import { ProductNavigation } from './components/ProductNavigation';
import './ProductDetailPage.scss';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      setError('');
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
        setError(`Something went wrong: ${err}`);
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

      {!isLoading && product && (
        <h1 className="product-detail__title">{product.name}</h1>
      )}

      {product && (
        <>
          <div className="product-detail__section">
            <ProductImageGallery images={product.images} />
            <ProductNavigation product={product} />
          </div>
        </>
      )}

      {!isLoading && error && <p>{error}</p>}

      {product && <ProductDescription product={product} />}

      {relatedProducts.length > 0 && (
        <div className="product-detail__related">
          <ProductSlider
            layoutText="You may also like"
            products={relatedProducts}
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
