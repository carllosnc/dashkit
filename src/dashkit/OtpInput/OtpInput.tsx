import { useId } from 'react';
import { cn } from '../utils/cn';
import { useOtpInput } from './useOtpInput';
import './otp-input.css';

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
      className={cn('otp-input', containerClassName)}
      role="group"
      aria-labelledby={label ? `${baseId}-label` : undefined}
      aria-label={label ? undefined : 'One-time code'}
    >
      {label && (
        <label id={`${baseId}-label`} htmlFor={`${baseId}-0`} className="otp-input__label">
          {label}
        </label>
      )}
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
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
          className={cn('otp-input__field', className)}
        />
      ))}
    </div>
  );
}

OtpInput.displayName = 'OtpInput';
