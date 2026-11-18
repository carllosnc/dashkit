import { useRef, useEffect, useCallback, useId, type ChangeEvent } from 'react';

export interface UseTextareaProps {
  id?: string;
  autoGrow?: boolean;
  value?: string | number | readonly string[];
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export function useTextarea({ id, autoGrow, value, onChange }: UseTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const generatedId = useId();
  const internalId = id || `textarea-${generatedId}`;

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
