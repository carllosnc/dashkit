import * as React from 'react';
import { FiTerminal } from 'react-icons/fi';
import { cn } from '../utils/cn';
import { Badge, type BadgeColor } from '../Badge/Badge';

export type LogLevel = 'ok' | 'info' | 'warn' | 'error' | 'stable';

export interface LogEntry {
  type: LogLevel;
  message: string;
  timestamp?: string;
}

export interface SystemLogsProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  logs: LogEntry[];
  /** @default 'System Logs' */
  title?: string;
  session?: string;
  /** @default 'Stable' */
  status?: string;
  /** @default 'success' */
  statusColor?: BadgeColor;
  maxHeight?: number | string;
  /** @default true */
  autoScroll?: boolean;
}

const LEVEL_LABELS: Record<LogLevel, string> = {
  ok: '[OK]',
  info: '[INF]',
  warn: '[WRN]',
  error: '[ERR]',
  stable: '[STB]',
};

const LEVEL_COLORS: Record<LogLevel, string> = {
  ok: 'text-ds-success-500',
  info: 'text-ds-info-500',
  warn: 'text-ds-warning-500',
  error: 'text-ds-danger-500',
  stable: 'text-ds-primary-500',
};

export const SystemLogs = React.forwardRef<HTMLDivElement, SystemLogsProps>(
  ({
    logs,
    title = 'System Logs',
    session,
    status = 'Stable',
    statusColor = 'success',
    className,
    maxHeight,
    autoScroll = true,
    ...props
  }, ref) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
      if (autoScroll && scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, [logs, autoScroll]);

    return (
      <div
        ref={ref}
        data-slot="system-logs"
        className={cn('overflow-hidden ds-rounded border border-border ds-border-width ds-card-shadow bg-ds-950 shadow-lg', className)}
        {...props}
      >
        <div className="bg-ds-900/60 py-2.5 px-4 border-b border-ds-800">
          <div className="flex items-center gap-2">
            <FiTerminal className="text-ds-400" size={14} />
            <h3 className="text-xs text-ds-50 font-medium tracking-tight">{title}</h3>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="p-4 space-y-2 font-mono text-xs leading-relaxed overflow-y-auto custom-scrollbar"
          style={{ maxHeight }}
        >
          {logs.map((log, i) => (
            <div key={i} className="flex gap-2">
              {log.timestamp && (
                <span className="text-ds-500 select-none whitespace-nowrap">{log.timestamp}</span>
              )}
              <span className={cn('font-bold min-w-[36px]', LEVEL_COLORS[log.type])}>
                {LEVEL_LABELS[log.type]}
              </span>
              <span className="text-ds-300 break-all">{log.message}</span>
            </div>
          ))}
          <div className="flex gap-2 opacity-50 pt-1">
            <span className="text-ds-400">$</span>
            <span className="text-ds-100 animate-pulse">_</span>
          </div>
        </div>

        {(session || status) && (
          <div className="px-4 py-2.5 bg-ds-900/40 border-t border-ds-800 flex items-center justify-between min-h-[2.5rem]">
            {session ? (
              <span className="text-[10px] text-ds-500 uppercase font-bold tracking-wider h-5 inline-flex items-center leading-none translate-y-[0.5px]">
                session: {session}
              </span>
            ) : <div />}
            {status && (
              <Badge
                content={status}
                color={statusColor}
              />
            )}
          </div>
        )}
      </div>
    );
  }
);

SystemLogs.displayName = 'SystemLogs';
