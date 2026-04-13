import { render, screen } from '@testing-library/react';
import { Dock, DockItem } from './Dock';

describe('Dock', () => {
  it('renders dock items and shows tooltips on hover', async () => {
    const { userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();

    render(
      <Dock>
        <DockItem label="Home" icon={<span data-testid="home-icon" />} />
        <DockItem label="Settings" icon={<span data-testid="settings-icon" />} />
      </Dock>
    );
    
    expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    expect(screen.getByTestId('settings-icon')).toBeInTheDocument();

    // Labels should not be in the document initially
    expect(screen.queryByText('Home')).not.toBeInTheDocument();

    // Hover to show tooltip
    await user.hover(screen.getByTestId('home-icon'));
    expect(await screen.findByText('Home')).toBeInTheDocument();
  });
});
