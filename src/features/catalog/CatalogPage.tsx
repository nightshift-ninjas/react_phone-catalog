import { useParams } from 'react-router-dom';
import { Category } from '../../services/product/';
import { Breadcrumb } from '../../shared/ui/Breadcrumb';
import { CatalogFilter } from './components/CatalogFilter';
import { useCatalogProducts } from './hooks/useCatalogProducts';
import { CategoryLabels } from './types';
import { CatalogList } from './components/CatalogList';
import './CatalogPage.scss';

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

      <p className="catalog__total-items">
        <span>{total}</span>
        <span>models</span>
      </p>

      <CatalogFilter />

      {isLoading && <div>Loading products...</div>}

      {!isLoading && error && <div>{error}</div>}

      {!isLoading && !error && <CatalogList products={products} />}
    </div>
  );
};

export default CatalogPage;
