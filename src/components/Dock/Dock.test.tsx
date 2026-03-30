import { render, screen } from '@testing-library/react';
import { Dock, DockItem } from './Dock';

describe('Dock', () => {
  it('renders dock items correctly', () => {
    render(
      <Dock>
        <DockItem label="Home" icon={<span data-testid="home-icon" />} />
        <DockItem label="Settings" icon={<span data-testid="settings-icon" />} />
      </Dock>
    );
    
    expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    
    expect(screen.getByTestId('settings-icon')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });
});
