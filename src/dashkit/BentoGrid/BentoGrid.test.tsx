import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BentoGrid, BentoGridItem } from './index';

describe('BentoGrid', () => {
  it('renders grid and items with default hairline border coherence classes', () => {
    render(
      <BentoGrid data-testid="grid">
        <BentoGridItem>Cell 1</BentoGridItem>
        <BentoGridItem>Cell 2</BentoGridItem>
      </BentoGrid>
    );

    const grid = screen.getByTestId('grid');
    const cell1 = screen.getByText('Cell 1');

    expect(grid).toHaveAttribute('data-slot', 'bento-grid');
    expect(grid).toHaveClass('grid', 'gap-px', 'bg-border', 'border', 'border-border', 'rounded-xl');
    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-3');

    expect(cell1).toHaveAttribute('data-slot', 'bento-grid-item');
    expect(cell1).toHaveClass('bg-card', 'p-6', 'ring-1', 'ring-border', 'col-span-1', 'row-span-1');
  });

  it('supports numeric cols, colSpan, and rowSpan with mobile-first responsive defaults', () => {
    render(
      <BentoGrid data-testid="grid" cols={12}>
        <BentoGridItem colSpan={4} rowSpan={2}>
          Irregular Cell
        </BentoGridItem>
        <BentoGridItem colSpan="full">
          Footer Cell
        </BentoGridItem>
      </BentoGrid>
    );

    const grid = screen.getByTestId('grid');
    const irregular = screen.getByText('Irregular Cell');
    const footer = screen.getByText('Footer Cell');

    expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-12');
    expect(irregular).toHaveClass('col-span-full', 'md:col-span-4', 'row-span-1', 'md:row-span-2');
    expect(footer).toHaveClass('col-span-full');
  });

  it('supports responsive breakpoint objects for cols, colSpan, and rowSpan', () => {
    render(
      <BentoGrid data-testid="grid" cols={{ base: 1, sm: 2, md: 4, lg: 12 }}>
        <BentoGridItem
          colSpan={{ base: 1, sm: 2, md: 2, lg: 5 }}
          rowSpan={{ base: 1, lg: 2 }}
        >
          Responsive Cell
        </BentoGridItem>
      </BentoGrid>
    );

    const grid = screen.getByTestId('grid');
    const cell = screen.getByText('Responsive Cell');

    expect(grid).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'md:grid-cols-4', 'lg:grid-cols-12');
    expect(cell).toHaveClass(
      'col-span-1',
      'sm:col-span-2',
      'md:col-span-2',
      'lg:col-span-5',
      'row-span-1',
      'lg:row-span-2'
    );
  });

  it('applies rounded, bordered, gap, and autoRows props correctly', () => {
    render(
      <BentoGrid
        data-testid="grid"
        rounded="none"
        bordered={false}
        gap="md"
        autoRows="minmax(180px, auto)"
      >
        <BentoGridItem surface="muted" padding="sm">
          Spaced Cell
        </BentoGridItem>
      </BentoGrid>
    );

    const grid = screen.getByTestId('grid');
    const cell = screen.getByText('Spaced Cell');

    expect(grid).toHaveClass('rounded-none', 'border-0', 'gap-4');
    expect(grid).toHaveStyle({ gridAutoRows: 'minmax(180px, auto)' });
    expect(cell).toHaveClass('bg-muted/60', 'p-4', 'border', 'border-border', 'rounded-xl');
  });

  it('forwards refs to BentoGrid and BentoGridItem', () => {
    const gridRef = React.createRef<HTMLDivElement>();
    const itemRef = React.createRef<HTMLDivElement>();

    render(
      <BentoGrid ref={gridRef}>
        <BentoGridItem ref={itemRef}>Ref Cell</BentoGridItem>
      </BentoGrid>
    );

    expect(gridRef.current).toBeInstanceOf(HTMLDivElement);
    expect(itemRef.current).toBeInstanceOf(HTMLDivElement);
  });
});
