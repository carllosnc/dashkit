import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './index';
import { describe, it, expect } from 'vitest';

describe('Card', () => {
  it('renders card with header, content and footer', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>Card Content</CardContent>
        <CardFooter>Card Footer</CardFooter>
      </Card>
    );

    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Description')).toBeInTheDocument();
    expect(screen.getByText('Card Content')).toBeInTheDocument();
    expect(screen.getByText('Card Footer')).toBeInTheDocument();
  });

  it('defaults to unshadowed and applies border and shadow management correctly', () => {
    const { unmount } = render(<Card>Default Content</Card>);
    const defaultCard = screen.getByText('Default Content');
    expect(defaultCard).toHaveClass('card--no-shadow');
    expect(defaultCard).toHaveClass('shadow-none');
    expect(defaultCard).not.toHaveClass('card--shadowed');
    expect(defaultCard).not.toHaveClass('shadow-sm');
    unmount();

    render(<Card bordered={false} shadowed={false}>Content</Card>);
    const card = screen.getByText('Content');
    expect(card).toHaveClass('card--no-border');
    expect(card).toHaveClass('card--no-shadow');
    expect(card).toHaveClass('shadow-none');
  });

  it('applies shadow when shadowed prop is true', () => {
    render(<Card shadowed>Shadowed Content</Card>);
    const card = screen.getByText('Shadowed Content');
    expect(card).toHaveClass('card--shadowed');
    expect(card).toHaveClass('shadow-sm');
  });

  it('renders left icon in header', () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>;
    render(
      <CardHeader leftIcon={<TestIcon />}>
        <CardTitle>Title</CardTitle>
      </CardHeader>
    );
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });
});
