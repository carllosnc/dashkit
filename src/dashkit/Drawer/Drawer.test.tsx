import { render, screen, fireEvent } from '@testing-library/react';
import { Drawer, DrawerHeader } from './Drawer'; // Assuming DrawerHeader is exported from './Drawer'

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
    
    const backdrop = screen.getByTestId('backdrop-overlay');
    fireEvent.click(backdrop);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('renders title and description', () => {
    render(
      <Drawer isOpen={true} onClose={() => {}}>
        <DrawerHeader>
          <h2 className="text-xl font-semibold">Test Title</h2>
          <p className="text-sm text-muted-foreground">Test Desc</p>
        </DrawerHeader>
        <div>Content</div>
      </Drawer>
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Desc')).toBeInTheDocument();
  });
});


