import * as React from 'react';
import { cn } from '../../utils/cn';

export interface DockProps {
  children: React.ReactNode;
  className?: string;
  position?: 'bottom' | 'left' | 'right';
}

export interface DockItemProps {
  icon: React.ReactNode;
  label?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  position?: 'bottom' | 'left' | 'right';
}

export function Dock({
  children,
  className,
  position = 'bottom'
}: DockProps) {
  const isVertical = position === 'left' || position === 'right';

  return (
    <div
      className={cn(
        "mx-auto flex gap-3 rounded-full bg-ds-950/30 dark:bg-ds-0/10 backdrop-blur-lg shadow-2xl p-2",
        !isVertical ? "flex-row items-center" : "flex-col items-center",
        className
      )}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<DockItemProps>, { position });
        }
        return child;
      })}
    </div>
  );
}

export function DockItem({ icon, label, onClick, href, className, position = 'bottom' }: DockItemProps) {
  const content = (
    <div
      className={cn(
        "group relative flex size-10 items-center justify-center rounded-full bg-white text-ds-800 dark:bg-ds-950 dark:text-ds-200 transition-all hover:scale-105 shrink-0 cursor-pointer",
        className
      )}
    >
      <div className="flex size-full items-center justify-center [&>svg]:size-5 text-current leading-none">
        {icon}
      </div>
      {label && (
        <span className={cn(
          "absolute opacity-0 pointer-events-none bg-ds-950 px-2 py-1 text-[10px] font-bold text-ds-0 group-hover:opacity-100 dark:bg-ds-0 dark:text-ds-950 border border-ds-800 dark:border-ds-200 whitespace-nowrap z-[100] transition-opacity duration-150",
          position === 'bottom' && "-top-10 left-1/2 -translate-x-1/2",
          position === 'left' && "left-14 top-1/2 -translate-y-1/2",
          position === 'right' && "right-14 top-1/2 -translate-y-1/2"
        )}>
          {label}
          <div className={cn(
            "absolute size-1.5 rotate-45 bg-ds-950 dark:bg-ds-0 border-ds-800 dark:border-ds-200",
            position === 'bottom' && "bottom-[-4px] left-1/2 -translate-x-1/2 border-b border-r",
            position === 'left' && "left-[-4px] top-1/2 -translate-y-1/2 border-b border-l",
            position === 'right' && "right-[-4px] top-1/2 -translate-y-1/2 border-t border-r"
          )} />
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="outline-none">
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className="outline-none focus-visible:ring-2 focus-visible:ring-ds-400 rounded-full">
      {content}
    </button>
  );
}
