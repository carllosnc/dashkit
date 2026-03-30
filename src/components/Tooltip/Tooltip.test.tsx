import { render, screen } from '@testing-library/react';
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
});
