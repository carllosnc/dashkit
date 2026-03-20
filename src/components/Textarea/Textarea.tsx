import React, { forwardRef, useEffect, useRef, type TextareaHTMLAttributes } from 'react';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  autoGrow?: boolean;
}

/**
 * Textarea component with labels, error states, and optional auto-grow support.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, autoGrow = false, className, id, onChange, ...props }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const internalId = id || (label ? `textarea-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

    const adjustHeight = React.useCallback(() => {
      const textarea = textareaRef.current;
      if (autoGrow && textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }, [autoGrow]);

    useEffect(() => {
      if (autoGrow) {
        adjustHeight();
      }
    }, [props.value, autoGrow, adjustHeight]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoGrow) {
        adjustHeight();
      }
      onChange?.(e);
    };

    return (
      <div className="flex flex-col gap-1.5 w-full font-sans">
        {label && (
          <label
            htmlFor={internalId}
            className="text-[13px] font-semibold text-base-700 dark:text-base-300 ml-1 tracking-tight"
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
            "w-full px-4 py-3 text-sm bg-white dark:bg-base-950 border rounded-md outline-none transition-all duration-200 resize-none",
            autoGrow && "overflow-hidden",
            "border-base-300 dark:border-base-800 text-base-900 dark:text-white min-h-[100px]",
            "focus:border-base-900 dark:focus:border-base-400",
            "focus:ring-4 focus:ring-base-100 dark:focus:ring-base-900/40",
            "placeholder:text-base-500 dark:placeholder:text-base-500",
            "disabled:cursor-not-allowed disabled:bg-base-200 dark:disabled:bg-base-900 disabled:border-base-300 dark:disabled:border-base-800 disabled:text-base-400 dark:disabled:text-base-600",
            {
              "border-red-500/50 focus:border-red-500 focus:ring-red-50 dark:border-red-500/30 dark:focus:border-red-500/50 dark:focus:ring-red-500/10": !!error,
            },
            className
          )}
        />
        {(error || helperText) && (
          <span className={cn(
            "text-[12px] ml-1 tracking-tight",
            error ? "text-red-500" : "text-base-600"
          )}>
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
