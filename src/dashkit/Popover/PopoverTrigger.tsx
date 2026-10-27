import * as React from 'react';
import { usePopoverContext } from './usePopover';

export interface PopoverTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export function PopoverTrigger({ children, asChild }: PopoverTriggerProps) {
  const { open, setOpen, setTriggerRect, setTriggerElement, triggerMode, onMouseEnter, onMouseLeave } = usePopoverContext();

  const toggleOpen = (element: HTMLElement) => {
    if (triggerMode === 'hover') return;
    const rect = element.getBoundingClientRect();
    setTriggerRect(rect);
    setOpen(!open);
  };

  const internalRef = (node: HTMLElement | null) => {
    setTriggerElement(node);
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (triggerMode === 'hover') {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setTriggerRect(rect);
      onMouseEnter?.();
    }
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{
        onClick?: React.MouseEventHandler;
        ref?: React.Ref<HTMLElement>;
        onMouseEnter?: React.MouseEventHandler;
        onMouseLeave?: React.MouseEventHandler;
    }>, {
      ref: internalRef,
      onClick: (e: React.MouseEvent) => {
        (children.props as { onClick?: React.MouseEventHandler }).onClick?.(e);
        toggleOpen(e.currentTarget as HTMLElement);
      },
      onMouseEnter: (e: React.MouseEvent) => {
        (children.props as { onMouseEnter?: React.MouseEventHandler }).onMouseEnter?.(e);
        handleMouseEnter(e);
      },
      onMouseLeave: (e: React.MouseEvent) => {
        (children.props as { onMouseLeave?: React.MouseEventHandler }).onMouseLeave?.(e);
        onMouseLeave?.();
      },
    });
  }

  // Mirror DropdownTrigger: only promote the wrapper into an accessible button
  // when the child isn't itself an interactive element, so we never nest
  // interactive semantics inside a real <button> (which would also duplicate
  // the accessible name).
  const hasElementChild = React.Children.toArray(children).some((child) => React.isValidElement(child));

  if (hasElementChild) {
    return (
      <div
        ref={internalRef}
        onClick={(e) => toggleOpen(e.currentTarget)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={onMouseLeave}
        className="cursor-pointer inline-block"
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={internalRef}
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-expanded={open}
      onClick={(e) => toggleOpen(e.currentTarget)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleOpen(e.currentTarget);
        }
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
      className="cursor-pointer inline-block"
    >
      {children}
    </div>
  );
}
