import { render, screen, fireEvent } from '@testing-library/react';
import { Drawer } from './Drawer';

describe('Drawer', () => {
  it('does not render when closed', () => {
    render(
      <Drawer isOpen={false} onClose={() => {}}>
        <div>Content</div>
      </Drawer>
    );
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('renders content when open', () => {
    render(
      <Drawer isOpen={true} onClose={() => {}}>
        <div>Drawer Content</div>
      </Drawer>
    );
    expect(screen.getByText('Drawer Content')).toBeInTheDocument();
  });

  it('calls onClose when clicking backdrop', () => {
    const handleClose = vi.fn();
    render(
      <Drawer isOpen={true} onClose={handleClose}>
        <div>Content</div>
      </Drawer>
    );
    
    // The backdrop is the first motion.div child of the portal
    // Since we don't have a role, we'll find it by the close behavior
    const backdrop = screen.getByTestId('drawer-content').previousElementSibling;
    if (backdrop) fireEvent.click(backdrop);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('renders title and description', () => {
    render(
      <Drawer isOpen={true} onClose={() => {}} title="Test Title" description="Test Desc">
        <div>Content</div>
      </Drawer>
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Desc')).toBeInTheDocument();
  });
});


