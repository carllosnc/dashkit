import * as React from 'react';
import { useDropdown, DropdownContext } from './useDropdown';
import { cn } from '../utils/cn';

export interface DropdownProps {
  children: React.ReactNode;
  className?: string;
}

export function Dropdown({ children, className }: DropdownProps) {
  const {
    open,
    setOpen,
    triggerRect,
    setTriggerRect,
    triggerElement,
    setTriggerElement,
    containerRef,
    portalRef
  } = useDropdown();

  return (
    <DropdownContext.Provider value={{
      open,
      setOpen,
      triggerRect,
      setTriggerRect,
      triggerElement,
      setTriggerElement,
      portalRef
    }}>
      <div className={cn('relative inline-block text-left', className)} ref={containerRef}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

Dropdown.displayName = 'Dropdown';
