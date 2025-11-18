import React, { type ReactNode } from 'react';
import './Button.scss';

type Props = {
  children: ReactNode;
  onClick: () => void;
  isSelected?: boolean;
};

export const Button: React.FC<Props> = ({
  onClick,
  isSelected = false,
  children,
}) => {
  return (
    <button
      className={`btn ${isSelected ? 'btn--selected' : 'btn--regular'}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
