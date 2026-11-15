import { cn } from '../dashkit/utils/cn';

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
    <div className={cn("not-prose my-6 w-full", className)}>
      {title && (
        <h4 className="text-xs font-semibold text-foreground uppercase tracking-[0.08em] mb-3 ml-1">
          {title}
        </h4>
      )}
      <div className="overflow-x-auto custom-scrollbar border border-border/80 bg-card ds-rounded-lg">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-border/80 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider bg-muted/30">
              <th className="px-4 py-3 w-[18%] whitespace-nowrap">Property</th>
              {hasType && <th className="px-4 py-3 w-[24%] whitespace-nowrap">Type</th>}
              {hasDefault && <th className="px-4 py-3 w-[14%] whitespace-nowrap">Default</th>}
              <th className="px-4 py-3">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {properties.map((property, idx) => (
              <tr
                key={idx}
                className="group hover:bg-muted/25 transition-colors duration-150"
              >
                <td className="px-4 py-3.5 align-top whitespace-nowrap">
                  <code className="inline-flex items-center font-mono text-xs font-semibold text-foreground bg-muted/70 px-2 py-0.5 ds-rounded-sm border border-border/60">
                    {property.prop}
                  </code>
                </td>
                {hasType && (
                  <td className="px-4 py-3.5 align-top">
                    <code className="font-mono text-xs font-medium text-primary break-words leading-5">
                      {property.type}
                    </code>
                  </td>
                )}
                {hasDefault && (
                  <td className="px-4 py-3.5 align-top whitespace-nowrap">
                    {property.defaultValue ? (
                      <code className="font-mono text-xs text-foreground/80 leading-5">
                        {property.defaultValue}
                      </code>
                    ) : (
                      <span className="font-mono text-xs text-muted-foreground/50 leading-5">
                        —
                      </span>
                    )}
                  </td>
                )}
                <td className="px-4 py-3.5 align-top">
                  <p className="text-sm text-muted-foreground leading-5 max-w-prose">
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
