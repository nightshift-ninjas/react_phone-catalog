import React from 'react';
import './CatalogFilter.scss';
import { Dropdown } from '../../../../shared/ui/Dropdown';
import { ProductItemsPerPage, ProductSortTypes } from './type';
import { useSearchParams } from 'react-router-dom';

type DropdownItem = number | string;

export const CatalogFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultProductLabel =
    searchParams.get('sort') ?? Object.values(ProductSortTypes)[0];
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
        labelValue="Sort by"
        dropdownItems={Object.values(ProductSortTypes)}
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
