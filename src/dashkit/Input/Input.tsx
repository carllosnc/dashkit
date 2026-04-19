import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
  error?: string;
  helperText?: string;
  mask?: RegExp;
  formatter?: (value: string) => string;
}

const CONTAINER_CLASSES = "flex flex-col gap-1.5 w-full font-sans";
const LABEL_CLASSES = "text-[13px] font-semibold text-ds-700 dark:text-ds-300 ml-1 tracking-tight";
const INPUT_WRAPPER_CLASSES = "relative flex items-center group bg-input-bg border border-input-border ds-rounded outline-none transition-all duration-200 focus-within:border-input-focus focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-transparent";
const INPUT_WRAPPER_ERROR_CLASSES = "border-ds-danger-500/50 focus-within:border-ds-danger-500 focus-within:ring-ds-danger-50 dark:border-ds-danger-500/30 dark:focus-within:border-ds-danger-500/50 dark:focus-within:ring-ds-danger-500/10";
const INPUT_WRAPPER_DISABLED_CLASSES = "opacity-50 cursor-not-allowed pointer-events-none";
const PREFIX_CLASSES = "pl-4 text-sm text-ds-500 font-medium select-none whitespace-nowrap";
const INNER_CONTENT_CLASSES = "relative flex-1 flex items-center h-9";
const ICON_BASE_CLASSES = "absolute inset-y-0 text-ds-500 pointer-events-none flex items-center justify-center group-focus-within:text-black dark:group-focus-within:text-white";
const LEFT_ICON_CLASSES = cn(ICON_BASE_CLASSES, "left-4");
const RIGHT_ICON_CLASSES = cn(ICON_BASE_CLASSES, "right-4");
const INPUT_CORE_CLASSES = "w-full h-full px-4 text-sm bg-transparent border-none outline-none text-input-fg placeholder:text-muted-foreground disabled:cursor-not-allowed";
const SUFFIX_CLASSES = "pr-4 text-sm text-ds-500 font-medium select-none whitespace-nowrap";
const HELPER_TEXT_BASE_CLASSES = "text-[12px] ml-1 tracking-tight";
const HELPER_TEXT_ERROR_CLASSES = "text-ds-danger-600 dark:text-ds-danger-400";
const HELPER_TEXT_DEFAULT_CLASSES = "text-ds-600";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, leftIcon, rightIcon, prefix, suffix, error, helperText, mask, formatter, className, id, onChange, ...props }, ref) {
    const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;
      if (mask) {
        value = value.replace(mask, '');
      }
      if (formatter) {
        value = formatter(value);
      }
      e.target.value = value;
      onChange?.(e);
    };

    return (
      <div className={CONTAINER_CLASSES}>
        {label && (
          <label
            htmlFor={inputId}
            className={LABEL_CLASSES}
          >
            {label}
          </label>
        )}
        <div
          className={cn(
            INPUT_WRAPPER_CLASSES,
            {
              [INPUT_WRAPPER_ERROR_CLASSES]: !!error,
              [INPUT_WRAPPER_DISABLED_CLASSES]: props.disabled
            },
            className
          )}
        >
          {prefix && (
            <div className={PREFIX_CLASSES}>
              {prefix}
            </div>
          )}

          <div className={INNER_CONTENT_CLASSES}>
            {leftIcon && (
              <div className={LEFT_ICON_CLASSES}>
                {leftIcon}
              </div>
            )}
            <input
              {...props}
              id={inputId}
              ref={ref}
              onChange={handleChange}
              className={cn(
                INPUT_CORE_CLASSES,
                {
                  "pl-11": !!leftIcon,
                  "pr-11": !!rightIcon,
                }
              )}
            />
            {rightIcon && (
              <div className={RIGHT_ICON_CLASSES}>
                {rightIcon}
              </div>
            )}
          </div>

          {suffix && (
            <div className={SUFFIX_CLASSES}>
              {suffix}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <span className={cn(
            HELPER_TEXT_BASE_CLASSES,
            error ? HELPER_TEXT_ERROR_CLASSES : HELPER_TEXT_DEFAULT_CLASSES
          )}>
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
