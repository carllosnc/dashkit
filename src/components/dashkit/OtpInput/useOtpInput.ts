import { useRef, type KeyboardEvent, type ChangeEvent, type ClipboardEvent } from 'react';

export interface UseOtpInputProps {
  length: number;
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export function useOtpInput({ length, value, onChange, disabled }: UseOtpInputProps) {
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
    newValue[index] = val.slice(-1);
    const result = newValue.join('');

    onChange?.(result);

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

  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault();
    if (disabled) return;

    const pasteData = e.clipboardData.getData('text').slice(0, length).replace(/[^0-9]/g, '');
    onChange?.(pasteData);

    const focusIndex = Math.min(pasteData.length, length - 1);
    inputsRef.current[focusIndex]?.focus();
  };

  return {
    inputsRef,
    handleInput,
    handleKeyDown,
    handlePaste,
  };
}
