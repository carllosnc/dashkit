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

  // The option highlighted via aria-activedescendant (focus stays in the input).
  const [activeIndex, setActiveIndex] = useState(-1);

  // A new query starts with no active option. Adjusted during render (the same
  // pattern as prevIsOpen below) instead of in an effect, which would cause a
  // cascading render.
  const [prevQuery, setPrevQuery] = useState(query);
  if (query !== prevQuery) {
    setPrevQuery(query);
    if (activeIndex !== -1) setActiveIndex(-1);
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

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
    if (activeIndex !== -1) setActiveIndex(-1);
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

  // Keep the active option visible while arrowing through the list.
  useEffect(() => {
    if (activeIndex < 0) return;
    const option = portalRef.current
      ?.querySelectorAll<HTMLElement>('[role="option"]')[activeIndex];
    option?.scrollIntoView?.({ block: 'nearest' });
  }, [activeIndex]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = portalRef.current;
      if (
        containerRef.current && !containerRef.current.contains(event.target as Node) &&
        (!menu || !menu.contains(event.target as Node))
      ) {
        setIsOpen(false);
      }
    };

    const handleScroll = (event: Event) => {
      const menu = portalRef.current;
      if (isOpen && menu && !menu.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      window.addEventListener('scroll', handleScroll, true);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
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

  // Arrow keys move the active option, Enter selects it — the combobox
  // keystrokes from the APG pattern (WCAG 2.1.1).
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    const count = filteredOptions.length;

    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        return;
      }
      if (count === 0) return;
      setActiveIndex((prev) => {
        if (prev < 0) return e.key === 'ArrowDown' ? 0 : count - 1;
        const next = e.key === 'ArrowDown' ? prev + 1 : prev - 1;
        return (next + count) % count;
      });
      return;
    }

    if (e.key === 'Enter' && isOpen && activeIndex >= 0 && activeIndex < count) {
      e.preventDefault();
      handleSelect(filteredOptions[activeIndex]);
    }
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
    portalRef,
    selectedOptions,
    filteredOptions,
    handleSelect,
    handleRemoveOption,
    handleInputClick,
    handleInputKeyDown,
    handleClear,
    isOptionSelected,
    activeIndex
  };
}
