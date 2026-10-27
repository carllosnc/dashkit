import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './index';

describe('Accordion', () => {
  it('renders accordion items', () => {
    render(
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(screen.getByText('Trigger 1')).toBeInTheDocument();
  });

  it('toggles content on click in single mode', async () => {
    render(
      <Accordion type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Trigger 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const trigger1 = screen.getByText('Trigger 1');
    const trigger2 = screen.getByText('Trigger 2');

    fireEvent.click(trigger1);
    expect(screen.getByText('Content 1')).toBeInTheDocument();

    fireEvent.click(trigger2);
    await waitFor(() => {
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    });
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('allows multiple items open in multiple mode', () => {
    render(
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Trigger 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    fireEvent.click(screen.getByText('Trigger 1'));
    fireEvent.click(screen.getByText('Trigger 2'));

    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('renders with default value', () => {
    render(
      <Accordion type="single" defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('marks a disabled item and does not toggle it on click', () => {
    render(
      <Accordion type="single">
        <AccordionItem value="item-1" disabled>
          <AccordionTrigger>Disabled Trigger</AccordionTrigger>
          <AccordionContent>Disabled Content</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const trigger = screen.getByRole('button', { name: /disabled trigger/i });
    expect(trigger).toBeDisabled();
    expect(trigger).toHaveAttribute('aria-disabled', 'true');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    // The disabled guard must block the toggle (aria-expanded stays false)
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('Disabled Content')).not.toBeInTheDocument();
  });

  it('exposes aria-expanded reflecting open state on enabled triggers', () => {
    render(
      <Accordion type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Trigger 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    const trigger = screen.getByRole('button', { name: /trigger 1/i });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger).not.toBeDisabled();
  });
});


