import * as React from 'react';

interface SidebarContextProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggle: () => void;
}

export const SidebarContext = React.createContext<SidebarContextProps | undefined>(undefined);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
