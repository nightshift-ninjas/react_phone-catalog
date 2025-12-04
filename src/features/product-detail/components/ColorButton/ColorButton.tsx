import React from 'react';
import './ColorButton.scss';

import { COLORS } from './ColorTypes';
import type { Colors } from './ColorTypes';

type Props = {
  onClick: () => void;
  isSelected?: boolean;
  color: Colors;
};

export const ColorButton: React.FC<Props> = ({
  onClick,
  isSelected = false,
  color,
}) => {
  return (
    <button
      type="button"
      className={`color-button ${isSelected ? 'color-button--selected' : ''}`}
      onClick={onClick}
    >
      <span
        className="color-button__inner"
        style={{ backgroundColor: COLORS[color] }}
      />
    </button>
  );
};

export default ColorButton;
