import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Modal } from './Modal';
import type { ReactNode } from 'react';

// Mock framer-motion because it uses features like requestAnimationFrame that might be tricky in tests
// However, AnimatePresence and motion.div usually need some mocking or just run with it.
// Many projects mock framer-motion to simplify.
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, onClick, className }: { children: ReactNode, onClick?: () => void, className?: string }) => (
      <div onClick={onClick} className={className}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

describe('Modal', () => {
  const onClose = vi.fn();

  it('renders children when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div data-testid="modal-content">Context</div>
      </Modal>
    );

    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
  });

  it('does not render children when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={onClose}>
        <div data-testid="modal-content">Context</div>
      </Modal>
    );

    expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
  });

  it('calls onClose when clicking the backdrop', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Context</div>
      </Modal>
    );

    // The backdrop is the first motion.div (mocked as div) with the fixed positioning classes.
    // In our Modal.tsx, it's the element with "absolute inset-0".
    const backdrop = document.querySelector('.absolute.inset-0');
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(onClose).toHaveBeenCalled();
    } else {
      throw new Error('Backdrop not found');
    }
  });

  it('renders title and description', () => {
    render(
      <Modal 
        isOpen={true} 
        onClose={onClose} 
        title="Test Title" 
        description="Test Description"
      >
        <div>Context</div>
      </Modal>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders footer', () => {
    render(
      <Modal 
        isOpen={true} 
        onClose={onClose} 
        footer={<button data-testid="footer-btn">Submit</button>}
      >
        <div>Context</div>
      </Modal>
    );

    expect(screen.getByTestId('footer-btn')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Context</div>
      </Modal>
    );

    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });

  it('hides close button when showCloseButton is false', () => {
    render(
      <Modal isOpen={true} onClose={onClose} showCloseButton={false}>
        <div>Context</div>
      </Modal>
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('handles Escape key to close the modal', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Context</div>
      </Modal>
    );

    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('locks body scroll when open', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Context</div>
      </Modal>
    );

    expect(document.body.style.overflow).toBe('hidden');

    rerender(
      <Modal isOpen={false} onClose={onClose}>
        <div>Context</div>
      </Modal>
    );

    expect(document.body.style.overflow).toBe('unset');
  });
});


