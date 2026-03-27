import { useState, useRef, useEffect, useLayoutEffect, type KeyboardEvent } from 'react';
import { type SelectOption } from './Select';

export interface UseSelectProps {
  options: SelectOption[];
  value?: string;
  disabled?: boolean;
}

export function useSelect({ options, value, disabled }: UseSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
  const [side, setSide] = useState<'top' | 'bottom'>('bottom');
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useLayoutEffect(() => {
    const updateRect = () => {
      if (isOpen && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
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

    if (isOpen) {
      updateRect();
      window.addEventListener('resize', updateRect);
      window.addEventListener('scroll', () => setIsOpen(false), true);
    }

    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', () => setIsOpen(false), true);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById('dashkit-select-portal');
      if (
        containerRef.current && !containerRef.current.contains(event.target as Node) &&
        (!menu || !menu.contains(event.target as Node))
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return {
    isOpen,
    setIsOpen,
    triggerRect,
    side,
    containerRef,
    buttonRef,
    selectedOption,
    handleKeyDown
  };
}
