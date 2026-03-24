import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import clsx, { type ClassValue } from 'clsx';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface DatePickerProps {
  label?: string;
  description?: string;
  placeholder?: string;
  value?: Date;
  onChange?: (date: Date) => void;
  className?: string;
  disabled?: boolean;
}

export const DatePicker = ({
  label,
  description,
  placeholder = 'Select date',
  value,
  onChange,
  className,
  disabled
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(value || new Date());
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
  const [position, setPosition] = useState<'bottom' | 'top'>('bottom');
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleOpen = () => {
    if (disabled) return;

    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const spaceBelow = viewportHeight - rect.bottom;
      const pickerHeight = 360; // Approximate height with today button

      if (spaceBelow < pickerHeight && rect.top > pickerHeight) {
        setPosition('top');
      } else {
        setPosition('bottom');
      }
      setTriggerRect(rect);
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.getElementById('dashkit-datepicker-portal');
      if (
        containerRef.current && !containerRef.current.contains(event.target as Node) &&
        (!menu || !menu.contains(event.target as Node))
      ) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      if (isOpen) setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll, true);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isOpen]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();

  const prevMonth = () => {
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleDateSelect = (day: number) => {
    const selected = new Date(currentYear, currentMonth, day);
    onChange?.(selected);
    setIsOpen(false);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day &&
           today.getMonth() === currentMonth &&
           today.getFullYear() === currentYear;
  };

  const isSelected = (day: number) => {
    if (!value) return false;
    return value.getDate() === day &&
           value.getMonth() === currentMonth &&
           value.getFullYear() === currentYear;
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="flex flex-col gap-1.5 w-full font-sans" ref={containerRef}>
      {label && (
        <label className="text-[13px] font-semibold text-ds-700 dark:text-ds-300 ml-1 tracking-tight">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          disabled={disabled}
          onClick={toggleOpen}
          className={cn(
            "w-full px-4 h-10 text-sm bg-background text-foreground border border-input rounded-[var(--radius)] outline-none transition-all duration-200 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-transparent placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 text-left flex items-center justify-between gap-2",
            className
          )}
        >
          <span className={cn(
            "truncate",
            !value && "text-ds-500"
          )}>
            {value ? formatDate(value) : placeholder}
          </span>
          <FiCalendar className="size-4 text-ds-400" />
        </button>

        {isOpen && triggerRect && createPortal(
          <div
            id="dashkit-datepicker-portal"
            style={{
              position: 'fixed',
              top: position === 'bottom' ? triggerRect.bottom + 8 : triggerRect.top - 8,
              left: triggerRect.left,
              zIndex: 9999,
              transform: position === 'top' ? 'translateY(-100%)' : 'none'
            }}
          >
            <motion.div
              initial={{
                opacity: 0,
                y: position === 'bottom' ? -10 : 10,
                scale: 0.95
              }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{
                opacity: 0,
                y: position === 'bottom' ? -10 : 10,
                scale: 0.95
              }}
              className="w-[280px] bg-popover text-popover-foreground border border-border rounded-xl shadow-2xl p-4 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={prevMonth}
                  className="p-1.5 hover:bg-muted rounded-md transition-colors"
                >
                  <FiChevronLeft className="size-4" />
                </button>
                <div className="text-sm font-bold tracking-tight">
                  {months[currentMonth]} {currentYear}
                </div>
                <button
                  onClick={nextMonth}
                  className="p-1.5 hover:bg-muted rounded-md transition-colors"
                >
                  <FiChevronRight className="size-4" />
                </button>
              </div>

              {/* Grid Header */}
              <div className="grid grid-cols-7 mb-2">
                {daysOfWeek.map(day => (
                  <div key={day} className="text-[10px] uppercase font-bold text-muted-foreground text-center">
                    {day}
                  </div>
                ))}
              </div>

              {/* Grid Days */}
              <div className="grid grid-cols-7 gap-1">
                {emptyDays.map(i => (
                  <div key={`empty-${i}`} />
                ))}
                {days.map(day => (
                  <button
                    key={day}
                    onClick={() => handleDateSelect(day)}
                    className={cn(
                      "size-8 text-xs rounded-lg flex items-center justify-center transition-all duration-200",
                      isSelected(day) 
                        ? "bg-primary text-primary-foreground font-bold shadow-md transform scale-110" 
                        : "hover:bg-muted font-medium",
                      isToday(day) && !isSelected(day) && "text-primary border border-primary/20 bg-primary/5"
                    )}
                  >
                    {day}
                  </button>
                ))}
              </div>

              {/* Today Button */}
              <div className="mt-4 pt-4 border-t border-border flex justify-center">
                <button
                  onClick={() => {
                    const today = new Date();
                    setViewDate(today);
                    // Optionally select today immediately or just jump to it
                    // onChange?.(today);
                    // setIsOpen(false);
                  }}
                  className="text-xs font-bold text-primary hover:underline"
                >
                  Jump to today
                </button>
              </div>
            </motion.div>
          </div>,
          document.body
        )}
      </div>
      {description && (
        <span className="text-[12px] text-ds-600 dark:text-ds-400 ml-1 tracking-tight">
          {description}
        </span>
      )}
    </div>
  );
};

DatePicker.displayName = 'DatePicker';
