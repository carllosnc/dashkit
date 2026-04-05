import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ScrollArea } from './ScrollArea';

describe('ScrollArea', () => {
  it('renders children correctly', () => {
    render(
      <ScrollArea>
        <div data-testid="scroll-content">Scrollable Content</div>
      </ScrollArea>
    );

    expect(screen.getByTestId('scroll-content')).toBeInTheDocument();
    expect(screen.getByText('Scrollable Content')).toBeInTheDocument();
  });

  it('applies vertical overflow by default', () => {
    const { container } = render(
      <ScrollArea>
        <div>Content</div>
      </ScrollArea>
    );

    const root = container.firstChild as HTMLElement;
    const viewport = root.firstChild as HTMLElement;
    expect(viewport).toHaveClass('overflow-y-auto');
    expect(viewport).toHaveClass('overflow-x-hidden');
  });

  it('applies horizontal overflow when orientation is horizontal', () => {
    const { container } = render(
      <ScrollArea orientation="horizontal">
        <div>Content</div>
      </ScrollArea>
    );

    const root = container.firstChild as HTMLElement;
    const viewport = root.firstChild as HTMLElement;
    expect(viewport).toHaveClass('overflow-x-auto');
    expect(viewport).toHaveClass('overflow-y-hidden');
  });

  it('applies both overflow when orientation is both', () => {
    const { container } = render(
      <ScrollArea orientation="both">
        <div>Content</div>
      </ScrollArea>
    );

    const root = container.firstChild as HTMLElement;
    const viewport = root.firstChild as HTMLElement;
    expect(viewport).toHaveClass('overflow-auto');
  });

  it('applies custom className and viewportClassName', () => {
    const { container } = render(
      <ScrollArea className="custom-root" viewportClassName="custom-viewport">
        <div>Content</div>
      </ScrollArea>
    );

    const root = container.firstChild as HTMLElement;
    const viewport = root.firstChild as HTMLElement;

    expect(root).toHaveClass('custom-root');
    expect(viewport).toHaveClass('custom-viewport');
  });
});
