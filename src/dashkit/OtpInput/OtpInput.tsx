import { useId } from 'react';
import { cn } from '../utils/cn';
import { useOtpInput } from './useOtpInput';

export interface OtpInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
  containerClassName?: string;
}

export function OtpInput({
  length = 6,
  value = '',
  onChange,
  disabled,
  label,
  className,
  containerClassName
}: OtpInputProps) {
  const baseId = useId();
  const {
    inputsRef,
    handleInput,
    handleKeyDown,
    handlePaste
  } = useOtpInput({ length, value, onChange, disabled });

  return (
    <div
      data-slot="root"
      className={cn('flex flex-wrap gap-2 sm:gap-3 items-center justify-start', containerClassName)}
      role="group"
      aria-labelledby={label ? `${baseId}-label` : undefined}
      aria-label={label ? undefined : 'One-time code'}
    >
      {label && (
        <label data-slot="label" id={`${baseId}-label`} htmlFor={`${baseId}-0`} className="basis-full text-[13px] font-semibold text-foreground ml-1 tracking-tight">
          {label}
        </label>
      )}
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          data-slot="slot"
          id={`${baseId}-${i}`}
          aria-label={`Digit ${i + 1} of ${length}`}
          ref={(el) => { if (inputsRef.current) inputsRef.current[i] = el; }}
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
            'w-10 h-12 sm:w-11 sm:h-13 text-center text-lg sm:text-xl font-bold bg-input-bg text-input-fg border border-input-border ds-input-surface ds-rounded outline-none transition-all duration-300 focus:border-input-focus focus:ring-2 focus:ring-input-focus/20 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 hover:border-input-focus',
            className
          )}
        />
      ))}
    </div>
  );
}

OtpInput.displayName = 'OtpInput';
