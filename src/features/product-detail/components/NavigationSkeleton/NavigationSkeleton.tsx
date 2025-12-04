import React from 'react';
import { Skeleton } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import './NavigationSkeleton.scss';

export const NavigationSkeleton: React.FC = () => {
  return (
    <div className="navigation-skeleton">
      <div className="navigation-skeleton__row navigation-skeleton__row--between">
        <Skeleton width={'40%'} height={'20px'} />
        <Skeleton width={'20%'} height={'20px'} />
      </div>

      <div className="navigation-skeleton__row">
        <Skeleton
          width={'32px'}
          height={'32px'}
          className="navigation-skeleton__rounded"
        />
        <Skeleton
          width={'32px'}
          height={'32px'}
          className="navigation-skeleton__rounded"
        />
      </div>

      <div className="navigation-skeleton__row">
        <Skeleton width={'100%'} height={'1px'} />
      </div>

      <div className="navigation-skeleton__row">
        <Skeleton width={'20%'} height={'10px'} />
      </div>

      <div className="navigation-skeleton__row">
        <Skeleton width={'60px'} height={'25px'} />
        <Skeleton width={'60px'} height={'25px'} />
        <Skeleton width={'60px'} height={'25px'} />
        <Skeleton width={'60px'} height={'25px'} />
      </div>

      <div className="navigation-skeleton__row">
        <Skeleton width={'100%'} height={'1px'} />
      </div>

      <div className="navigation-skeleton__row">
        <Skeleton width={'30%'} height={'40px'} />
        <Skeleton width={'15%'} height={'40px'} />
      </div>

      <div className="navigation-skeleton__row">
        <Skeleton width={'100%'} height={'40px'} />
        <Skeleton width={'40px'} height={'40px'} />
      </div>

      <div className="navigation-skeleton__row navigation-skeleton__row--between">
        <Skeleton width={'30%'} height={'15px'} />
        <Skeleton width={'25%'} height={'15px'} />
      </div>

      <div className="navigation-skeleton__row navigation-skeleton__row--between">
        <Skeleton width={'45%'} height={'15px'} />
        <Skeleton width={'15%'} height={'15px'} />
      </div>
    </div>
  );
};
