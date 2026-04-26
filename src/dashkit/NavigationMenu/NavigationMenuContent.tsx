import * as React from 'react';
import { useNavigationMenuContext } from './NavigationMenuContext';

export function NavigationMenuContent({ value, children }: { value: string; children: React.ReactNode }) {
  const { registerContent } = useNavigationMenuContext();

  React.useEffect(() => {
    registerContent(value, children);
  }, [value, children, registerContent]);

  return null;
}
