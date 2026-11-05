import React from 'react';
import { render, screen } from '@testing-library/react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './Table';
import { describe, it, expect } from 'vitest';

describe('Table', () => {
  it('renders a basic table structure without outer wrapper', () => {
    const { container } = render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Header</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Data')).toBeInTheDocument();
    const tableEl = screen.getByRole('table');
    expect(tableEl).toBeInTheDocument();
    expect(container.firstElementChild).toBe(tableEl);
  });

  it('renders with custom classNames and attaches ref directly to table', () => {
    const ref = React.createRef<HTMLTableElement>();
    const { container } = render(<Table ref={ref} className="custom-table" />);
    expect(container.querySelector('.custom-table')).toBe(ref.current);
    expect(ref.current?.tagName).toBe('TABLE');
  });
});
