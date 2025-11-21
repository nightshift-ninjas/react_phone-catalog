import React from 'react';
import { BadgeStatus } from './types';
import './Badge.scss';

type Props = {
  status?: BadgeStatus;
  children?: React.ReactNode;
  className?: string;
};

export const Badge: React.FC<Props> = ({
  status = BadgeStatus.SUCCESS,
  children,
  className = '',
}) => {
  return (
    <span className={`badge badge--${status} ${className}`.trim()}>
      {children}
    </span>
  );
};
