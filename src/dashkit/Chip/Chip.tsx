import * as React from 'react';
import { cva } from 'class-variance-authority';
import { FiX, FiCheck } from 'react-icons/fi';
import { cn } from '../utils/cn';

export type ChipVariant = 'filled' | 'outlined' | 'tonal' | 'soft';
export type ChipColor = 'base' | 'primary' | 'success' | 'warning' | 'danger' | 'error' | 'info';

const chipVariants = cva(
  'inline-flex items-center gap-1.5 h-8 px-3 rounded-full ds-pill text-xs font-medium transition-all duration-200 border ds-border-width select-none',
  {
    variants: {
      variant: {
        tonal: 'ds-button-soft-surface',
        filled: 'ds-button-surface',
        outlined: 'ds-button-outlined-surface',
      },
      color: {
        base: '',
        primary: '',
        success: '',
        warning: '',
        danger: '',
        info: '',
      },
      interactive: {
        true: 'cursor-pointer active:scale-[0.97]',
        false: 'cursor-default',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed pointer-events-none',
        false: '',
      },
    },
    compoundVariants: [
      // tonal
      { variant: 'tonal', color: 'base', className: 'bg-secondary text-secondary-foreground border-transparent' },
      { variant: 'tonal', color: 'primary', className: 'bg-primary/15 text-primary border-transparent dark:text-ds-primary-400 dark:bg-ds-primary-500/15 dark:border-ds-primary-500/20' },
      { variant: 'tonal', color: 'success', className: 'bg-ds-success-600/10 text-ds-success-700 border-ds-success-600/20 dark:text-ds-success-400 dark:bg-ds-success-500/15 dark:border-ds-success-500/20' },
      { variant: 'tonal', color: 'warning', className: 'bg-ds-warning-500/10 text-ds-warning-700 border-ds-warning-500/20 dark:text-ds-warning-400 dark:bg-ds-warning-500/15 dark:border-ds-warning-500/20' },
      { variant: 'tonal', color: 'danger', className: 'bg-ds-danger-600/10 text-ds-danger-700 border-ds-danger-600/20 dark:text-ds-danger-400 dark:bg-ds-danger-500/15 dark:border-ds-danger-500/20' },
      { variant: 'tonal', color: 'info', className: 'bg-ds-info-600/10 text-ds-info-700 border-ds-info-600/20 dark:text-ds-info-400 dark:bg-ds-info-500/15 dark:border-ds-info-500/20' },
      // filled
      { variant: 'filled', color: 'base', className: 'bg-foreground text-background border-transparent' },
      { variant: 'filled', color: 'primary', className: 'bg-primary text-primary-foreground border-transparent' },
      { variant: 'filled', color: 'success', className: 'bg-ds-success-600 text-ds-success-50 border-transparent dark:bg-ds-success-500 dark:text-ds-success-950' },
      { variant: 'filled', color: 'warning', className: 'bg-ds-warning-500 text-ds-warning-950 border-transparent dark:bg-ds-warning-400 dark:text-ds-warning-950' },
      { variant: 'filled', color: 'danger', className: 'bg-ds-danger-600 text-ds-danger-50 border-transparent dark:bg-ds-danger-500 dark:text-ds-danger-950' },
      { variant: 'filled', color: 'info', className: 'bg-ds-info-600 text-ds-info-50 border-transparent dark:bg-ds-info-500 dark:text-ds-info-950' },
      // outlined
      { variant: 'outlined', color: 'base', className: 'bg-transparent text-foreground border-border' },
      { variant: 'outlined', color: 'primary', className: 'bg-transparent text-primary border-primary/30 dark:border-primary/40' },
      { variant: 'outlined', color: 'success', className: 'bg-transparent text-ds-success-700 border-ds-success-600/30 dark:text-ds-success-400 dark:border-ds-success-500/30' },
      { variant: 'outlined', color: 'warning', className: 'bg-transparent text-ds-warning-700 border-ds-warning-500/30 dark:text-ds-warning-400 dark:border-ds-warning-500/30' },
      { variant: 'outlined', color: 'danger', className: 'bg-transparent text-ds-danger-700 border-ds-danger-600/30 dark:text-ds-danger-400 dark:border-ds-danger-500/30' },
      { variant: 'outlined', color: 'info', className: 'bg-transparent text-ds-info-700 border-ds-info-600/30 dark:text-ds-info-400 dark:border-ds-info-500/30' },
    ],
    defaultVariants: {
      variant: 'tonal',
      color: 'base',
      interactive: false,
      disabled: false,
    },
  }
);

export interface ChipProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement | HTMLDivElement>, 'onClick' | 'color'> {
  label: React.ReactNode;
  icon?: React.ReactNode;
  /** @default 'tonal' */
  variant?: ChipVariant;
  /** @default 'base' */
  color?: ChipColor;
  /** @default false */
  selected?: boolean;
  /** @default false */
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
  onDelete?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Chip = React.forwardRef<HTMLButtonElement | HTMLDivElement, ChipProps>(function Chip(
  {
    label,
    icon,
    variant = 'tonal',
    color = 'base',
    selected = false,
    disabled = false,
    className,
    onClick,
    onDelete,
    onKeyDown,
    ...props
  },
  ref
) {
  const isInteractive = (!!onClick || !!onDelete) && !disabled;
  // A real <button> can't contain the delete <button>, so only use it when
  // there is no delete action; otherwise the root gets button semantics
  // plus an explicit keyboard handler.
  const useButtonElement = !!onClick && !disabled && !onDelete;
  const isKeyboardActivatable = !!onClick && !disabled && !useButtonElement;

  const resolvedVariant = variant === 'soft' ? 'tonal' : variant;
  const resolvedColor = color === 'error' ? 'danger' : color;

  const classes = cn(
    chipVariants({
      variant: resolvedVariant,
      color: resolvedColor,
      interactive: isInteractive,
      disabled,
    }),
    selected && variant === 'outlined' && 'ring-2 ring-current border-transparent',
    className
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.(e as unknown as React.MouseEvent<HTMLButtonElement | HTMLDivElement>);
    }
  };

  const content = (
    <>
      {selected && (
        <FiCheck className="size-3.5 -ml-0.5 duration-200" />
      )}
      {icon && !selected && (
        <div className="size-4 -ml-0.5 flex items-center justify-center">
          {icon}
        </div>
      )}

      <span className="leading-none">{label}</span>

      {onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(e);
          }}
          disabled={disabled}
          className="size-6 -mr-1.5 -my-1 rounded-full flex items-center justify-center transition-colors hover:bg-black/10 dark:hover:bg-white/10 disabled:cursor-not-allowed"
          aria-label="Remove"
        >
          <FiX className="size-3" />
        </button>
      )}
    </>
  );

  if (useButtonElement) {
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        data-slot="chip"
        type="button"
        aria-pressed={selected}
        onClick={onClick}
        className={classes}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }

  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      data-slot="chip"
      role={isInteractive ? 'button' : undefined}
      tabIndex={isKeyboardActivatable ? 0 : undefined}
      aria-disabled={disabled || undefined}
      onClick={isInteractive ? onClick : undefined}
      onKeyDown={(e) => {
        if (isKeyboardActivatable) handleKeyDown(e);
        onKeyDown?.(e);
      }}
      className={classes}
      {...(props as React.HTMLAttributes<HTMLDivElement>)}
    >
      {content}
    </div>
  );
});

Chip.displayName = 'Chip';
