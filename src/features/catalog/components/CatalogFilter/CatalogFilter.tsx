import React from 'react';
import './CatalogFilter.scss';
import { Dropdown } from '../../../../shared/ui/Dropdown';
import { ProductItemsPerPage, ProductSortTypes } from './type';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type DropdownItem = number | string;

export const CatalogFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t, i18n } = useTranslation('catalog');

  const defaultProductLabel =
    searchParams.get('sort') ?? ProductSortTypes.NAME_ASC;
     const defaultSortLabel = t(`sort.${defaultProductLabel}`);

  const defaultItemsPerPage = ProductItemsPerPage.THIRTY;

  const onItemsPerPageSelect = (item: DropdownItem) => {
    if (Number(item) === defaultItemsPerPage) {
      searchParams.delete('perPage');
    } else {
      searchParams.set('perPage', String(item));
    }

    setSearchParams(searchParams);
  };

  const onSortTypeSelect = (value: DropdownItem) => {
    if (value === defaultProductLabel) {
      searchParams.delete('sort');
    } else {
      searchParams.set('sort', String(value));
    }

    setSearchParams(searchParams);
  };

  return (
    <div className="catalog-filter">
      <Dropdown
        labelValue={t('filters.sortBy')}
        dropdownItems={Object.values(ProductSortTypes)}
        dropdownItemsLabels={Object.values(ProductSortTypes).map((sort) => t(`sort.${sort}`))}
        onSelect={onSortTypeSelect}
        defaultValue={defaultSortLabel}
        key={i18n.language}
      />

      <Dropdown
        labelValue={t('filters.itemsPerPage')}
        dropdownItems={Object.values(ProductItemsPerPage)}
        defaultValue={
          Number(searchParams.get('perPage')) || defaultItemsPerPage
        }
        onSelect={onItemsPerPageSelect}
      />
    </div>
  );
};
