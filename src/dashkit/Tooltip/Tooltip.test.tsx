import { render, screen, fireEvent } from '@testing-library/react';
import { Tooltip, TooltipTrigger, TooltipContent } from './Tooltip';

describe('Tooltip', () => {
  it('renders trigger without content initially', () => {
    render(
      <Tooltip delay={0}>
        <TooltipTrigger>
          <button>Hover me</button>
        </TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>
    );
    expect(screen.getByText('Hover me')).toBeInTheDocument();
    expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument();
  });

  it('exposes a tooltip role and links it via aria-describedby on focus', async () => {
    render(
      <Tooltip delay={0}>
        <TooltipTrigger>
          <button>Hover me</button>
        </TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>
    );

    const button = screen.getByText('Hover me');
    fireEvent.focus(button);

    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).toHaveTextContent('Tooltip text');

    // The trigger is associated with the tooltip through aria-describedby.
    const described = button.closest('[aria-describedby]');
    expect(described).toHaveAttribute('aria-describedby', tooltip.id);
  });
});
