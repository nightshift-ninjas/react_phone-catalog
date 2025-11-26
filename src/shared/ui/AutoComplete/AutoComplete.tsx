import React, { useState, useRef, useEffect } from 'react';
import './AutoComplete.scss';

type Props = {
  value: string;
  placeholder: string;
  label: string;
  items: string[];
  itemLabels: string[];
  onInput: (text: string) => void;
  onSelect: (id: string) => void;
};

export const AutoComplete: React.FC<Props> = ({
  value,
  placeholder,
  label,
  items,
  itemLabels,
  onInput,
  onSelect,
}) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="autocomplete" ref={wrapperRef}>
      <label className="autocomplete__label">{label}</label>

      <input
        className="autocomplete__input"
        value={value}
        placeholder={placeholder}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          onInput(e.target.value);
          setOpen(true);
        }}
      />

      {open && items.length > 0 && (
        <div className="autocomplete__list">
          {items.map((item, i) => (
            <div
              key={item}
              className="autocomplete__item"
              onClick={() => {
                onSelect(item);
                setOpen(false);
              }}
            >
              {itemLabels[i]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
