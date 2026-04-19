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

export interface SystemLogsProps {
  logs: LogEntry[];
  title?: string;
  session?: string;
  status?: string;
  statusColor?: BadgeColor;
  className?: string;
  maxHeight?: number | string;
  autoScroll?: boolean;
}

const levelMap: Record<LogLevel, { label: string; class: string }> = {
  ok: { label: '[OK]', class: 'text-ds-success-500' },
  info: { label: '[INF]', class: 'text-ds-info-500' },
  warn: { label: '[WRN]', class: 'text-ds-warning-500' },
  error: { label: '[ERR]', class: 'text-ds-danger-500' },
  stable: { label: '[STB]', class: 'text-ds-primary-500' },
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
    autoScroll = true
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
        className={cn(
          "overflow-hidden ds-rounded border border-ds-300 dark:border-ds-700 bg-black shadow-lg",
          className
        )}
      >
        <div className="bg-zinc-950/50 dark:bg-white/[0.03] py-2.5 px-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <FiTerminal className="text-ds-primary-400" size={14} />
            <h3 className="text-xs text-ds-50 font-medium tracking-tight">{title}</h3>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="p-4 space-y-2 font-mono text-xs leading-relaxed overflow-y-auto custom-scrollbar"
          style={{ maxHeight }}
        >
          {logs.map((log, i) => (
            <div key={i} className="flex gap-2 group">
              {log.timestamp && (
                <span className="text-ds-500 select-none whitespace-nowrap">{log.timestamp}</span>
              )}
              <span className={cn("font-bold min-w-[36px]", levelMap[log.type].class)}>
                {levelMap[log.type].label}
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
          <div className="px-4 py-2 bg-white/[0.02] border-t border-white/10 flex items-center justify-between">
            {session ? (
              <span className="text-[10px] text-ds-500 uppercase font-bold tracking-wider">
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
