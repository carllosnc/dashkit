import * as React from 'react';
import { useDropdownContext } from './useDropdown';

export interface DropdownTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export function DropdownTrigger({ children, asChild }: DropdownTriggerProps) {
  const { open, setOpen, setTriggerRect, setTriggerElement } = useDropdownContext();

  const toggleOpen = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTriggerRect(rect);
    setOpen(!open);
  };

  const internalRef = (node: HTMLElement | null) => {
    setTriggerElement(node);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ onClick?: React.MouseEventHandler; ref?: React.Ref<HTMLElement> }>, {
      ref: internalRef,
      onClick: (e: React.MouseEvent) => {
        (children.props as { onClick?: React.MouseEventHandler }).onClick?.(e);
        toggleOpen(e);
      },
    });
  }

  return (
    <div ref={internalRef} onClick={toggleOpen} className="cursor-pointer inline-block">
      {children}
    </div>
  );
}
