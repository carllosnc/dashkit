import { render, screen } from '@testing-library/react';
import { Surface } from './Surface';

describe('Surface', () => {
  it('renders children', () => {
    render(<Surface>Test content</Surface>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    const { container } = render(<Surface variant="success">Success area</Surface>);
    expect(container.firstChild).toHaveClass('surface--success');
  });
});
