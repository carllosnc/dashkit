import { render, screen, act, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ToastProvider } from './Toast';
import { toast, resetToasts } from './useToast';
import type { ReactNode } from 'react';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, onClick, className, animate }: { children: ReactNode, onClick?: () => void, className?: string, animate?: Record<string, unknown> }) => (
      <div onClick={onClick} className={className} data-animate={JSON.stringify(animate)}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

describe('Toast Component', () => {
  beforeEach(() => {
    resetToasts();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders children correctly', () => {
    render(
      <ToastProvider>
        <div data-testid="child">App Content</div>
      </ToastProvider>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('displays a toast when toast() is called', async () => {
    render(
      <ToastProvider>
        <div>App Content</div>
      </ToastProvider>
    );

    act(() => {
      toast({ title: 'Success!', description: 'Operation completed.' });
    });

    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByText('Operation completed.')).toBeInTheDocument();
  });

  it('shows multiple toasts up to the limit (5)', () => {
    render(
      <ToastProvider>
        <div>App Content</div>
      </ToastProvider>
    );

    act(() => {
      toast({ title: 'Toast 1' });
      toast({ title: 'Toast 2' });
      toast({ title: 'Toast 3' });
      toast({ title: 'Toast 4' });
      toast({ title: 'Toast 5' });
      toast({ title: 'Toast 6' });
    });

    // Should only show the latest 5 because of .slice(0, 5) in useToast.ts
    // Wait, useToast has currentToasts = [newToast, ...currentToasts].slice(0, 5)
    // So it keeps the newest ones.
    expect(screen.queryByText('Toast 1')).not.toBeInTheDocument();
    expect(screen.getByText('Toast 2')).toBeInTheDocument();
    expect(screen.getByText('Toast 6')).toBeInTheDocument();
  });

  it('auto-dismisses after duration', () => {
    render(
      <ToastProvider>
        <div>App Content</div>
      </ToastProvider>
    );

    act(() => {
      toast({ title: 'Expire me', duration: 1000 });
    });

    expect(screen.getByText('Expire me')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(1100);
    });

    expect(screen.queryByText('Expire me')).not.toBeInTheDocument();
  });

  it('allows manual dismissal via close button', () => {
    render(
      <ToastProvider>
        <div>App Content</div>
      </ToastProvider>
    );

    act(() => {
      toast({ title: 'Dismiss me' });
    });

    const closeButton = screen.getByRole('button');
    act(() => {
      fireEvent.click(closeButton);
    });

    expect(screen.queryByText('Dismiss me')).not.toBeInTheDocument();
  });

  it('supports different toast types (success, error, etc.)', () => {
    render(
      <ToastProvider>
        <div>App Content</div>
      </ToastProvider>
    );

    act(() => {
      toast({ title: 'Success', type: 'success' });
      toast({ title: 'Error', type: 'error' });
    });

    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
    
    // Check if icons are rendered (Lucide icons are mocked or just rendered as ReactNode)
    // We can check the DOM for the icons or just trust they are there.
  });

  it('supports custom positioning', () => {
    render(
      <ToastProvider position="top-left">
        <div>App Content</div>
      </ToastProvider>
    );

    act(() => {
      toast({ title: 'Top Left' });
    });

    const container = screen.getByText('Top Left').closest('.fixed');
    expect(container).toHaveClass('top-8 left-8');

    // Default was bottom-right in previous tests
  });
});


