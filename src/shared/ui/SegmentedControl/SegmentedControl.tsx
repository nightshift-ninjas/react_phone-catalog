import React, { useRef, useLayoutEffect, useState } from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import './SegmentedControl.scss';

export interface SegmentedOption {
  label: string;
  value: string;
}

interface SegmentedControlProps {
  options: SegmentedOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value,
  onChange,
  className = '',
}) => {
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [sliderPosition, setSliderPosition] = useState({
    width: 0,
    left: 0,
  });

  const updateSliderPosition = () => {
    const activeIndex = options.findIndex((option) => option.value === value);
    const activeElement = optionRefs.current[activeIndex];

    if (activeElement && wrapperRef.current) {
      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      const elementRect = activeElement.getBoundingClientRect();

      setSliderPosition({
        width: elementRect.width,
        left: elementRect.left - wrapperRect.left,
      });
    }
  };

  useLayoutEffect(() => {
    updateSliderPosition();
  }, [value, options]);

  useLayoutEffect(() => {
    const observer = new ResizeObserver(updateSliderPosition);
    optionRefs.current.forEach(
      (element) => element && observer.observe(element),
    );
    return () => observer.disconnect();
  }, [options]);

  return (
    <div className={`segmented-control ${className}`} ref={wrapperRef}>
      <div
        className="segmented-control__slider"
        style={{
          width: sliderPosition.width,
          transform: `translateX(${sliderPosition.left}px)`,
        }}
      />

      <ToggleGroup.Root
        type="single"
        value={value}
        onValueChange={(nextValue) => nextValue && onChange(nextValue)}
        className="segmented-control__group"
      >
        {options.map((option, index) => (
          <ToggleGroup.Item
            key={option.value}
            value={option.value}
            className="segmented-control__item"
            ref={(element) => {
              optionRefs.current[index] = element;
            }}
          >
            {option.label}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
    </div>
  );
};
