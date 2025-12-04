import React, { type ReactNode } from 'react';
import './Button.scss';
import { ButtonTypes } from './types';

type Props = {
  children: ReactNode;
  onClick: () => void;
  isSelected?: boolean;
  type?: ButtonTypes;
};

export const Button: React.FC<Props> = ({
  onClick,
  isSelected = false,
  children,
  type = ButtonTypes.BUTTON,
}) => {
  return (
    <button
      className={`btn ${isSelected ? 'btn--selected' : 'btn--regular'}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
