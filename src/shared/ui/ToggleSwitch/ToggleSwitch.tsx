import * as React from 'react';
import * as Switch from '@radix-ui/react-switch';
import './ToggleSwitch.scss';

export interface ToggleSwitchProps {
  id?: string;
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  IconLeft?: React.FC<React.SVGProps<SVGSVGElement>>;
  IconRight?: React.FC<React.SVGProps<SVGSVGElement>>;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  id = 'toggle-switch',
  label,
  checked,
  defaultChecked,
  disabled = false,
  onChange,
  IconLeft,
  IconRight,
}) => {
  return (
    <div className="toggle-switch">
      {label && (
        <label className="toggle-switch__label" htmlFor={id}>
          {label}
        </label>
      )}

      <Switch.Root
        id={id}
        disabled={disabled}
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onChange}
        className="toggle-switch__root"
      >
        {IconLeft && (
          <span className="toggle-switch__track-icon toggle-switch__track-icon--left">
            <IconLeft />
          </span>
        )}

        {IconRight && (
          <span className="toggle-switch__track-icon toggle-switch__track-icon--right">
            <IconRight />
          </span>
        )}

        <Switch.Thumb className="toggle-switch__thumb" />
      </Switch.Root>
    </div>
  );
};

export default ToggleSwitch;
