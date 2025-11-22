import React from 'react';
import { Skeleton } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import './ImageGallerySkeleton.scss';

export const ImageGallerySkeleton: React.FC = () => {
  return (
    <div className="gallery-skeleton">
      <div className="gallery-skeleton__list ">
        <Skeleton width={'70px'} height={'70px'} />
        <Skeleton width={'70px'} height={'70px'} />
        <Skeleton width={'70px'} height={'70px'} />
      </div>

      <Skeleton width={'400px'} height={'400px'} />
    </div>
  );
};
