import * as React from 'react';

export type PopoverTriggerMode = 'click' | 'hover';

export interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRect: DOMRect | null;
  setTriggerRect: (rect: DOMRect | null) => void;
  triggerElement: HTMLElement | null;
  setTriggerElement: (el: HTMLElement | null) => void;
  triggerMode: PopoverTriggerMode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const PopoverContext = React.createContext<PopoverContextValue | undefined>(undefined);

export function usePopoverContext() {
  const context = React.useContext(PopoverContext);
  if (!context) {
    throw new Error('Popover components must be used within a Popover');
  }
  return context;
}

export function usePopover() {
  const [open, setOpen] = React.useState(false);
  const [triggerRect, setTriggerRect] = React.useState<DOMRect | null>(null);
  const [triggerElement, setTriggerElement] = React.useState<HTMLElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const popover = document.getElementById('dashkit-popover-portal');
      if (
        containerRef.current && !containerRef.current.contains(event.target as Node) &&
        (!popover || !popover.contains(event.target as Node))
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    const handleScroll = () => {
      if (open) setOpen(false);
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      window.addEventListener('scroll', handleScroll, true);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [open]);

  return {
    open,
    setOpen,
    triggerRect,
    setTriggerRect,
    triggerElement,
    setTriggerElement,
    containerRef
  };
}
