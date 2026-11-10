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
        'inline-flex h-9 w-max items-center justify-center ds-rounded bg-transparent px-4 py-2 text-sm font-medium hover:bg-ds-100 dark:hover:bg-ds-800 focus:bg-ds-100 dark:focus:bg-ds-800 focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-ds-500 dark:text-ds-400 transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
        isActive && 'text-ds-950 dark:text-ds-50',
        className
      )}
    >
      {children}
      <FiChevronDown
        className={cn(
          'relative top-[1px] ml-1 h-3 w-3 transition-transform duration-200',
          isActive && 'rotate-180'
        )}
        aria-hidden="true"
      />
    </button>
  );
}
