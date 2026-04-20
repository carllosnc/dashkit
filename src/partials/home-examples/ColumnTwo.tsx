import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../dashkit/Card';
import { Button } from '../../dashkit/Button/Button';
import { Input } from '../../dashkit/Input/Input';
import { Badge } from '../../dashkit/Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../dashkit/Tabs/Tabs';
import { AreaChart } from '../../dashkit/AreaChart/AreaChart';
import { LineChart } from '../../dashkit/LineChart/LineChart';
import { Divider } from '../../dashkit/Divider/Divider';
import { AnimateNumber } from '../../dashkit/AnimateNumber';
import { Popover, PopoverTrigger, PopoverContent } from '../../dashkit/Popover';
import { Switch } from '../../dashkit/Switch/Switch';
import { CircularProgress } from '../../dashkit/CircularProgress/CircularProgress';
import { ProgressBar } from '../../dashkit/ProgressBar/ProgressBar';
import { Avatar } from '../../dashkit/Avatar';
import { Drawer, DrawerHeader } from '../../dashkit/Drawer/Drawer';
import { Combobox } from '../../dashkit/Combobox/Combobox';
import { StatsCard } from '../../dashkit/StatsCard/StatsCard';
import { FiTrendingUp, FiShoppingCart, FiArrowUpRight, FiMoreHorizontal, FiShield, FiActivity, FiGlobe, FiServer, FiArrowDownLeft, FiCpu, FiDatabase, FiZap } from 'react-icons/fi';
import { CHART_DATA, CHART_SERIES, REVENUE_DATA, AVATAR_URLS } from './Constants';

export function ColumnTwo() {
  const [liveValue, setLiveValue] = React.useState(12400.50);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [selectedFleet, setSelectedFleet] = React.useState<string | string[]>('Alpha Logistics');

  React.useEffect(() => {
    const interval = setInterval(() => {
        setLiveValue(prev => prev + (Math.random() * 50));
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex flex-col gap-4">
      {/* 2. Tabs & Data Visualization */}
      <Tabs defaultValue="overview">
         <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
         </TabsList>
         <TabsContent value="overview" className="space-y-4">
             <div className="flex flex-col">
                <h4 className="text-sm font-bold">Platform Traffic</h4>
                <p className="text-xs text-ds-500">Real-time engagement metrics.</p>
             </div>
             <div className="w-full mt-2">
                <AreaChart
                  data={CHART_DATA}
                  series={CHART_SERIES}
                  showGrid={false}
                  showLabels={false}
                />
             </div>
             <Divider />
             <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <div className="flex flex-col">
                      <span className="text-xs text-ds-500 uppercase font-bold tracking-wider">Today</span>
                      <span className="text-sm font-bold">12.4k</span>
                  </div>
                  <div className="flex flex-col border-l border-ds-200 dark:border-ds-800 pl-4">
                      <span className="text-xs text-ds-500 uppercase font-bold tracking-wider">Peak</span>
                      <span className="text-sm font-bold">18.2k</span>
                  </div>
                </div>
                <Badge color="info" variant="soft" content="Live" />
             </div>
         </TabsContent>
         <TabsContent value="revenue" className="space-y-4">
             <div className="flex items-center justify-between">
                <div className="flex flex-col">
                   <h4 className="text-sm font-bold">Monthly Yield</h4>
                   <p className="text-xs text-ds-500">Revenue from all nodes.</p>
                </div>
                <div className="flex items-center gap-1 text-ds-success-600 font-bold text-xs">
                   <FiTrendingUp size={14} />
                   <span>+12.4%</span>
                </div>
             </div>
             <div className="py-2">
                <LineChart
                  data={REVENUE_DATA}
                  series={[{ key: 'revenue', label: 'Revenue', color: '#10b981' }]} 
                  showGrid={false}
                  showLabels={true}
                />
             </div>
             <div className="p-3 ds-rounded bg-ds-50/50 dark:bg-ds-800/10 border border-ds-200 dark:border-ds-800 flex items-center justify-between">
                <span className="text-xs font-bold text-ds-500">Total Generated</span>
                <span className="text-sm font-bold">$28,400.00</span>
             </div>
         </TabsContent>
      </Tabs>

      {/* 8. Live Stats Card (New with Animated Numbers) */}
      <Card>
         <CardHeader 
            className="pb-2"
            leftIcon={<FiShoppingCart className="text-ds-success-600" size={18} />}
         >
            <CardTitle className="text-3xl font-medium tracking-tight">
               <AnimateNumber value={liveValue} prefix="$" precision={2} />
            </CardTitle>
            <CardDescription className="flex items-center gap-1.5 mt-1">
               <Badge content="Live" color="success" variant="solid" pulse dot show />
               <span className="text-xs text-ds-500">Real-time transaction stream</span>
            </CardDescription>
         </CardHeader>
         <CardContent>
            <div className="p-3 ds-rounded bg-ds-50/50 dark:bg-ds-800/10 border border-ds-200 dark:border-ds-800 flex items-center justify-between mt-2">
               <div className="flex flex-col">
                  <span className="text-xs text-ds-500 font-bold uppercase tracking-wider">Avg. Ticket</span>
                  <span className="text-base font-bold">$242.10</span>
               </div>
               <div className="flex items-center gap-1 text-ds-success-600 font-bold text-xs">
                  <FiArrowUpRight size={14} />
                  <span>+2.4%</span>
               </div>
            </div>
         </CardContent>
      </Card>

      {/* 5. Interactive Control Panel (Replaces Weekly Progress) */}
      <Card className=" dark:border-ds-800 overflow-visible">
         <CardHeader 
            leftIcon={<FiShield className="text-ds-success-600" size={18} />}
            action={
               <Popover>
                  <PopoverTrigger>
                     <div className="size-8 rounded-full hover:bg-ds-100 dark:hover:bg-ds-800 flex items-center justify-center transition-colors cursor-pointer">
                        <FiMoreHorizontal className="text-ds-500" size={18} />
                     </div>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-64 p-4 space-y-4">
                     <div className="flex flex-col">
                        <span className="text-sm uppercase font-bold">Quick Controls</span>
                        <span className="text-xs text-ds-500">Global platform settings.</span>
                     </div>
                     <Switch label="Live Monitoring" description="Real-time data stream." defaultChecked />
                     <Switch label="Auto Lockdown" description="Secure on high load." />
                     <Switch label="Global CDN" description="Edge optimization." defaultChecked />
                     <Button variant="filled" size="sm" className="w-full mt-2">Apply All</Button>
                  </PopoverContent>
               </Popover>
            }
         >
            <CardTitle>Security Panel</CardTitle>
            <CardDescription>Advanced monitoring controls.</CardDescription>
         </CardHeader>
         <CardContent className="pt-2">
            <div className="grid grid-cols-2 gap-3 mb-6">
               <div className="p-4 ds-rounded bg-ds-50/30 dark:bg-ds-800/20 border border-ds-200 dark:border-ds-800 flex flex-col gap-3">
                  <FiShield className="text-ds-success-600" size={20} />
                  <div>
                     <div className="text-lg font-bold leading-none mb-1">Active</div>
                     <div className="text-xs uppercase font-bold text-ds-500 tracking-wider">Firewall</div>
                  </div>
               </div>
               <div className="p-4 ds-rounded bg-ds-50/30 dark:bg-ds-800/20 border border-ds-200 dark:border-ds-800 flex flex-col gap-3">
                  <FiActivity className="text-ds-primary-600" size={20} />
                  <div>
                     <div className="text-lg font-bold leading-none mb-1">99.9%</div>
                     <div className="text-xs uppercase font-bold text-ds-500 tracking-wider">Uptime</div>
                  </div>
               </div>
            </div>

            <div className="p-3 ds-rounded bg-ds-50/30 dark:bg-ds-800/20 border border-ds-200 dark:border-ds-800 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="size-8 ds-rounded bg-ds-info-500/10 flex items-center justify-center">
                     <FiGlobe className="text-ds-info-600" size={16} />
                  </div>
                  <div>
                      <div className="text-sm font-bold">Traffic Region</div>
                      <div className="text-xs text-ds-500">North America (US-East)</div>
                  </div>
               </div>
               <Badge color="info" variant="soft" content="Optimized" />
            </div>
         </CardContent>
      </Card>

      {/* Active Nodes Stats Card */}
      <StatsCard
        title="Active Nodes"
        value={42}
        trend={-2.4}
        trendLabel="vs last week"
        status="danger"
        icon={<FiZap className="text-ds-danger-600" size={16} />}
        chart={{
          data: [45, 44, 43, 44, 42, 42],
        }}
        animate
      />

      {/* 10. Schedule Card (New - Fills the gap) */}
      <Card>
         <CardHeader
            leftIcon={<FiActivity className="text-ds-primary-600" size={18} />}
            action={<span className="text-xs font-bold text-ds-500">Today</span>}
         >
            <CardTitle>Upcoming</CardTitle>
         </CardHeader>
         <CardContent className="space-y-3">
            <div className="p-3 rounded-[var(--radius-md)] border dark:border-ds-800 flex items-start gap-4">
               <div className="flex flex-col items-center pt-1 border-r  dark:border-ds-800 pr-4">
                  <span className="text-xs font-black leading-none">10:30</span>
                  <span className="text-xs text-ds-500 font-bold">AM</span>
               </div>
               <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                     <span className="text-sm font-bold leading-none">Sync with Design</span>
                     <Badge content="Enforced" color="info" variant="soft" className="text-xs origin-right" />
                  </div>
                  <div className="flex -space-x-2">
                     <Avatar size="xs" src={AVATAR_URLS.user1} />
                     <Avatar size="xs" src={AVATAR_URLS.user2} />
                     <Avatar size="xs" src={AVATAR_URLS.user3} />
                  </div>
               </div>
            </div>

            <div className="p-3 rounded-[var(--radius-md)] border dark:border-ds-800 flex items-start gap-4">
               <div className="flex flex-col items-center pt-1 border-r  dark:border-ds-800 pr-4">
                  <span className="text-xs font-black leading-none">02:15</span>
                  <span className="text-xs text-ds-500 font-bold">PM</span>
               </div>
               <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                     <FiActivity className="text-ds-500" size={12} />
                     <span className="text-sm font-bold leading-none">Code Review</span>
                  </div>
                  <p className="text-xs text-ds-500">Refactoring the core API hooks.</p>
               </div>
            </div>
         </CardContent>
      </Card>

      {/* 12. Core Services (New) */}
      <Card>
         <CardHeader>
            <div className="flex items-center gap-2">
               <FiServer className="text-ds-primary-600" size={18} />
               <CardTitle>Core Services</CardTitle>
            </div>
            <CardDescription>Manage your mission-critical infrastructure.</CardDescription>
         </CardHeader>
         <CardContent className="space-y-3">
            <div className="flex items-center justify-between group">
               <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-ds-success-500/10 flex items-center justify-center">
                     <FiGlobe className="text-ds-success-600" size={16} />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-sm font-bold">Main API</span>
                  </div>
               </div>
               <Switch defaultChecked />
            </div>
            <Divider />
            <div className="flex items-center justify-between group">
               <div className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-ds-primary-500/10 flex items-center justify-center">
                     <FiDatabase className="text-ds-primary-600" size={16} />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-sm font-bold">Vector DB</span>
                  </div>
               </div>
               <Switch />
            </div>
         </CardContent>
      </Card>

      {/* 19. Performance Health (New with Circular Progress) */}
      <Card>
         <CardHeader>
            <div className="flex items-center gap-2">
               <FiActivity className="text-ds-primary-600" size={18} />
               <CardTitle>System Health</CardTitle>
            </div>
            <CardDescription>Real-time performance diagnostics.</CardDescription>
         </CardHeader>
         <CardContent className="flex flex-col gap-6">
            <div className="flex items-center justify-center py-2 gap-8">
               <div className="flex flex-col items-center gap-3">
                  <CircularProgress value={94} size="lg" showValue color="success" trackColor="text-ds-100 dark:text-ds-800" />
                  <span className="text-xs font-bold text-ds-500 uppercase tracking-widest">Uptime</span>
               </div>
               <div className="flex flex-col items-center gap-3">
                  <CircularProgress value={28} size="lg" showValue color="warning" trackColor="text-ds-100 dark:text-ds-800" />
                  <span className="text-xs font-bold text-ds-500 uppercase tracking-widest">Latency</span>
               </div>
            </div>
            <Divider variant="dashed" />
            <div className="space-y-3">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <FiCpu className="text-ds-500" size={14} />
                     <span className="text-sm font-medium">CPU Usage</span>
                  </div>
                  <span className="text-sm font-bold text-ds-success-600">Optimal</span>
               </div>
               <ProgressBar value={12} size="xs" color="success" />
            </div>
         </CardContent>
      </Card>

      {/* New 2: Recent Transactions */}
      <Card>
         <CardHeader
            leftIcon={<FiZap className="text-ds-primary-600" size={18} />}
            action={<Button variant="soft" size="sm" className="h-7 text-xs px-2">View All</Button>}
         >
            <CardTitle>Recent Activity</CardTitle>
         </CardHeader>
         <CardContent className="space-y-4">
            {[
               { name: "Subscription", type: "out", amount: "-$12.00", date: "Today, 10:24 AM", icon: <FiShoppingCart className="text-ds-500" /> },
               { name: "Payout", type: "in", amount: "+$4,210.00", date: "Yesterday, 3:12 PM", icon: <FiArrowDownLeft className="text-ds-success-600" /> },
               { name: "AWS Services", type: "out", amount: "-$184.20", date: "Oct 24, 2:40 PM", icon: <FiServer className="text-ds-500" /> }
            ].map((tx, i) => (
               <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="size-10 rounded-full bg-ds-50/50 dark:bg-ds-800/20 flex items-center justify-center border border-ds-200 dark:border-ds-800">
                        {tx.icon}
                     </div>
                     <div className="flex flex-col">
                        <span className="text-sm font-bold">{tx.name}</span>
                        <span className="text-xs text-ds-500">{tx.date}</span>
                     </div>
                  </div>
                  <span className={`text-sm font-bold ${tx.type === 'in' ? 'text-ds-success-600' : ''}`}>{tx.amount}</span>
               </div>
            ))}
         </CardContent>
      </Card>

      {/* New 6: Drawer Trigger Example */}
      <Card>
         <CardHeader
            leftIcon={<FiActivity className="text-ds-primary-600" size={18} />}
            action={<Badge content="12 New" color="info" variant="soft" pulse />}
         >
            <CardTitle>Activity Log</CardTitle>
            <CardDescription>Track all actions across your team.</CardDescription>
         </CardHeader>
         <CardContent className="space-y-4">
            <div className="space-y-4">
               <div className="flex items-start gap-3">
                  <Avatar src={AVATAR_URLS.user2} size="sm" />
                  <div className="flex flex-col">
                     <span className="text-sm font-bold leading-tight">Ana pushed to <span className="font-mono text-xs bg-ds-100 dark:bg-ds-800 px-1 py-0.5 rounded">main</span></span>
                     <span className="text-xs text-ds-500">2 minutes ago</span>
                  </div>
               </div>
               <div className="flex items-start gap-3">
                  <Avatar src={AVATAR_URLS.user4} size="sm" />
                  <div className="flex flex-col">
                     <span className="text-sm font-bold leading-tight">Mark commented on <span className="text-ds-primary-600 cursor-pointer hover:underline">DS-142</span></span>
                     <span className="text-xs text-ds-500">1 hour ago</span>
                  </div>
               </div>
            </div>
            <Button variant="soft" className="w-full" onClick={() => setIsDrawerOpen(true)}>
               View All Activity Logs
            </Button>
         </CardContent>
      </Card>

      {/* New 10: Browser Stats */}
      <Card>
         <CardHeader leftIcon={<FiGlobe className="text-ds-primary-600" size={18} />}>
            <CardTitle>Top Browsers</CardTitle>
            <CardDescription>Traffic breakdown by engine.</CardDescription>
         </CardHeader>
         <CardContent className="space-y-4">
            <div className="space-y-2">
               <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">Google Chrome</span>
                  <span className="text-sm font-bold text-ds-500">64%</span>
               </div>
               <ProgressBar value={64} color="primary" size="xs" />
            </div>
            <div className="space-y-2">
               <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">Apple Safari</span>
                  <span className="text-sm font-bold text-ds-500">24%</span>
               </div>
               <ProgressBar value={24} color="info" size="xs" />
            </div>
            <div className="space-y-2">
               <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">Mozilla Firefox</span>
                  <span className="text-sm font-bold text-ds-500">12%</span>
               </div>
               <ProgressBar value={12} color="warning" size="xs" />
            </div>
            <Button variant="soft" size="sm" className="w-full mt-2">View Full Analytics</Button>
         </CardContent>
      </Card>

      {/* New 14: Resource Usage */}
      <Card>
         <CardHeader leftIcon={<FiDatabase className="text-ds-primary-600" size={18} />}>
            <CardTitle>Resource Usage</CardTitle>
            <CardDescription>Track compute and storage constraints.</CardDescription>
         </CardHeader>
         <CardContent className="space-y-5">
            <div className="space-y-2">
               <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-ds-500">Compute (vCPU)</span>
                  <span className="font-bold">4.2 / 8 Cores</span>
               </div>
               <ProgressBar value={52} color="primary" />
            </div>
            <div className="space-y-2">
               <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-ds-500">Memory (RAM)</span>
                  <span className="font-bold">12.4 / 16 GB</span>
               </div>
               <ProgressBar value={78} color="warning" />
            </div>
            <Button variant="soft" size="sm" className="w-full mt-2" leftIcon={<FiActivity size={14} />}>View Node Panel</Button>
         </CardContent>
      </Card>

      {/* New 15: Server Config (Refactored) */}
      <Card>
         <CardHeader leftIcon={<FiServer className="text-ds-primary-600" size={18} />}>
            <CardTitle>Environment Config</CardTitle>
            <CardDescription>Provisioning node resources and SLA.</CardDescription>
         </CardHeader>
         <CardContent className="space-y-4">
            <div className="space-y-4">
               <Input 
                  label="Node Identifier" 
                  placeholder="e.g. cluster-0x42-main" 
                  defaultValue="cluster-alpha-001"
               />
               
               <Combobox
                  label="Target Deployment Region"
                  options={[
                    { label: "US East (N. Virginia)", value: "US-East" },
                    { label: "EU West (Dublin)", value: "EU-West" },
                    { label: "AP South (Mumbai)", value: "AP-South" },
                    { label: "US West (Oregon)", value: "US-West" }
                  ]}
                  value={selectedFleet}
                  onChange={setSelectedFleet}
               />

               <div className="grid grid-cols-2 gap-3">
                  <Input 
                    label="vCPU limit" 
                    defaultValue="16" 
                    type="number" 
                    suffix={<span className="text-[10px] font-bold text-ds-500 uppercase tracking-widest pl-2 border-l border-ds-200 dark:border-ds-800">Cores</span>} 
                  />
                  <Input 
                    label="RAM reservation" 
                    defaultValue="32" 
                    type="number" 
                    suffix={<span className="text-[10px] font-bold text-ds-500 uppercase tracking-widest pl-2 border-l border-ds-200 dark:border-ds-800">GB</span>} 
                  />
               </div>

               <div className="p-3 ds-rounded bg-ds-50/50 dark:bg-ds-800/20 border border-ds-200 dark:border-ds-800 flex items-center justify-between">
                  <div className="flex flex-col">
                     <span className="text-xs font-bold text-ds-500 uppercase tracking-widest">Uptime SLA</span>
                     <span className="text-sm font-medium">Enhanced Availability</span>
                  </div>
                  <Badge content="99.9%" color="success" variant="soft" />
               </div>
            </div>

            <Button variant="outlined" className="w-full mt-2">Provision Changes</Button>
         </CardContent>
      </Card>

      {/* Drawers */}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <DrawerHeader>
          <h2 className="text-xl font-bold tracking-tight">Activity Stream</h2>
          <p className="text-sm text-ds-500">Recent actions on your account.</p>
        </DrawerHeader>
        <div className="flex flex-col gap-4 p-6">
          <div className="p-4 rounded-lg bg-ds-50 dark:bg-ds-800 border border-ds-200 dark:border-ds-700">
             <span className="text-sm font-bold block mb-1">New API Key</span>
             <span className="text-xs text-ds-500">Created 2 hours ago by Carlos.</span>
          </div>
          <div className="p-4 rounded-lg bg-ds-50 dark:bg-ds-800 border border-ds-200 dark:border-ds-700">
             <span className="text-sm font-bold block mb-1">Billing Updated</span>
             <span className="text-xs text-ds-500">Payment method changed.</span>
          </div>
          <div className="p-4 rounded-lg bg-ds-50 dark:bg-ds-800 border border-ds-200 dark:border-ds-700">
             <span className="text-sm font-bold block mb-1">System Reboot</span>
             <span className="text-xs text-ds-500">Automated maintenance window.</span>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
