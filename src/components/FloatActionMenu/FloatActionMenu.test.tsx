import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FloatActionMenu } from './FloatActionMenu';
import { FiPlus } from 'react-icons/fi';
import { describe, it, expect, vi } from 'vitest';
import type { ReactNode } from 'react';

// Mock framer-motion because it uses features that might be tricky in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, onClick, className }: { children: ReactNode, onClick?: () => void, className?: string }) => (
      <div onClick={onClick} className={className}>{children}</div>
    ),
    button: ({ children, onClick, className }: { children: ReactNode, onClick?: () => void, className?: string }) => (
      <button onClick={onClick} className={className}>{children}</button>
    ),
  },
  AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

describe('FloatActionMenu', () => {
  it('renders the floating action button with label and icon', () => {
    render(
      <FloatActionMenu label="Actions" icon={<FiPlus />}>
        <div>Menu Content</div>
      </FloatActionMenu>
    );

    expect(screen.getByText('Actions')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.queryByText('Menu Content')).not.toBeInTheDocument();
  });

  it('opens the menu when the button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <FloatActionMenu label="Actions" icon={<FiPlus />}>
        <div>Menu Content</div>
      </FloatActionMenu>
    );

    const button = screen.getByRole('button');
    await user.click(button);

    // After animation or state change, menu content should be visible
    expect(screen.getByText('Menu Content')).toBeInTheDocument();
    // Header label should also be visible in the menu card
    expect(screen.getByRole('heading', { name: /Actions/i })).toBeInTheDocument();
  });

  it('closes the menu when the close button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <FloatActionMenu label="Actions" icon={<FiPlus />}>
        <div>Menu Content</div>
      </FloatActionMenu>
    );

    // Open menu
    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Menu Content')).toBeInTheDocument();

    // Close menu using the close button (IconButton)
    const closeButton = screen.getAllByRole('button')[1]; // The first is the FAB, second is the close button
    await user.click(closeButton);

    // Menu content should no longer be visible (AnimatePresence might keep it for a bit, but JSDOM is instant)
    expect(screen.queryByText('Menu Content')).not.toBeInTheDocument();
  });

  it('closes the menu when Escape key is pressed', async () => {
    const user = userEvent.setup();
    render(
      <FloatActionMenu label="Actions" icon={<FiPlus />}>
        <div>Menu Content</div>
      </FloatActionMenu>
    );

    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Menu Content')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });
    
    expect(screen.queryByText('Menu Content')).not.toBeInTheDocument();
  });

  it('applies custom buttonClassName', () => {
    render(
      <FloatActionMenu 
        label="Actions" 
        icon={<FiPlus />} 
        buttonClassName="custom-btn-class"
      >
        <div>Content</div>
      </FloatActionMenu>
    );
    
    expect(screen.getByRole('button')).toHaveClass('custom-btn-class');
  });
});
