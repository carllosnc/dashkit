import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Modal, ModalHeader, ModalContent, ModalFooter } from './Modal';
import type { ReactNode } from 'react';

// Mock framer-motion because it uses features like requestAnimationFrame that might be tricky in tests
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
        <ModalContent>
          <div data-testid="modal-content">Context</div>
        </ModalContent>
      </Modal>
    );

    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
  });

  it('does not render children when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={onClose}>
        <ModalContent>
          <div data-testid="modal-content">Context</div>
        </ModalContent>
      </Modal>
    );

    expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
  });

  it('calls onClose when clicking the backdrop', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <ModalContent>Context</ModalContent>
      </Modal>
    );

    // The backdrop is the element with "absolute inset-0"
    const backdrop = document.querySelector('.absolute.inset-0');
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(onClose).toHaveBeenCalled();
    } else {
      throw new Error('Backdrop not found');
    }
  });

  it('renders header with title and description', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <ModalHeader>
          <h3>Test Title</h3>
          <p>Test Description</p>
        </ModalHeader>
        <ModalContent>Context</ModalContent>
      </Modal>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders footer', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <ModalContent>Context</ModalContent>
        <ModalFooter>
          <button data-testid="footer-btn">Submit</button>
        </ModalFooter>
      </Modal>
    );

    expect(screen.getByTestId('footer-btn')).toBeInTheDocument();
  });

  it('calls onClose when close button in header is clicked', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <ModalHeader onClose={onClose}>
          <h3>Title</h3>
        </ModalHeader>
        <ModalContent>Context</ModalContent>
      </Modal>
    );

    const closeButton = screen.getByRole('button', { name: /close modal/i });
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });

  it('handles Escape key to close the modal', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <ModalContent>Context</ModalContent>
      </Modal>
    );

    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('locks body scroll when open', () => {
    const { rerender } = render(
      <Modal isOpen={true} onClose={onClose}>
        <ModalContent>Context</ModalContent>
      </Modal>
    );

    expect(document.body.style.overflow).toBe('hidden');

    rerender(
      <Modal isOpen={false} onClose={onClose}>
        <ModalContent>Context</ModalContent>
      </Modal>
    );

    expect(document.body.style.overflow).toBe('unset');
  });
});


