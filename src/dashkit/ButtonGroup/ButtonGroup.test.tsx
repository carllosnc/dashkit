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
    expect(group).toHaveClass('btn-group', 'btn-group-horizontal');
  });

  it('applies correct classes for vertical layout', () => {
    const { container } = render(
      <ButtonGroup vertical>
        <ButtonGroupItem>First</ButtonGroupItem>
        <ButtonGroupItem>Last</ButtonGroupItem>
      </ButtonGroup>
    );

    const group = container.firstChild as HTMLElement;
    expect(group).toHaveClass('btn-group', 'btn-group-vertical');
  });

  it('applies selected class when selected prop is true', () => {
    render(
      <ButtonGroup>
        <ButtonGroupItem selected>Selected</ButtonGroupItem>
      </ButtonGroup>
    );
    const button = screen.getByText('Selected');
    expect(button).toHaveClass('btn-group-item-selected');
  });
});


