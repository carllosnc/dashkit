import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../utils/cn';

export interface ListTileProps extends Omit<HTMLMotionProps<'div'>, 'title'> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  /** @default false */
  disabled?: boolean;
  interactive?: boolean;
  /** @default false */
  divider?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

export const ListTile = ({
  title,
  subtitle,
  leading,
  trailing,
  disabled = false,
  interactive,
  divider = false,
  className,
  onClick,
  ref,
  ...props
}: ListTileProps) => {
  const isInteractive = interactive ?? !!onClick;

  return (
    <motion.div
      {...props}
      ref={ref}
      data-slot="list-tile"
      onClick={!disabled ? onClick : undefined}
      className={cn(
        'flex w-full items-center gap-3 py-3 font-sans text-left transition-colors duration-150',
        isInteractive && 'cursor-pointer hover:bg-ds-100/60 dark:hover:bg-ds-800/60 active:bg-ds-100 dark:active:bg-ds-800',
        disabled && 'opacity-50 pointer-events-none',
        divider && 'border-b border-border',
        className
      )}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive && !disabled ? 0 : undefined}
      onKeyDown={
        isInteractive && !disabled
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
              }
            }
          : undefined
      }
    >
      {leading && (
        <span className="shrink-0 flex items-center justify-center text-muted-foreground">{leading}</span>
      )}

      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
        <span className="text-sm font-medium text-foreground leading-snug truncate">{title}</span>
        {subtitle && (
          <span className="text-xs text-muted-foreground leading-snug truncate">{subtitle}</span>
        )}
      </div>

      {trailing && (
        <span className="shrink-0 flex items-center justify-center text-muted-foreground ml-auto">{trailing}</span>
      )}
    </motion.div>
  );
};

ListTile.displayName = 'ListTile';
