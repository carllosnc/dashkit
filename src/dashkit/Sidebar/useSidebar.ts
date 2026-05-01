import * as React from 'react';

export interface UseSidebarProps {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function useSidebarState({ defaultOpen = true, open: controlledOpen, onOpenChange }: UseSidebarProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const setIsOpen = React.useCallback(
    (value: boolean) => {
      if (controlledOpen === undefined) {
        setInternalOpen(value);
      }
      onOpenChange?.(value);
    },
    [controlledOpen, onOpenChange]
  );

  const toggle = React.useCallback(() => setIsOpen(!isOpen), [isOpen, setIsOpen]);

  return {
    isOpen,
    setIsOpen,
    toggle
  };
}
