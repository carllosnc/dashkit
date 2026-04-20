import { useState, forwardRef } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { Input } from '../Input/Input';
import { IconButton } from '../IconButton/IconButton';
import { cn } from '../utils/cn';
import { toast } from '../Toast/useToast';

import './copy-field.css';

export interface CopyFieldProps {
  label?: string;
  description?: string;
  value: string;
  className?: string;
  showToast?: boolean;
}

export const CopyField = forwardRef<HTMLDivElement, CopyFieldProps>(
  function CopyField({ label, description, value, className, showToast = true }, ref) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async (e: React.MouseEvent) => {
      e.stopPropagation();
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        if (showToast) {
          toast({
            title: 'Copied to clipboard',
            description: value,
            type: 'success',
            duration: 2000,
            invert: true
          });
        }
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    };

    return (
      <div
        ref={ref}
        className={cn('copy-field', className)}
      >
        {label && (
          <label className="copy-field__label">
            {label}
          </label>
        )}
        <Input
          value={value}
          readOnly
          helperText={description}
          className="copy-field__input"
          onFocus={(e) => e.target.select()}
          rightIcon={
            <IconButton
              icon={copied ? (
                <FiCheck className="copy-field__check-icon" />
              ) : (
                <FiCopy className="copy-field__copy-icon" />
              )}
              onClick={handleCopy}
              variant="ghost"
              className="copy-field__button"
              aria-label="Copy to clipboard"
            />
          }
        />
      </div>
    );
  }
);

CopyField.displayName = 'CopyField';
