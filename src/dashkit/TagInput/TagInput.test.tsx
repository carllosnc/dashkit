import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { TagInput } from './TagInput';

describe('TagInput', () => {
  it('renders defaultValue tags and adds new tags on Enter or delimiter', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <TagInput
        label="Tags"
        defaultValue={['React']}
        onChange={onChange}
        placeholder="Add tag..."
      />
    );

    expect(screen.getByText('React')).toBeInTheDocument();

    const input = screen.getByRole('combobox');
    await user.type(input, 'TypeScript{Enter}');
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(onChange).toHaveBeenLastCalledWith(['React', 'TypeScript']);

    await user.type(input, 'Vitest,');
    expect(screen.getByText('Vitest')).toBeInTheDocument();
    expect(onChange).toHaveBeenLastCalledWith(['React', 'TypeScript', 'Vitest']);
  });

  it('supports keyboard navigation across tags with ArrowLeft, ArrowRight, Backspace, and Delete', () => {
    const onChange = vi.fn();
    render(<TagInput defaultValue={['Alpha', 'Beta', 'Gamma']} onChange={onChange} />);

    const input = screen.getByRole('combobox');
    fireEvent.keyDown(input, { key: 'ArrowLeft' });
    fireEvent.keyDown(input, { key: 'ArrowLeft' });

    // Highlighted tag should be Beta (index 1) and Delete should remove it
    fireEvent.keyDown(input, { key: 'Delete' });
    expect(screen.queryByText('Beta')).not.toBeInTheDocument();
    expect(onChange).toHaveBeenLastCalledWith(['Alpha', 'Gamma']);

    // Backspace when input is empty removes active/last tag
    fireEvent.keyDown(input, { key: 'Backspace' });
    expect(onChange).toHaveBeenLastCalledWith(['Alpha']);
  });

  it('filters and selects autocomplete suggestions with keyboard', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <TagInput
        suggestions={['Tailwind', 'TypeScript', 'Vitest']}
        onChange={onChange}
      />
    );

    const input = screen.getByRole('combobox');
    await user.click(input);
    await user.type(input, 'Type');

    expect(screen.getByRole('option', { name: 'TypeScript' })).toBeInTheDocument();
    expect(screen.queryByRole('option', { name: 'Vitest' })).not.toBeInTheDocument();

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onChange).toHaveBeenCalledWith(['TypeScript']);
  });

  it('respects maxTags and error state', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <TagInput
        defaultValue={['One', 'Two']}
        maxTags={2}
        error="Maximum 2 tags allowed"
        onChange={onChange}
      />
    );

    expect(screen.getByText('Maximum 2 tags allowed')).toBeInTheDocument();
    const input = screen.getByRole('combobox');
    expect(input).toBeDisabled();

    await user.click(screen.getByRole('button', { name: 'Remove One' }));
    expect(onChange).toHaveBeenCalledWith(['Two']);
  });
});
