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
import { motion } from 'framer-motion';

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
          items={[
            { text: t(`categories.${category}`), link: `/catalog/${category}` },
          ]}
        />
      </div>

      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {t(CategoryLabels[category || Category.PHONES])}
      </motion.h1>

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
