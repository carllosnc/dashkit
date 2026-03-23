import { render, screen } from '@testing-library/react';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator } from './Breadcrumb';
import { FiHome } from 'react-icons/fi';
import { describe, it, expect } from 'vitest';

describe('Breadcrumb', () => {
  it('renders breadcrumb items correctly with composition', () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem active>Dashboard</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders icons when passed as children', () => {
    render(
      <BreadcrumbItem href="/">
        <FiHome data-testid="home-icon" /> Home
      </BreadcrumbItem>
    );
    expect(screen.getByTestId('home-icon')).toBeInTheDocument();
  });

  it('renders link when href is provided', () => {
    render(<BreadcrumbItem href="/docs">Docs</BreadcrumbItem>);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/docs');
  });

  it('applies active styling to the active item', () => {
    render(<BreadcrumbItem active>Current Page</BreadcrumbItem>);
    const item = screen.getByText('Current Page');
    expect(item).toHaveClass('text-neutral-900');
  });

  it('renders a custom separator', () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbSeparator data-testid="custom-sep">/</BreadcrumbSeparator>
          <BreadcrumbItem active>Dashboard</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
    expect(screen.getByTestId('custom-sep')).toHaveTextContent('/');
  });
});
