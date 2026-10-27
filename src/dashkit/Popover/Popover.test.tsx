import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Popover, PopoverTrigger, PopoverContent } from './index';
import type { ReactNode, CSSProperties } from 'react';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, onClick, className, style }: { children: ReactNode, onClick?: () => void, className?: string, style?: CSSProperties }) => (
      <div onClick={onClick} className={className} style={style}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

describe('Popover', () => {
  it('renders trigger and opens content on click', async () => {
    render(
      <Popover>
        <PopoverTrigger>
          <button>Open Popover</button>
        </PopoverTrigger>
        <PopoverContent>
          <div data-testid="popover-content">Popover Content</div>
        </PopoverContent>
      </Popover>
    );

    const trigger = screen.getByRole('button', { name: /open popover/i });
    expect(screen.queryByTestId('popover-content')).not.toBeInTheDocument();

    fireEvent.click(trigger);

    expect(screen.getByTestId('popover-content')).toBeInTheDocument();
  });

  it('closes when clicking the trigger again', () => {
    render(
      <Popover>
        <PopoverTrigger>
          <button>Toggle Popover</button>
        </PopoverTrigger>
        <PopoverContent>
          <div>Content</div>
        </PopoverContent>
      </Popover>
    );

    const trigger = screen.getByRole('button', { name: /toggle popover/i });
    
    fireEvent.click(trigger);
    expect(screen.getByText('Content')).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('promotes a plain-text trigger to an accessible button without nesting', () => {
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>
          <div data-testid="popover-content">Popover Content</div>
        </PopoverContent>
      </Popover>
    );

    // Text child -> the wrapper itself becomes the accessible button.
    const trigger = screen.getByRole('button', { name: 'Open' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    fireEvent.keyDown(trigger, { key: 'Enter' });
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId('popover-content')).toBeInTheDocument();
  });
});
