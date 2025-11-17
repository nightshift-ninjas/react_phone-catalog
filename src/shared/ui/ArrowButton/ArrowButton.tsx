import React from 'react';
import './ArrowButton.scss';
import ArrowIcon from '../../assets/icons/arrow-icon-dark.svg?react';

type ArrowButtonProps = {
  onClick: () => void;
  direction: 'up' | 'down' | 'left' | 'right';
  isDisabled?: boolean;
};

const ArrowButton: React.FC<ArrowButtonProps> = ({
  onClick,
  direction,
  isDisabled = false,
}) => {
  const getArrowRotation = () => {
    switch (direction) {
      case 'up':
        return 'rotate(-90deg)';
      case 'down':
        return 'rotate(90deg)';
      case 'left':
        return 'rotate(180deg)';
      case 'right':
        return 'rotate(0deg)';
      default:
        return 'rotate(0deg)';
    }
  };

  const handleClick = isDisabled ? undefined : onClick;

  return (
    <button
      className={`arrow-button ${isDisabled ? 'disabled' : ''}`}
      onClick={handleClick}
      disabled={isDisabled}
    >
      <ArrowIcon
        className="arrow-button__icon"
        style={{ transform: getArrowRotation() }}
      />
    </button>
  );
};

export default ArrowButton;
