import * as React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../utils/cn';
import './list-tile.css';

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
      onClick={!disabled ? onClick : undefined}
      className={cn(
        'list-tile',
        isInteractive && 'list-tile--interactive',
        disabled && 'list-tile--disabled',
        divider && 'list-tile--divider',
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
        <span className="list-tile__leading">{leading}</span>
      )}

      <div className="list-tile__content">
        <span className="list-tile__title">{title}</span>
        {subtitle && (
          <span className="list-tile__subtitle">{subtitle}</span>
        )}
      </div>

      {trailing && (
        <span className="list-tile__trailing">{trailing}</span>
      )}
    </motion.div>
  );
};
