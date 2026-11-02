import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Surface, type SurfaceVariant } from './Surface';

describe('Surface', () => {
  it('renders children', () => {
    render(<Surface>Test content</Surface>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies default variant class', () => {
    const { container } = render(<Surface>Default surface</Surface>);
    expect(container.firstChild).toHaveClass('surface');
    expect(container.firstChild).toHaveClass('surface--default');
  });

  const variants: SurfaceVariant[] = ['default', 'info', 'success', 'warning', 'danger'];

  variants.forEach((variant) => {
    it(`applies variant class surface--${variant}`, () => {
      const { container } = render(<Surface variant={variant}>Content</Surface>);
      expect(container.firstChild).toHaveClass(`surface--${variant}`);
    });
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Surface ref={ref}>Ref test</Surface>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('merges additional classNames', () => {
    const { container } = render(<Surface className="custom-class">Custom</Surface>);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
