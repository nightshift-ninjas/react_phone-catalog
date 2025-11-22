import React from 'react';
import { Skeleton } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import './ProductDescriptionSkeleton.scss';
import { TextSkeleton } from '../../../../shared/ui/TextSkeleton';

export const ProductDescriptionSkeleton: React.FC = () => {
  const regularTextHeight = '15px';
  const titleTextHeight = '25px';

  const textWidths = [
    '40px',
    '70px',
    '110px',
    '90px',
    '130px',
    '60px',
    '120px',
    '80px',
    '100px',
    '150px',
    '55px',
    '95px',
    '140px',
    '75px',
    '125px',
  ];

  return (
    <div className="product-description-skeleton">
      <div className="product-description-skeleton__section">
        <div className="product-description-skeleton__row">
          <Skeleton width={'70px'} height={titleTextHeight} />
        </div>

        <div className="product-description-skeleton__row product-description-skeleton__row--devide">
          <Skeleton width={'100%'} height={'2px'} />
        </div>

        <div className="product-description-skeleton__group">
          <div className="product-description-skeleton__title">
            <TextSkeleton height={titleTextHeight} widths={['60px', '100px']} />
          </div>

          <div className="product-description-skeleton__text">
            <TextSkeleton height={regularTextHeight} widths={textWidths} />
          </div>

          <div className="product-description-skeleton__text">
            <TextSkeleton height={regularTextHeight} widths={textWidths} />
          </div>
        </div>

        <div className="product-description-skeleton__group">
          <div className="product-description-skeleton__title">
            <TextSkeleton height={titleTextHeight} widths={['120px', '40px']} />
          </div>

          <div className="product-description-skeleton__text">
            <TextSkeleton height={regularTextHeight} widths={textWidths} />
          </div>

          <div className="product-description-skeleton__text">
            <TextSkeleton height={regularTextHeight} widths={textWidths} />
          </div>
        </div>
      </div>

      <div className="product-description-skeleton__section">
        <div className="product-description-skeleton__row">
          <Skeleton width={'40px'} height={titleTextHeight} />
        </div>

        <div className="product-description-skeleton__row product-description-skeleton__row--devider">
          <Skeleton width={'100%'} height={'2px'} />
        </div>

        <div className="product-description-skeleton__row product-description-skeleton__row--between">
          <Skeleton width={'60px'} height={regularTextHeight} />
          <Skeleton width={'150px'} height={regularTextHeight} />
        </div>

        <div className="product-description-skeleton__row product-description-skeleton__row--between">
          <Skeleton width={'40px'} height={regularTextHeight} />
          <Skeleton width={'200px'} height={regularTextHeight} />
        </div>

        <div className="product-description-skeleton__row product-description-skeleton__row--between">
          <Skeleton width={'120px'} height={regularTextHeight} />
          <Skeleton width={'120px'} height={regularTextHeight} />
        </div>

        <div className="product-description-skeleton__row product-description-skeleton__row--between">
          <Skeleton width={'40px'} height={regularTextHeight} />
          <Skeleton width={'180px'} height={regularTextHeight} />
        </div>

        <div className="product-description-skeleton__row product-description-skeleton__row--between">
          <Skeleton width={'100px'} height={regularTextHeight} />
          <Skeleton width={'150px'} height={regularTextHeight} />
        </div>

        <div className="product-description-skeleton__row product-description-skeleton__row--between">
          <Skeleton width={'200px'} height={regularTextHeight} />
          <Skeleton width={'20px'} height={regularTextHeight} />
        </div>
      </div>
    </div>
  );
};
