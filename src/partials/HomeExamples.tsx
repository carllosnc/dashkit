import * as React from 'react';
import { FiLock, FiMail, FiZap, FiSettings, FiMoreHorizontal, FiShield, FiActivity, FiGlobe, FiTrendingUp, FiCpu, FiHardDrive, FiLayers, FiShoppingCart, FiArrowUpRight, FiBarChart2, FiCalendar, FiClock } from 'react-icons/fi';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card/Card';
import { Button } from '../components/Button/Button';
import { Input } from '../components/Input/Input';
import { Badge } from '../components/Badge/Badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/Tabs/Tabs';
import { AreaChart } from '../components/AreaChart/AreaChart';
import { LineChart } from '../components/LineChart/LineChart';
import { BarChart } from '../components/BarChart/BarChart';
import { Checkbox } from '../components/Checkbox/Checkbox';
import { Radio } from '../components/Radio/Radio';
import { Popover, PopoverTrigger, PopoverContent } from '../components/Popover/Popover';
import { Switch } from '../components/Switch/Switch';
import { ProgressBar } from '../components/ProgressBar/ProgressBar';
import { Avatar, AvatarGroup } from '../components/Avatar/Avatar';
import { AnimateNumber } from '../components/AnimateNumber/AnimateNumber';
import { Divider } from '../components/Divider/Divider';

const AVATAR_URLS = {
  user1: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120&h=120&auto=format&fit=crop",
  user2: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&h=120&auto=format&fit=crop",
  user3: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=120&h=120&auto=format&fit=crop",
  user4: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=120&h=120&auto=format&fit=crop",
  user5: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=120&h=120&auto=format&fit=crop",
};

/**
 * Mock data for the AreaChart example
 */
const CHART_DATA = [
    { label: 'Jan', value: 400, secondary: 240 },
    { label: 'Feb', value: 300, secondary: 139 },
    { label: 'Mar', value: 600, secondary: 980 },
    { label: 'Apr', value: 800, secondary: 390 },
    { label: 'May', value: 500, secondary: 480 },
    { label: 'Jun', value: 900, secondary: 380 },
];

const REVENUE_DATA = [
     { label: 'Mon', revenue: 2100 },
     { label: 'Tue', revenue: 3400 },
     { label: 'Wed', revenue: 2800 },
     { label: 'Thu', revenue: 4500 },
     { label: 'Fri', revenue: 3900 },
     { label: 'Sat', revenue: 5200 },
     { label: 'Sun', revenue: 4800 },
];

const CONVERSION_DATA = [
    { label: 'Social', desktop: 4200, mobile: 5800 },
    { label: 'Direct', desktop: 6100, mobile: 3900 },
    { label: 'Organic', desktop: 8900, mobile: 7200 },
    { label: 'Ads', desktop: 5200, mobile: 6800 },
];

const CHART_SERIES = [
    { key: 'value', label: 'Active Users', color: '#3b82f6' },
    { key: 'secondary', label: 'Retention', color: '#10b981' }
];

/**
 * HomeExamples partial component
 * Displays a grid of small component usage examples for the landing page.
 */
export function HomeExamples() {
  const [liveValue, setLiveValue] = React.useState(12400.50);

  React.useEffect(() => {
    const interval = setInterval(() => {
        setLiveValue(prev => prev + (Math.random() * 50));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-7xl mx-auto px-4 py-20 items-start">

      {/* Column 1 */}
      <div className="flex flex-col gap-4">
        {/* 1. Login Form Example */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Welcome Back</CardTitle>
            <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Email Address"
              placeholder="name@example.com"
              leftIcon={<FiMail size={16} />}
              defaultValue="carllos@dashkit.ui"
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              leftIcon={<FiLock size={16} />}
              defaultValue="password123"
            />
            <Button className="w-full mt-2" variant="filled">Sign in to account</Button>

            <Divider className="py-2">Or continue with</Divider>

            <div className="grid grid-cols-2 gap-3">
               <Button variant="outlined" className="w-full flex items-center gap-2">
                  <FaGoogle size={14} />
                  Google
               </Button>
               <Button variant="outlined" className="w-full flex items-center gap-2">
                  <FaGithub size={14} />
                  GitHub
               </Button>
            </div>

            <div className="text-center pt-2">
               <a href="#" className="text-sm text-ds-500 hover:text-ds-primary-500 transition-colors">Forgot your password?</a>
            </div>
          </CardContent>
        </Card>

        {/* 4. Action / Quick Settings Example */}
        <Card>
          <CardHeader>
             <CardTitle className="text-lg">System Optimizer</CardTitle>
             <CardDescription>Configure your node performance and scaling settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-4 p-4 rounded-[var(--radius-md)] bg-ds-50 dark:bg-ds-900/50 border border-ds-300 dark:border-ds-800 text-ds-950 dark:text-ds-50">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-ds-500">Current Load</span>
                    <FiZap size={14} className="text-ds-primary-600" />
                </div>
                <div className="text-3xl font-bold tracking-tighter">84.2%</div>
                <ProgressBar
                  value={84.2}
                  size="sm"
                  color="primary"
                />
            </div>

            <div className="flex flex-col gap-3">
                <Button variant="outlined" className="w-full">Run System Diagnostics</Button>
                <Button variant="soft" className="w-full">Export Metrics Data</Button>
            </div>
          </CardContent>
        </Card>

        {/* 7. Team Activity Card (New with Avatars) */}
        <Card>
           <CardHeader>
              <div className="flex flex-row items-center justify-between">
                 <div className="flex flex-col gap-1">
                    <CardTitle className="text-lg">Active Team</CardTitle>
                    <CardDescription>Members currently online.</CardDescription>
                 </div>
                 <Badge content="12 Active" color="success" className="text-xs" />
              </div>
           </CardHeader>
           <CardContent className="space-y-6 pt-0">
              <div className="flex items-center justify-between p-3 rounded-[var(--radius-md)] border border-ds-200 dark:border-ds-800 bg-ds-50/50 dark:bg-ds-100/5">
                 <div className="flex items-center gap-3">
                    <AvatarGroup max={3} spacing="md" size="sm">
                       <Avatar src={AVATAR_URLS.user1} alt="User 1" />
                       <Avatar src={AVATAR_URLS.user2} alt="User 2" />
                       <Avatar src={AVATAR_URLS.user3} alt="User 3" />
                       <Avatar src={AVATAR_URLS.user4} alt="User 4" />
                       <Avatar src={AVATAR_URLS.user5} alt="User 5" />
                    </AvatarGroup>
                    <div className="flex flex-col">
                       <span className="text-sm font-bold">In Collaboration</span>
                       <span className="text-xs text-ds-500">Design System Project</span>
                    </div>
                 </div>
                 <div className="size-8 rounded-full bg-ds-200/50 dark:bg-ds-800 flex items-center justify-center">
                    <FiMoreHorizontal size={14} className="text-ds-500" />
                 </div>
              </div>

              <div className="space-y-4">
                 <div className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                       <Avatar size="sm" src={AVATAR_URLS.user1} alt="Carlos N." />
                       <div className="flex flex-col">
                          <span className="text-sm font-bold group-hover:text-ds-primary-600 transition-colors">Carlos N.</span>
                          <span className="text-xs text-ds-500 italic">Lead Architect</span>
                       </div>
                    </div>
                    <FiTrendingUp className="text-ds-success-600" size={14} />
                 </div>

                 <div className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                       <Avatar size="sm" src={AVATAR_URLS.user2} alt="Ana Blue" />
                       <div className="flex flex-col">
                          <span className="text-sm font-bold group-hover:text-ds-primary-600 transition-colors">Ana Blue</span>
                          <span className="text-xs text-ds-500 italic">Product Manager</span>
                       </div>
                    </div>
                    <div className="size-2 rounded-full bg-ds-success-500" />
                 </div>
              </div>
           </CardContent>
        </Card>
      </div>

      {/* Column 2 */}
      <div className="flex flex-col gap-4">
        {/* 2. Tabs & Data Visualization */}
        <Tabs defaultValue="overview">
           <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
           </TabsList>
           <TabsContent value="overview" className="space-y-4">
               <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-bold text-ds-950 dark:text-ds-50">Platform Traffic</h4>
                  <p className="text-xs text-ds-500">Real-time engagement metrics for your apps.</p>
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
                        <span className="text-xs text-ds-500 uppercase font-bold">Today</span>
                        <span className="text-sm font-bold">12.4k</span>
                    </div>
                    <div className="flex flex-col border-l border-ds-200 dark:border-ds-800 pl-4">
                        <span className="text-xs text-ds-500 uppercase font-bold">Peak</span>
                        <span className="text-sm font-bold">18.2k</span>
                    </div>
                  </div>
                  <Badge color="info" content="Live" />
               </div>
           </TabsContent>
           <TabsContent value="revenue" className="space-y-4">
               <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                     <h4 className="text-sm font-bold text-ds-950 dark:text-ds-50">Monthly Yield</h4>
                     <p className="text-xs text-ds-500">Total revenue generated from all nodes.</p>
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
               <div className="p-3 rounded-[var(--radius-md)] bg-ds-50 dark:bg-ds-900 border border-ds-200 dark:border-ds-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-ds-500">Total Generated</span>
                  <span className="text-sm font-bold text-ds-950 dark:text-ds-50">$28,400.00</span>
               </div>
           </TabsContent>
        </Tabs>

        {/* 8. Live Stats Card (New with Animated Numbers) */}
        <Card>
           <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-1">
                 <div className="size-5 rounded-full bg-ds-success-500/10 flex items-center justify-center">
                    <FiShoppingCart className="text-ds-success-600" size={12} />
                 </div>
                 <span className="text-xs font-bold text-ds-500 uppercase tracking-widest">Global Sales</span>
              </div>
              <CardTitle className="text-3xl font-medium">
                 <AnimateNumber value={liveValue} prefix="$" precision={2} />
              </CardTitle>
              <CardDescription className="flex items-center gap-1.5 mt-1">
                 <Badge content="Live" color="success" pulse dot show className="size-2" />
                 <span className="text-xs text-ds-500">Real-time transaction stream</span>
              </CardDescription>
           </CardHeader>
           <CardContent>
              <div className="p-3 rounded-[var(--radius-md)] bg-ds-50 dark:bg-ds-900 border border-ds-200 dark:border-ds-800 flex items-center justify-between mt-2">
                 <div className="flex flex-col">
                    <span className="text-xs text-ds-500 font-bold uppercase">Avg. Ticket</span>
                    <span className="text-sm font-black">$242.10</span>
                 </div>
                 <div className="flex items-center gap-1 text-ds-success-600 font-bold text-xs">
                    <FiArrowUpRight size={14} />
                    <span>+2.4%</span>
                 </div>
              </div>
           </CardContent>
        </Card>

        {/* 5. Interactive Control Panel (Replaces Weekly Progress) */}
        <Card shadowed className="border-ds-200 dark:border-ds-800 overflow-visible">
           <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="flex flex-col gap-1">
                 <CardTitle className="text-lg">Security Panel</CardTitle>
                 <CardDescription>Advanced monitoring controls.</CardDescription>
              </div>
              <Popover>
                 <PopoverTrigger>
                    <div className="size-8 rounded-full hover:bg-ds-100 dark:hover:bg-ds-800 flex items-center justify-center transition-colors cursor-pointer">
                       <FiMoreHorizontal className="text-ds-500" size={18} />
                    </div>
                 </PopoverTrigger>
                 <PopoverContent align="end" className="w-64 p-4 space-y-4 border-ds-200 dark:border-ds-800">
                    <div className="flex flex-col gap-0.5 border-b border-ds-200 dark:border-ds-800 pb-3 mb-1">
                        <span className="text-xs font-bold text-ds-950 dark:text-ds-50">Quick Controls</span>
                        <span className="text-xs text-ds-500">Master layout and global settings.</span>
                    </div>
                    <Switch label="Live Monitoring" description="Enable real-time data streaming." defaultChecked />
                    <Switch label="Auto Lockdown" description="Secure nodes on high load." />
                    <Switch label="Global CDN" description="Edge delivery optimization." defaultChecked />
                    <Button variant="filled" size="sm" className="w-full mt-2">Apply All</Button>
                 </PopoverContent>
              </Popover>
           </CardHeader>
           <CardContent className="pt-2">
              <div className="grid grid-cols-2 gap-3 mb-6">
                 <div className="p-4 rounded-[var(--radius-md)] bg-white dark:bg-ds-900 border border-ds-200 dark:border-ds-800 flex flex-col gap-3">
                    <FiShield className="text-ds-success-600" size={20} />
                    <div>
                       <div className="text-lg font-bold leading-none mb-1">Active</div>
                       <div className="text-xs uppercase font-bold text-ds-500 tracking-wider">Firewall</div>
                    </div>
                 </div>
                 <div className="p-4 rounded-[var(--radius-md)] bg-white dark:bg-ds-900 border border-ds-200 dark:border-ds-800 flex flex-col gap-3">
                    <FiActivity className="text-ds-primary-600" size={20} />
                    <div>
                       <div className="text-lg font-bold leading-none mb-1">99.9%</div>
                       <div className="text-xs uppercase font-bold text-ds-500 tracking-wider">Uptime</div>
                    </div>
                 </div>
              </div>

              <div className="p-3 rounded-[var(--radius-md)] bg-white dark:bg-ds-900 border border-ds-200 dark:border-ds-800 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="size-8 rounded-[var(--radius)] bg-ds-info-500/10 flex items-center justify-center">
                       <FiGlobe className="text-ds-info-600" size={16} />
                    </div>
                    <div>
                        <div className="text-sm font-bold">Traffic Region</div>
                        <div className="text-xs text-ds-500">North America (US-East)</div>
                    </div>
                 </div>
                 <Badge color="info" content="Optimized" className="text-xs" />
              </div>
           </CardContent>
        </Card>

        {/* 10. Schedule Card (New - Fills the gap) */}
        <Card>
           <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <FiCalendar className="text-ds-primary-600" size={18} />
                    <CardTitle className="text-lg">Upcoming</CardTitle>
                 </div>
                 <span className="text-xs font-bold text-ds-500">Today</span>
              </div>
           </CardHeader>
           <CardContent className="space-y-3">
              <div className="p-3 rounded-[var(--radius-md)] bg-ds-50 dark:bg-ds-100/5 border border-ds-200 dark:border-ds-800 flex items-start gap-4">
                 <div className="flex flex-col items-center pt-1 border-r border-ds-200 dark:border-ds-800 pr-4">
                    <span className="text-xs font-black leading-none">10:30</span>
                    <span className="text-[10px] text-ds-500 font-bold">AM</span>
                 </div>
                 <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-sm font-bold leading-none">Sync with Design</span>
                       <Badge content="Meeting" color="info" className="text-[10px] scale-90 origin-right" />
                    </div>
                    <AvatarGroup size="xs" max={3}>
                       <Avatar src={AVATAR_URLS.user1} />
                       <Avatar src={AVATAR_URLS.user2} />
                       <Avatar src={AVATAR_URLS.user3} />
                    </AvatarGroup>
                 </div>
              </div>

              <div className="p-3 rounded-[var(--radius-md)] border border-dashed border-ds-200 dark:border-ds-800 flex items-start gap-4">
                 <div className="flex flex-col items-center pt-1 border-r border-ds-200 dark:border-ds-800 pr-4">
                    <span className="text-xs font-black leading-none">02:15</span>
                    <span className="text-[10px] text-ds-500 font-bold">PM</span>
                 </div>
                 <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                       <FiClock className="text-ds-500" size={12} />
                       <span className="text-sm font-bold leading-none">Code Review</span>
                    </div>
                    <p className="text-xs text-ds-500">Refactoring the core API hooks.</p>
                 </div>
              </div>
           </CardContent>
        </Card>
      </div>

      {/* Column 3 */}
      <div className="flex flex-col gap-4">
        {/* 3. Settings & Preferences Example */}
        <Card>
          <CardHeader>
             <div className="flex items-center gap-2">
                <div className="size-6 rounded-[var(--radius)] bg-ds-primary-500/10 flex items-center justify-center">
                   <FiSettings className="text-ds-primary-600" size={14} />
                </div>
                <CardTitle className="text-lg">Preferences</CardTitle>
             </div>
             <CardDescription>Manage your workspace and notification settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-ds-500">Privacy & Security</span>
                <div className="space-y-3">
                   <Checkbox 
                     label="Two-factor auth" 
                     description="Secure your account with 2FA." 
                     defaultChecked
                   />
                   <Checkbox 
                     label="Public profile" 
                     description="Allow others to see your stats." 
                   />
                </div>
            </div>

            <div className="space-y-4 border-t border-ds-200 dark:border-ds-800 pt-6">
                <span className="text-xs font-bold uppercase tracking-widest text-ds-500">Subscription Plan</span>
                <div className="space-y-3">
                   <Radio 
                     name="plan" 
                     label="Starter Plan" 
                     description="Free forever for 1 user." 
                   />
                   <Radio 
                     name="plan" 
                     label="Pro Plan" 
                     description="$12/mo for unlimited team." 
                     defaultChecked
                   />
                </div>
            </div>

            <Button className="w-full" variant="outlined">Save Changes</Button>
          </CardContent>
        </Card>

        {/* 9. Conversion Overview Card (New with BarChart) */}
        <Card>
           <CardHeader className="pb-4">
              <div className="flex items-center justify-between gap-[20px">
                 <div className="flex items-center gap-2">
                    <FiBarChart2 className="text-ds-primary-600" size={18} />
                    <CardTitle className="text-lg leading-none">Traffic Sources</CardTitle>
                 </div>
                 <Badge content="Monthly" color="info" className="text-xs" />
              </div>
              <Divider className='my-[10px]' />
              <CardDescription>Performance comparison across channels.</CardDescription>
           </CardHeader>
           <CardContent className="h-[200px] w-full pt-0">
               <BarChart
                 data={CONVERSION_DATA}
                 series={[
                   { key: 'desktop', label: 'Desktop', color: '#3b82f6' },
                   { key: 'mobile', label: 'Mobile', color: '#10b981' }
                 ]} 
                 showGrid={false}
                 rounded
                 barGap={2}
               />
           </CardContent>
           <div className="px-6 pt-4 flex items-center justify-around">
              <div className="flex flex-col items-center text-center">
                 <span className="text-xs uppercase font-bold text-ds-500">Highest</span>
                 <span className="text-sm font-bold text-ds-950 dark:text-ds-50">Organic</span>
              </div>
              <Divider orientation="vertical" className="h-8" />
              <div className="flex flex-col items-center text-center">
                 <span className="text-xs uppercase font-bold text-ds-500">Engagement</span>
                 <span className="text-sm font-bold text-ds-success-600">+18.4%</span>
              </div>
           </div>
        </Card>

        {/* 6. Resource Allocation Card (New) */}
        <Card>
           <CardHeader>
              <CardTitle className="text-lg">Resource Allocation</CardTitle>
              <CardDescription>Current infrastructure utilization.</CardDescription>
           </CardHeader>
           <CardContent className="space-y-6 pt-0">
              <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <FiCpu className="text-ds-danger-600" size={16} />
                       <span className="text-sm font-medium">CPU Usage</span>
                    </div>
                    <Badge content="High" color="danger" className="text-xs" />
                  </div>
                 <ProgressBar value={92} color="danger" size="xs" animate />
              </div>

              <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <FiHardDrive className="text-ds-primary-600" size={16} />
                       <span className="text-sm font-medium">Storage Allocation</span>
                    </div>
                    <Badge content="Normal" color="base" className="text-xs" />
                 </div>
                 <ProgressBar value={45} color="primary" size="xs" animate />
              </div>

              <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <FiLayers className="text-ds-success-600" size={16} />
                       <span className="text-sm font-medium">Memory Buffer</span>
                    </div>
                    <Badge content="Optimal" color="success" className="text-xs" />
                 </div>
                 <ProgressBar value={18} color="success" size="xs" animate />
              </div>
           </CardContent>
        </Card>
      </div>

    </div>
  );
}
