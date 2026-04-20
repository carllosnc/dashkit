import { useState, useRef, useEffect } from 'react';

export interface UseDateFieldProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
}

const getTime = (d?: Date | null) => (d instanceof Date ? d.getTime() : d === null ? null : undefined);

export function useDateField({ value, onChange }: UseDateFieldProps) {
  const [month, setMonth] = useState(value ? (value.getMonth() + 1).toString().padStart(2, '0') : '');
  const [day, setDay] = useState(value ? value.getDate().toString().padStart(2, '0') : '');
  const [year, setYear] = useState(value ? value.getFullYear().toString() : '');

  const monthRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const [prevValue, setPrevValue] = useState(value);
  const prevValueRef = useRef<Date | null | undefined>(value);

  // Sync state when controlled value changes
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

  return {
    month,
    day,
    year,
    monthRef,
    dayRef,
    yearRef,
    handleMonthUpdate,
    handleDayUpdate,
    handleYearUpdate
  };
}
