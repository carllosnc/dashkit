import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { CommandPalette, type CommandPaletteItem } from './CommandPalette';

const sampleItems: CommandPaletteItem[] = [
  {
    id: 'create-project',
    label: 'Create Project',
    description: 'Initialize a new workspace',
    group: 'Actions',
    keywords: ['new', 'workspace'],
    shortcut: ['⌘', 'N']
  },
  {
    id: 'open-settings',
    label: 'Open Settings',
    group: 'Navigation',
    shortcut: ['⌘', ',']
  },
  {
    id: 'disabled-action',
    label: 'Archive Workspace',
    group: 'Actions',
    disabled: true
  }
];

describe('CommandPalette', () => {
  it('opens and closes with Cmd+K / Ctrl+K shortcut when enableShortcut is true', () => {
    render(<CommandPalette items={sampleItems} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'k', ctrlKey: true });
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  it('filters items by label, description, and keywords', async () => {
    const user = userEvent.setup();
    render(<CommandPalette open={true} items={sampleItems} />);

    const input = screen.getByRole('combobox');
    await user.type(input, 'workspace');

    expect(screen.getByText('Create Project')).toBeInTheDocument();
    expect(screen.queryByText('Open Settings')).not.toBeInTheDocument();

    await user.clear(input);
    await user.type(input, 'nonexistent');
    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('supports keyboard navigation skipping disabled items and triggers onSelect', () => {
    const onSelect = vi.fn();
    const onOpenChange = vi.fn();
    render(
      <CommandPalette
        open={true}
        onOpenChange={onOpenChange}
        items={sampleItems}
        onSelect={onSelect}
      />
    );

    const input = screen.getByRole('combobox');
    // Initially first enabled item ("Create Project") is active; ArrowDown skips disabled?
    // Wait: order in sampleItems is Create Project (0), Open Settings (1), Archive Workspace (2, disabled).
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 'open-settings' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('does not trigger selection for disabled items on click', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<CommandPalette open={true} items={sampleItems} onSelect={onSelect} />);

    const disabledOption = screen.getByRole('option', { name: /Archive Workspace/i });
    expect(disabledOption).toBeDisabled();
    await user.click(disabledOption);
    expect(onSelect).not.toHaveBeenCalled();
  });
});
