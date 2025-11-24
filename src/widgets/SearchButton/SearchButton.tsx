import React from 'react';
import SearchIcon from '../../shared/assets/icons/search.svg?react';
import './SearchButton.scss';

type Props = {
  onSearchClick: () => void;
};

export const SearchButton: React.FC<Props> = ({ onSearchClick }) => {
  return (
    <button className="search-btn" onClick={onSearchClick}>
      <SearchIcon />
    </button>
  );
};
