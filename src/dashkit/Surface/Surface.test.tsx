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
    expect(container.firstChild).toHaveClass('ds-rounded-md');
    expect(container.firstChild).toHaveClass('bg-muted/50');
  });

  const variantClassMap: Record<SurfaceVariant, string> = {
    default: 'bg-muted/50',
    info: 'bg-info/10',
    success: 'bg-success/10',
    warning: 'bg-warning/12',
    danger: 'bg-danger/10',
  };

  (Object.keys(variantClassMap) as SurfaceVariant[]).forEach((variant) => {
    it(`applies variant class for ${variant}`, () => {
      const { container } = render(<Surface variant={variant}>Content</Surface>);
      expect(container.firstChild).toHaveClass(variantClassMap[variant]);
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
