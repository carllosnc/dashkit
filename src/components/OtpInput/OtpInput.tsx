import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useOtpInput } from './useOtpInput';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface OtpInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  containerClassName?: string;
}

export const OtpInput = ({
  length = 6,
  value = '',
  onChange,
  disabled,
  className,
  containerClassName
}: OtpInputProps) => {
  const {
    inputsRef,
    handleInput,
    handleKeyDown,
    handlePaste
  } = useOtpInput({ length, value, onChange, disabled });

  return (
    <div className={cn("flex flex-wrap gap-2 sm:gap-3 items-center justify-start", containerClassName)}>
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
          className={cn(
            "w-10 h-12 sm:w-11 sm:h-13 text-center text-lg sm:text-xl font-bold bg-background text-foreground border border-input rounded-[var(--radius)] outline-none transition-all duration-300 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-transparent placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
            "hover:border-ds-500 dark:hover:border-ds-500",
            className
          )}
        />
      ))}
    </div>
  );
};

OtpInput.displayName = 'OtpInput';
