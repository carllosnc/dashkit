import { createPortal } from 'react-dom';
import { FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { cn } from '../utils/cn';
import { useDatePicker, months, daysOfWeek } from './useDatePicker';

export interface DatePickerProps {
  label?: string;
  description?: string;
  placeholder?: string;
  value?: Date;
  onChange?: (date: Date) => void;
  className?: string;
  disabled?: boolean;
}

import './date-picker.css';

export function DatePicker({
  label,
  description,
  placeholder = 'Select date',
  value,
  onChange,
  className,
  disabled
}: DatePickerProps) {
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
    <div className="date-picker" ref={containerRef}>
      {label && (
        <label className="date-picker__label">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          ref={buttonRef}
          type="button"
          disabled={disabled}
          onClick={toggleOpen}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          className={cn('date-picker__trigger', className)}
        >
          <span className={cn("truncate", !value && 'date-picker__placeholder')}>
            {value ? formatDate(value) : placeholder}
          </span>
          <FiCalendar className="date-picker__calendar-icon" />
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
            <div
              role="dialog"
              aria-label="Calendar"
              className={cn('date-picker__popover', position === 'top' ? 'origin-bottom' : 'origin-top')}
            >
              <div className="date-picker__header">
                <button
                  type="button"
                  onClick={prevMonth}
                  className="date-picker__nav-button"
                  aria-label="Previous month"
                >
                  <FiChevronLeft className="size-4" />
                </button>
                <div className="date-picker__header-text">
                  {months[currentMonth]} {currentYear}
                </div>
                <button
                  type="button"
                  onClick={nextMonth}
                  className="date-picker__nav-button"
                  aria-label="Next month"
                >
                  <FiChevronRight className="size-4" />
                </button>
              </div>

              <div className="date-picker__weekdays">
                {daysOfWeek.map(day => (
                  <div key={day} className="date-picker__weekday-label">
                    {day}
                  </div>
                ))}
              </div>

              <div className="date-picker__days-grid">
                {emptyDays.map(i => (
                  <div key={`empty-${i}`} />
                ))}
                {days.map(day => {
                  const selected = isSelected(day);
                  const today = isToday(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDateSelect(day)}
                      className={cn(
                        'date-picker__day',
                        selected && 'date-picker__day--selected',
                        today && !selected && 'date-picker__day--today'
                      )}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              <div className="date-picker__footer">
                <button
                  type="button"
                  onClick={() => {
                    const today = new Date();
                    setViewDate(today);
                  }}
                  className="date-picker__today-button"
                >
                  Jump to today
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
      {description && (
        <span className="date-picker__description">
          {description}
        </span>
      )}
    </div>
  );
}

DatePicker.displayName = 'DatePicker';

