import React from 'react';
import * as Form from '@radix-ui/react-form';
import cn from 'classnames';
import './FormInput.scss';
import { useTranslation } from 'react-i18next';

interface FormInputProps {
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  textarea?: boolean;
  className?: string;
  label?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  type = 'text',
  placeholder,
  required = false,
  textarea = false,
  className = '',
  label,
  value,
  disabled = false,
  onChange,
}) => {
  const { t } = useTranslation('contactsPage');
  return (
    <Form.Field
      className={cn(
        'form-input',
        className,
        disabled && 'form-input--disabled',
      )}
      name={name}
    >
      {label && <Form.Label className="form-input__label">{label}</Form.Label>}

      <Form.Control asChild>
        {textarea ? (
          <textarea
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            value={value}
            onChange={onChange}
            className="form-input__textarea"
          />
        ) : (
          <input
            type={type}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            value={value}
            onChange={onChange}
            className="form-input__input"
          />
        )}
      </Form.Control>

      <Form.Message match="valueMissing" className="form-input__message">
        {placeholder} {t('isRequired')}
      </Form.Message>

      {type === 'email' && (
        <Form.Message match="typeMismatch" className="form-input__message">
          {t('validEmail')}
        </Form.Message>
      )}
    </Form.Field>
  );
};
