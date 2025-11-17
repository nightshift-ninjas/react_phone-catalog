import React from 'react';
import { unstable_PasswordToggleField as PasswordToggleField } from 'radix-ui';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import './PasswordField.scss';

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
};

export const PasswordField: React.FC<Props> = ({
  value,
  onChange,
  name,
  required,
  placeholder,
  className,
}) => (
  <PasswordToggleField.Root>
    <div className="password-input">
      <PasswordToggleField.Input
        className={`password-input__input ${className ?? ''}`}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        placeholder={placeholder}
      />

      <PasswordToggleField.Toggle className="password-input__toggle">
        <PasswordToggleField.Icon
          visible={<EyeOpenIcon />}
          hidden={<EyeClosedIcon />}
        />
      </PasswordToggleField.Toggle>
    </div>
  </PasswordToggleField.Root>
);
