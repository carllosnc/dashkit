import * as React from 'react';
import { useDropdown, DropdownContext } from './useDropdown';
import './dropdown.css';

export interface DropdownProps {
  children: React.ReactNode;
}

export function Dropdown({ children }: DropdownProps) {
  const {
    open,
    setOpen,
    triggerRect,
    setTriggerRect,
    triggerElement,
    setTriggerElement,
    containerRef
  } = useDropdown();

  return (
    <DropdownContext.Provider value={{
      open,
      setOpen,
      triggerRect,
      setTriggerRect,
      triggerElement,
      setTriggerElement
    }}>
      <div className="dropdown" ref={containerRef}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}
