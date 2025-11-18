import { useParams } from 'react-router-dom';
import { Category } from '../../services/product/';
import { ProductCard } from '../../widgets/ProductCard';
import { Breadcrumb } from '../../shared/ui/Breadcrumb';
import { CatalogFilter } from './components/CatalogFilter';
import { useCatalogProducts } from './hooks/useCatalogProducts';
import './CatalogPage.scss';
import { CategoryLabels } from './types';

const CatalogPage: React.FC = () => {
  const { category } = useParams<{ category: Category }>();

  const { products, isLoading, error, page, perPage, total } =
    useCatalogProducts(category);

  return (
    <div className="catalog">
      <div className="catalog__breadcrumbs">
        <Breadcrumb
          items={[{ text: category!, link: `/catalog/${category}` }]}
        />
      </div>

      <h1>{CategoryLabels[category || Category.PHONES]}</h1>

      <CatalogFilter />

      {isLoading && <div>Loading products...</div>}

      {!isLoading && error && <div>{error}</div>}

      {!isLoading && !error && (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CatalogPage;
