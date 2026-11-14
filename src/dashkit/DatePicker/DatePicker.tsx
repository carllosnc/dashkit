import { createPortal } from 'react-dom';
import { FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { cn } from '../utils/cn';
import { getPortalThemeAttrs } from '../utils/portalTheme';
import { useDatePicker, months, daysOfWeek } from './useDatePicker';

export interface DatePickerProps {
  label?: string;
  description?: string;
  /** @default 'Select date' */
  placeholder?: string;
  value?: Date;
  onChange?: (date: Date) => void;
  className?: string;
  disabled?: boolean;
}

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
    portalRef,
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
    <div data-slot="root" className="flex flex-col gap-1.5 w-full font-sans" ref={containerRef}>
      {label && (
        <label data-slot="label" className="text-[13px] font-semibold text-foreground ml-1 tracking-tight">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          ref={buttonRef}
          data-slot="trigger"
          type="button"
          disabled={disabled}
          onClick={toggleOpen}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          className={cn(
            'w-full px-4 h-9 text-sm bg-input-bg text-input-fg border border-input-border ds-input-surface ds-rounded outline-none transition-all duration-200 text-left flex items-center justify-between gap-2 focus:border-input-focus focus:ring-2 focus:ring-input-focus/20 disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
        >
          <span className={cn('truncate', !value && 'text-muted-foreground')}>
            {value ? formatDate(value) : placeholder}
          </span>
          <FiCalendar className="size-4 text-muted-foreground" />
        </button>

        {isOpen && triggerRect && createPortal(
          <div
            ref={portalRef}
            {...getPortalThemeAttrs()}
            data-slot="content"
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
              className={cn(
                'w-[280px] bg-popover text-popover-fg border border-popover-border ds-border-width ds-popover-shadow ds-rounded p-4 overflow-hidden',
                position === 'top' ? 'origin-bottom' : 'origin-top'
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={prevMonth}
                  className="p-1.5 rounded-md transition-colors text-muted-foreground hover:bg-popover-item hover:text-popover-fg"
                  aria-label="Previous month"
                >
                  <FiChevronLeft className="size-4" />
                </button>
                <div className="text-sm font-bold tracking-tight text-popover-fg">
                  {months[currentMonth]} {currentYear}
                </div>
                <button
                  type="button"
                  onClick={nextMonth}
                  className="p-1.5 rounded-md transition-colors text-muted-foreground hover:bg-popover-item hover:text-popover-fg"
                  aria-label="Next month"
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
                {days.map(day => {
                  const selected = isSelected(day);
                  const today = isToday(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDateSelect(day)}
                      className={cn(
                        'size-8 text-xs rounded-lg flex items-center justify-center transition-all duration-200 font-medium text-popover-fg hover:bg-popover-item',
                        selected && 'ds-primary-gradient text-primary-foreground font-bold shadow-sm transform scale-110 hover:bg-transparent hover:brightness-110',
                        today && !selected && 'text-foreground border border-border bg-muted'
                      )}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-popover-border flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    const today = new Date();
                    setViewDate(today);
                  }}
                  className="text-xs font-bold text-muted-foreground transition-colors hover:text-popover-fg"
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
        <span data-slot="helper" className="text-[12px] text-muted-foreground ml-1 tracking-tight">
          {description}
        </span>
      )}
    </div>
  );
}

DatePicker.displayName = 'DatePicker';
