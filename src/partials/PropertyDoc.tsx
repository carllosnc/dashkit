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
    <div className={cn("not-prose my-6 w-full overflow-hidden", className)}>
      {title && (
        <h4 className="text-xs font-semibold text-foreground uppercase tracking-[0.08em] mb-3 ml-1">
          {title}
        </h4>
      )}
      <div className="overflow-x-auto custom-scrollbar border border-border bg-card ds-rounded">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-border text-[11px] font-semibold text-muted-foreground uppercase tracking-[0.08em] bg-muted/40">
              <th className="px-4 py-3 w-[22%] border-r border-border">Property</th>
              {hasType && <th className="px-4 py-3 w-[28%] border-r border-border">Type</th>}
              {hasDefault && <th className="px-4 py-3 w-[14%] border-r border-border">Default</th>}
              <th className="px-4 py-3 flex-1">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {properties.map((property, idx) => (
              <tr
                key={idx}
                className="group hover:bg-muted/20 transition-colors duration-150"
              >
                <td className="px-4 py-3.5 align-top whitespace-nowrap border-r border-border">
                  <span className="inline-flex items-center font-sans text-xs font-semibold text-foreground bg-muted px-2 py-0.5 rounded border border-border/60">
                    {property.prop}
                  </span>
                </td>
                {hasType && (
                  <td className="px-4 py-3.5 align-top border-r border-border">
                    <span className="font-sans text-xs font-medium text-primary break-words">
                      {property.type}
                    </span>
                  </td>
                )}
                {hasDefault && (
                  <td className="px-4 py-3.5 align-top whitespace-nowrap font-sans text-xs border-r border-border">
                    <span className="text-muted-foreground">
                      {property.defaultValue || '—'}
                    </span>
                  </td>
                )}
                <td className="px-4 py-3.5 align-top">
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-prose">
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
