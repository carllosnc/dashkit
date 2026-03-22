import { cn } from '../utils/cn';

export interface Property {
  prop: string;
  type?: string;
  defaultValue?: string;
  description: string;
}

export interface PropertyDocProps {
  title?: string;
  className?: string;
  properties: Property[];
}

export function PropertyDoc({ title, properties, className }: PropertyDocProps) {
  // Determine which columns to show based on the data provided
  const hasType = properties.some(p => p.type !== undefined);
  const hasDefault = properties.some(p => p.defaultValue !== undefined);

  return (
    <div className={cn("not-prose my-6 w-full overflow-hidden", className)}>
      {title && (
        <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4 ml-1">
          {title}
        </h4>
      )}
      <div className="overflow-x-auto custom-scrollbar border border-border rounded-xl">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-border text-[11px] font-bold text-muted-foreground uppercase tracking-[0.1em] bg-muted/20">
              <th className="px-3 py-3 w-[20%] border-r border-border">Property</th>
              {hasType && <th className="px-3 py-3 w-[25%] border-r border-border">Type</th>}
              {hasDefault && <th className="px-3 py-3 w-[15%] border-r border-border">Default</th>}
              <th className="px-3 py-3 flex-1">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {properties.map((property, idx) => (
              <tr 
                key={idx} 
                className="group hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30 transition-colors duration-150"
              >
                <td className="px-3 py-4 align-top whitespace-nowrap border-r border-border">
                  <code className="text-[14px] font-mono font-bold text-foreground">
                    {property.prop}
                  </code>
                </td>
                {hasType && (
                  <td className="px-3 py-4 align-top border-r border-border">
                    <code className="text-[13px] font-mono text-foreground/80 break-all">
                      {property.type}
                    </code>
                  </td>
                )}
                {hasDefault && (
                  <td className="px-3 py-4 align-top whitespace-nowrap font-mono text-[12px] border-r border-border">
                    <span className="text-neutral-500 dark:text-neutral-400">
                      {property.defaultValue || '—'}
                    </span>
                  </td>
                )}
                <td className="px-3 py-4 align-top">
                  <p className="text-[14px] text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors max-w-lg">
                    {property.description}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
