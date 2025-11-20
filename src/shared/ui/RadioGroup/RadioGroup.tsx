import * as React from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import './RadioGroup.scss';

export interface Option {
  label: string;
  value: string;
}

interface Props {
  name: string;
  options: Option[];
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

const RadioGroupComponent: React.FC<Props> = ({
  name,
  options,
  defaultValue,
  onValueChange,
}) => {
  return (
    <div className="radio-group">
      <RadioGroup.Root
        className="radio-group__root"
        name={name}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
      >
        {options.map((opt) => {
          const id = `${name}-${opt.value}`;
          return (
            <div className="radio-group__item-wrapper" key={opt.value}>
              <RadioGroup.Item
                className="radio-group__item"
                value={opt.value}
                id={id}
              >
                <RadioGroup.Indicator className="radio-group__indicator" />
              </RadioGroup.Item>

              <label className="radio-group__label" htmlFor={id}>
                {opt.label}
              </label>
            </div>
          );
        })}
      </RadioGroup.Root>
    </div>
  );
};

export default RadioGroupComponent;
