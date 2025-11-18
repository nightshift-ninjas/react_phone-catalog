import React, { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import ArrowButton from '../../assets/icons/arrow-up-down.svg?react';

import './Dropdown.scss';

type Item = string | number;

type Props = {
  labelValue: string;
  dropdownItems: Item[];
  defaultValue?: Item;
  onSelect: (item: Item) => void;
};

export const Dropdown: React.FC<Props> = ({
  labelValue,
  dropdownItems,
  defaultValue = dropdownItems[0],
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(defaultValue);

  const handleSelection = (item: Item) => {
    setSelectedItem(item);
    onSelect(item);
  };

  return (
    <div className="dropdown">
      <label className="dropdown__label">{labelValue}</label>
      <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenu.Trigger className="dropdown__trigger">
          <div className="dropdown__trigger-name">
            {selectedItem === null ? 'none' : selectedItem}
          </div>
          <ArrowButton className="dropdown__trigger-button" />
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content className="dropdown__content" sideOffset={4}>
            {dropdownItems.map((item) => {
              return (
                <DropdownMenu.Item
                  key={item}
                  className="dropdown__item"
                  onSelect={() => handleSelection(item)}
                >
                  {item}
                </DropdownMenu.Item>
              );
            })}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};
