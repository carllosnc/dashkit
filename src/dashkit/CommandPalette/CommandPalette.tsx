import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode
} from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import { cn } from '../utils/cn';
import { getPortalThemeAttrs } from '../utils/portalTheme';
import { lockBodyScroll } from '../utils/scrollLock';
import { useFocusTrap } from '../utils/useFocusTrap';

export interface CommandPaletteItem {
  /** Unique identifier for the command. */
  id: string;
  /** Primary display label. */
  label: string;
  /** Optional secondary description shown below the label. */
  description?: string;
  /** Optional group heading for categorizing commands. */
  group?: string;
  /** Extra search keywords matched during filtering. */
  keywords?: string[];
  /** Keyboard shortcut keys displayed on the right (e.g. `"⌘K"` or `["⌘", "P"]`). */
  shortcut?: string | string[];
  /** Leading icon element. */
  icon?: ReactNode;
  /** Disables selection and keyboard navigation for this item. @default false */
  disabled?: boolean;
  /** Item-specific callback invoked when selected. */
  onSelect?: (item: CommandPaletteItem) => void;
}

export interface CommandPaletteProps {
  /** Controlled open state. @default undefined */
  open?: boolean;
  /** Initial open state when uncontrolled. @default false */
  defaultOpen?: boolean;
  /** Callback fired when the open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** List of searchable command items. */
  items: CommandPaletteItem[];
  /** Global callback fired when any enabled item is selected. */
  onSelect?: (item: CommandPaletteItem) => void;
  /** Search input placeholder text. @default 'Type a command or search...' */
  placeholder?: string;
  /** Message displayed when no items match the search query. @default 'No results found.' */
  emptyMessage?: string;
  /** Enables global `Cmd+K` / `Ctrl+K` shortcut to toggle the palette. @default true */
  enableShortcut?: boolean;
  /** Closes the palette automatically after an item is selected. @default true */
  closeOnSelect?: boolean;
  /** Optional footer bar content (e.g. keyboard hints). */
  footer?: ReactNode;
  /** Additional classes for the palette dialog surface. */
  className?: string;
}

function matchesQuery(item: CommandPaletteItem, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  if (item.label.toLowerCase().includes(q)) return true;
  if (item.description?.toLowerCase().includes(q)) return true;
  if (item.group?.toLowerCase().includes(q)) return true;
  if (item.keywords?.some((kw) => kw.toLowerCase().includes(q))) return true;
  return false;
}

function renderShortcut(shortcut: string | string[]) {
  const keys = Array.isArray(shortcut) ? shortcut : [shortcut];
  return (
    <span data-slot="command-palette-shortcut" className="ml-auto flex items-center gap-1 shrink-0">
      {keys.map((key, idx) => (
        <kbd
          key={`${key}-${idx}`}
          className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-border bg-muted/60 px-1.5 font-mono text-[11px] font-medium text-muted-foreground"
        >
          {key}
        </kbd>
      ))}
    </span>
  );
}

/**
 * Prop-driven Command Palette (`Cmd+K` / `Ctrl+K`) overlay with fuzzy filtering, grouped actions, and full keyboard navigation.
 *
 * @example
 * ```tsx
 * <CommandPalette
 *   items={[
 *     { id: 'new-doc', label: 'Create Document', group: 'Actions', shortcut: ['⌘', 'N'], onSelect: () => {} },
 *     { id: 'settings', label: 'Open Settings', group: 'Navigation', shortcut: ['⌘', ','], onSelect: () => {} },
 *   ]}
 * />
 * ```
 */
export function CommandPalette({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  items,
  onSelect,
  placeholder = 'Type a command or search...',
  emptyMessage = 'No results found.',
  enableShortcut = true,
  closeOnSelect = true,
  footer,
  className
}: CommandPaletteProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const listboxId = useId();
  const panelRef = useFocusTrap<HTMLDivElement>(isOpen);
  const inputRef = useRef<HTMLInputElement>(null);

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(next);
      }
      if (!next) {
        setQuery('');
        setActiveIndex(-1);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  useEffect(() => {
    if (!isOpen) return;
    return lockBodyScroll();
  }, [isOpen]);

  useEffect(() => {
    if (!enableShortcut) return;

    const handleGlobalKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(!isOpen);
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [enableShortcut, isOpen, setOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, setOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const frame = requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  const filteredItems = useMemo(() => items.filter((item) => matchesQuery(item, query)), [items, query]);

  const groupedSections = useMemo(() => {
    const groups = new Map<string, Array<{ item: CommandPaletteItem; flatIndex: number }>>();
    filteredItems.forEach((item, flatIndex) => {
      const groupName = item.group ?? '';
      const existing = groups.get(groupName) ?? [];
      existing.push({ item, flatIndex });
      groups.set(groupName, existing);
    });
    return Array.from(groups.entries());
  }, [filteredItems]);

  const resolvedActiveIndex = useMemo(() => {
    if (
      activeIndex >= 0 &&
      activeIndex < filteredItems.length &&
      !filteredItems[activeIndex]?.disabled
    ) {
      return activeIndex;
    }
    return filteredItems.findIndex((item) => !item.disabled);
  }, [activeIndex, filteredItems]);

  const moveActive = useCallback(
    (direction: 1 | -1) => {
      if (filteredItems.length === 0) return;
      const len = filteredItems.length;
      let next = resolvedActiveIndex < 0 ? (direction === 1 ? 0 : len - 1) : resolvedActiveIndex;

      for (let i = 0; i < len; i++) {
        next = (next + direction + len) % len;
        if (!filteredItems[next]?.disabled) {
          setActiveIndex(next);
          return;
        }
      }
    },
    [filteredItems, resolvedActiveIndex]
  );

  const selectItem = useCallback(
    (item: CommandPaletteItem) => {
      if (item.disabled) return;
      item.onSelect?.(item);
      onSelect?.(item);
      if (closeOnSelect) {
        setOpen(false);
      }
    },
    [closeOnSelect, onSelect, setOpen]
  );

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      moveActive(1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      moveActive(-1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      const first = filteredItems.findIndex((item) => !item.disabled);
      if (first !== -1) setActiveIndex(first);
    } else if (e.key === 'End') {
      e.preventDefault();
      for (let i = filteredItems.length - 1; i >= 0; i--) {
        if (!filteredItems[i].disabled) {
          setActiveIndex(i);
          break;
        }
      }
    } else if (e.key === 'Enter') {
      if (resolvedActiveIndex >= 0 && filteredItems[resolvedActiveIndex]) {
        e.preventDefault();
        selectItem(filteredItems[resolvedActiveIndex]);
      }
    }
  };

  if (typeof document === 'undefined') return null;

  const portalThemeAttrs = isOpen ? getPortalThemeAttrs() : {};
  const activeItem = resolvedActiveIndex >= 0 ? filteredItems[resolvedActiveIndex] : undefined;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          {...portalThemeAttrs}
          className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4"
        >
          <motion.div
            data-slot="command-palette-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            data-slot="command-palette"
            initial={{ opacity: 0, scale: 0.97, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className={cn(
              'relative z-10 w-full max-w-xl overflow-hidden ds-rounded-xl border border-border bg-popover text-popover-foreground shadow-2xl',
              className
            )}
          >
            <div
              data-slot="command-palette-input-wrapper"
              className="flex items-center gap-3 border-b border-border px-4 py-3"
            >
              <FiSearch className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                role="combobox"
                aria-expanded={true}
                aria-controls={listboxId}
                aria-activedescendant={activeItem ? `${listboxId}-option-${activeItem.id}` : undefined}
                aria-autocomplete="list"
                data-slot="command-palette-input"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(-1);
                }}
                onKeyDown={handleInputKeyDown}
                placeholder={placeholder}
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <kbd className="hidden sm:inline-flex h-5 items-center rounded border border-border bg-muted/60 px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                ESC
              </kbd>
            </div>

            <div
              id={listboxId}
              role="listbox"
              data-slot="command-palette-list"
              className="max-h-80 overflow-y-auto p-2 custom-scrollbar"
            >
              {filteredItems.length === 0 ? (
                <div
                  data-slot="command-palette-empty"
                  className="py-10 text-center text-sm text-muted-foreground"
                >
                  {emptyMessage}
                </div>
              ) : (
                groupedSections.map(([groupName, entries]) => (
                  <div key={groupName || '__ungrouped__'} data-slot="command-palette-group" className="mb-1 last:mb-0">
                    {groupName && (
                      <div className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {groupName}
                      </div>
                    )}
                    {entries.map(({ item, flatIndex }) => {
                      const isActive = flatIndex === resolvedActiveIndex;
                      return (
                        <button
                          key={item.id}
                          id={`${listboxId}-option-${item.id}`}
                          type="button"
                          role="option"
                          aria-selected={isActive}
                          aria-disabled={item.disabled || undefined}
                          disabled={item.disabled}
                          data-slot="command-palette-item"
                          data-active={isActive ? 'true' : undefined}
                          onMouseEnter={() => {
                            if (!item.disabled) setActiveIndex(flatIndex);
                          }}
                          onClick={() => selectItem(item)}
                          className={cn(
                            'flex w-full items-center gap-3 ds-rounded-md px-2.5 py-2 text-left text-sm transition-colors',
                            isActive
                              ? 'bg-primary/10 text-primary'
                              : 'text-foreground hover:bg-muted/60',
                            item.disabled && 'opacity-50 cursor-not-allowed'
                          )}
                        >
                          {item.icon && (
                            <span className="shrink-0 text-muted-foreground [&>svg]:size-4">
                              {item.icon}
                            </span>
                          )}
                          <span className="flex min-w-0 flex-1 flex-col">
                            <span className="truncate font-medium">{item.label}</span>
                            {item.description && (
                              <span className="truncate text-xs text-muted-foreground">
                                {item.description}
                              </span>
                            )}
                          </span>
                          {item.shortcut && renderShortcut(item.shortcut)}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {footer && (
              <div
                data-slot="command-palette-footer"
                className="flex items-center justify-between border-t border-border bg-muted/30 px-4 py-2 text-xs text-muted-foreground"
              >
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

CommandPalette.displayName = 'CommandPalette';
