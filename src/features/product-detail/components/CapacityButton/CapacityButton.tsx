import type React from 'react';
import './CapacityButton.scss';
import cn from 'classnames';

type Props = {
  ram: string;
  isSelected: boolean;
};

export const CapacityButton: React.FC<Props> = ({ ram, isSelected }) => {
  return (
    <div
      className={cn('capacity-button', {
        'capacity-button--selected': isSelected,
      })}
    >
      <p className="capacity-button__value">{ram}</p>
    </div>
  );
};
