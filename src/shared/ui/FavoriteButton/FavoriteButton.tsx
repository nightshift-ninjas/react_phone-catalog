import React from 'react';

import './FavoriteButton.scss';

import FavoriteIcon from '../../assets/icons/favorite.svg?react';
import FavoriteFilledIcon from '../../assets/icons/favorite-filled.svg?react';

type FavoriteButtonProps = {
  onClick: () => void;
  isSelected: boolean;
};

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  onClick,
  isSelected,
}) => {
  return (
    <button
      className={`favorite-button ${isSelected ? 'favorite-button--selected' : ''}`}
      onClick={onClick}
    >
      {isSelected ? (
        <FavoriteFilledIcon className="favorite-button__icon favorite-button__icon--selected" />
      ) : (
        <FavoriteIcon className="favorite-button__icon favorite-button__icon--not-selected" />
      )}
    </button>
  );
};

export default FavoriteButton;
