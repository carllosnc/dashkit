import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
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

  it('applies shadow and border classes based on props', () => {
    const { rerender } = render(<Card bordered={false} shadowed={false}>No shadow/border</Card>);
    let card = screen.getByText('No shadow/border');
    expect(card).toHaveClass('border-none');
    expect(card).toHaveClass('shadow-none');

    rerender(<Card bordered shadowed>With shadow/border</Card>);
    card = screen.getByText('With shadow/border');
    expect(card).not.toHaveClass('border-none');
    expect(card).not.toHaveClass('shadow-none');
  });

  it('renders extra content in CardHeader', () => {
    render(
      <CardHeader extra={<button data-testid="extra-btn">Action</button>}>
        Title
      </CardHeader>
    );
    expect(screen.getByTestId('extra-btn')).toBeInTheDocument();
  });
});
