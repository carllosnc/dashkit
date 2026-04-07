import { useState, useRef, useEffect, useLayoutEffect, useMemo } from 'react';
import { type ComboboxOption } from './Combobox';

export interface UseComboboxProps {
  options: ComboboxOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  disabled?: boolean;
  clearSearchOnSelect?: boolean;
  multiple?: boolean;
}

export function useCombobox({
  options,
  value,
  onChange,
  disabled,
  clearSearchOnSelect,
  multiple
}: UseComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
  const [side, setSide] = useState<'top' | 'bottom'>('bottom');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedOptions = useMemo(() => {
    if (multiple && Array.isArray(value)) {
      return options.filter(opt => value.includes(opt.value));
    }
    if (!multiple && typeof value === 'string') {
      const found = options.find(opt => opt.value === value);
      return found ? [found] : [];
    }
    return [];
  }, [options, value, multiple]);

  const selectedOption = selectedOptions[0];

  useLayoutEffect(() => {
    const updateRect = () => {
      if (isOpen && inputWrapperRef.current) {
        const rect = inputWrapperRef.current.getBoundingClientRect();
        setTriggerRect(rect);

        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;

        if (spaceBelow < 250 && spaceAbove > spaceBelow) {
          setSide('top');
        } else {
          setSide('bottom');
        }
      }
    };

    updateRect();
    window.addEventListener('resize', updateRect);
    return () => window.removeEventListener('resize', updateRect);
  }, [isOpen, selectedOptions]);

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (!isOpen && !multiple) {
      const nextQuery = selectedOption?.label || '';
      if (query !== nextQuery) {
        setQuery(nextQuery);
      }
    }
  }

  const filteredOptions = useMemo(() => {
    const safeQuery = query.toLowerCase().trim();
    if (!safeQuery || (!multiple && selectedOption && query === selectedOption.label)) {
      return options;
    }
    return options.filter(opt =>
      opt.label.toLowerCase().includes(safeQuery)
    );
  }, [options, query, selectedOption, multiple]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById('dashkit-combobox-portal');
      if (
        containerRef.current && !containerRef.current.contains(event.target as Node) &&
        (!menu || !menu.contains(event.target as Node))
      ) {
        setIsOpen(false);
      }
    };

    const handleScroll = (event: Event) => {
      const menu = document.getElementById('dashkit-combobox-portal');
      if (isOpen && menu && !menu.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll, true);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isOpen]);

  const handleSelect = (option: ComboboxOption) => {
    if (multiple) {
      const currentValue = Array.isArray(value) ? value : [];
      const isSelected = currentValue.includes(option.value);
      const nextValue = isSelected
        ? currentValue.filter(v => v !== option.value)
        : [...currentValue, option.value];

      onChange?.(nextValue);
      setQuery('');
    } else {
      onChange?.(option.value);
      if (clearSearchOnSelect) {
        setQuery('');
      } else {
        setQuery(option.label);
      }
      setIsOpen(false);
    }
  };

  const handleRemoveOption = (val: string) => {
    if (multiple && Array.isArray(value)) {
      onChange?.(value.filter(v => v !== val));
    }
  };

  const handleInputClick = () => {
    if (disabled) return;
    setIsOpen(true);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(multiple ? [] : '');
    setQuery('');
    inputRef.current?.focus();
  };

  const isOptionSelected = (opt: ComboboxOption) => {
    if (multiple && Array.isArray(value)) {
      return value.includes(opt.value);
    }
    return value === opt.value;
  };

  return {
    isOpen,
    setIsOpen,
    query,
    setQuery,
    triggerRect,
    side,
    containerRef,
    inputWrapperRef,
    inputRef,
    selectedOptions,
    filteredOptions,
    handleSelect,
    handleRemoveOption,
    handleInputClick,
    handleClear,
    isOptionSelected
  };
}
