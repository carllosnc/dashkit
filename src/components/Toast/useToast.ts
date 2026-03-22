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
}

export type ToastData = ToastOptions & { 
  id: string; 
  type: ToastType; 
  position: ToastPosition 
};

let toastCount = 0;
const observers = new Set<(toasts: ToastData[]) => void>();
let currentToasts: ToastData[] = [];

const notify = () => {
  const toasts = [...currentToasts];
  observers.forEach(fn => fn(toasts));
};

export const removeToast = (id: string) => {
  currentToasts = currentToasts.filter(t => t.id !== id);
  notify();
};

export function useToast() {
  const [toasts, setToasts] = React.useState<ToastData[]>([]);

  React.useEffect(() => {
    // Sync initial state on mount to avoid hydration mismatch while keeping state
    setToasts([...currentToasts]);
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
  const newToast: ToastData = { 
    ...options, 
    id, 
    type: options.type || 'default',
    position: options.position || defaultPosition
  };
  
  currentToasts = [newToast, ...currentToasts].slice(0, 5); // Max 5 toasts
  notify();

  if (options.duration !== 0) {
    setTimeout(() => removeToast(id), options.duration || 5000);
  }
  return id;
};

export const resetToasts = () => {
  currentToasts = [];
  toastCount = 0;
  notify();
};


