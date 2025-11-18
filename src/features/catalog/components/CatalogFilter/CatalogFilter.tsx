import React from 'react';
import './CatalogFilter.scss';
import { Dropdown } from '../../../../shared/ui/Dropdown';
import {
  ProductItemsPerPage,
  ProductSortLabels,
  ProductSortTypes,
} from './type';
import { useSearchParams } from 'react-router-dom';

type DropdownItem = number | string;

export const CatalogFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultProductLabel = Object.values(ProductSortLabels)[0];
  const defaultItemsPerPage = ProductItemsPerPage.TEN;

  const onItemsPerPageSelect = (item: DropdownItem) => {
    if (Number(item) === defaultItemsPerPage) {
      searchParams.delete('perPage');
    } else {
      searchParams.set('perPage', String(item));
    }

    setSearchParams(searchParams);
  };

  const onSortTypeSelect = (label: DropdownItem) => {
    const value = (
      Object.keys(ProductSortLabels) as Array<ProductSortTypes>
    ).find((key) => ProductSortLabels[key] === label);

    if (!value) return;

    if (label === defaultProductLabel) {
      searchParams.delete('sort');
    } else {
      searchParams.set('sort', value);
    }

    setSearchParams(searchParams);
  };

  return (
    <div className="catalog-filter">
      <Dropdown
        labelValue="Sort by"
        dropdownItems={Object.values(ProductSortLabels)}
        onSelect={onSortTypeSelect}
        defaultValue={defaultProductLabel}
      />

      <Dropdown
        labelValue="Items on page"
        dropdownItems={Object.values(ProductItemsPerPage)}
        defaultValue={
          Number(searchParams.get('perPage')) || defaultItemsPerPage
        }
        onSelect={onItemsPerPageSelect}
      />
    </div>
  );
};
