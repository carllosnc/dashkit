import * as React from 'react';
import { FiTerminal } from 'react-icons/fi';
import { cn } from '../utils/cn';
import { Badge, type BadgeColor } from '../Badge/Badge';
import './system-logs.css';

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

const LEVEL_LABELS: Record<LogLevel, string> = {
  ok: '[OK]',
  info: '[INF]',
  warn: '[WRN]',
  error: '[ERR]',
  stable: '[STB]',
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
        className={cn('system-logs', className)}
      >
        <div className="system-logs__header">
          <div className="system-logs__header-content">
            <FiTerminal className="system-logs__header-icon" size={14} />
            <h3 className="system-logs__header-title">{title}</h3>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="system-logs__viewport"
          style={{ maxHeight }}
        >
          {logs.map((log, i) => (
            <div key={i} className="system-logs__entry">
              {log.timestamp && (
                <span className="system-logs__entry-timestamp">{log.timestamp}</span>
              )}
              <span className={cn('system-logs__entry-level', `system-logs__entry-level--${log.type}`)}>
                {LEVEL_LABELS[log.type]}
              </span>
              <span className="system-logs__entry-message">{log.message}</span>
            </div>
          ))}
          <div className="system-logs__cursor-line">
            <span className="system-logs__cursor-prompt">$</span>
            <span className="system-logs__cursor-caret">_</span>
          </div>
        </div>

        {(session || status) && (
          <div className="system-logs__footer">
            {session ? (
              <span className="system-logs__footer-session">
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
