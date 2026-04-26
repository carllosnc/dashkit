import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '../utils/cn';
import { useTextarea } from './useTextarea';
import './textarea.css';

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
      <div className="textarea">
        {label && (
          <label
            htmlFor={internalId}
            className="textarea__label"
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
            'textarea__field',
            autoGrow && 'textarea__field--auto-grow',
            error && 'textarea__field--error',
            className
          )}
        />
        {(error || helperText) && (
          <span className={cn(
            'textarea__message',
            error ? 'textarea__message--error' : 'textarea__message--helper'
          )}>
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
