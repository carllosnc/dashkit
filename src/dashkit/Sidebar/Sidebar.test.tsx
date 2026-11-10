import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarSection,
  SidebarItem,
  SidebarSubList,
  SidebarSubItem,
  SidebarContent,
  SidebarTrigger,
  SidebarProvider,
} from './Sidebar';
import { useSidebar } from './SidebarContext';
import { FiLayout } from 'react-icons/fi';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

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
    expect(button).toHaveClass('bg-muted');
    expect(button).toHaveAttribute('aria-current', 'page');
    expect(screen.getByText('Active Item')).toHaveAttribute('title', 'Active Item');
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

  it('sets aria-expanded on the collapse toggle button', () => {
    render(
      <Sidebar collapsible defaultOpen={true}>
        Content
      </Sidebar>
    );
    const toggleButton = screen.getByRole('button', { name: /collapse sidebar/i });
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
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

  it('renders nested sub-items when subItems prop is provided and toggles', () => {
    render(
      <Sidebar defaultOpen={true}>
        <SidebarItem
          defaultOpen={true}
          subItems={[
            { label: 'Overview', active: true },
            { label: 'Reports' },
          ]}
        >
          Analytics
        </SidebarItem>
      </Sidebar>
    );

    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Reports')).toBeInTheDocument();

    const overviewBtn = screen.getByText('Overview').closest('button');
    expect(overviewBtn).toHaveClass('font-medium');
  });

  it('renders composable SidebarSubList and SidebarSubItem correctly', () => {
    const handleSubClick = vi.fn();
    render(
      <Sidebar defaultOpen={true}>
        <SidebarSubList>
          <SidebarSubItem onClick={handleSubClick}>Conversions</SidebarSubItem>
        </SidebarSubList>
      </Sidebar>
    );

    const subItem = screen.getByText('Conversions');
    expect(subItem).toBeInTheDocument();
    fireEvent.click(subItem);
    expect(handleSubClick).toHaveBeenCalledTimes(1);
  });

  it('renders SidebarContent correctly', () => {
    render(
      <Sidebar defaultOpen={true}>
        <SidebarContent data-testid="sidebar-content">
          <span>Items list</span>
        </SidebarContent>
      </Sidebar>
    );

    const content = screen.getByTestId('sidebar-content');
    expect(content).toBeInTheDocument();
    expect(content).toHaveClass('overflow-y-auto');
    expect(screen.getByText('Items list')).toBeInTheDocument();
  });

  it('renders SidebarTrigger and triggers toggle', () => {
    render(
      <SidebarProvider defaultOpen={true}>
        <SidebarTrigger data-testid="sidebar-trigger" />
        <Sidebar>
          <div>Nav body</div>
        </Sidebar>
      </SidebarProvider>
    );

    const trigger = screen.getByTestId('sidebar-trigger');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-label', 'Collapse sidebar');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-label', 'Expand sidebar');
  });

  describe('Mobile Drawer Mode', () => {
    const originalMatchMedia = window.matchMedia;

    beforeEach(() => {
      // Mock mobile matchMedia (< 768px matches true)
      window.matchMedia = vi.fn().mockImplementation((query: string) => ({
        matches: query.includes('max-width'),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));
    });

    afterEach(() => {
      window.matchMedia = originalMatchMedia;
    });

    it('renders mobile drawer as a dialog portal when openMobile is true', () => {
      render(
        <SidebarProvider defaultOpenMobile={true}>
          <Sidebar>
            <SidebarHeader>Mobile Logo</SidebarHeader>
            <SidebarItem>Mobile Link</SidebarItem>
          </Sidebar>
        </SidebarProvider>
      );

      const dialog = screen.getByRole('dialog', { name: /navigation sidebar/i });
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveClass('fixed', 'shadow-2xl');
      expect(screen.getByText('Mobile Logo')).toBeInTheDocument();
      expect(screen.getByText('Mobile Link')).toBeInTheDocument();
    });

    it('closes mobile drawer when clicking close button in SidebarHeader', async () => {
      render(
        <SidebarProvider defaultOpenMobile={true}>
          <Sidebar>
            <SidebarHeader>Mobile Logo</SidebarHeader>
          </Sidebar>
        </SidebarProvider>
      );

      const closeBtn = screen.getByRole('button', { name: /close navigation/i });
      expect(closeBtn).toBeInTheDocument();
      fireEvent.click(closeBtn);

      await waitFor(() => {
        expect(screen.queryByRole('dialog', { name: /navigation sidebar/i })).not.toBeInTheDocument();
      });
    });

    it('closes mobile drawer when clicking a leaf SidebarItem', async () => {
      const handleItemClick = vi.fn();
      render(
        <SidebarProvider defaultOpenMobile={true}>
          <Sidebar>
            <SidebarItem onClick={handleItemClick}>Dashboard</SidebarItem>
          </Sidebar>
        </SidebarProvider>
      );

      const item = screen.getByText('Dashboard');
      fireEvent.click(item);
      expect(handleItemClick).toHaveBeenCalledTimes(1);

      await waitFor(() => {
        expect(screen.queryByRole('dialog', { name: /navigation sidebar/i })).not.toBeInTheDocument();
      });
    });

    it('toggles mobile drawer with SidebarTrigger', async () => {
      render(
        <SidebarProvider defaultOpenMobile={false}>
          <SidebarTrigger data-testid="mobile-trigger" />
          <Sidebar>
            <div>Mobile Content</div>
          </Sidebar>
        </SidebarProvider>
      );

      expect(screen.queryByRole('dialog', { name: /navigation sidebar/i })).not.toBeInTheDocument();

      const trigger = screen.getByTestId('mobile-trigger');
      fireEvent.click(trigger);

      expect(screen.getByRole('dialog', { name: /navigation sidebar/i })).toBeInTheDocument();
      expect(screen.getByText('Mobile Content')).toBeInTheDocument();
    });

    it('closes mobile drawer when clicking backdrop overlay', async () => {
      render(
        <SidebarProvider defaultOpenMobile={true}>
          <Sidebar>
            <div>Mobile Content</div>
          </Sidebar>
        </SidebarProvider>
      );

      const backdrop = screen.getByTestId('backdrop-overlay');
      expect(backdrop).toBeInTheDocument();
      fireEvent.click(backdrop);

      await waitFor(() => {
        expect(screen.queryByRole('dialog', { name: /navigation sidebar/i })).not.toBeInTheDocument();
      });
    });
  });

  describe('Collapsed desktop header centering', () => {
    it('centers content in SidebarHeader when sidebar is collapsed', () => {
      render(
        <Sidebar defaultOpen={false}>
          <SidebarHeader>
            <span data-testid="collapsed-logo">AI</span>
          </SidebarHeader>
        </Sidebar>
      );

      const logo = screen.getByTestId('collapsed-logo');
      expect(logo).toBeInTheDocument();
      const container = logo.parentElement;
      expect(container).toHaveClass('justify-center');
    });
  });
});
