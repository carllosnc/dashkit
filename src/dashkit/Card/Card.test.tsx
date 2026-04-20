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

  it('applies border and shadow management correctly', () => {
    render(<Card bordered={false} shadowed={false}>Content</Card>);
    const card = screen.getByText('Content');
    expect(card).toHaveClass('card--no-border');
    expect(card).toHaveClass('card--no-shadow');
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
