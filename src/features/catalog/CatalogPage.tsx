import { useParams, useSearchParams } from 'react-router-dom';
import { Category } from '../../services/product/';
import { Breadcrumb } from '../../shared/ui/Breadcrumb';
import { CatalogFilter } from './components/CatalogFilter';
import { useCatalogProducts } from './hooks/useCatalogProducts';
import { CategoryLabels } from './types';
import { CatalogList } from './components/CatalogList';
import { PaginationList } from './components/PaginationList';
import './CatalogPage.scss';
import { useTranslation } from 'react-i18next';

const CatalogPage: React.FC = () => {
  const { category } = useParams<{ category: Category }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation('catalog');

  const { products, isLoading, error, page, perPage, total } =
    useCatalogProducts(category);

  const handlePageSelect = (pageNumber: number) => {
    searchParams.set('page', String(pageNumber));
    setSearchParams(searchParams);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="catalog">
      <div className="catalog__breadcrumbs">
        <Breadcrumb
          items={[{ text: t(`categories.${category}`), link: `/catalog/${category}` }]}
        />
      </div>

      <h1>{t(CategoryLabels[category || Category.PHONES])}</h1>

      <p className="catalog__total-items">
        <span>{total}</span>
        <span>{t('models')}</span>
      </p>

      <CatalogFilter />

      {isLoading && <div>{t('loading')}</div>}

      {!isLoading && error && <div>{t('error')}</div>}

      {!isLoading && !error && (
        <>
          <CatalogList products={products} />
          <PaginationList
            onPageSelect={handlePageSelect}
            total={total}
            perPage={perPage}
            currentPage={page}
          />
        </>
      )}
    </div>
  );
};

export default CatalogPage;
