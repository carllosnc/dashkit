import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { cn } from '../utils/cn';

const radioCardGroupVariants = cva('grid gap-2.5 w-full', {
  variants: {
    columns: {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    },
  },
  defaultVariants: {
    columns: 1,
  },
});

const radioCardVariants = cva(
  [
    'group relative flex w-full items-center gap-3 rounded-xl border text-left font-sans transition-all duration-150 select-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
  ],
  {
    variants: {
      size: {
        sm: 'px-3 py-2.5',
        md: 'px-3.5 py-3',
        lg: 'p-4',
      },
      selected: {
        true: 'border-primary bg-primary/8 dark:bg-primary/15 ring-1 ring-primary/20',
        false: 'border-border bg-card hover:border-ds-300 dark:hover:border-ds-600 hover:bg-ds-50/50 dark:hover:bg-ds-800/40',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed pointer-events-none',
        false: 'cursor-pointer',
      },
    },
    defaultVariants: {
      size: 'md',
      selected: false,
      disabled: false,
    },
  }
);

export type RadioCardSize = NonNullable<VariantProps<typeof radioCardVariants>['size']>;
export type RadioCardIndicator = 'none' | 'radio' | 'check';

interface RadioCardContextValue {
  value?: string;
  onSelect: (value: string) => void;
  disabled?: boolean;
  size: RadioCardSize;
  indicator: RadioCardIndicator;
}

const RadioCardContext = React.createContext<RadioCardContextValue | null>(null);

function useRadioCardContext() {
  const ctx = React.useContext(RadioCardContext);
  if (!ctx) {
    throw new Error('RadioCard must be used within a RadioCardGroup');
  }
  return ctx;
}

export interface RadioCardGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof radioCardGroupVariants> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  label?: React.ReactNode;
  valueLabel?: React.ReactNode;
  size?: RadioCardSize;
  indicator?: RadioCardIndicator;
  disabled?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

/**
 * Accessible group container for `RadioCard` options with optional header label,
 * active value summary, keyboard arrow navigation, and responsive grid columns.
 *
 * @example
 * ```tsx
 * <RadioCardGroup label="Style Preset" valueLabel="Default" value={preset} onValueChange={setPreset}>
 *   <RadioCard value="default" title="Default" description="Clean & balanced" />
 * </RadioCardGroup>
 * ```
 */
export function RadioCardGroup({
  value,
  defaultValue,
  onValueChange,
  name,
  label,
  valueLabel,
  columns = 1,
  size = 'md',
  indicator = 'none',
  disabled = false,
  className,
  children,
  onKeyDown,
  ref,
  ...props
}: RadioCardGroupProps) {
  const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue);
  const groupId = React.useId();
  const labelId = label ? `${groupId}-label` : undefined;
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleSelect = React.useCallback(
    (nextValue: string) => {
      if (disabled) return;
      if (!isControlled) {
        setInternalValue(nextValue);
      }
      onValueChange?.(nextValue);
    },
    [disabled, isControlled, onValueChange]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented || disabled) return;

    const keys = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'Home', 'End'];
    if (!keys.includes(e.key)) return;

    const target = e.target as HTMLElement | null;
    if (!target || target.getAttribute('role') !== 'radio') return;

    const items = Array.from(
      e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]:not(:disabled)')
    );
    if (items.length === 0) return;

    const currentIndex = items.indexOf(target as HTMLButtonElement);
    if (currentIndex === -1) return;

    e.preventDefault();

    let nextIndex = currentIndex;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % items.length;
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      nextIndex = (currentIndex - 1 + items.length) % items.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = items.length - 1;
    }

    const nextItem = items[nextIndex];
    if (nextItem) {
      nextItem.focus();
      nextItem.click();
    }
  };

  return (
    <RadioCardContext.Provider
      value={{
        value: currentValue,
        onSelect: handleSelect,
        disabled,
        size,
        indicator,
      }}
    >
      <div
        ref={ref}
        data-slot="radio-card-group"
        className={cn('flex flex-col gap-2.5 w-full', className)}
      >
        {(label || valueLabel) && (
          <div
            data-slot="radio-card-header"
            className="flex items-center justify-between gap-2 px-0.5"
          >
            {label && (
              <span
                id={labelId}
                data-slot="radio-card-label"
                className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
              >
                {label}
              </span>
            )}
            {valueLabel && (
              <span
                data-slot="radio-card-value"
                className="text-xs font-semibold text-foreground ml-auto"
              >
                {valueLabel}
              </span>
            )}
          </div>
        )}

        <div
          {...props}
          role="radiogroup"
          aria-labelledby={props['aria-labelledby'] ?? labelId}
          aria-disabled={disabled || undefined}
          onKeyDown={handleKeyDown}
          className={cn(radioCardGroupVariants({ columns }))}
        >
          {children}
        </div>

        {name && <input type="hidden" name={name} value={currentValue ?? ''} />}
      </div>
    </RadioCardContext.Provider>
  );
}

RadioCardGroup.displayName = 'RadioCardGroup';

export interface RadioCardProps
  extends Omit<HTMLMotionProps<'button'>, 'title' | 'value' | 'onSelect'> {
  value: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  size?: RadioCardSize;
  indicator?: RadioCardIndicator;
  disabled?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

/**
 * Selectable option card for use inside `RadioCardGroup`.
 *
 * @example
 * ```tsx
 * <RadioCard
 *   value="default"
 *   title="Default"
 *   description="Clean & balanced"
 *   leading={<span className="size-2.5 rounded-full bg-blue-600" />}
 * />
 * ```
 */
export function RadioCard({
  value,
  title,
  description,
  leading,
  trailing,
  size,
  indicator,
  disabled = false,
  className,
  onClick,
  ref,
  ...props
}: RadioCardProps) {
  const ctx = useRadioCardContext();
  const isSelected = ctx.value === value;
  const isDisabled = Boolean(ctx.disabled || disabled);
  const resolvedSize = size ?? ctx.size;
  const resolvedIndicator = indicator ?? ctx.indicator;
  const hasSelection = ctx.value !== undefined;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return;
    ctx.onSelect(value);
    onClick?.(e);
  };

  return (
    <motion.button
      {...props}
      ref={ref}
      type="button"
      role="radio"
      aria-checked={isSelected}
      disabled={isDisabled}
      tabIndex={isDisabled ? -1 : isSelected || !hasSelection ? 0 : -1}
      data-slot="radio-card"
      data-state={isSelected ? 'checked' : 'unchecked'}
      whileTap={{ scale: isDisabled ? 1 : 0.99 }}
      transition={{ duration: 0.12 }}
      onClick={handleClick}
      className={cn(
        radioCardVariants({
          size: resolvedSize,
          selected: isSelected,
          disabled: isDisabled,
        }),
        className
      )}
    >
      {leading && (
        <span
          data-slot="radio-card-leading"
          className="shrink-0 flex items-center justify-center"
        >
          {leading}
        </span>
      )}

      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
        <span
          data-slot="radio-card-title"
          className="text-sm font-semibold text-foreground leading-snug truncate"
        >
          {title}
        </span>
        {description && (
          <span
            data-slot="radio-card-description"
            className="text-xs text-muted-foreground leading-snug"
          >
            {description}
          </span>
        )}
      </div>

      {trailing && (
        <span
          data-slot="radio-card-trailing"
          className="shrink-0 flex items-center justify-center ml-auto"
        >
          {trailing}
        </span>
      )}

      {resolvedIndicator === 'radio' && (
        <span
          data-slot="radio-card-indicator"
          aria-hidden="true"
          className={cn(
            'shrink-0 size-4.5 rounded-full border-2 flex items-center justify-center transition-colors duration-150',
            !trailing && 'ml-auto',
            isSelected ? 'border-primary' : 'border-border group-hover:border-ds-400'
          )}
        >
          <span
            className={cn(
              'size-2 rounded-full bg-primary transition-all duration-150',
              isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            )}
          />
        </span>
      )}

      {resolvedIndicator === 'check' && (
        <span
          data-slot="radio-card-indicator"
          aria-hidden="true"
          className={cn(
            'shrink-0 size-5 rounded-full border flex items-center justify-center transition-all duration-150',
            !trailing && 'ml-auto',
            isSelected
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border bg-transparent text-transparent group-hover:border-ds-400'
          )}
        >
          <FiCheck className="size-3 stroke-[2.5]" />
        </span>
      )}
    </motion.button>
  );
}

RadioCard.displayName = 'RadioCard';
