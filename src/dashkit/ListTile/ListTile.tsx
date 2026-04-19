import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../utils/cn';

const LIST_TILE_ROOT = "flex w-full items-center gap-3 py-3 font-sans text-left transition-colors duration-150";
const LIST_TILE_INTERACTIVE = "cursor-pointer hover:bg-ds-100/60 dark:hover:bg-ds-800/60 active:bg-ds-100 dark:active:bg-ds-800";
const LIST_TILE_DISABLED = "opacity-50 pointer-events-none";
const LIST_TILE_LEADING = "shrink-0 flex items-center justify-center text-muted-foreground";
const LIST_TILE_TRAILING = "shrink-0 flex items-center justify-center text-muted-foreground ml-auto";
const LIST_TILE_DIVIDER = "border-b border-border";
const LIST_TILE_CONTENT = "flex flex-col gap-0.5 min-w-0 flex-1";
const LIST_TILE_TITLE = "text-sm font-medium text-foreground leading-snug truncate";
const LIST_TILE_SUBTITLE = "text-xs text-muted-foreground leading-snug truncate";

export interface ListTileProps extends Omit<HTMLMotionProps<'div'>, 'title'> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  disabled?: boolean;
  interactive?: boolean;
  divider?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

export function ListTile({
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
}: ListTileProps) {
  const isInteractive = interactive ?? !!onClick;

  return (
    <motion.div
      {...props}
      ref={ref}
      onClick={!disabled ? onClick : undefined}
      className={cn(
        LIST_TILE_ROOT,
        isInteractive && LIST_TILE_INTERACTIVE,
        disabled && LIST_TILE_DISABLED,
        divider && LIST_TILE_DIVIDER,
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
        <span className={LIST_TILE_LEADING}>{leading}</span>
      )}

      <div className={LIST_TILE_CONTENT}>
        <span className={LIST_TILE_TITLE}>{title}</span>
        {subtitle && (
          <span className={LIST_TILE_SUBTITLE}>{subtitle}</span>
        )}
      </div>

      {trailing && (
        <span className={LIST_TILE_TRAILING}>{trailing}</span>
      )}
    </motion.div>
  );
}
