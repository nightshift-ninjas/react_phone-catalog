import React from 'react';
import './PaginationButton.scss';
import './PaginationButton.scss';

type PaginationButtonProps = {
  onClick: () => void;
  isSelected: boolean;
  children: React.ReactNode;
};

const PaginationButton: React.FC<PaginationButtonProps> = ({
  onClick,
  isSelected,
  children,
}) => {
  return (
    <button
      className={`pagination-button ${isSelected ? 'pagination-button--selected' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default PaginationButton;
