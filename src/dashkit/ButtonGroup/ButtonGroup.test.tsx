import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ButtonGroup, ButtonGroupItem } from './ButtonGroup';

describe('ButtonGroup', () => {
  it('renders children correctly', () => {
    render(
      <ButtonGroup>
        <ButtonGroupItem>First</ButtonGroupItem>
        <ButtonGroupItem>Second</ButtonGroupItem>
      </ButtonGroup>
    );
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('applies correct classes for horizontal layout', () => {
    const { container } = render(
      <ButtonGroup>
        <ButtonGroupItem>First</ButtonGroupItem>
        <ButtonGroupItem>Last</ButtonGroupItem>
      </ButtonGroup>
    );

    const group = container.firstChild as HTMLElement;
    expect(group).toHaveClass('flex-row', '-space-x-px');
  });

  it('applies correct classes for vertical layout', () => {
    const { container } = render(
      <ButtonGroup vertical>
        <ButtonGroupItem>First</ButtonGroupItem>
        <ButtonGroupItem>Last</ButtonGroupItem>
      </ButtonGroup>
    );

    const group = container.firstChild as HTMLElement;
    expect(group).toHaveClass('flex-col', '-space-y-px');
  });

  it('applies selected class when selected prop is true', () => {
    render(
      <ButtonGroup>
        <ButtonGroupItem selected>Selected</ButtonGroupItem>
      </ButtonGroup>
    );
    const button = screen.getByText('Selected');
    expect(button).toHaveClass('bg-ds-200');
  });
});
