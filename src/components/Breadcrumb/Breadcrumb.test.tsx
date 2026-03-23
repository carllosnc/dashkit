import { render, screen } from '@testing-library/react';
import { Breadcrumb } from './Breadcrumb';
import { FiHome } from 'react-icons/fi';
import { describe, it, expect } from 'vitest';

describe('Breadcrumb', () => {
  const items = [
    { label: 'Home', href: '/', icon: <FiHome data-testid="home-icon" /> },
    { label: 'Components', href: '/docs' },
    { label: 'Breadcrumb', active: true }
  ];

  it('renders breadcrumb items correctly', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Components')).toBeInTheDocument();
    expect(screen.getByText('Breadcrumb')).toBeInTheDocument();
  });

  it('renders icons for items that have them', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByTestId('home-icon')).toBeInTheDocument();
  });

  it('renders links for non-last items with href', () => {
    render(<Breadcrumb items={items} />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', '/');
    expect(links[1]).toHaveAttribute('href', '/docs');
  });

  it('applies active styling to the last item', () => {
    render(<Breadcrumb items={items} />);
    const breadcrumb = screen.getByText('Breadcrumb');
    expect(breadcrumb).toHaveClass('text-neutral-900');
  });

  it('renders a custom separator', () => {
    render(<Breadcrumb items={items} separator={<span data-testid="custom-sep">/</span>} />);
    expect(screen.getAllByTestId('custom-sep')).toHaveLength(2);
  });
});
