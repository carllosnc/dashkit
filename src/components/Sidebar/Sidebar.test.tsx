import { render, screen, fireEvent } from '@testing-library/react';
import { Sidebar, SidebarHeader, SidebarFooter, SidebarSection, SidebarSectionItem } from './Sidebar';
import { FiLayout } from 'react-icons/fi';
import { describe, it, expect, vi } from 'vitest';

describe('Sidebar', () => {
  it('renders the sidebar children correctly', () => {
    render(
      <Sidebar>
        <SidebarHeader>My App</SidebarHeader>
        <SidebarSection title="General">
          <SidebarSectionItem>Home</SidebarSectionItem>
        </SidebarSection>
        <SidebarFooter>Logout</SidebarFooter>
      </Sidebar>
    );

    expect(screen.getByText('My App')).toBeInTheDocument();
    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('renders an icon in SidebarSectionItem', () => {
    render(
      <SidebarSectionItem icon={<FiLayout data-testid="sidebar-icon" />}>
        Dashboard
      </SidebarSectionItem>
    );
    expect(screen.getByTestId('sidebar-icon')).toBeInTheDocument();
  });

  it('applies active styles to SidebarSectionItem', () => {
    render(
      <SidebarSectionItem active>
        Active Item
      </SidebarSectionItem>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('text-primary');
  });

  it('triggers onClick when an item is clicked', () => {
    const handleClick = vi.fn();
    render(
      <SidebarSectionItem onClick={handleClick}>
        Click me
      </SidebarSectionItem>
    );
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
