import { useState, useMemo, type ChangeEvent } from 'react';

export interface UseSliderProps {
  id?: string;
  label?: string;
  min?: string | number;
  max?: string | number;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value: number) => void;
}

export function useSlider({ id, label, min = 0, max = 100, value, defaultValue, onChange }: UseSliderProps) {
  const minNum = Number(min);
  const maxNum = Number(max);

  const [internalValue, setInternalValue] = useState(Number(defaultValue ?? min));
  const isControlled = value !== undefined;
  const currentValue = isControlled ? Number(value) : internalValue;

  const percentage = useMemo(() => {
    const val = Math.max(minNum, Math.min(maxNum, currentValue));
    return ((val - minNum) / (maxNum - minNum)) * 100;
  }, [currentValue, minNum, maxNum]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const sliderId = id || (label ? `slider-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return {
    currentValue,
    percentage,
    handleChange,
    sliderId
  };
}
