import React from "react";
import "./QuantityButton.scss";

type Props = {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
};

export const QuantityButton: React.FC<Props> = ({
  onClick,
  disabled,
  children,
}) => {
  return (
    <button
      className='quantity-button'
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
