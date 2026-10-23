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
  const portalRef = useRef<HTMLDivElement>(null);

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

    const handleScroll = (event: Event) => {
      const menu = portalRef.current;
      if (isOpen && menu && !menu.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      updateRect();
      window.addEventListener('resize', updateRect);
      window.addEventListener('scroll', handleScroll, true);
    }

    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isOpen]);

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
    portalRef,
    selectedOption,
    handleKeyDown
  };
}
