import { forwardRef, type TextareaHTMLAttributes } from 'react';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useTextarea } from './useTextarea';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
          className={cn(
            "w-full px-4 py-3 text-sm bg-background text-foreground border border-input rounded-[var(--radius)] outline-none transition-all duration-200 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-transparent placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 resize-none min-h-[100px]",
            autoGrow && "overflow-hidden",
            {
              "border-red-500/50 focus:border-red-500 focus:ring-red-50 dark:border-red-500/30 dark:focus:border-red-500/50 dark:focus:ring-red-500/10": !!error,
            },
            className
          )}
        />
        {(error || helperText) && (
          <span className={cn(
            "text-[12px] ml-1 tracking-tight",
            error ? "text-red-500 dark:text-red-300" : "text-ds-600"
          )}>
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
