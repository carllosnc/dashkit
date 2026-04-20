import { forwardRef, type KeyboardEvent } from 'react';
import { cn } from '../utils/cn';

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

import './date-field.css';

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
        type="text"
        inputMode="numeric"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={cn(
          'date-field__segment',
          placeholder === 'YYYY' ? "w-16" : "w-11"
        )}
      />
    );
  }
);

import { useDateField } from './useDateField';

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
    <div className={cn('date-field', className)}>
      {label && (
        <label className="date-field__label">
          {label}
          {isRequired && <span className="date-field__required">*</span>}
        </label>
      )}
      <div
        className="date-field__segments"
      >
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
        <span className="date-field__separator">·</span>
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
        <span className="date-field__separator">·</span>
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
        <span className={cn(
          'date-field__message',
          error ? 'date-field__message--error' : 'date-field__message--description'
        )}>
          {error || description}
        </span>
      )}
    </div>
  );
}

DateField.displayName = 'DateField';

