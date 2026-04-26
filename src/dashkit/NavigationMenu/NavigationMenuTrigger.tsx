import * as React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { cn } from '../utils/cn';
import { useNavigationMenuContext } from './NavigationMenuContext';

export function NavigationMenuTrigger({ value, children, className }: { value: string; children: React.ReactNode; className?: string }) {
  const { activeValue, setActiveValue, setTriggerRect } = useNavigationMenuContext();
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      setTriggerRect(value, ref.current.getBoundingClientRect());
    }
  }, [value, setTriggerRect]);

  const isActive = activeValue === value;

  return (
    <button
      ref={ref}
      onClick={() => setActiveValue(isActive ? null : value)}
      className={cn(
        'navigation-menu__trigger',
        isActive && 'navigation-menu__trigger--active',
        className
      )}
    >
      {children}
      <FiChevronDown
        className={cn(
          'navigation-menu__trigger-icon',
          isActive && 'navigation-menu__trigger-icon--active'
        )}
        aria-hidden="true"
      />
    </button>
  );
}
