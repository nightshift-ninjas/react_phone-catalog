import React from 'react';
import { Skeleton } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import './TextSkeleton.scss';

type Props = {
  height: string;
  widths: string[];
};

export const TextSkeleton: React.FC<Props> = ({ height = '40px', widths }) => {
  return (
    <div className="text-skeleton">
      {widths.map((width, index) => (
        <Skeleton key={index} height={height} width={width} />
      ))}
    </div>
  );
};
