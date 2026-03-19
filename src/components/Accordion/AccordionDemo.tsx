import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './Accordion';
import { FiShield, FiZap } from 'react-icons/fi';

export function AccordionDemo() {
  return (
    <div className="flex flex-col gap-12 w-full max-w-2xl">
      {/* Default Single Mode */}
      <div className="space-y-2">
        <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] ml-1 mb-4">Simple Border Bottom</h3>
        <Accordion type="single" defaultValue="item-1" className="gap-0 border-t border-neutral-200 dark:border-neutral-800">
          <AccordionItem value="item-1">
            <AccordionTrigger>Minimalist Performance</AccordionTrigger>
            <AccordionContent>
              No boxes, no shadows. Just clean spacers and thin lines for a modern, high-density dashboard look. We've removed the container styling to let your content breathe.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger>Seamless Integration</AccordionTrigger>
            <AccordionContent>
              Designed to fit anywhere—sidebars, settings pages, or complex forms without added visual noise. The spring animations provide a premium feel without being distracting.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Accessibility First</AccordionTrigger>
            <AccordionContent>
              Fully accessible via keyboard navigation. Users can toggle items using the Enter or Space key, following the standard WAI-ARIA design pattern for accordions.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Multiple Mode with Icon */}
      <div className="space-y-2">
        <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] ml-1 mb-4">Multi-Expand with Detail</h3>
        <Accordion type="multiple" className="gap-0 border-y border-neutral-200 dark:border-neutral-800">
          <AccordionItem value="m-1">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <FiZap className="text-amber-500" size={14} />
                <span>Real-time Updates</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              Synchronize state across multiple browser tabs with zero latency using our optimized WebSocket provider.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="m-2">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <FiShield className="text-blue-500" size={14} />
                <span>Audit Logs Tracking</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              Every action is recorded and verifiable. Export logs to CSV or JSON for compliance reporting.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
