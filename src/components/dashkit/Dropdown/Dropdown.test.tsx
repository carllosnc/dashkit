import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { 
  Dropdown, 
  DropdownTrigger, 
  DropdownContent, 
  DropdownItem, 
  DropdownLabel, 
  DropdownSeparator 
} from './Dropdown';
import type { ReactNode } from 'react';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, onClick, className }: { children: ReactNode, onClick?: () => void, className?: string }) => (
      <div onClick={onClick} className={className} data-testid="motion-div">{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

describe('Dropdown Component', () => {
  it('toggles visibility on trigger click', () => {
    render(
      <Dropdown>
        <DropdownTrigger>Open</DropdownTrigger>
        <DropdownContent>
          <div>Menu content</div>
        </DropdownContent>
      </Dropdown>
    );

    expect(screen.queryByText('Menu content')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Open'));
    expect(screen.getByText('Menu content')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Open'));
    expect(screen.queryByText('Menu content')).not.toBeInTheDocument();
  });

  it('closes when an item is clicked', () => {
    const onItemClick = vi.fn();
    render(
      <Dropdown>
        <DropdownTrigger>Open</DropdownTrigger>
        <DropdownContent>
          <DropdownItem onClick={onItemClick}>Item 1</DropdownItem>
        </DropdownContent>
      </Dropdown>
    );

    fireEvent.click(screen.getByText('Open'));
    fireEvent.click(screen.getByText('Item 1'));

    expect(onItemClick).toHaveBeenCalled();
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
  });

  it('does not close or call onClick when a disabled item is clicked', () => {
    const onItemClick = vi.fn();
    render(
      <Dropdown>
        <DropdownTrigger>Open</DropdownTrigger>
        <DropdownContent>
          <DropdownItem onClick={onItemClick} disabled>Disabled Item</DropdownItem>
        </DropdownContent>
      </Dropdown>
    );

    fireEvent.click(screen.getByText('Open'));
    fireEvent.click(screen.getByText('Disabled Item'));

    expect(onItemClick).not.toHaveBeenCalled();
    expect(screen.getByText('Disabled Item')).toBeInTheDocument();
  });

  it('closes when clicking outside', () => {
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <Dropdown>
          <DropdownTrigger>Open</DropdownTrigger>
          <DropdownContent>
            <div>Menu content</div>
          </DropdownContent>
        </Dropdown>
      </div>
    );

    fireEvent.click(screen.getByText('Open'));
    expect(screen.getByText('Menu content')).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(screen.queryByText('Menu content')).not.toBeInTheDocument();
  });

  it('closes when pressing Escape key', () => {
    render(
      <Dropdown>
        <DropdownTrigger>Open</DropdownTrigger>
        <DropdownContent>
          <div>Menu content</div>
        </DropdownContent>
      </Dropdown>
    );

    fireEvent.click(screen.getByText('Open'));
    expect(screen.getByText('Menu content')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByText('Menu content')).not.toBeInTheDocument();
  });

  it('supports asChild for the trigger', () => {
    render(
      <Dropdown>
        <DropdownTrigger asChild>
          <button>Custom Button</button>
        </DropdownTrigger>
        <DropdownContent>
          <div>Menu content</div>
        </DropdownContent>
      </Dropdown>
    );

    const button = screen.getByRole('button', { name: 'Custom Button' });
    fireEvent.click(button);
    expect(screen.getByText('Menu content')).toBeInTheDocument();
  });

  it('renders labels and separators', () => {
    render(
      <Dropdown>
        <DropdownTrigger>Open</DropdownTrigger>
        <DropdownContent>
          <DropdownLabel>Section Label</DropdownLabel>
          <DropdownSeparator />
          <DropdownItem>Item</DropdownItem>
        </DropdownContent>
      </Dropdown>
    );

    fireEvent.click(screen.getByText('Open'));
    expect(screen.getByText('Section Label')).toBeInTheDocument();
  });

  it('renders selected state with check icon', () => {
    render(
      <Dropdown>
        <DropdownTrigger>Open</DropdownTrigger>
        <DropdownContent>
          <DropdownItem selected>Selected Item</DropdownItem>
        </DropdownContent>
      </Dropdown>
    );

    fireEvent.click(screen.getByText('Open'));
    expect(screen.getByText('Selected Item')).toBeInTheDocument();
    // The check icon (FiCheck) should be there.
  });
});


