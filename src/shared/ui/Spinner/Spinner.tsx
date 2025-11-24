import React from 'react';
import './Spinner.scss';

interface SpinnerProps {
  size?: number;
  thickness?: number;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 40,
  thickness = 4,
}) => {
  const style: React.CSSProperties = {
    width: size,
    height: size,
    borderWidth: thickness,
  };

  return <div className="spinner" style={style} />;
};
