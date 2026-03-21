import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';

export const CardDemo = () => {
  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Project Overhaul</CardTitle>
          <CardDescription>
            A comprehensive update to the dashboard architecture and visual identity.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <p className="text-sm text-base-500">
              A standard composed card using the modular component internal structure for full layout control.
              This design pattern allows for deep nesting and flexible content slots.
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outlined">Dismiss</Button>
          <Button variant="filled">View Details</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader extra={<Badge content="Live" color="info" pulse />}>
          <CardTitle>System Analytics</CardTitle>
          <CardDescription>
            Real-time monitoring of global infrastructure and system health.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-base-50 dark:bg-white/5 border border-base-100 dark:border-white/5">
              <span className="text-[10px] font-bold text-base-400 uppercase">Uptime</span>
              <p className="text-xl font-bold font-mono text-base-950 dark:text-white">99.99%</p>
            </div>
            <div className="p-4 rounded-xl bg-base-50 dark:bg-white/5 border border-base-100 dark:border-white/5">
              <span className="text-[10px] font-bold text-base-400 uppercase">Latency</span>
              <p className="text-xl font-bold font-mono text-base-950 dark:text-white">12ms</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outlined" className="w-full">View Global Status</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
