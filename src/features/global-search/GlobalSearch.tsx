import React, { useState, useMemo } from 'react';
import { useAllProducts, useDebounce } from '../../shared/hooks';
import { FullScreenModal } from '../../shared/ui/FullScreenModal';
import { GlobalSearchList } from './components/GlobalSearchList';
import { FormInput } from '../../shared/ui/FormInput';
import ClearSVG from '../../shared/assets/icons/remove.svg?react';
import * as Form from '@radix-ui/react-form';
import './GlobalSearch.scss';
import { useTranslation } from 'react-i18next';
import { SlideIn } from '../../shared/animation/SlideIn';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const DEBOUNCE_TIME = 700;

export const GlobalSearch: React.FC<Props> = ({ isOpen, onClose }) => {
  const { products } = useAllProducts();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, DEBOUNCE_TIME);
  const { t } = useTranslation('globalSearch');

  const normalize = (str: string) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

  const filteredProducts = useMemo(() => {
    if (!debouncedQuery) return [];

    const normalizedQuery = normalize(debouncedQuery);

    return products
      .filter((p) => {
        const values = [
          p.name,
          p.category,
          p.year?.toString() || '',
          p.screen || '',
          p.processor || '',
          p.ram || '',
          p.camera || '',
        ]
          .join(' ')
          .split(' ')
          .map(normalize)
          .join(' ');

        return values.includes(normalizedQuery);
      })
      .slice(0, 7);
  }, [debouncedQuery, products]);

  const clearSearch = () => setQuery('');

  return (
    <FullScreenModal isOpen={isOpen} onClose={onClose}>
      <SlideIn beforeAnimationState={{ y: -100 }}>
        <div className="global-search">
          <Form.Root>
            <div className="global-search__search">
              <FormInput
                name="search"
                placeholder={t('searchInput')}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />

              <button onClick={clearSearch}>
                <ClearSVG />
              </button>
            </div>
          </Form.Root>

          <div className="global-search__results">
            {filteredProducts.length === 0 ? (
              <h4 className="global-search__not-found">{t('noResult')}</h4>
            ) : (
              <div onClick={onClose}>
                <GlobalSearchList products={filteredProducts} />
              </div>
            )}
          </div>
        </div>
      </SlideIn>
    </FullScreenModal>
  );
};
