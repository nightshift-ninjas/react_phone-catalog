import React from 'react';
import { Skeleton } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import './ProductCardSkeleton.scss';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="product-card-skeleton">
      <Skeleton width={'100%'} height={'200px'} />

      <div className="product-card-skeleton__body">
        <div className="product-card-skeleton__row">
          <Skeleton width={'100%'} height={'20px'} />
        </div>

        <div className="product-card-skeleton__row">
          <Skeleton width={'70%'} height={'30px'} />
          <Skeleton width={'30%'} height={'30px'} />
        </div>

        <div className="product-card-skeleton__row product-card-skeleton__row--devider">
          <Skeleton width={'100%'} height={'2px'} />
        </div>

        <div className="product-card-skeleton__row">
          <Skeleton width={'30%'} height={'15px'} />
          <Skeleton width={'40%'} height={'15px'} />
        </div>

        <div className="product-card-skeleton__row">
          <Skeleton width={'20%'} height={'15px'} />
          <Skeleton width={'50%'} height={'15px'} />
        </div>

        <div className="product-card-skeleton__row">
          <Skeleton width={'46%'} height={'15px'} />
          <Skeleton width={'12%'} height={'15px'} />
        </div>

        <div className="product-card-skeleton__row product-card-skeleton__row--btns">
          <Skeleton width={'100%'} height={'40px'} />
          <Skeleton width={'40px'} height={'40px'} />
        </div>
      </div>
    </div>
  );
};
