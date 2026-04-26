import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem, 
  NavigationMenuTrigger, 
  NavigationMenuContent, 
  NavigationMenuViewport,
  NavigationMenuLink 
} from './index';
import type { ReactNode } from 'react';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, onClick, className }: { children: ReactNode, onClick?: () => void, className?: string }) => (
      <div onClick={onClick} className={className}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('NavigationMenu', () => {
  beforeAll(() => {
    window.ResizeObserver = ResizeObserver;
  });

  it('renders the navigation trigger and content opens on click', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger value="item-1">Item 1</NavigationMenuTrigger>
            <NavigationMenuContent value="item-1">
              <div data-testid="content-1">Content 1</div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuViewport />
      </NavigationMenu>
    );

    const trigger = screen.getByRole('button', { name: /item 1/i });
    expect(screen.queryByTestId('content-1')).not.toBeInTheDocument();

    fireEvent.click(trigger);

    expect(screen.getByTestId('content-1')).toBeInTheDocument();
  });

  it('closes content when clicking the same trigger again', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger value="item-1">Item 1</NavigationMenuTrigger>
            <NavigationMenuContent value="item-1">
              <div>Content 1</div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuViewport />
      </NavigationMenu>
    );

    const trigger = screen.getByRole('button', { name: /item 1/i });
    
    // First click opens
    fireEvent.click(trigger);
    expect(screen.getByText('Content 1')).toBeInTheDocument();

    // Second click closes
    fireEvent.click(trigger);
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  it('renders a navigation link correctly', () => {
    render(
      <NavigationMenu>
        <NavigationMenuLink href="/test">Test Link</NavigationMenuLink>
      </NavigationMenu>
    );

    const link = screen.getByRole('link', { name: /test link/i });
    expect(link).toHaveAttribute('href', '/test');
  });

  it('allows switching between different menu triggers', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger value="item-1">Item 1</NavigationMenuTrigger>
            <NavigationMenuContent value="item-1">
              <div data-testid="content-1">Content 1</div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger value="item-2">Item 2</NavigationMenuTrigger>
            <NavigationMenuContent value="item-2">
              <div data-testid="content-2">Content 2</div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuViewport />
      </NavigationMenu>
    );

    const trigger1 = screen.getByRole('button', { name: /item 1/i });
    const trigger2 = screen.getByRole('button', { name: /item 2/i });

    // Open first
    fireEvent.click(trigger1);
    expect(screen.getByTestId('content-1')).toBeInTheDocument();

    // Open second, first should be gone (or replaced in viewport)
    fireEvent.click(trigger2);
    expect(screen.queryByTestId('content-1')).not.toBeInTheDocument();
    expect(screen.getByTestId('content-2')).toBeInTheDocument();
  });
});
