import { cn } from '../utils/cn';
import { useOtpInput } from './useOtpInput';
import './otp-input.css';

export interface OtpInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  containerClassName?: string;
}

export function OtpInput({
  length = 6,
  value = '',
  onChange,
  disabled,
  className,
  containerClassName
}: OtpInputProps) {
  const {
    inputsRef,
    handleInput,
    handleKeyDown,
    handlePaste
  } = useOtpInput({ length, value, onChange, disabled });

  return (
    <div className={cn('otp-input', containerClassName)}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
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
