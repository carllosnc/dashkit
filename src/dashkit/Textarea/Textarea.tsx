import { forwardRef, useId, type TextareaHTMLAttributes } from 'react';
import { cn } from '../utils/cn';
import { useTextarea } from './useTextarea';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  autoGrow?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, autoGrow = false, className, id, onChange, ...props }, ref) => {
    const { textareaRef, internalId, handleChange } = useTextarea({
      id,
      label,
      autoGrow,
      value: props.value,
      onChange
    });
    const messageId = useId();
    const hasMessage = !!(error || helperText);

    return (
      <div className="flex flex-col gap-1.5 w-full font-sans">
        {label && (
          <label
            htmlFor={internalId}
            className="text-[13px] font-semibold text-ds-700 dark:text-ds-300 ml-1 tracking-tight"
          >
            {label}
          </label>
        )}
        <textarea
          {...props}
          id={internalId}
          ref={(node) => {
            textareaRef.current = node;
            if (typeof ref === 'function') {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
          }}
          onChange={handleChange}
          aria-invalid={props['aria-invalid'] ?? (error ? true : undefined)}
          aria-describedby={
            [props['aria-describedby'], hasMessage ? messageId : undefined]
              .filter(Boolean)
              .join(' ') || undefined
          }
          className={cn(
            'w-full px-4 py-3 text-base sm:text-sm transition-all duration-200 ds-rounded outline-none',
            'bg-input-bg text-input-fg border border-input-border',
            'focus:border-input-focus focus:ring-2 focus:ring-input-focus/20',
            'placeholder:text-muted-foreground',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'resize-none min-h-[100px]',
            autoGrow && 'overflow-hidden',
            error
              ? 'border-ds-danger-500/50 focus:border-ds-danger-500 focus:ring-ds-danger-50 dark:border-ds-danger-500/30 dark:focus:border-ds-danger-500/50 dark:focus:ring-ds-danger-500/10'
              : '',
            className
          )}
        />
        {(error || helperText) && (
          <span
            id={messageId}
            className={cn(
              'text-[12px] ml-1 tracking-tight',
              error
                ? 'text-ds-danger-600 dark:text-ds-danger-400'
                : 'text-ds-600'
            )}
          >
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
