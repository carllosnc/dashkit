import * as React from 'react';
import { usePopoverContext } from './usePopover';

export interface PopoverTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

export function PopoverTrigger({ children, asChild }: PopoverTriggerProps) {
  const { open, setOpen, setTriggerRect, setTriggerElement, triggerMode, onMouseEnter, onMouseLeave } = usePopoverContext();

  const toggleOpen = (e: React.MouseEvent) => {
    if (triggerMode === 'hover') return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
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
        toggleOpen(e);
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

  return (
    <div
      ref={internalRef}
      onClick={toggleOpen}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
      className="cursor-pointer inline-block"
    >
      {children}
    </div>
  );
}
