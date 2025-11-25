import React from 'react';
import * as RadixDropdown from '@radix-ui/react-dropdown-menu';
import { CheckIcon } from '@radix-ui/react-icons';
import cn from 'classnames';
import './IconDropdown.scss';
import { SlideIn } from '../../animation/SlideIn';

interface Option {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  optionIconWidth?: number;
}

interface Props {
  icon: React.ReactNode;
  options: Option[];
  themeIcon?: boolean;
  onChange: (value: string) => void;
}

export const IconDropdown: React.FC<Props> = ({
  icon,
  options,
  themeIcon = true,
  onChange,
}) => {
  const [selectedValue, setSelectedValue] = React.useState<string | null>(null);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <RadixDropdown.Root>
      <RadixDropdown.Trigger asChild>
        <button
          className={cn('icon-dropdown__button', {
            'icon-dropdown__button--theme': themeIcon,
          })}
          aria-label="Customize options"
        >
          {icon}
        </button>
      </RadixDropdown.Trigger>

      <RadixDropdown.Portal>
        <RadixDropdown.Content
          className="icon-dropdown__content"
          align="end"
          sideOffset={5}
        >
          {options.map((option, index) => (
            <SlideIn
              key={option.value}
              beforeAnimationState={{ delay: 0.2 + 0.1 * index, opacity: 0, y: -20 }}
            >
              <RadixDropdown.Item
                className={`icon-dropdown__item ${option.disabled ? 'icon-dropdown__item--disabled' : ''}`}
                onClick={() => !option.disabled && handleSelect(option.value)}
                disabled={option.disabled}
              >
                {option.icon && (
                  <span
                    className={cn('icon-dropdown__item-icon', {
                      'icon-dropdown__item-icon--theme': themeIcon,
                    })}
                    style={{ width: option.optionIconWidth ?? 40 }}
                  >
                    {option.icon}
                  </span>
                )}
                <span className="icon-dropdown__item-label">
                  {option.label}
                </span>
                {selectedValue === option.value && (
                  <CheckIcon className="icon-dropdown__item-check" />
                )}
              </RadixDropdown.Item>
            </SlideIn>
          ))}
          <RadixDropdown.Separator className="icon-dropdown__separator" />
        </RadixDropdown.Content>
      </RadixDropdown.Portal>
    </RadixDropdown.Root>
  );
};
