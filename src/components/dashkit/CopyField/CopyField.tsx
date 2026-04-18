import { useState, forwardRef } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { Input } from '../Input/Input';
import { IconButton } from '../IconButton/IconButton';
import { cn } from '../utils/cn';
import { toast } from '../Toast/useToast';

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
            duration: 2000
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
        className={cn("flex flex-col gap-1.5 w-full font-sans", className)}
      >
        {label && (
          <label className="text-[13px] font-bold uppercase text-ds-800 dark:text-ds-200 ml-1 tracking-wider">
            {label}
          </label>
        )}
        <Input
          value={value}
          readOnly
          helperText={description}
          className="font-mono"
          onFocus={(e) => e.target.select()}
          rightIcon={
            <IconButton
              icon={copied ? <FiCheck className="text-ds-success-600 animate-in fade-in zoom-in duration-300" /> : <FiCopy className="opacity-70 group-hover:opacity-100 transition-opacity" />}
              onClick={handleCopy}
              variant="ghost"
              className="pointer-events-auto size-8 h-8 -mr-2.5 transition-all active:scale-95"
              aria-label="Copy to clipboard"
            />
          }
        />
      </div>
    );
  }
);

CopyField.displayName = 'CopyField';
