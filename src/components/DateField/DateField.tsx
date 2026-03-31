import { useState, useRef, forwardRef, type KeyboardEvent } from 'react';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
  ({ value, placeholder, max, onUpdate, onNext, onPrev, disabled }, ref) => {
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
          "w-fit min-w-[2ch] bg-transparent border-none outline-none text-sm text-center tabular-nums p-0 focus:ring-0",
          "placeholder:text-ds-400 dark:placeholder:text-ds-600 focus:text-ds-900 dark:focus:text-ds-100 text-ds-600 dark:text-ds-400",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        style={{ width: `${Math.max(placeholder.length, value.length)}ch` }}
      />
    );
  }
);

export const DateField = ({
  label,
  description,
  error,
  value,
  onChange,
  className,
  disabled,
  isRequired
}: DateFieldProps) => {
  const [month, setMonth] = useState(value ? (value.getMonth() + 1).toString().padStart(2, '0') : '');
  const [day, setDay] = useState(value ? value.getDate().toString().padStart(2, '0') : '');
  const [year, setYear] = useState(value ? value.getFullYear().toString() : '');

  const monthRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const [prevValue, setPrevValue] = useState(value);

  if (value !== prevValue) {
    setPrevValue(value);
    if (value) {
      setMonth((value.getMonth() + 1).toString().padStart(2, '0'));
      setDay(value.getDate().toString().padStart(2, '0'));
      setYear(value.getFullYear().toString());
    } else {
      setMonth('');
      setDay('');
      setYear('');
    }
  }

  const prevValueRef = useRef<Date | null | undefined>(value);

  const updateDate = (m: string, d: string, y: string) => {
    if (m && d && y.length === 4) {
      const newDate = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
      if (!isNaN(newDate.getTime())) {
        prevValueRef.current = newDate;
        setPrevValue(newDate);
        onChange?.(newDate);
      } else {
        prevValueRef.current = null;
        setPrevValue(null);
        onChange?.(null);
      }
    } else {
      prevValueRef.current = null;
      setPrevValue(null);
      onChange?.(null);
    }
  };

  const handleMonthUpdate = (val: string) => {
    const num = parseInt(val);
    if (num > 12) return;
    setMonth(val);
    updateDate(val, day, year);
  };

  const handleDayUpdate = (val: string) => {
    const num = parseInt(val);
    if (num > 31) return;
    setDay(val);
    updateDate(month, val, year);
  };

  const handleYearUpdate = (val: string) => {
    setYear(val);
    updateDate(month, day, val);
  };

  return (
    <div className={cn("flex flex-col gap-1.5 w-full font-sans", className)}>
      {label && (
        <label className="text-[13px] font-semibold text-ds-700 dark:text-ds-300 ml-1 tracking-tight">
          {label}
          {isRequired && <span className="text-ds-danger-500 ml-0.5">*</span>}
        </label>
      )}
      
      <div 
        className={cn(
          "flex items-center gap-1 px-3 h-10 bg-input-bg text-input-fg border border-input ds-rounded transition-all duration-200 cursor-text",
          "focus-within:border-input-focus focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-transparent",
          error && "border-ds-danger-500/50 focus-within:ring-ds-danger-50 dark:border-ds-danger-500/30",
          disabled && "opacity-50 cursor-not-allowed"
        )}
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
        <span className="text-ds-400 dark:text-ds-600">/</span>
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
        <span className="text-ds-400 dark:text-ds-600">/</span>
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
          "text-[12px] ml-1 tracking-tight",
          error ? "text-ds-danger-600 dark:text-ds-danger-400" : "text-ds-600 dark:text-ds-400"
        )}>
          {error || description}
        </span>
      )}
    </div>
  );
};

DateField.displayName = 'DateField';
