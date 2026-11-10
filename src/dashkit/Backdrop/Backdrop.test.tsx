import { render, screen, fireEvent } from '@testing-library/react';
import { Backdrop } from './Backdrop';
import { describe, it, expect, vi } from 'vitest';

describe('Backdrop', () => {
  it('does not render when show is false', () => {
    const { container } = render(<Backdrop show={false} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders a fixed container and an absolute overlay by default', () => {
    render(<Backdrop show={true} />);
    const wrapper = screen.getByTestId('backdrop-root');
    const overlay = screen.getByTestId('backdrop-overlay');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass('fixed');
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveClass('bg-ds-950/40');
    expect(overlay).toHaveClass('backdrop-blur-sm');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Backdrop show={true} onClick={handleClick} />);
    const overlay = screen.getByTestId('backdrop-overlay');
    fireEvent.click(overlay);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders children as siblings of the overlay (not inside it)', () => {
    render(
      <Backdrop show={true}>
        <div data-testid="child">Centered Content</div>
      </Backdrop>
    );
    const overlay = screen.getByTestId('backdrop-overlay');
    const child = screen.getByTestId('child');
    expect(overlay).toBeInTheDocument();
    expect(child).toBeInTheDocument();
    expect(overlay).not.toContainElement(child);
  });

  it('supports non-fixed positioning by using absolute container', () => {
    render(<Backdrop show={true} fixed={false}>Content</Backdrop>);
    const wrapper = screen.getByTestId('backdrop-root');
    expect(wrapper).toHaveClass('absolute');
  });

  it('just returns overlay if not fixed and no children', () => {
    const { container } = render(<Backdrop show={true} fixed={false} />);
    const overlay = container.firstChild as HTMLElement;
    expect(overlay).toHaveAttribute('data-testid', 'backdrop-overlay');
  });
});
