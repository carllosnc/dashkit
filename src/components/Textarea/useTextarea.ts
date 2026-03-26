import { useRef, useEffect, useCallback, type ChangeEvent } from 'react';

export interface UseTextareaProps {
  id?: string;
  label?: string;
  autoGrow?: boolean;
  value?: string | number | readonly string[];
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export function useTextarea({ id, label, autoGrow, value, onChange }: UseTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const internalId = id || (label ? `textarea-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  const adjustHeight = useCallback(() => {
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
  }, [value, autoGrow, adjustHeight]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (autoGrow) {
      adjustHeight();
    }
    onChange?.(e);
  };

  return {
    textareaRef,
    internalId,
    handleChange,
    adjustHeight
  };
}
