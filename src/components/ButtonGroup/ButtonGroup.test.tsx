import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ButtonGroup } from './ButtonGroup';
import { Button } from '../Button/Button';

describe('ButtonGroup', () => {
  it('renders children correctly', () => {
    render(
      <ButtonGroup>
        <Button>First</Button>
        <Button>Second</Button>
      </ButtonGroup>
    );
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('applies correct rounded classes for horizontal layout', () => {
    const { container } = render(
      <ButtonGroup>
        <Button>First</Button>
        <Button>Last</Button>
      </ButtonGroup>
    );
    
    const group = container.firstChild as HTMLElement;
    expect(group).toHaveClass('inline-flex', 'flex-row', '-space-x-px');
    expect(group).toHaveClass('[&>*:first-child]:rounded-r-none');
    expect(group).toHaveClass('[&>*:last-child]:rounded-l-none');
  });

  it('applies correct rounded classes for vertical layout', () => {
    const { container } = render(
      <ButtonGroup vertical>
        <Button>First</Button>
        <Button>Last</Button>
      </ButtonGroup>
    );
    
    const group = container.firstChild as HTMLElement;
    expect(group).toHaveClass('inline-flex', 'flex-col', '-space-y-px');
    expect(group).toHaveClass('[&>*:first-child]:rounded-b-none');
    expect(group).toHaveClass('[&>*:last-child]:rounded-t-none');
  });
});
