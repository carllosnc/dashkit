import * as React from 'react';

// Global state for Toasts
export type ToastType = 'default' | 'success' | 'info' | 'error' | 'warning';

export type ToastPosition = 
  | 'top-left' 
  | 'top-right' 
  | 'top-center' 
  | 'bottom-left' 
  | 'bottom-right' 
  | 'bottom-center';

export interface ToastOptions {
  id?: string;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  type?: ToastType;
  duration?: number;
  position?: ToastPosition;
  invert?: boolean;
}

export type ToastData = ToastOptions & { 
  id: string; 
  type: ToastType; 
  position: ToastPosition 
};

let toastCount = 0;
const observers = new Set<(toasts: ToastData[]) => void>();
let currentToasts: ToastData[] = [];

interface ToastTimer {
  remaining: number;
  startedAt: number;
  handle: number | null;
}

const timers = new Map<string, ToastTimer>();

const notify = () => {
  const toasts = [...currentToasts];
  observers.forEach(fn => fn(toasts));
};

export const removeToast = (id: string) => {
  const entry = timers.get(id);
  if (entry && entry.handle !== null) window.clearTimeout(entry.handle);
  timers.delete(id);
  currentToasts = currentToasts.filter(t => t.id !== id);
  notify();
};

/** Freeze the auto-dismiss countdown (WCAG 2.2.2: paused on hover/focus). */
export const pauseToastTimer = (id: string) => {
  const entry = timers.get(id);
  if (!entry || entry.handle === null) return;
  window.clearTimeout(entry.handle);
  entry.remaining = Math.max(0, entry.remaining - (Date.now() - entry.startedAt));
  entry.handle = null;
};

/** Continue the countdown where it left off. */
export const resumeToastTimer = (id: string) => {
  const entry = timers.get(id);
  if (!entry || entry.handle !== null) return;
  if (entry.remaining <= 0) {
    timers.delete(id);
    removeToast(id);
    return;
  }
  entry.startedAt = Date.now();
  entry.handle = window.setTimeout(() => removeToast(id), entry.remaining);
};

export function useToast() {
  const [toasts, setToasts] = React.useState<ToastData[]>(currentToasts);

  React.useEffect(() => {
    observers.add(setToasts);
    return () => { 
      observers.delete(setToasts); 
    };
  }, []);

  return { toasts, toast, removeToast };
}

let defaultPosition: ToastPosition = 'bottom-right';

export const setToastDefaultPosition = (position: ToastPosition) => {
  defaultPosition = position;
};

export const toast = (options: ToastOptions) => {
  const id = options.id || `toast-${toastCount++}`;
  const type = options.type || 'default';
  const newToast: ToastData = { 
    ...options, 
    id, 
    type,
    position: options.position || defaultPosition
  };
  
  currentToasts = [newToast, ...currentToasts].slice(0, 5); // Max 5 toasts
  notify();

  // Errors stay until dismissed; every other toast auto-dismisses.
  const duration = type === 'error' ? 0 : options.duration ?? 5000;
  if (duration > 0) {
    timers.set(id, {
      remaining: duration,
      startedAt: Date.now(),
      handle: window.setTimeout(() => removeToast(id), duration)
    });
  }
  return id;
};

export const resetToasts = () => {
  timers.forEach((entry) => {
    if (entry.handle !== null) window.clearTimeout(entry.handle);
  });
  timers.clear();
  currentToasts = [];
  toastCount = 0;
  notify();
};


