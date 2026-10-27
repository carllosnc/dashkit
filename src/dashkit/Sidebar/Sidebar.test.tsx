import { render, screen, fireEvent } from '@testing-library/react';
import { Sidebar, SidebarHeader, SidebarFooter, SidebarSection, SidebarItem } from './Sidebar';
import { useSidebar } from './SidebarContext';
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
    expect(button).toHaveClass('sidebar__item--active');
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

  it('exposes a working setIsOpen via useSidebar (not a no-op)', () => {
    function Probe() {
      const { isOpen, setIsOpen } = useSidebar();
      return (
        <div>
          <span data-testid="state">{isOpen ? 'open' : 'closed'}</span>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      );
    }

    render(
      <Sidebar defaultOpen={true}>
        <Probe />
      </Sidebar>
    );

    expect(screen.getByTestId('state')).toHaveTextContent('open');
    fireEvent.click(screen.getByText('Close'));
    expect(screen.getByTestId('state')).toHaveTextContent('closed');
  });

  it('calls onOpenChange when setIsOpen is used', () => {
    const handleOpenChange = vi.fn();
    function Probe() {
      const { setIsOpen } = useSidebar();
      return <button onClick={() => setIsOpen(false)}>Close</button>;
    }

    render(
      <Sidebar defaultOpen={true} onOpenChange={handleOpenChange}>
        <Probe />
      </Sidebar>
    );

    fireEvent.click(screen.getByText('Close'));
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });
});
