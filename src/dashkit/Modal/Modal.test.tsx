import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Modal, ModalHeader, ModalContent, ModalFooter } from './index';
import type { ReactNode, Ref } from 'react';

// Mock framer-motion because it uses features like requestAnimationFrame that
// might be tricky in tests. The stand-in forwards refs and spreads DOM props so
// role/aria attributes and the focus trap behave realistically.
vi.mock('framer-motion', async () => {
  const React = await import('react');
  const MOTION_ONLY = [
    'initial', 'animate', 'exit', 'transition', 'layout', 'layoutId',
    'variants', 'drag', 'dragConstraints', 'dragElastic', 'dragMomentum',
    'onDragEnd', 'whileHover', 'whileTap',
  ];
  const MotionDiv = React.forwardRef(
    (props: Record<string, unknown>, ref: Ref<HTMLDivElement>) => {
      const rest: Record<string, unknown> = { ...props };
      const children = rest.children;
      delete rest.children;
      for (const key of MOTION_ONLY) delete rest[key];
      return React.createElement('div', { ref, ...rest }, children as ReactNode);
    }
  );
  return {
    motion: { div: MotionDiv },
    AnimatePresence: ({ children }: { children?: ReactNode }) =>
      React.createElement(React.Fragment, null, children),
  };
});

describe('Modal', () => {
  const onClose = vi.fn();

  beforeEach(() => {
    onClose.mockClear();
  });

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

    // The backdrop is the element with "backdrop__overlay"
    const backdrop = document.querySelector('.backdrop__overlay');
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
    expect(onClose).toHaveBeenCalledTimes(1);
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

    // Releasing the lock removes the inline style instead of forcing 'unset'
    expect(document.body.style.overflow).toBe('');
  });

  it('exposes dialog semantics when open', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <ModalContent>Context</ModalContent>
      </Modal>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('moves focus into the dialog and restores it on close', () => {
    function Harness({ isOpen }: { isOpen: boolean }) {
      return (
        <div>
          <button data-testid="outside">outside</button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
              <button data-testid="inside">inside</button>
            </ModalContent>
          </Modal>
        </div>
      );
    }

    const { rerender } = render(<Harness isOpen={false} />);
    const outside = screen.getByTestId('outside');
    outside.focus();
    expect(document.activeElement).toBe(outside);

    rerender(<Harness isOpen={true} />);
    expect(document.activeElement).toBe(screen.getByTestId('inside'));

    rerender(<Harness isOpen={false} />);
    expect(document.activeElement).toBe(outside);
  });
});


