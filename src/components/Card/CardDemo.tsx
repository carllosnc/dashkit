import { Card, CardHeader, CardTitle, CardDescription, CardComponent, CardFooter } from './Card';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';

export const CardDemo = () => {
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto p-4">
      {/* Basic Card Composed */}
      <Card>
        <CardHeader>
          <CardTitle>Project Overhaul</CardTitle>
          <CardDescription>
            A comprehensive update to the dashboard architecture and visual identity.
          </CardDescription>
        </CardHeader>
        <CardComponent>
          <p className="text-sm text-base-600 dark:text-base-400">
            Current progress is ahead of schedule. We have successfully migrated 85% of the legacy modules to the new Dashkit system.
          </p>
        </CardComponent>
        <CardFooter>
          <Button variant="outlined">Dismiss</Button>
          <Button variant="filled">View Details</Button>
        </CardFooter>
      </Card>

      {/* Composed Card with Details */}
      <Card
        className="shadow-xl shadow-base-200/50 dark:shadow-black/50"
      >
        <CardHeader extra={<Badge content="Live" color="info" pulse />}>
          <CardTitle>System Analytics</CardTitle>
          <CardDescription>
            Real-time monitoring of global infrastructure and system health.
          </CardDescription>
        </CardHeader>
        <CardComponent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-base-50 dark:bg-white/5 border border-base-100 dark:border-white/5">
              <span className="text-[10px] font-bold text-base-400 uppercase">Uptime</span>
              <p className="text-xl font-bold font-mono text-base-900 dark:text-white">99.99%</p>
            </div>
            <div className="p-4 rounded-xl bg-base-50 dark:bg-white/5 border border-base-100 dark:border-white/5">
              <span className="text-[10px] font-bold text-base-400 uppercase">Latency</span>
              <p className="text-xl font-bold font-mono text-base-900 dark:text-white">12ms</p>
            </div>
          </div>
        </CardComponent>
        <CardFooter>
          <Button variant="outlined" className="w-full">View Global Status</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
