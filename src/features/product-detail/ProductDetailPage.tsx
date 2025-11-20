import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productService, type Product } from '../../services/product';
import { Breadcrumb } from '../../shared/ui/Breadcrumb';
import './ProductDetailPage.scss';
import ProductDescription from './components/ProductDescription/ProductDescription';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      setError('');
      setIsLoading(true);

      try {
        const response = await productService.fetchProductById(id);
        setProduct(response);
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

      <h1>This is ProductDetailPage</h1>

      {!isLoading && product && <h3>{product.name}</h3>}

      {!isLoading && error && <p>{error}</p>}

      {product && <ProductDescription product={product} />}
    </div>
  );
};

export default ProductDetailPage;
