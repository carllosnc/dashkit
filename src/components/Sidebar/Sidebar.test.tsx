import { render, screen, fireEvent } from '@testing-library/react';
import { Sidebar, SidebarHeader, SidebarFooter, SidebarSection, SidebarItem } from './Sidebar';
import { FiLayout } from 'react-icons/fi';
import { describe, it, expect, vi } from 'vitest';

describe('Sidebar', () => {
  it('renders the sidebar children correctly', () => {
    render(
      <Sidebar>
        <SidebarHeader>My App</SidebarHeader>
        <SidebarSection title="General">
          <SidebarItem>Home</SidebarItem>
        </SidebarSection>
        <SidebarFooter>Logout</SidebarFooter>
      </Sidebar>
    );

    expect(screen.getByText('My App')).toBeInTheDocument();
    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('renders an icon in SidebarItem', () => {
    render(
      <Sidebar>
        <SidebarItem icon={<FiLayout data-testid="sidebar-icon" />}>
          Dashboard
        </SidebarItem>
      </Sidebar>
    );
    expect(screen.getByTestId('sidebar-icon')).toBeInTheDocument();
  });

  it('applies active styles to SidebarItem', () => {
    render(
      <Sidebar>
        <SidebarItem active>
          Active Item
        </SidebarItem>
      </Sidebar>
    );
    const button = screen.getByRole('button', { name: /active item/i });
    expect(button).toHaveClass('text-primary');
  });

  it('triggers onClick when an item is clicked', () => {
    const handleClick = vi.fn();
    render(
      <Sidebar>
        <SidebarItem onClick={handleClick}>
          Click me
        </SidebarItem>
      </Sidebar>
    );
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
