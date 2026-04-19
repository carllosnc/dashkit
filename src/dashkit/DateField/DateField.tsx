import { useState, useRef, forwardRef, type KeyboardEvent } from 'react';
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

const CONTAINER_CLASSES = "flex flex-col gap-1.5 w-full font-sans";
const LABEL_CLASSES = "text-[13px] font-semibold text-ds-700 dark:text-ds-300 ml-1 tracking-tight";
const REQUIRED_CLASSES = "text-ds-danger-500 ml-0.5";
const SEGMENTS_CONTAINER_CLASSES = "flex items-center gap-2";
const SEGMENT_INPUT_BASE_CLASSES = "h-9 bg-input-bg text-input-fg border border-input-border ds-rounded text-sm font-medium text-center tabular-nums p-0 outline-none transition-all duration-200 focus:border-input-focus focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-transparent placeholder:text-ds-400 dark:placeholder:text-ds-600";
const SEGMENT_DISABLED_CLASSES = "opacity-50 cursor-not-allowed";
const SEPARATOR_CLASSES = "text-ds-400 dark:text-ds-500 font-bold select-none text-lg";
const MESSAGE_BASE_CLASSES = "text-[12px] ml-1 tracking-tight";
const DESCRIPTION_CLASSES = "text-ds-600 dark:text-ds-400";
const ERROR_CLASSES = "text-ds-danger-600 dark:text-ds-danger-400";

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
          SEGMENT_INPUT_BASE_CLASSES,
          placeholder === 'YYYY' ? "w-16" : "w-11",
          disabled && SEGMENT_DISABLED_CLASSES
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
  const [month, setMonth] = useState(value ? (value.getMonth() + 1).toString().padStart(2, '0') : '');
  const [day, setDay] = useState(value ? value.getDate().toString().padStart(2, '0') : '');
  const [year, setYear] = useState(value ? value.getFullYear().toString() : '');

  const monthRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const [prevValue, setPrevValue] = useState(value);
  const getTime = (d?: Date | null) => d instanceof Date ? d.getTime() : (d === null ? null : undefined);

  const vTime = getTime(value);
  const pTime = getTime(prevValue);

  if (vTime !== pTime && !(Number.isNaN(vTime) && Number.isNaN(pTime))) {
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
    <div className={cn(CONTAINER_CLASSES, className)}>
      {label && (
        <label className={LABEL_CLASSES}>
          {label}
          {isRequired && <span className={REQUIRED_CLASSES}>*</span>}
        </label>
      )}
      <div
        className={cn(
          SEGMENTS_CONTAINER_CLASSES,
          disabled && SEGMENT_DISABLED_CLASSES
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
        <span className={SEPARATOR_CLASSES}>·</span>
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
        <span className={SEPARATOR_CLASSES}>·</span>
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
          MESSAGE_BASE_CLASSES,
          error ? ERROR_CLASSES : DESCRIPTION_CLASSES
        )}>
          {error || description}
        </span>
      )}
    </div>
  );
}

DateField.displayName = 'DateField';

