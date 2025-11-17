import React, { type ReactNode } from 'react';
import './Button.scss';

type Props = {
  onClick: () => void;

  isSelected: boolean;

  children: ReactNode;
}

export const Button: React.FC<Props> = ({ onClick, isSelected, children }) => {
  return (
    <button
      className={`btn ${isSelected ? "btn--selected" : "btn--regular"}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
