import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  Table,
  TableContainer,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from './Table';
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

  it('applies default and custom text alignments on TableHead and TableCell', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Default Left</TableHead>
            <TableHead align="center">Center Prop</TableHead>
            <TableHead align="right">Right Prop</TableHead>
            <TableHead className="text-right">Right ClassName</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Default Cell</TableCell>
            <TableCell align="center">Center Cell</TableCell>
            <TableCell align="right">Right Cell</TableCell>
            <TableCell className="text-right">Right Class Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    const defaultHead = screen.getByText('Default Left');
    expect(defaultHead).toHaveClass('align-middle');
    expect(defaultHead).toHaveClass('text-left');

    const centerHead = screen.getByText('Center Prop');
    expect(centerHead).toHaveClass('text-center');

    const rightHead = screen.getByText('Right Prop');
    expect(rightHead).toHaveClass('text-right');

    const rightClassHead = screen.getByText('Right ClassName');
    expect(rightClassHead).toHaveClass('text-right');
    expect(rightClassHead).not.toHaveClass('text-left');

    const centerCell = screen.getByText('Center Cell');
    expect(centerCell).toHaveClass('text-center');

    const rightCell = screen.getByText('Right Cell');
    expect(rightCell).toHaveClass('text-right');

    const rightClassCell = screen.getByText('Right Class Cell');
    expect(rightClassCell).toHaveClass('text-right');
  });

  describe('TableContainer', () => {
    it('renders with table__container class and custom scrollbar support', () => {
      const { container } = render(
        <TableContainer data-testid="table-container">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Cell</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      );

      const wrapper = screen.getByTestId('table-container');
      expect(wrapper).toBeInTheDocument();
      expect(wrapper).toHaveClass('relative', 'overflow-x-auto');
      expect(container.querySelector('table')).toBeInTheDocument();
    });

    it('forwards ref and attributes to TableContainer', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <TableContainer ref={ref} className="custom-scroll-container">
          <table><tbody><tr><td>Data</td></tr></tbody></table>
        </TableContainer>
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass('custom-scroll-container');
      expect(ref.current).toHaveClass('relative', 'overflow-x-auto');
    });
  });
});
