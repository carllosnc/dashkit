import { forwardRef, type KeyboardEvent } from 'react';
import { cn } from '../utils/cn';
import { useDateField } from './useDateField';

export interface DateFieldProps {
  label?: string;
  description?: string;
  error?: string;
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  className?: string;
  disabled?: boolean;
  isRequired?: boolean;
}

interface SegmentProps {
  value: string;
  placeholder: string;
  max: number;
  onUpdate: (val: string) => void;
  onNext: () => void;
  onPrev: () => void;
  disabled?: boolean;
}

const DateSegment = forwardRef<HTMLInputElement, SegmentProps>(
  function DateSegment({ value, placeholder, max, onUpdate, onNext, onPrev, disabled }, ref) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value.replace(/\D/g, '').slice(0, max.toString().length);
      onUpdate(val);

      if (val.length === max.toString().length && parseInt(val) > 0) {
        onNext();
      }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === '/') {
        e.preventDefault();
        onNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onPrev();
      } else if (e.key === 'Backspace' && value === '') {
        onPrev();
      }
    };

    return (
      <input
        ref={ref}
        data-slot="segment"
        type="text"
        inputMode="numeric"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={cn(
          'h-9 bg-input-bg text-input-fg border border-input-border ds-rounded text-sm font-medium text-center tabular-nums p-0 outline-none transition-all duration-200 placeholder:text-muted-foreground focus:border-input-focus focus:ring-2 focus:ring-input-focus/20 disabled:opacity-50 disabled:cursor-not-allowed',
          placeholder === 'YYYY' ? 'w-16' : 'w-11'
        )}
      />
    );
  }
);

export function DateField({
  label,
  description,
  error,
  value,
  onChange,
  className,
  disabled,
  isRequired
}: DateFieldProps) {
  const {
    month,
    day,
    year,
    monthRef,
    dayRef,
    yearRef,
    handleMonthUpdate,
    handleDayUpdate,
    handleYearUpdate
  } = useDateField({ value, onChange });

  return (
    <div data-slot="root" className={cn('flex flex-col gap-1.5 w-full font-sans', className)}>
      {label && (
        <label data-slot="label" className="text-[13px] font-semibold text-foreground ml-1 tracking-tight">
          {label}
          {isRequired && <span className="text-ds-danger-500 ml-0.5">*</span>}
        </label>
      )}

      <div data-slot="segments" className="flex items-center gap-2">
        <DateSegment
          ref={monthRef}
          value={month}
          placeholder="MM"
          max={12}
          disabled={disabled}
          onUpdate={handleMonthUpdate}
          onNext={() => dayRef.current?.focus()}
          onPrev={() => {}}
        />
        <span className="text-muted-foreground font-bold select-none text-lg">·</span>
        <DateSegment
          ref={dayRef}
          value={day}
          placeholder="DD"
          max={31}
          disabled={disabled}
          onUpdate={handleDayUpdate}
          onNext={() => yearRef.current?.focus()}
          onPrev={() => monthRef.current?.focus()}
        />
        <span className="text-muted-foreground font-bold select-none text-lg">·</span>
        <DateSegment
          ref={yearRef}
          value={year}
          placeholder="YYYY"
          max={9999}
          disabled={disabled}
          onUpdate={handleYearUpdate}
          onNext={() => {}}
          onPrev={() => dayRef.current?.focus()}
        />
      </div>

      {(error || description) && (
        <span
          data-slot="helper"
          className={cn(
            'text-[12px] ml-1 tracking-tight',
            error ? 'text-ds-danger-600 dark:text-ds-danger-400 font-medium' : 'text-muted-foreground'
          )}
        >
          {error || description}
        </span>
      )}
    </div>
  );
}

DateField.displayName = 'DateField';
