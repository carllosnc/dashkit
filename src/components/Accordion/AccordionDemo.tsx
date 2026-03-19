import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './Accordion';
import { FiLayout, FiShield, FiZap } from 'react-icons/fi';

export function AccordionDemo() {
  return (
    <div className="flex flex-col gap-12 w-full">
      {/* Default Single Mode */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1">Single Expansion (Default)</h3>
        <Accordion type="single" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger className="gap-3">
              <div className="flex items-center gap-3">
                <FiZap className="text-amber-500" />
                <span>Performance Optimization</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              Dashkit is built with advanced tree-shaking and lazy-loading techniques to ensure your dashboard loads in under 100ms. We prioritize critical rendering paths and minimize main-thread execution.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger className="gap-3">
              <div className="flex items-center gap-3">
                <FiShield className="text-blue-500" />
                <span>Security & Privacy</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              Enterprise-grade security comes standard. All components are audited for XSS and CSRF vulnerabilities, ensuring your data remains isolated and protected by default.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="gap-3">
              <div className="flex items-center gap-3">
                <FiLayout className="text-purple-500" />
                <span>Design System Continuity</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              Our tokens and utility classes are synchronized across all components, providing a seamless visual experience that feels like a single, cohesive interface rather than a collection of parts.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Multiple Mode */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1">Multiple Expansion</h3>
        <Accordion type="multiple" className="gap-1">
          <AccordionItem value="m-1" className="border-none bg-transparent hover:bg-neutral-50 dark:hover:bg-white/5 rounded-xl transition-colors">
            <AccordionTrigger className="px-3 py-4">Architecture</AccordionTrigger>
            <AccordionContent className="px-3 text-sm">
              Modular micro-frontend architecture with state-driven rendering logic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="m-2" className="border-none bg-transparent hover:bg-neutral-50 dark:hover:bg-white/5 rounded-xl transition-colors">
            <AccordionTrigger className="px-3 py-4">Deployment</AccordionTrigger>
            <AccordionContent className="px-3 text-sm">
              Ready for Vercel, Netlify, or any edge-compatible infra with zero-config.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="m-3" disabled className="border-none bg-transparent rounded-xl">
            <AccordionTrigger className="px-3 py-4 opacity-30">Analytics (Soon)</AccordionTrigger>
            <AccordionContent className="px-3 text-sm">
              Real-time telemetry and error tracking integration.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
