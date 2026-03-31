import { createPortal } from 'react-dom';
import { FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import clsx, { type ClassValue } from 'clsx';
import { useDatePicker, months, daysOfWeek } from './useDatePicker';

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
  const {
    isOpen,
    triggerRect,
    position,
    containerRef,
    buttonRef,
    toggleOpen,
    currentMonth,
    currentYear,
    days,
    emptyDays,
    prevMonth,
    nextMonth,
    handleDateSelect,
    isToday,
    isSelected,
    formatDate,
    setViewDate
  } = useDatePicker({ value, onChange, disabled });

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
            "w-full px-4 h-10 text-sm bg-input-bg text-input-fg border border-input ds-rounded outline-none transition-all duration-200 focus:border-input-focus focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-transparent placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 text-left flex items-center justify-between gap-2",
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
              className="w-[280px] bg-popover text-popover-foreground border rounded-xl shadow-2xl p-4 overflow-hidden"
            >
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

              <div className="grid grid-cols-7 mb-2">
                {daysOfWeek.map(day => (
                  <div key={day} className="text-[10px] uppercase font-bold text-muted-foreground text-center">
                    {day}
                  </div>
                ))}
              </div>

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

              <div className="mt-4 pt-4 border-t flex justify-center">
                <button
                  onClick={() => {
                    const today = new Date();
                    setViewDate(today);
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
