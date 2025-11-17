import React, { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import ArrowButton from "../../assets/icons/arrow-up-down.svg?react"


import './Dropdown.scss';

type Props = {
  labelValue: string;
  width: string
  dropdownItems: string[];
};

export const Dropdown: React.FC<Props> = ({
  labelValue,
  width,
  dropdownItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <div className="dropdown" style={{width}}>
      <label className="dropdown__label">{labelValue}</label>
      <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenu.Trigger className="dropdown__trigger" style={{width}}>
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
                  style={{width}}
                  onSelect={() => setSelectedItem(item)}
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
