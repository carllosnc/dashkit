import {
  forwardRef,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent
} from 'react';
import { FiX } from 'react-icons/fi';
import { cn } from '../utils/cn';

export interface TagInputProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Controlled list of tags. @default undefined */
  value?: string[];
  /** Initial tags when uncontrolled. @default [] */
  defaultValue?: string[];
  /** Callback fired whenever tags are added or removed. */
  onChange?: (tags: string[]) => void;
  /** Optional field label. */
  label?: string;
  /** Optional helper text rendered below the input. */
  description?: string;
  /** Error message; applies error styling and `aria-invalid`. */
  error?: string;
  /** Input placeholder text. @default 'Add a tag...' */
  placeholder?: string;
  /** Optional autocomplete suggestions shown in a dropdown while typing. @default [] */
  suggestions?: string[];
  /** Allows creating custom tags not present in `suggestions`. @default true */
  allowCustom?: boolean;
  /** Allows duplicate tag values. @default false */
  allowDuplicates?: boolean;
  /** Maximum number of tags allowed. @default undefined */
  maxTags?: number;
  /** Key characters that commit the current input as a tag. @default [','] */
  delimiters?: string[];
  /** Disables adding or removing tags. @default false */
  disabled?: boolean;
}

/**
 * Multi-select tag input with keyboard navigation (`ArrowLeft`/`ArrowRight`, `Backspace`/`Delete`), delimiter commit, and autocomplete suggestions.
 *
 * @example
 * ```tsx
 * <TagInput
 *   label="Skills"
 *   defaultValue={['TypeScript', 'React']}
 *   suggestions={['Tailwind CSS', 'Node.js', 'GraphQL']}
 *   placeholder="Add a skill..."
 * />
 * ```
 */
export const TagInput = forwardRef<HTMLDivElement, TagInputProps>(
  (
    {
      value: controlledValue,
      defaultValue = [],
      onChange,
      label,
      description,
      error,
      placeholder = 'Add a tag...',
      suggestions = [],
      allowCustom = true,
      allowDuplicates = false,
      maxTags,
      delimiters = [','],
      disabled = false,
      className,
      id: providedId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = providedId ?? `tag-input-${generatedId}`;
    const listboxId = `${inputId}-listbox`;

    const [uncontrolledTags, setUncontrolledTags] = useState<string[]>(defaultValue);
    const [inputValue, setInputValue] = useState('');
    const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const inputRef = useRef<HTMLInputElement>(null);

    const isControlled = controlledValue !== undefined;
    const tags = isControlled ? controlledValue : uncontrolledTags;

    const updateTags = useCallback(
      (nextTags: string[]) => {
        if (!isControlled) {
          setUncontrolledTags(nextTags);
        }
        onChange?.(nextTags);
      },
      [isControlled, onChange]
    );

    const filteredSuggestions = useMemo(() => {
      const q = inputValue.trim().toLowerCase();
      return suggestions.filter((s) => {
        if (!allowDuplicates && tags.includes(s)) return false;
        if (!q) return true;
        return s.toLowerCase().includes(q);
      });
    }, [allowDuplicates, inputValue, suggestions, tags]);

    const addTag = useCallback(
      (rawTag: string, fromSuggestion = false) => {
        if (disabled) return;
        const trimmed = rawTag.trim();
        if (!trimmed) return;
        if (maxTags !== undefined && tags.length >= maxTags) return;
        if (!allowDuplicates && tags.includes(trimmed)) {
          setInputValue('');
          return;
        }
        if (!fromSuggestion && !allowCustom && !suggestions.includes(trimmed)) {
          return;
        }

        updateTags([...tags, trimmed]);
        setInputValue('');
        setActiveTagIndex(null);
        setHighlightedIndex(-1);
      },
      [allowCustom, allowDuplicates, disabled, maxTags, suggestions, tags, updateTags]
    );

    const removeTagAt = useCallback(
      (index: number) => {
        if (disabled) return;
        if (index < 0 || index >= tags.length) return;
        const next = tags.filter((_, i) => i !== index);
        updateTags(next);
        setActiveTagIndex((prev) => {
          if (prev === null || next.length === 0) return null;
          return Math.min(prev, next.length - 1);
        });
      },
      [disabled, tags, updateTags]
    );

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;

      if (e.key === 'ArrowDown' && filteredSuggestions.length > 0) {
        e.preventDefault();
        setIsDropdownOpen(true);
        setHighlightedIndex((prev) => (prev + 1) % filteredSuggestions.length);
        return;
      }

      if (e.key === 'ArrowUp' && filteredSuggestions.length > 0) {
        e.preventDefault();
        setIsDropdownOpen(true);
        setHighlightedIndex((prev) =>
          prev <= 0 ? filteredSuggestions.length - 1 : prev - 1
        );
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        if (isDropdownOpen && highlightedIndex >= 0 && filteredSuggestions[highlightedIndex]) {
          addTag(filteredSuggestions[highlightedIndex], true);
        } else if (inputValue.trim()) {
          addTag(inputValue);
        }
        return;
      }

      if (delimiters.includes(e.key) && inputValue.trim()) {
        e.preventDefault();
        addTag(inputValue);
        return;
      }

      if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
        e.preventDefault();
        if (activeTagIndex !== null) {
          removeTagAt(activeTagIndex);
        } else {
          removeTagAt(tags.length - 1);
        }
        return;
      }

      if (e.key === 'Delete' && activeTagIndex !== null) {
        e.preventDefault();
        removeTagAt(activeTagIndex);
        return;
      }

      if (e.key === 'ArrowLeft' && inputRef.current?.selectionStart === 0 && tags.length > 0) {
        e.preventDefault();
        setActiveTagIndex((prev) =>
          prev === null ? tags.length - 1 : Math.max(0, prev - 1)
        );
        return;
      }

      if (e.key === 'ArrowRight' && activeTagIndex !== null) {
        e.preventDefault();
        setActiveTagIndex((prev) => {
          if (prev === null || prev >= tags.length - 1) return null;
          return prev + 1;
        });
        return;
      }

      if (e.key === 'Escape') {
        setActiveTagIndex(null);
        setIsDropdownOpen(false);
        setHighlightedIndex(-1);
      }
    };

    const atLimit = maxTags !== undefined && tags.length >= maxTags;
    const showDropdown = isDropdownOpen && !disabled && !atLimit && filteredSuggestions.length > 0;

    return (
      <div ref={ref} data-slot="tag-input" className={cn('relative flex flex-col gap-1.5 w-full', className)} {...props}>
        {label && (
          <label
            htmlFor={inputId}
            data-slot="tag-input-label"
            className="text-sm font-medium text-foreground select-none"
          >
            {label}
          </label>
        )}

        <div
          data-slot="tag-input-control"
          onClick={() => {
            if (!disabled) inputRef.current?.focus();
          }}
          className={cn(
            'flex min-h-10 w-full flex-wrap items-center gap-1.5 ds-rounded-md border border-border bg-input-bg px-2.5 py-1.5 text-sm text-input-fg transition-colors focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary',
            error && 'border-destructive focus-within:border-destructive focus-within:ring-destructive/30',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          {tags.map((tag, index) => {
            const isActive = activeTagIndex === index;
            return (
              <span
                key={`${tag}-${index}`}
                data-slot="tag-input-tag"
                data-active={isActive ? 'true' : undefined}
                className={cn(
                  'inline-flex items-center gap-1 ds-rounded-sm bg-muted px-2 py-0.5 text-xs font-medium text-foreground border border-border/60 transition-colors',
                  isActive && 'ring-2 ring-primary border-primary bg-primary/10 text-primary'
                )}
              >
                <span>{tag}</span>
                {!disabled && (
                  <button
                    type="button"
                    aria-label={`Remove ${tag}`}
                    data-slot="tag-input-remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTagAt(index);
                      inputRef.current?.focus();
                    }}
                    className="inline-flex items-center justify-center rounded-full p-0.5 text-muted-foreground hover:text-foreground focus:outline-none"
                  >
                    <FiX className="size-3" aria-hidden="true" />
                  </button>
                )}
              </span>
            );
          })}

          <input
            ref={inputRef}
            id={inputId}
            type="text"
            role="combobox"
            aria-expanded={showDropdown}
            aria-controls={showDropdown ? listboxId : undefined}
            aria-activedescendant={
              showDropdown && highlightedIndex >= 0
                ? `${listboxId}-option-${highlightedIndex}`
                : undefined
            }
            aria-invalid={Boolean(error) || undefined}
            disabled={disabled || atLimit}
            value={inputValue}
            placeholder={atLimit ? '' : placeholder}
            data-slot="tag-input-field"
            onFocus={() => {
              if (suggestions.length > 0) setIsDropdownOpen(true);
            }}
            onBlur={() => {
              setTimeout(() => {
                setIsDropdownOpen(false);
                setHighlightedIndex(-1);
                setActiveTagIndex(null);
              }, 120);
            }}
            onChange={(e) => {
              setInputValue(e.target.value);
              setActiveTagIndex(null);
              if (suggestions.length > 0) {
                setIsDropdownOpen(true);
                setHighlightedIndex(-1);
              }
            }}
            onKeyDown={handleKeyDown}
            className="min-w-24 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed"
          />
        </div>

        {showDropdown && (
          <div
            id={listboxId}
            role="listbox"
            data-slot="tag-input-suggestions"
            className="absolute left-0 right-0 top-full z-30 mt-1 max-h-48 overflow-y-auto ds-rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg custom-scrollbar"
          >
            {filteredSuggestions.map((suggestion, idx) => {
              const isHighlighted = idx === highlightedIndex;
              return (
                <button
                  key={suggestion}
                  id={`${listboxId}-option-${idx}`}
                  type="button"
                  role="option"
                  aria-selected={isHighlighted}
                  data-slot="tag-input-suggestion"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    addTag(suggestion, true);
                  }}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  className={cn(
                    'flex w-full items-center ds-rounded-sm px-2.5 py-1.5 text-left text-sm transition-colors',
                    isHighlighted ? 'bg-primary/10 text-primary' : 'hover:bg-muted/60'
                  )}
                >
                  {suggestion}
                </button>
              );
            })}
          </div>
        )}

        {error ? (
          <p data-slot="tag-input-error" className="text-xs text-destructive">
            {error}
          </p>
        ) : description ? (
          <p data-slot="tag-input-description" className="text-xs text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
    );
  }
);

TagInput.displayName = 'TagInput';
