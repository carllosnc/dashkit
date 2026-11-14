import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { FileUpload, type FileUploadItem } from './FileUpload';

describe('FileUpload', () => {
  it('renders dropzone and pre-populated upload items with progress bars', () => {
    const initialFiles: FileUploadItem[] = [
      { id: '1', name: 'report.pdf', size: 2048, progress: 65, status: 'uploading' },
      { id: '2', name: 'logo.png', size: 1024, progress: 100, status: 'completed' }
    ];

    render(<FileUpload label="Documents" defaultValue={initialFiles} />);

    expect(screen.getByText('Documents')).toBeInTheDocument();
    expect(screen.getByText('report.pdf')).toBeInTheDocument();
    expect(screen.getByText('logo.png')).toBeInTheDocument();

    const progressBars = screen.getAllByRole('progressbar');
    expect(progressBars).toHaveLength(2);
    expect(progressBars[0]).toHaveAttribute('aria-valuenow', '65');
    expect(progressBars[1]).toHaveAttribute('aria-valuenow', '100');
  });

  it('adds files via drop and flags files exceeding maxSize', () => {
    const onChange = vi.fn();
    const onFilesAdded = vi.fn();
    render(<FileUpload maxSize={1000} onChange={onChange} onFilesAdded={onFilesAdded} />);

    const dropzone = screen.getByRole('button');
    const validFile = new File(['ok'], 'small.txt', { type: 'text/plain' });
    const bigFile = new File([new ArrayBuffer(2000)], 'large.bin', { type: 'application/octet-stream' });

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files: [validFile, bigFile]
      }
    });

    expect(onFilesAdded).toHaveBeenCalledWith([validFile, bigFile]);
    expect(screen.getByText('small.txt')).toBeInTheDocument();
    expect(screen.getByText('large.bin')).toBeInTheDocument();
    expect(screen.getByText(/Exceeds maximum size/i)).toBeInTheDocument();
  });

  it('removes files when remove button is clicked', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(
      <FileUpload
        defaultValue={[{ id: '1', name: 'notes.md', size: 512, status: 'pending' }]}
        onRemove={onRemove}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Remove notes.md' }));
    expect(screen.queryByText('notes.md')).not.toBeInTheDocument();
    expect(onRemove).toHaveBeenCalledWith(expect.objectContaining({ id: '1', name: 'notes.md' }));
  });
});
