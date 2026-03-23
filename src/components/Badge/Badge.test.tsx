import { render, screen } from '@testing-library/react';
import { Badge, FloatBadge } from './Badge';

describe('Badge', () => {
  it('renders content correctly', () => {
    render(<Badge content="New" />);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders numeric content correctly', () => {
    render(<Badge content={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('limits numeric content with max prop', () => {
    render(<Badge content={150} max={99} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('renders a dot instead of content when dot prop is true', () => {
    render(<Badge content="99" dot />);
    expect(screen.queryByText('99')).not.toBeInTheDocument();
    // Dot badges have specific dimensions
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('w-2.5', 'h-2.5', 'rounded-full');
  });

  it('shows pulse animation when pulse prop is true', () => {
    const { container } = render(<Badge content="Live" pulse />);
    const ping = container.querySelector('.animate-ping');
    expect(ping).toBeInTheDocument();
  });

  it('applies color styles correctly', () => {
    const { rerender } = render(<Badge content="Test" color="success" />);
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('bg-emerald-500');

    rerender(<Badge content="Test" color="error" />);
    expect(screen.getByTestId('badge')).toHaveClass('bg-red-500');
  });

  it('hides the badge when show prop is false', () => {
    render(<Badge content="Hidden" show={false} />);
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });
});

describe('FloatBadge', () => {
  it('renders children and the badge', () => {
    render(
      <FloatBadge content="5">
        <button>Notifications</button>
      </FloatBadge>
    );
    expect(screen.getByRole('button', { name: /notifications/i })).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('applies correct position classes', () => {
    const { rerender } = render(
      <FloatBadge content="dot" dot position="top-right">
        <div>Box</div>
      </FloatBadge>
    );
    let container = screen.getByText('Box').nextElementSibling;
    expect(container).toHaveClass('top-0', 'right-0');

    rerender(
      <FloatBadge content="dot" dot position="bottom-left">
        <div>Box</div>
      </FloatBadge>
    );
    container = screen.getByText('Box').nextElementSibling;
    expect(container).toHaveClass('bottom-0', 'left-0');
  });

  it('applies custom offset via style', () => {
    render(
      <FloatBadge content={1} offset={[10, 20]}>
        <div>Box</div>
      </FloatBadge>
    );
    const container = screen.getByText('Box').nextElementSibling as HTMLElement;
    expect(container.style.marginTop).toBe('20px');
    expect(container.style.marginRight).toBe('-10px');
  });
});


