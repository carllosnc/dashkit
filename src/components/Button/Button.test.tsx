import { render, screen } from '@testing-library/react';
import { Button } from './Button';
import { FiDownload } from 'react-icons/fi';

describe('Button', () => {
  it('renders the button with children', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByRole('button', { name: "Click Me" })).toBeInTheDocument();
  });

  it('renders a left icon when passed', () => {
    render(<Button leftIcon={<FiDownload data-testid="left-icon" />}>Download</Button>);
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders a right icon when passed', () => {
    render(<Button rightIcon={<FiDownload data-testid="right-icon" />}>Download</Button>);
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('applies standard variant by default', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-black');
    expect(button).toHaveClass('text-white');
  });

  it('applies outlined variant when passed', () => {
    render(<Button variant="outlined">Click Me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-transparent');
    expect(button).toHaveClass('border-neutral-400');
  });

  it('passes generic attributes to button element', () => {
    render(<Button disabled>Click Me</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('shows loading spinner and disables when loading state is enabled', () => {
    const { container } = render(<Button loading>Submit</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(container.querySelector('svg.animate-spin')).toBeInTheDocument();
  });
});
