import React from 'react';

import ArrowButton from '../../../../shared/ui/ArrowButton/ArrowButton';
import PaginationButton from '../PaginationButton/PaginationButton';
import './PaginationList.scss';

type Props = {
  onPageSelect: (pageNumber: number) => void;
  total: number;
  perPage: number;
  currentPage: number;
};

export const PaginationList: React.FC<Props> = ({
  onPageSelect,
  total,
  perPage,
  currentPage,
}) => {
  const totalPages = Math.ceil(total / perPage);

  const isBeginning = currentPage === 1;
  const isEnd = currentPage === totalPages;

  const pagesAmount = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  return (
    <div className="pagination">
      <ArrowButton
        onClick={() => onPageSelect(currentPage - 1)}
        direction="left"
        isDisabled={isBeginning}
      />

      {pagesAmount.map((pageNumber) => {
        return (
          <PaginationButton
            key={pageNumber}
            onClick={() => onPageSelect(pageNumber)}
            isSelected={pageNumber === currentPage}
          >
            {pageNumber}
          </PaginationButton>
        );
      })}

      <ArrowButton
        onClick={() => onPageSelect(currentPage + 1)}
        direction="right"
        isDisabled={isEnd}
      />
    </div>
  );
};
