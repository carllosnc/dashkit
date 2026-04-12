import { createPortal } from 'react-dom';
import { FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
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

const CONTAINER_CLASSES = "flex flex-col gap-1.5 w-full font-sans";
const LABEL_CLASSES = "text-[13px] font-semibold text-ds-700 dark:text-ds-300 ml-1 tracking-tight";
const TRIGGER_BUTTON_CLASSES = "w-full px-4 h-9 text-sm bg-input-bg text-input-fg border border-input ds-rounded outline-none transition-all duration-200 focus:border-input-focus focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-transparent placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 text-left flex items-center justify-between gap-2";
const PLACEHOLDER_CLASSES = "text-ds-500";
const CALENDAR_ICON_CLASSES = "size-4 text-ds-400";
const POPOVER_WRAPPER_CLASSES = "w-[280px] bg-popover text-popover-fg border border-popover-border ds-rounded shadow-2xl p-4 overflow-hidden";
const HEADER_CLASSES = "flex items-center justify-between mb-4";
const MONTH_YEAR_CLASSES = "text-sm font-bold tracking-tight text-popover-fg";
const NAV_BUTTON_CLASSES = "p-1.5 hover:bg-popover-item rounded-md transition-colors text-ds-500 hover:text-popover-fg";
const WEEKDAYS_GRID_CLASSES = "grid grid-cols-7 mb-2";
const WEEKDAY_LABEL_CLASSES = "text-[10px] uppercase font-bold text-ds-400 dark:text-ds-500 text-center";
const DAYS_GRID_CLASSES = "grid grid-cols-7 gap-1";
const DAY_BUTTON_BASE_CLASSES = "size-8 text-xs rounded-lg flex items-center justify-center transition-all duration-200 font-medium";
const DAY_BUTTON_SELECTED_CLASSES = "bg-popover-item-selected text-popover-item-selected-fg font-bold shadow-sm transform scale-110";
const DAY_BUTTON_TODAY_CLASSES = "text-ds-800 dark:text-ds-200 border border-ds-200 dark:border-ds-800 bg-ds-50 dark:bg-ds-800";
const DAY_BUTTON_HOVER_CLASSES = "text-popover-fg hover:bg-popover-item";
const FOOTER_CLASSES = "mt-4 pt-4 border-t border-popover-border flex justify-center";
const TODAY_BUTTON_CLASSES = "text-xs font-bold text-ds-600 dark:text-ds-400 hover:text-ds-900 dark:hover:text-ds-200 transition-colors";
const DESCRIPTION_CLASSES = "text-[12px] text-ds-600 dark:text-ds-400 ml-1 tracking-tight";

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
    <div className={cn(CONTAINER_CLASSES)} ref={containerRef}>
      {label && (
        <label className={LABEL_CLASSES}>
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
          className={cn(TRIGGER_BUTTON_CLASSES, className)}
        >
          <span className={cn("truncate", !value && PLACEHOLDER_CLASSES)}>
            {value ? formatDate(value) : placeholder}
          </span>
          <FiCalendar className={CALENDAR_ICON_CLASSES} />
        </button>

        {createPortal(
          <AnimatePresence>
            {isOpen && triggerRect && (
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
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  role="dialog"
                  aria-label="Calendar"
                  className={POPOVER_WRAPPER_CLASSES}
                >
                  <div className={HEADER_CLASSES}>
                    <button
                      type="button"
                      onClick={prevMonth}
                      className={NAV_BUTTON_CLASSES}
                      aria-label="Previous month"
                    >
                      <FiChevronLeft className="size-4" />
                    </button>
                    <div className={MONTH_YEAR_CLASSES}>
                      {months[currentMonth]} {currentYear}
                    </div>
                    <button
                      type="button"
                      onClick={nextMonth}
                      className={NAV_BUTTON_CLASSES}
                      aria-label="Next month"
                    >
                      <FiChevronRight className="size-4" />
                    </button>
                  </div>

                  <div className={WEEKDAYS_GRID_CLASSES}>
                    {daysOfWeek.map(day => (
                      <div key={day} className={WEEKDAY_LABEL_CLASSES}>
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className={DAYS_GRID_CLASSES}>
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
                            DAY_BUTTON_BASE_CLASSES,
                            selected ? DAY_BUTTON_SELECTED_CLASSES : DAY_BUTTON_HOVER_CLASSES,
                            today && !selected && DAY_BUTTON_TODAY_CLASSES
                          )}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>

                  <div className={FOOTER_CLASSES}>
                    <button
                      type="button"
                      onClick={() => {
                        const today = new Date();
                        setViewDate(today);
                      }}
                      className={TODAY_BUTTON_CLASSES}
                    >
                      Jump to today
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
      </div>
      {description && (
        <span className={DESCRIPTION_CLASSES}>
          {description}
        </span>
      )}
    </div>
  );
}

DatePicker.displayName = 'DatePicker';

