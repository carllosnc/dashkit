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

  // Move focus to the selected (or first) option when the list opens and hand
  // it back to the trigger when it closes (WCAG 2.4.3).
  useEffect(() => {
    if (!isOpen || !triggerRect) return;

    const container = portalRef.current;
    const trigger = buttonRef.current;
    if (!container) return;

    const target =
      container.querySelector<HTMLElement>('[role="option"][aria-selected="true"]') ??
      container.querySelector<HTMLElement>('[role="option"]');
    target?.focus();

    return () => {
      const active = document.activeElement;
      // Only take focus back when it would otherwise be lost — never steal it
      // from a control the user clicked.
      if (
        !active ||
        active === document.body ||
        active === document.documentElement ||
        container.contains(active)
      ) {
        trigger?.focus();
      }
    };
  }, [isOpen, triggerRect]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    } else if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && !isOpen) {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  // Keyboard support while focus is inside the portaled listbox.
  const handleListKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    const container = portalRef.current;
    if (!container) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      return;
    }
    if (e.key === 'Tab') {
      // Close and let the browser move focus to the next control.
      setIsOpen(false);
      return;
    }

    const items = Array.from(container.querySelectorAll<HTMLElement>('[role="option"]'));
    if (items.length === 0) return;

    const currentIndex = items.indexOf(document.activeElement as HTMLElement);
    const focusAt = (index: number) => {
      e.preventDefault();
      items[Math.max(0, Math.min(index, items.length - 1))]?.focus();
    };

    if (e.key === 'ArrowDown') {
      focusAt(currentIndex < 0 ? 0 : currentIndex + 1);
    } else if (e.key === 'ArrowUp') {
      focusAt(currentIndex <= 0 ? items.length - 1 : currentIndex - 1);
    } else if (e.key === 'Home') {
      focusAt(0);
    } else if (e.key === 'End') {
      focusAt(items.length - 1);
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
    handleKeyDown,
    handleListKeyDown
  };
}
