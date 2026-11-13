import * as React from 'react';
import { useDropdown, DropdownContext } from './useDropdown';
import { cn } from '../utils/cn';

export interface DropdownProps extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
}

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(function Dropdown(
  { children, className, ...props },
  ref
) {
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

  const setRootRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    },
    [containerRef, ref]
  );

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
      <div
        data-slot="dropdown"
        className={cn('relative inline-block text-left', className)}
        ref={setRootRef}
        {...props}
      >
        {children}
      </div>
    </DropdownContext.Provider>
  );
});

Dropdown.displayName = 'Dropdown';
