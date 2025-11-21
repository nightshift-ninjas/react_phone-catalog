import React from 'react';
import { SegmentedControl } from '../../../../shared/ui/SegmentedControl';
import {
  OrderFilterMethods,
  OrderFilterLabels,
  OrderSortFields,
  OrderSortLabels,
} from './types';
import FilterIcon from '../../../../shared/assets/icons/filter.svg?react';
import { IconDropdown } from '../../../../shared/ui/IconDropdown';
import './OrderFilter.scss';

type Props = {
  filter: OrderFilterMethods;
  onFilter: (
    changes: Partial<{ filter: OrderFilterMethods; sort: OrderSortFields }>,
  ) => void;
};

export const OrderFilter: React.FC<Props> = ({ filter, onFilter }) => {
  const filterOptions = Object.values(OrderFilterMethods).map((val) => ({
    label: OrderFilterLabels[val],
    value: val,
  }));

  const sortOptions = Object.values(OrderSortFields).map((val) => ({
    label: OrderSortLabels[val],
    value: val,
  }));

  return (
    <div className="order-filter">
      <div className="order-filter__block">
        <SegmentedControl
          className="order-filter__filter"
          value={filter}
          onChange={(value) =>
            onFilter({ filter: value as OrderFilterMethods })
          }
          options={filterOptions}
        />
      </div>

      <div className="order-filter__block">
        <IconDropdown
          icon={<FilterIcon />}
          options={sortOptions}
          onChange={(value) => onFilter({ sort: value as OrderSortFields })}
        />
      </div>
    </div>
  );
};
