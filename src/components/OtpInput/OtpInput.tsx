import React, { useRef, type KeyboardEvent, type ChangeEvent } from 'react';
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for merging tailwind classes with conflict resolution
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface OtpInputProps {
  /** Number of OTP digits */
  length?: number;
  /** The current value of the OTP input */
  value?: string;
  /** Callback fired when the value changes */
  onChange?: (value: string) => void;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Additional CSS classes for each input field */
  className?: string;
  /** Additional CSS classes for the container */
  containerClassName?: string;
}

/**
 * A premium OTP (One-Time Password) input component with automatic focus shifting
 * and paste support.
 */
export const OtpInput = ({ 
  length = 6, 
  value = '', 
  onChange, 
  disabled, 
  className,
  containerClassName 
}: OtpInputProps) => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    if (!val) {
      if (e.target.value === '') {
        const newValue = value.split('');
        newValue[index] = '';
        onChange?.(newValue.join(''));
      }
      return;
    }

    const newValue = value.split('');
    // Fill the current slot with the last character entered
    newValue[index] = val.slice(-1);
    const result = newValue.join('');
    
    onChange?.(result);

    // Auto focus next field
    if (val && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (!value[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    if (disabled) return;
    
    const pasteData = e.clipboardData.getData('text').slice(0, length).replace(/[^0-9]/g, '');
    onChange?.(pasteData);
    
    // Focus the last filled input or the first empty one
    const focusIndex = Math.min(pasteData.length, length - 1);
    inputsRef.current[focusIndex]?.focus();
  };

  return (
    <div className={cn("flex flex-wrap gap-2 sm:gap-3 items-center justify-start", containerClassName)}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { inputsRef.current[i] = el; }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{1}"
          maxLength={1}
          value={value[i] || ''}
          onChange={(e) => handleInput(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          disabled={disabled}
          className={cn(
            "w-10 h-12 sm:w-11 sm:h-13 text-center text-lg sm:text-xl font-bold bg-background text-foreground border border-input rounded-[var(--radius)] outline-none transition-all duration-300 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-transparent placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
            "hover:border-neutral-500 dark:hover:border-neutral-500",
            className
          )}
        />
      ))}
    </div>
  );
};



