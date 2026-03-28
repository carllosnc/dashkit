import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Popover, PopoverTrigger, PopoverContent } from './Popover';
import type { ReactNode } from 'react';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, onClick, className, style }: { children: ReactNode, onClick?: () => void, className?: string, style?: any }) => (
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
});
