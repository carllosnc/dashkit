import * as React from 'react';
import { useDropdownContext } from './useDropdown';
import './dropdown.css';

export interface DropdownTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export function DropdownTrigger({ children, asChild }: DropdownTriggerProps) {
  const { open, setOpen, setTriggerRect, setTriggerElement } = useDropdownContext();

  const toggleOpen = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
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
        toggleOpen(e.currentTarget as HTMLElement);
      },
    });
  }

  // When the child is already a React element (a <button>, <IconButton>, ...),
  // it is the interactive control — keep the wrapper a plain div so we never
  // nest interactive semantics. Only for plain-text children do we promote the
  // wrapper into an accessible, keyboard-operable button.
  const hasElementChild = React.Children.toArray(children).some((child) => React.isValidElement(child));

  if (hasElementChild) {
    return (
      <div ref={internalRef} onClick={(e) => toggleOpen(e.currentTarget)} className="dropdown-trigger">
        {children}
      </div>
    );
  }

  return (
    <div
      ref={internalRef}
      role="button"
      tabIndex={0}
      aria-haspopup="menu"
      aria-expanded={open}
      onClick={(e) => toggleOpen(e.currentTarget)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleOpen(e.currentTarget);
        }
      }}
      className="dropdown-trigger"
    >
      {children}
    </div>
  );
}
