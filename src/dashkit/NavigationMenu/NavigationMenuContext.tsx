import * as React from 'react';

export interface NavigationMenuContextType {
  activeValue: string | null;
  setActiveValue: (val: string | null) => void;
  triggerRects: Record<string, DOMRect>;
  setTriggerRect: (val: string, rect: DOMRect) => void;
  registerContent: (val: string, node: React.ReactNode) => void;
  contentMap: Record<string, React.ReactNode>;
  menuRect: DOMRect | null;
}

export const NavigationMenuContext = React.createContext<NavigationMenuContextType | undefined>(undefined);

export function useNavigationMenuContext() {
  const context = React.useContext(NavigationMenuContext);
  if (!context) throw new Error('NavigationMenu components must be used within NavigationMenu');
  return context;
}
