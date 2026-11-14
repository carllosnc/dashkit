import {
  forwardRef,
  useCallback,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type HTMLAttributes,
  type KeyboardEvent
} from 'react';
import { FiAlertCircle, FiCheckCircle, FiFile, FiUploadCloud, FiX } from 'react-icons/fi';
import { cn } from '../utils/cn';

export type FileUploadStatus = 'pending' | 'uploading' | 'completed' | 'error';

export interface FileUploadItem {
  /** Unique identifier for the file entry. */
  id: string;
  /** Optional underlying browser File object. */
  file?: File;
  /** Display file name. */
  name: string;
  /** File size in bytes. */
  size: number;
  /** MIME type of the file. */
  type?: string;
  /** Upload progress percentage (`0` to `100`). @default 0 */
  progress?: number;
  /** Current upload status. @default 'pending' */
  status?: FileUploadStatus;
  /** Optional per-file error message. */
  error?: string;
}

export interface FileUploadProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Controlled list of upload items. @default undefined */
  value?: FileUploadItem[];
  /** Initial list of upload items when uncontrolled. @default [] */
  defaultValue?: FileUploadItem[];
  /** Callback fired whenever the list of upload items changes. */
  onChange?: (items: FileUploadItem[]) => void;
  /** Callback fired when new valid files are dropped or selected. */
  onFilesAdded?: (files: File[]) => void;
  /** Callback fired when a file item is removed. */
  onRemove?: (item: FileUploadItem) => void;
  /** Accepted file types (standard `<input accept>` string). */
  accept?: string;
  /** Allow selecting or dropping multiple files. @default true */
  multiple?: boolean;
  /** Maximum allowed size per file in bytes. @default undefined */
  maxSize?: number;
  /** Maximum number of files allowed in the list. @default undefined */
  maxFiles?: number;
  /** Disables drag-and-drop, file selection, and removal. @default false */
  disabled?: boolean;
  /** Optional field label. */
  label?: string;
  /** Optional helper text rendered below the dropzone. */
  description?: string;
  /** Field-level validation error message. */
  error?: string;
  /** Primary prompt text inside the dropzone. @default 'Drop files here or click to browse' */
  dropzoneLabel?: string;
  /** Secondary hint text inside the dropzone. */
  dropzoneHint?: string;
}

function formatBytes(bytes: number): string {
  if (bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const exp = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** exp;
  return `${value >= 10 || exp === 0 ? Math.round(value) : value.toFixed(1)} ${units[exp]}`;
}

/**
 * Drag-and-drop file upload dropzone with file validation, per-file progress bars, and status indicators.
 *
 * @example
 * ```tsx
 * <FileUpload
 *   label="Attachments"
 *   accept="image/*,.pdf"
 *   maxSize={5 * 1024 * 1024}
 *   defaultValue={[
 *     { id: '1', name: 'report.pdf', size: 245760, progress: 65, status: 'uploading' },
 *     { id: '2', name: 'avatar.png', size: 84210, progress: 100, status: 'completed' },
 *   ]}
 * />
 * ```
 */
export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      value: controlledValue,
      defaultValue = [],
      onChange,
      onFilesAdded,
      onRemove,
      accept,
      multiple = true,
      maxSize,
      maxFiles,
      disabled = false,
      label,
      description,
      error,
      dropzoneLabel = 'Drop files here or click to browse',
      dropzoneHint,
      className,
      id: providedId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = providedId ?? `file-upload-${generatedId}`;
    const inputRef = useRef<HTMLInputElement>(null);

    const [uncontrolledItems, setUncontrolledItems] = useState<FileUploadItem[]>(defaultValue);
    const [isDragging, setIsDragging] = useState(false);

    const isControlled = controlledValue !== undefined;
    const items = isControlled ? controlledValue : uncontrolledItems;

    const updateItems = useCallback(
      (next: FileUploadItem[]) => {
        if (!isControlled) {
          setUncontrolledItems(next);
        }
        onChange?.(next);
      },
      [isControlled, onChange]
    );

    const processFiles = useCallback(
      (fileList: FileList | File[]) => {
        if (disabled) return;
        const incoming = Array.from(fileList);
        if (incoming.length === 0) return;

        const remainingSlots =
          maxFiles !== undefined ? Math.max(0, maxFiles - items.length) : incoming.length;
        const sliced = multiple ? incoming.slice(0, remainingSlots) : incoming.slice(0, 1);
        if (sliced.length === 0) return;

        const newItems: FileUploadItem[] = sliced.map((file, idx) => {
          const tooLarge = maxSize !== undefined && file.size > maxSize;
          return {
            id: `${file.name}-${file.size}-${Date.now()}-${idx}`,
            file,
            name: file.name,
            size: file.size,
            type: file.type,
            progress: 0,
            status: tooLarge ? 'error' : 'pending',
            error: tooLarge && maxSize !== undefined ? `Exceeds maximum size (${formatBytes(maxSize)})` : undefined
          };
        });

        const nextItems = multiple ? [...items, ...newItems] : newItems;
        updateItems(nextItems);
        onFilesAdded?.(sliced);
      },
      [disabled, items, maxFiles, maxSize, multiple, onFilesAdded, updateItems]
    );

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        processFiles(e.target.files);
        e.target.value = '';
      }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!disabled && !isDragging) {
        setIsDragging(true);
      }
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
        setIsDragging(false);
      }
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      if (e.dataTransfer.files?.length) {
        processFiles(e.dataTransfer.files);
      }
    };

    const handleDropzoneKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        inputRef.current?.click();
      }
    };

    const handleRemove = (item: FileUploadItem) => {
      if (disabled) return;
      const next = items.filter((entry) => entry.id !== item.id);
      updateItems(next);
      onRemove?.(item);
    };

    const atLimit = maxFiles !== undefined && items.length >= maxFiles;

    return (
      <div ref={ref} data-slot="file-upload" className={cn('flex flex-col gap-2 w-full', className)} {...props}>
        {label && (
          <label
            htmlFor={inputId}
            data-slot="file-upload-label"
            className="text-sm font-medium text-foreground select-none"
          >
            {label}
          </label>
        )}

        <div
          role="button"
          tabIndex={disabled || atLimit ? -1 : 0}
          aria-disabled={disabled || atLimit || undefined}
          data-slot="file-upload-dropzone"
          data-dragging={isDragging ? 'true' : undefined}
          onClick={() => {
            if (!disabled && !atLimit) inputRef.current?.click();
          }}
          onKeyDown={handleDropzoneKeyDown}
          onDragEnter={handleDragOver}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            'flex flex-col items-center justify-center gap-2 ds-rounded-lg border-2 border-dashed border-border bg-card/50 px-6 py-8 text-center transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
            isDragging && 'border-primary bg-primary/5',
            error && 'border-destructive',
            (disabled || atLimit) && 'opacity-50 cursor-not-allowed'
          )}
        >
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept={accept}
            multiple={multiple}
            disabled={disabled || atLimit}
            onChange={handleInputChange}
            className="sr-only"
          />
          <div className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <FiUploadCloud className="size-5" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">{dropzoneLabel}</p>
            {(dropzoneHint || maxSize) && (
              <p className="text-xs text-muted-foreground">
                {dropzoneHint ?? (maxSize ? `Maximum file size: ${formatBytes(maxSize)}` : null)}
              </p>
            )}
          </div>
        </div>

        {items.length > 0 && (
          <ul data-slot="file-upload-list" className="flex flex-col gap-2">
            {items.map((item) => {
              const status = item.status ?? 'pending';
              const progress = Math.min(100, Math.max(0, item.progress ?? (status === 'completed' ? 100 : 0)));

              return (
                <li
                  key={item.id}
                  data-slot="file-upload-item"
                  data-status={status}
                  className={cn(
                    'flex flex-col gap-2 ds-rounded-md border border-border bg-card p-3',
                    status === 'error' && 'border-destructive/60 bg-destructive/5'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="shrink-0 text-muted-foreground">
                      {status === 'completed' ? (
                        <FiCheckCircle className="size-4 text-primary" aria-hidden="true" />
                      ) : status === 'error' ? (
                        <FiAlertCircle className="size-4 text-destructive" aria-hidden="true" />
                      ) : (
                        <FiFile className="size-4" aria-hidden="true" />
                      )}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatBytes(item.size)}
                        {item.error ? ` • ${item.error}` : status === 'uploading' ? ` • ${progress}%` : ''}
                      </p>
                    </div>
                    {!disabled && (
                      <button
                        type="button"
                        aria-label={`Remove ${item.name}`}
                        data-slot="file-upload-remove"
                        onClick={() => handleRemove(item)}
                        className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                      >
                        <FiX className="size-4" aria-hidden="true" />
                      </button>
                    )}
                  </div>

                  {(status === 'uploading' || status === 'completed') && (
                    <div
                      role="progressbar"
                      aria-label={`${item.name} upload progress`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={progress}
                      data-slot="file-upload-progress"
                      className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
                    >
                      <div
                        className="h-full bg-primary transition-all duration-200"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {error ? (
          <p data-slot="file-upload-error" className="text-xs text-destructive">
            {error}
          </p>
        ) : description ? (
          <p data-slot="file-upload-description" className="text-xs text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';
