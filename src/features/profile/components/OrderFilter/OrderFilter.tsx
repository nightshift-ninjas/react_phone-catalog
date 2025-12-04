import React from 'react';
import { SegmentedControl } from '../../../../shared/ui/SegmentedControl';
import { OrderFilterMethods, OrderSortFields } from './types';
import FilterIcon from '../../../../shared/assets/icons/filter.svg?react';
import { IconDropdown } from '../../../../shared/ui/IconDropdown';
import './OrderFilter.scss';
import { useTranslation } from 'react-i18next';
import { SlideIn } from '../../../../shared/animation/SlideIn';

type Props = {
  filter: OrderFilterMethods;
  onFilter: (
    changes: Partial<{ filter: OrderFilterMethods; sort: OrderSortFields }>,
  ) => void;
};

export const OrderFilter: React.FC<Props> = ({ filter, onFilter }) => {
  const { t } = useTranslation('profile');

  const filterOptions = Object.values(OrderFilterMethods).map((val) => ({
    label: t(`orderFilterMethods.${val}`),
    value: val,
  }));

  const sortOptions = Object.values(OrderSortFields).map((val) => ({
    label: t(`orderSortFields.${val}`),
    value: val,
  }));

  return (
    <div className="order-filter">
      <div className="order-filter__block">
        <SlideIn>
          <SegmentedControl
            className="order-filter__filter"
            value={filter}
            onChange={(value) =>
              onFilter({ filter: value as OrderFilterMethods })
            }
            options={filterOptions}
          />
        </SlideIn>
      </div>

      <div className="order-filter__block">
        <SlideIn beforeAnimationState={{ delay: 0.2 }}>
          <IconDropdown
            icon={<FilterIcon />}
            options={sortOptions}
            onChange={(value) => onFilter({ sort: value as OrderSortFields })}
          />
        </SlideIn>
      </div>
    </div>
  );
};
