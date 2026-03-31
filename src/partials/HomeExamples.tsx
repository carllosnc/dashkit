import * as React from 'react';
import { FiLock, FiMail, FiZap, FiSettings, FiMoreHorizontal, FiShield, FiActivity, FiGlobe, FiTrendingUp, FiDatabase, FiShieldOff, FiServer, FiBell, FiList, FiFolder, FiShare2, FiMessageSquare, FiBarChart2, FiCalendar, FiClock, FiShoppingCart, FiArrowUpRight, FiDollarSign, FiCpu, FiCheckCircle, FiXCircle, FiPlay, FiSkipBack, FiSkipForward, FiArrowDownLeft, FiMonitor, FiSmartphone, FiCopy, FiUserPlus, FiFileText, FiDownload, FiSend, FiHelpCircle } from 'react-icons/fi';
import { FaGithub, FaGoogle, FaSlack, FaDiscord, FaAws, FaFigma } from 'react-icons/fa';
import { SiVercel, SiNotion } from 'react-icons/si';
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
import { Chip } from '../components/Chip/Chip';
import { OtpInput } from '../components/OtpInput/OtpInput';
import { Slider } from '../components/Slider/Slider';
import { CircularProgress } from '../components/CircularProgress/CircularProgress';
import { SystemLogs, type LogEntry } from '../components/SystemLogs/SystemLogs';
import { Surface } from '../components/Surface/Surface';
import { Modal, ModalHeader, ModalContent, ModalFooter } from '../components/Modal/Modal';
import { Drawer, DrawerHeader } from '../components/Drawer/Drawer';
import { toast } from '../components/Toast/useToast';
import { Select } from '../components/Select/Select';
import { Stepper, Step } from '../components/Stepper';

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

export function HomeExamples() {
  const [liveValue, setLiveValue] = React.useState(12400.50);
  const [selectedSurveys, setSelectedSurveys] = React.useState<string[]>(['Development', 'Design']);
  const [otp, setOtp] = React.useState('');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [tasks, setTasks] = React.useState([
    { label: "Refactor API layer", checked: true },
    { label: "Update documentation", checked: true },
    { label: "Finalize color tokens", checked: false },
    { label: "Performance audit", checked: false },
  ]);

  const completedCount = tasks.filter(t => t.checked).length;
  const progressValue = (completedCount / tasks.length) * 100;

  const toggleTask = (index: number) => {
    setTasks(prev => prev.map((t, i) => i === index ? { ...t, checked: !t.checked } : t));
  };

  const [MOCK_LOGS] = React.useState<LogEntry[]>([
    { type: 'ok', message: 'Initialized edge gateway...', timestamp: '14:20:01' },
    { type: 'info', message: 'Indexing 4,208 vectors...', timestamp: '14:20:05' },
    { type: 'warn', message: 'Rate limit approaching (US-E)', timestamp: '14:21:12' },
    { type: 'ok', message: 'Handshake verified (0x42...F)', timestamp: '14:22:30' },
  ]);

  React.useEffect(() => {
    const interval = setInterval(() => {
        setLiveValue(prev => prev + (Math.random() * 50));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-[1600px] mx-auto px-4 py-20 items-start">

      {/* Column 1 */}
      <div className="flex flex-col gap-4">
        {/* 1. Login Form Example */}
        <Card>
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
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
             <CardTitle>System Optimizer</CardTitle>
             <CardDescription>Configure your node performance and scaling settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 p-4 ds-rounded bg-ds-50/50 dark:bg-ds-900/50 border border-ds-200 dark:border-ds-800">
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
                    <CardTitle>Active Team</CardTitle>
                    <CardDescription>Members currently online.</CardDescription>
                 </div>
                 <Badge content="12 Active" color="success" variant="soft" />
              </div>
           </CardHeader>
           <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-3 ds-rounded border border-ds-200 dark:border-ds-800 bg-ds-50/30 dark:bg-ds-800/20">
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
                 <Button variant="soft" size="sm" className="p-0 size-8 aspect-square min-w-0">
                    <FiMoreHorizontal size={14} className="mx-auto" />
                 </Button>
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

        {/* 11. Security Events (New) */}
        <Card>
           <CardHeader>
              <div className="flex items-center justify-between">
                 <div className="flex flex-col gap-1">
                    <CardTitle>Security Events</CardTitle>
                    <CardDescription>Recent threat intelligence log.</CardDescription>
                 </div>
                 <FiShield size={18} className="text-ds-danger-600" />
              </div>
           </CardHeader>
           <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 ds-rounded border border-ds-200 dark:border-ds-800 bg-ds-50/30 dark:bg-ds-100/5">
                 <div className="flex items-center gap-3">
                    <FiShieldOff className="text-ds-danger-600" size={16} />
                    <div className="flex flex-col">
                       <span className="text-sm font-bold leading-tight">Unauthorized Entry</span>
                       <span className="text-xs text-ds-500 tracking-wider font-bold uppercase">Node 0x42-E</span>
                    </div>
                 </div>
                 <Badge content="Critical" color="danger" variant="soft" className="text-xs" />
              </div>
              <div className="flex items-center justify-between p-3 ds-rounded border border-ds-200 dark:border-ds-800 bg-ds-50/30 dark:bg-ds-100/5">
                 <div className="flex items-center gap-3">
                    <FiActivity className="text-ds-warning-600" size={16} />
                    <div className="flex flex-col">
                       <span className="text-sm font-bold leading-tight">API Rate Limit</span>
                       <span className="text-xs text-ds-500 tracking-wider font-bold uppercase">Public Access</span>
                    </div>
                 </div>
                 <Badge content="Warning" color="warning" variant="soft" className="text-xs" />
              </div>
              <Button variant="outlined" size="sm" className="w-full">View Security Logs</Button>
           </CardContent>
        </Card>

        {/* 18. Wallet Portfolio (New) */}
        <Card>
           <CardHeader>
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <FiDollarSign className="text-ds-success-600" size={18} />
                    <CardTitle>Portfolio</CardTitle>
                 </div>
                 <Badge content="Active" color="success" variant="soft" />
              </div>
           </CardHeader>
           <CardContent className="space-y-4">
              <div className="flex flex-col gap-1">
                 <span className="text-xs text-ds-500 font-bold uppercase tracking-widest">Total Balance</span>
                 <div className="text-3xl font-bold tracking-tighter">
                   <AnimateNumber value={42850.25} prefix="$" precision={2} />
                 </div>
              </div>
              <Surface variant="success" className="p-3 flex items-center justify-between">
                 <div className="flex items-center gap-2 text-ds-success-600">
                    <FiTrendingUp size={14} />
                    <span className="text-xs font-bold">+12.4% this month</span>
                 </div>
                 <span className="text-xs font-bold text-ds-900 dark:text-ds-100">+$4,210.00</span>
              </Surface>
              <div className="grid grid-cols-2 gap-2">
                 <Button variant="filled" size="sm" className="w-full">Trade</Button>
                 <Button variant="soft" size="sm" className="w-full">History</Button>
              </div>
           </CardContent>
        </Card>

        {/* New 1: Podcast / Audio Player */}
        <Card>
           <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                 <Avatar src={AVATAR_URLS.user3} size="lg" shape="square" className="rounded-xl" />
                 <div className="flex flex-col flex-1">
                    <span className="text-sm font-bold tracking-tight">Design Details</span>
                    <span className="text-xs text-ds-500">Episode 42: The future of UI frameworks.</span>
                 </div>
              </div>
              <div className="flex flex-col gap-1">
                 <Slider defaultValue={35} showValue={false} />
                 <div className="flex items-center justify-between text-xs text-ds-500 font-medium font-mono">
                    <span>12:45</span>
                    <span>32:10</span>
                 </div>
              </div>
              <div className="flex items-center justify-between px-4">
                 <Button variant="soft" size="sm" className="rounded-full size-10 flex items-center justify-center p-0">
                    <FiSkipBack size={16} />
                 </Button>
                 <Button variant="filled" size="sm" className="rounded-full size-12 flex items-center justify-center p-0 shadow-lg shadow-primary/30 group">
                    <FiPlay size={20} className="ml-1 group-hover:scale-110 transition-transform" />
                 </Button>
                 <Button variant="soft" size="sm" className="rounded-full size-10 flex items-center justify-center p-0">
                    <FiSkipForward size={16} />
                 </Button>
              </div>
           </CardContent>
        </Card>

        {/* New 5: Modal Trigger Example */}
        <Card>
           <CardHeader>
              <div className="flex items-center gap-3">
                 <div className="size-8 rounded-full bg-ds-danger-500/10 flex items-center justify-center">
                    <FiLock className="text-ds-danger-600" size={16} />
                 </div>
                 <div className="flex flex-col">
                    <CardTitle>Danger Zone</CardTitle>
                    <CardDescription>Irreversible actions for this project.</CardDescription>
                 </div>
              </div>
           </CardHeader>
           <CardContent className="space-y-4">
              <div className="p-3 ds-rounded border border-ds-danger-200 bg-ds-danger-50 dark:border-ds-danger-900/50 dark:bg-ds-danger-500/10 flex flex-col gap-1">
                 <span className="text-sm font-bold text-ds-danger-800 dark:text-ds-danger-200">Delete this project</span>
                 <span className="text-xs text-ds-danger-600 dark:text-ds-danger-400">Once you delete it, there is no going back. Please be certain.</span>
              </div>
              <Button variant="outlined" className="w-full text-ds-danger-600 hover:bg-ds-danger-50 hover:border-ds-danger-200 dark:hover:bg-ds-danger-500/10 dark:hover:border-ds-danger-500/30" onClick={() => setIsModalOpen(true)}>
                 Delete Project
              </Button>
           </CardContent>
        </Card>

        {/* New 9: Support Ticket */}
        <Card>
           <CardHeader>
              <div className="flex items-center justify-between">
                 <div className="flex flex-col gap-1">
                    <CardTitle>Active Ticket</CardTitle>
                    <CardDescription>Support requested.</CardDescription>
                 </div>
                 <Badge content="High Priority" color="danger" variant="soft" />
              </div>
           </CardHeader>
           <CardContent className="space-y-4">
               <Stepper activeStep={1} orientation="vertical" className="mt-2 ml-1">
                  <Step 
                     title={<span className="text-sm font-bold leading-tight">Billing page crash on Safari</span>}
                     description="Ticket #1042 • Opened 2 hours ago"
                     icon={<FiHelpCircle size={14} />}
                  />
                  <Step 
                     title={<span className="text-sm font-bold leading-tight">Support Team (Ana)</span>}
                     description="We're looking into this right away. Fix deploying soon!"
                     icon={<Avatar src={AVATAR_URLS.user2} size="xs" />}
                  />
               </Stepper>
               <Button variant="outlined" size="sm" className="w-full">Reply to Ticket</Button>
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
           <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-1">
                 <div className="size-5 rounded-full bg-ds-success-500/10 flex items-center justify-center">
                    <FiShoppingCart className="text-ds-success-600" size={12} />
                 </div>
                 <span className="text-xs font-bold text-ds-500 uppercase tracking-widest">Global Sales</span>
              </div>
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
        <Card shadowed className=" dark:border-ds-800 overflow-visible">
           <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="flex flex-col gap-1">
                 <CardTitle>Security Panel</CardTitle>
                 <CardDescription>Advanced monitoring controls.</CardDescription>
              </div>
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

        {/* 10. Schedule Card (New - Fills the gap) */}
        <Card>
           <CardHeader>
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <FiCalendar className="text-ds-primary-600" size={18} />
                    <CardTitle>Upcoming</CardTitle>
                 </div>
                 <span className="text-xs font-bold text-ds-500">Today</span>
              </div>
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
                       <Badge content="Meeting" color="info" variant="soft" className="text-xs origin-right" />
                    </div>
                    <AvatarGroup size="xs" max={3}>
                       <Avatar src={AVATAR_URLS.user1} />
                       <Avatar src={AVATAR_URLS.user2} />
                       <Avatar src={AVATAR_URLS.user3} />
                    </AvatarGroup>
                 </div>
              </div>

              <div className="p-3 rounded-[var(--radius-md)] border dark:border-ds-800 flex items-start gap-4">
                 <div className="flex flex-col items-center pt-1 border-r  dark:border-ds-800 pr-4">
                    <span className="text-xs font-black leading-none">02:15</span>
                    <span className="text-xs text-ds-500 font-bold">PM</span>
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
           <CardHeader>
              <div className="flex items-center justify-between">
                 <CardTitle>Recent Activity</CardTitle>
                 <Button variant="soft" size="sm" className="h-7 text-xs px-2">View All</Button>
              </div>
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
           <CardHeader>
              <div className="flex items-center justify-between">
                 <div className="flex flex-col gap-1">
                    <CardTitle>Activity Log</CardTitle>
                    <CardDescription>Track all actions across your team.</CardDescription>
                 </div>
                 <Badge content="12 New" color="info" variant="soft" pulse />
              </div>
           </CardHeader>
           <CardContent className="space-y-4">
              <div className="space-y-4">
                 <div className="flex items-start gap-3">
                    <Avatar src={AVATAR_URLS.user2} size="sm" />
                    <div className="flex flex-col">
                       <span className="text-sm font-bold leading-tight">Ana pushed to <span className="font-mono text-[10px] bg-ds-100 dark:bg-ds-800 px-1 py-0.5 rounded">main</span></span>
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
           <CardHeader>
              <div className="flex items-center gap-3">
                 <div className="size-8 ds-rounded bg-ds-primary-500/10 flex items-center justify-center">
                    <FiGlobe className="text-ds-primary-600" size={16} />
                 </div>
                 <div className="flex flex-col gap-1">
                    <CardTitle>Top Browsers</CardTitle>
                    <CardDescription>Traffic breakdown by engine.</CardDescription>
                 </div>
              </div>
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
      </div>

      {/* Column 3 */}
      <div className="flex flex-col gap-4">
        {/* 3. Settings & Preferences Example */}
        <Card>
          <CardHeader>
             <div className="flex items-center gap-2">
                <div className="size-6 ds-rounded bg-ds-primary-500/10 flex items-center justify-center">
                   <FiSettings className="text-ds-primary-600" size={14} />
                </div>
                <CardTitle>Preferences</CardTitle>
             </div>
             <CardDescription>Manage your workspace and notification settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
               <span className="text-xs block font-bold uppercase tracking-widest text-ds-500">Privacy & Security</span>
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

            <div className="space-y-4 border-t  dark:border-ds-800 pt-6">
               <span className="text-xs block font-bold uppercase tracking-widest text-ds-500">Subscription Plan</span>
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

            <Button className="w-full" variant="outlined">Save Changes</Button>
          </CardContent>
        </Card>

        {/* 9. Conversion Overview Card (New with BarChart) */}
        <Card>
            <CardHeader>
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FiBarChart2 className="text-ds-primary-600" size={18} />
                    <CardTitle>Traffic Sources</CardTitle>
                 </div>
                 <Badge content="Monthly" color="info" variant="soft" />
              </div>
           </CardHeader>
           <CardContent className="space-y-6">
            <div className="w-full">
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
            </div>
            <Divider />
            <div className="flex items-center justify-around">
               <div className="flex flex-col items-center text-center">
                  <span className="text-xs uppercase font-bold text-ds-500 tracking-wider">Highest</span>
                  <span className="text-sm font-bold">Organic</span>
               </div>
               <Divider orientation="vertical" />
               <div className="flex flex-col items-center text-center">
                  <span className="text-xs uppercase font-bold text-ds-500 tracking-wider">Engagement</span>
                  <span className="text-sm font-bold text-ds-success-600">+18.4%</span>
               </div>
            </div>
           </CardContent>
        </Card>

        {/* 6. OTP Verification Card */}
        <Card>
           <CardHeader>
              <CardTitle>Two-Factor Auth</CardTitle>
              <CardDescription>Enter the 6-digit code sent to your device.</CardDescription>
           </CardHeader>
           <CardContent className="space-y-6">
              <OtpInput 
                 length={6}
                 value={otp}
                 onChange={setOtp}
                 containerClassName="justify-between"
              />
              <div className="space-y-3">
                 <Button variant="filled" className="w-full">Verify Identity</Button>
                 <div className="text-center">
                    <span className="text-xs text-ds-500">Didn't receive the code? </span>
                    <button className="text-xs font-bold text-ds-primary-600 hover:underline cursor-pointer">Resend</button>
                 </div>
              </div>
           </CardContent>
        </Card>
        {/* 13. Personalization Survey (New) */}
        <Card>
           <CardHeader>
              <CardTitle>Personalize your experience</CardTitle>
              <CardDescription>Select your areas of interest to tailor the dashboard to your needs.</CardDescription>
           </CardHeader>
           <CardContent>
            <div className="flex flex-wrap gap-2">
               {[
                 'Design', 'Development', 'Marketing', 'Analytics',
                 'Operations', 'Sales', 'Management', 'Strategy'
               ].map((option) => (
                 <Chip
                   key={option}
                   label={option}
                   variant="tonal"
                   selected={selectedSurveys.includes(option)}
                   onClick={() => {
                     setSelectedSurveys(prev =>
                       prev.includes(option)
                         ? prev.filter(s => s !== option)
                         : [...prev, option]
                     );
                   }}
                 />
               ))}
            </div>
           </CardContent>
        </Card>

        {/* 20. Recent Logs / Terminal (New Refactored) */}
        <SystemLogs 
          logs={MOCK_LOGS}
          title="Terminal Feed"
          session="bash-412"
          status="Stable"
          statusColor="success"
        />

        {/* New 3: Active Sessions */}
        <Card>
           <CardHeader>
              <div className="flex items-center justify-between">
                 <div className="flex flex-col gap-1">
                    <CardTitle>Active Sessions</CardTitle>
                    <CardDescription>Devices logged into your account.</CardDescription>
                 </div>
              </div>
           </CardHeader>
           <CardContent className="space-y-4">
              <Surface variant="info" className="flex items-center justify-between p-3">
                 <div className="flex items-center gap-3">
                    <FiMonitor className="text-ds-info-600" size={18} />
                    <div className="flex flex-col">
                       <span className="text-sm font-bold text-ds-900 dark:text-ds-100">MacBook Pro 16"</span>
                       <span className="text-xs text-ds-500">San Francisco, US • Current session</span>
                    </div>
                 </div>
                 <Badge content="Active" color="info" variant="soft" pulse />
              </Surface>
              <div className="flex items-center justify-between p-3">
                 <div className="flex items-center gap-3">
                    <FiSmartphone className="text-ds-500" size={18} />
                    <div className="flex flex-col">
                       <span className="text-sm font-bold text-ds-800 dark:text-ds-200">iPhone 14 Pro</span>
                       <span className="text-xs text-ds-500">New York, US • 2 hours ago</span>
                    </div>
                 </div>
                 <Button variant="soft" size="sm" className="text-ds-danger-600 hover:text-ds-danger-700 dark:hover:text-ds-danger-500 bg-transparent hover:bg-ds-danger-50 dark:hover:bg-ds-danger-900/20 shadow-none px-2 h-7 text-xs">Revoke</Button>
              </div>
              <Divider />
              <div className="flex items-center justify-between p-3">
                 <div className="flex items-center gap-3">
                    <FiMonitor className="text-ds-500" size={18} />
                    <div className="flex flex-col">
                       <span className="text-sm font-bold text-ds-800 dark:text-ds-200">Chrome on Windows</span>
                       <span className="text-xs text-ds-500">London, UK • 3 days ago</span>
                    </div>
                 </div>
                 <Button variant="soft" size="sm" className="text-ds-danger-600 hover:text-ds-danger-700 dark:hover:text-ds-danger-500 bg-transparent hover:bg-ds-danger-50 dark:hover:bg-ds-danger-900/20 shadow-none px-2 h-7 text-xs">Revoke</Button>
              </div>
           </CardContent>
        </Card>

        {/* New 7: Toast Example */}
        <Card>
           <CardHeader>
              <div className="flex items-center gap-3">
                 <div className="size-8 rounded-lg bg-ds-primary-500/10 flex items-center justify-center">
                    <FiBell className="text-ds-primary-600" size={16} />
                 </div>
                 <div className="flex flex-col gap-1">
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>System toast dispatcher testing.</CardDescription>
                 </div>
              </div>
           </CardHeader>
           <CardContent className="space-y-4">
              <div className="flex flex-col gap-2 p-3 bg-ds-50 dark:bg-ds-800/40 rounded-lg border border-ds-200 dark:border-ds-800">
                 <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">Push Notifications</span>
                    <Switch defaultChecked />
                 </div>
                 <span className="text-xs text-ds-500">Allow systemic alerts to pop up.</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                 <Button variant="soft" size="sm" className="bg-ds-success-50 text-ds-success-600 hover:bg-ds-success-100 dark:bg-ds-success-500/10 dark:text-ds-success-400 dark:hover:bg-ds-success-500/20" leftIcon={<FiCheckCircle size={14} />} onClick={() => toast({ title: 'Saved!', description: 'Settings updated successfully.', type: 'success' })}>Success</Button>
                 <Button variant="soft" size="sm" className="bg-ds-danger-50 text-ds-danger-600 hover:bg-ds-danger-100 dark:bg-ds-danger-500/10 dark:text-ds-danger-400 dark:hover:bg-ds-danger-500/20" leftIcon={<FiXCircle size={14} />} onClick={() => toast({ title: 'Error', description: 'Failed to apply change.', type: 'error' })}>Error</Button>
                 <Button variant="soft" size="sm" className="col-span-2" leftIcon={<FiMessageSquare size={14} />} onClick={() => toast({ title: 'New Message', description: 'You have 4 new notifications related to this action.', type: 'default' })}>Standard Notification</Button>
              </div>
           </CardContent>
        </Card>

        {/* New 11: Invite Team */}
        <Card>
           <CardHeader>
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="size-8 ds-rounded bg-ds-success-500/10 flex items-center justify-center">
                       <FiUserPlus className="text-ds-success-600" size={16} />
                    </div>
                    <div className="flex flex-col gap-1">
                       <CardTitle>Invite Members</CardTitle>
                       <CardDescription>Grow your workspace team.</CardDescription>
                    </div>
                 </div>
              </div>
           </CardHeader>
           <CardContent className="space-y-5">
              <div className="flex flex-col gap-1.5">
                 <label className="text-xs font-bold text-ds-800 dark:text-ds-200 uppercase tracking-wider">Invite Link</label>
                 <div className="flex gap-2 w-full">
                    <Input 
                       defaultValue="https://dashkit.ui/join/t_xe9qw" 
                       readOnly
                       className="font-mono text-xs w-full" 
                    />
                    <Button variant="outlined" className="px-3 shrink-0" aria-label="Copy link" onClick={() => toast({type: 'success', description: 'Link copied to clipboard!'})}>
                       <FiCopy size={16} />
                    </Button>
                 </div>
              </div>
              <div className="flex gap-2 w-full items-end mt-1">
                 <div className="flex-1">
                    <Input 
                       label="Email Address"
                       placeholder="teammate@example.com"
                       type="email"
                       className="w-full text-sm" 
                    />
                 </div>
                 <Button variant="filled" className="px-4 shrink-0" rightIcon={<FiSend size={14} />}>
                    Send
                 </Button>
              </div>
           </CardContent>
        </Card>
      </div>

      {/* Column 4 */}
      <div className="flex flex-col gap-4">
        {/* 14. Notifications Feed */}
        <Card>
           <CardHeader>
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <FiBell className="text-ds-primary-600" size={18} />
                    <CardTitle>Notifications</CardTitle>
                 </div>
                 <Badge content="3 New" color="info" variant="soft" />
              </div>
           </CardHeader>
           <CardContent className="space-y-4">
              {[
                { icon: <FiZap className="text-ds-warning-600" />, title: "Deployment successful", time: "2m ago" },
                { icon: <FiShield className="text-ds-success-600" />, title: "Security scan passed", time: "1h ago" },
                { icon: <FiMessageSquare className="text-ds-info-600" />, title: "New feedback received", time: "3h ago" }
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start p-2 ds-rounded hover:bg-ds-50/50 dark:hover:bg-ds-800/30 transition-colors cursor-pointer group">
                   <div className="mt-1 opacity-70 group-hover:opacity-100 transition-opacity">{item.icon}</div>
                   <div className="flex flex-col">
                      <span className="text-sm font-semibold leading-tight">{item.title}</span>
                      <span className="text-xs text-ds-500 font-medium">{item.time}</span>
                   </div>
                </div>
              ))}
              <Divider className="my-2" />
              <div className="px-2">
                <Slider 
                  label="Alert Sensitivity" 
                  description="Threshold for instant alerts."
                  defaultValue={65} 
                  showValue
                />
              </div>
              <Button variant="outlined" size="sm" className="w-full">Clear All Notifications</Button>
           </CardContent>
        </Card>

        {/* 15. Task Management */}
        <Card>
           <CardHeader>
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <FiList className="text-ds-primary-600" size={18} />
                    <CardTitle>Tasks</CardTitle>
                 </div>
                 <span className="text-xs font-bold text-ds-500">{Math.round(progressValue)}% Done</span>
              </div>
           </CardHeader>
           <CardContent className="space-y-4">
              <ProgressBar value={progressValue} size="xs" color="primary" />
              <div className="space-y-5">
                 {tasks.map((task, i) => (
                    <Checkbox
                        key={task.label}
                        label={task.label}
                        checked={task.checked}
                        onChange={() => toggleTask(i)}
                    />
                 ))}
              </div>
           </CardContent>
        </Card>

        {/* 16. Cloud Storage Usage */}
        <Card>
           <CardHeader>
              <div className="flex items-center gap-2">
                 <FiFolder className="text-ds-warning-600" size={18} />
                 <CardTitle>Storage</CardTitle>
              </div>
           </CardHeader>
           <CardContent className="space-y-4">
              <div className="flex items-end justify-between">
                 <div className="flex flex-col">
                    <span className="text-2xl font-bold">42.8 GB</span>
                    <span className="text-xs text-ds-500">of 100 GB used</span>
                 </div>
                 <FiTrendingUp className="text-ds-danger-600 mb-1" />
              </div>
              <ProgressBar value={42.8} size="sm" color="warning" />
              <div className="grid grid-cols-2 gap-2">
                 <div className="flex flex-col p-2 bg-ds-50/50 dark:bg-ds-800/10 ds-rounded border border-ds-200 dark:border-ds-800">
                    <span className="text-xs font-bold uppercase text-ds-500 tracking-wider">Images</span>
                    <span className="text-sm font-bold">12.4 GB</span>
                 </div>
                 <div className="flex flex-col p-2 bg-ds-50/50 dark:bg-ds-800/10 ds-rounded border border-ds-200 dark:border-ds-800">
                    <span className="text-xs font-bold uppercase text-ds-500 tracking-wider">Backups</span>
                    <span className="text-sm font-bold">30.4 GB</span>
                 </div>
              </div>
           </CardContent>
        </Card>

        {/* 17. Quick Integrations */}
        <Card>
           <CardHeader>
              <div className="flex items-center gap-2">
                 <FiShare2 className="text-ds-info-600" size={18} />
                 <CardTitle>Integrations</CardTitle>
              </div>
           </CardHeader>
           <CardContent className="space-y-5">
              <div className="flex items-center justify-between group cursor-pointer">
                 <div className="flex items-center gap-4">
                    <FaGithub size={22} className="text-ds-600 dark:text-ds-400" />
                    <span className="text-sm font-medium">GitHub</span>
                 </div>
                 <Badge content="Connected" color="success" variant="soft" />
              </div>
              <div className="flex items-center justify-between group cursor-pointer">
                 <div className="flex items-center gap-4">
                    <FaGoogle size={20} className="text-ds-600 dark:text-ds-400" />
                    <span className="text-sm font-medium">Google Workspace</span>
                 </div>
                 <Button variant="soft" size="sm">Connect</Button>
              </div>
              <div className="flex items-center justify-between group cursor-pointer">
                 <div className="flex items-center gap-4">
                    <FaSlack size={22} className="text-ds-600 dark:text-ds-400" />
                    <span className="text-sm font-medium">Slack</span>
                 </div>
                 <Button variant="soft" size="sm">Connect</Button>
              </div>
              <div className="flex items-center justify-between group cursor-pointer">
                 <div className="flex items-center gap-4">
                    <FaDiscord size={22} className="text-ds-600 dark:text-ds-400" />
                    <span className="text-sm font-medium">Discord</span>
                 </div>
                 <Badge content="Connected" color="success" variant="soft" />
              </div>
              <div className="flex items-center justify-between group cursor-pointer">
                 <div className="flex items-center gap-4">
                    <FaAws size={24} className="text-ds-600 dark:text-ds-400" />
                    <span className="text-sm font-medium">AWS Cloud</span>
                 </div>
                 <Button variant="soft" size="sm">Connect</Button>
              </div>
              <div className="flex items-center justify-between group cursor-pointer">
                 <div className="flex items-center gap-4">
                    <SiVercel size={20} className="text-ds-600 dark:text-ds-400" />
                    <span className="text-sm font-medium">Vercel</span>
                 </div>
                 <Badge content="Connected" color="success" variant="soft" />
              </div>
              <div className="flex items-center justify-between group cursor-pointer">
                 <div className="flex items-center gap-4">
                    <FaFigma size={22} className="text-ds-600 dark:text-ds-400" />
                    <span className="text-sm font-medium">Figma</span>
                 </div>
                 <Badge content="Connected" color="success" variant="soft" />
              </div>
              <div className="flex items-center justify-between group cursor-pointer">
                 <div className="flex items-center gap-4">
                    <SiNotion size={22} className="text-ds-600 dark:text-ds-400" />
                    <span className="text-sm font-medium">Notion</span>
                 </div>
                 <Button variant="soft" size="sm">Connect</Button>
              </div>
              <Divider />
              <Button variant="outlined" className="w-full">
                 Manage 12+ Connections
              </Button>
           </CardContent>
        </Card>

        {/* 21. Model Training (New) */}
        <Card>
           <CardHeader>
              <div className="flex items-center justify-between">
                 <div className="flex flex-col gap-1">
                    <CardTitle>Model Training</CardTitle>
                    <CardDescription>GPT-Neo Large (Ver. 4.2)</CardDescription>
                 </div>
                 <FiZap className="text-ds-primary-600 animate-pulse" size={18} />
              </div>
           </CardHeader>
           <CardContent className="space-y-5">
              <div className="space-y-2">
                 <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-ds-500 uppercase">Training Progress</span>
                    <span className="text-xs font-black">68%</span>
                 </div>
                 <ProgressBar value={68} color="primary" />
              </div>
              
              <div className="grid grid-cols-2 gap-3 tabular-nums">
                 <div className="flex flex-col p-2 bg-ds-50/50 dark:bg-ds-800/10 ds-rounded border border-ds-200 dark:border-ds-800">
                    <span className="text-xs font-bold uppercase text-ds-500 tracking-wider">Loss</span>
                    <span className="text-sm font-bold">0.0421</span>
                 </div>
                 <div className="flex flex-col p-2 bg-ds-50/50 dark:bg-ds-800/10 ds-rounded border border-ds-200 dark:border-ds-800">
                    <span className="text-xs font-bold uppercase text-ds-500 tracking-wider">ETA</span>
                    <span className="text-sm font-bold">04:12:08</span>
                 </div>
              </div>

              <div className="flex gap-2">
                 <Button variant="soft" className="flex-1" leftIcon={<FiXCircle />}>Abort</Button>
                 <Button variant="filled" className="flex-1" leftIcon={<FiCheckCircle />}>Val.</Button>
              </div>
           </CardContent>
        </Card>

        {/* New 4: API Keys */}
        <Card>
           <CardHeader>
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <div className="size-6 ds-rounded bg-ds-warning-500/10 flex items-center justify-center">
                       <FiLock className="text-ds-warning-600" size={14} />
                    </div>
                    <CardTitle>API Credentials</CardTitle>
                 </div>
                 <Badge content="Pro" color="warning" variant="soft" />
              </div>
              <CardDescription>Manage your secret keys for external integrations.</CardDescription>
           </CardHeader>
           <CardContent className="space-y-4">
              <div className="flex flex-col gap-1.5">
                 <label className="text-xs font-bold text-ds-800 dark:text-ds-200 uppercase tracking-wider">Production Key</label>
                 <div className="flex gap-2 w-full">
                    <Input 
                       type="password" 
                       defaultValue="pk_live_1234567890abcdef" 
                       disabled 
                       className="font-mono text-xs w-full" 
                    />
                    <Button variant="outlined" className="px-3 shrink-0" aria-label="Copy key">
                       <FiCopy size={14} />
                    </Button>
                 </div>
              </div>
              <div className="flex flex-col gap-1.5 mt-2">
                 <label className="text-xs font-bold text-ds-800 dark:text-ds-200 uppercase tracking-wider">Test Key</label>
                 <div className="flex gap-2 w-full">
                    <Input 
                       type="password" 
                       defaultValue="pk_test_0987654321fedcba" 
                       disabled 
                       className="font-mono text-xs w-full" 
                    />
                    <Button variant="outlined" className="px-3 shrink-0" aria-label="Copy key">
                       <FiCopy size={14} />
                    </Button>
                 </div>
              </div>
              <Button variant="soft" className="w-full mt-2" leftIcon={<FiZap />}>Generate New Key</Button>
           </CardContent>
        </Card>

        {/* New 8: Select Example */}
        <Card>
           <CardHeader>
              <div className="flex items-center gap-3">
                 <div className="size-8 rounded-lg bg-ds-500/10 flex items-center justify-center">
                    <FiServer className="text-ds-500" size={16} />
                 </div>
                 <div className="flex flex-col gap-1">
                    <CardTitle>Environment Settings</CardTitle>
                    <CardDescription>Configure deployment targets and domains.</CardDescription>
                 </div>
              </div>
           </CardHeader>
           <CardContent className="space-y-4">
              <Select 
                 label="Target Node"
                 options={[
                   { label: 'US-East (Virginia)', value: 'us-east-1' },
                   { label: 'US-West (Oregon)', value: 'us-west-2' },
                   { label: 'EU-Central (Frankfurt)', value: 'eu-central-1' }
                 ]}
                 value="us-east-1"
              />
              <Select 
                 label="Environment"
                 options={[
                   { label: 'Production', value: 'prod' },
                   { label: 'Staging', value: 'stage' },
                   { label: 'Development', value: 'dev' },
                   { label: 'Testing', value: 'test' }
                 ]}
                 value="prod"
              />
              <div className="flex flex-col gap-1.5 pt-2">
                 <span className="text-xs font-bold uppercase tracking-wider text-ds-500">Status</span>
                 <div className="flex items-center justify-between p-3 ds-rounded border border-ds-200 dark:border-ds-800 bg-ds-50/50 dark:bg-ds-800/10">
                    <div className="flex items-center gap-2">
                       <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ds-success-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-ds-success-500"></span>
                       </span>
                       <span className="text-sm font-bold text-ds-900 dark:text-ds-100">All systems operational</span>
                    </div>
                </div>
              </div>
           </CardContent>
        </Card>

        {/* New 12: Recent Invoice */}
        <Card>
           <CardHeader>
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="size-8 ds-rounded bg-ds-primary-500/10 flex items-center justify-center">
                       <FiFileText className="text-ds-primary-600" size={16} />
                    </div>
                    <div className="flex flex-col gap-1">
                       <CardTitle>Recent Invoice</CardTitle>
                       <CardDescription>Generated automatically.</CardDescription>
                    </div>
                 </div>
                 <Badge content="Paid" color="success" variant="soft" />
              </div>
           </CardHeader>
           <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 ds-rounded border border-ds-200 dark:border-ds-800 bg-ds-50/50 dark:bg-ds-800/10">
                 <div className="flex flex-col">
                    <span className="text-sm font-bold">INV-0492-MAR</span>
                    <span className="text-xs text-ds-500">Issued Mar 1st, 2026</span>
                 </div>
                 <span className="text-lg font-bold">$1,249.00</span>
              </div>
              <Button variant="soft" className="w-full" leftIcon={<FiDownload size={14} />}>
                 Download PDF
              </Button>
           </CardContent>
        </Card>
      </div>

      {/* Modals & Drawers */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalHeader onClose={() => setIsModalOpen(false)}>
          <h3 className="text-lg font-semibold">Delete Project</h3>
        </ModalHeader>
        <ModalContent className="flex flex-col gap-4">
          <p className="text-sm text-ds-500">Are you sure you want to delete this project? This action cannot be undone.</p>
        </ModalContent>
        <ModalFooter>
          <Button variant="outlined" onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button className="bg-ds-danger-600 hover:bg-ds-danger-700 text-white border-transparent" onClick={() => { setIsModalOpen(false); toast({ type: 'error', description: 'Project deleted successfully!' }); }}>Delete</Button>
        </ModalFooter>
      </Modal>

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
