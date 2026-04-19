import { render } from '@testing-library/react';
import { CircularProgress } from './CircularProgress';

describe('CircularProgress', () => {
  it('renders correctly', () => {
    const { container } = render(<CircularProgress value={50} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('shows value when showValue is true', () => {
    const { getByText } = render(<CircularProgress value={50} showValue />);
    expect(getByText('50%')).toBeInTheDocument();
  });
  
  it('respects the size property', () => {
    const { container } = render(<CircularProgress value={20} size={100} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '100');
    expect(svg).toHaveAttribute('height', '100');
  });
});
