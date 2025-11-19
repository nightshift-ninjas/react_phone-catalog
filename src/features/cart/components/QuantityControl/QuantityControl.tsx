import React from "react";
import './QuantityControl.scss';
import { QuantityButton } from "../QuantityButton";

type Props = {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

export const QuantityControl: React.FC<Props> = ({
  quantity,
  onIncrease,
  onDecrease
}) => {
  return (
    <div className="quantity-control">
      <QuantityButton disabled={quantity === 1} onClick={onDecrease}>−</QuantityButton>
      <span className="quantity-control__quantity">{quantity}</span>
      <QuantityButton onClick={onIncrease}>+</QuantityButton>
    </div>
  );
};
