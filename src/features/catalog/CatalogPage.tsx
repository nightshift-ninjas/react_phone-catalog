import { useParams } from 'react-router-dom';
import {
  Category,
  productService,
  type Product,
} from '../../services/product/';
import { useEffect, useState } from 'react';
import { ProductCard } from '../../widgets/ProductCard';
import { Breadcrumb } from '../../shared/ui/Breadcrumb';
import './CatalogPage.scss';

const CatalogPage: React.FC = () => {
  const { category } = useParams<{ category: Category }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!category) return;

    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setError('');

        const response = await productService.fetchByCategory(category);

        setProducts(response);
      } catch (error) {
        setError(
          `Something went wrong while fetching products by categories: ${error}`,
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [category]);

  return (
    <div className="catalog">
      <div className="catalog__breadcrumbs">
        <Breadcrumb
          items={[{ text: category!, link: `/catalog/${category}` }]}
        />
      </div>

      <h1>{`This is page for the Catalog of ${category}`}</h1>

      {!isLoading && (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}

      {!isLoading && error && <div>{error}</div>}
    </div>
  );
};

export default CatalogPage;
