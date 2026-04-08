import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { AnimateNumber } from '../../components/AnimateNumber';
import { cn } from '../../utils/cn';
import {
  FiGrid, FiUsers, FiSettings, FiSearch, FiBell,
  FiMoreVertical, FiExternalLink,
  FiZap, FiPieChart, FiTrendingUp, FiCheckCircle, FiClock, FiMenu
} from 'react-icons/fi';
import { Navbar, NavbarBrand, NavbarLinks, NavbarActions } from '../../components/Navbar/Navbar';
import { Button } from '../../components/Button/Button';
import { IconButton } from '../../components/IconButton/IconButton';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/Card';
import { Badge, FloatBadge } from '../../components/Badge';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator } from '../../components/Breadcrumb';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/Tabs/Tabs';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption
} from '../../components/Table/Table';
import { Avatar, AvatarGroup } from '../../components/Avatar';
import { Select } from '../../components/Select/Select';
import { Input } from '../../components/Input/Input';
import { AreaChart } from '../../components/AreaChart/AreaChart';
import { BarChart } from '../../components/BarChart/BarChart';
import { PieChart } from '../../components/PieChart/PieChart';
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from '../../components/Dropdown/Dropdown';
import { Chip } from '../../components/Chip/Chip';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../components/Accordion';
import { Switch } from '../../components/Switch/Switch';
import { Modal, ModalHeader, ModalContent, ModalFooter } from '../../components/Modal/Modal';
import { Drawer, DrawerHeader } from '../../components/Drawer/Drawer';
import { Dock, DockItem } from '../../components/Dock/Dock';
import { toast } from '../../components/Toast/useToast';
import { ThemeToggle } from '../../partials/ThemeToggle';
import { Footer } from '../../partials/Footer';
import { Divider } from '../../components/Divider/Divider';

const PERFORMANCE_DATA = [
  { label: 'Mon', mobile: 45, desktop: 30 },
  { label: 'Tue', mobile: 52, desktop: 38 },
  { label: 'Wed', mobile: 48, desktop: 45 },
  { label: 'Thu', mobile: 61, desktop: 42 },
  { label: 'Fri', mobile: 55, desktop: 50 },
  { label: 'Sat', mobile: 67, desktop: 20 },
  { label: 'Sun', mobile: 70, desktop: 15 },
];

const PERFORMANCE_SERIES = [
  { key: 'mobile', label: 'Mobile Hub', color: 'var(--color-indigo-500)' },
  { key: 'desktop', label: 'Desktop App', color: 'var(--color-emerald-500)' }
];

const LATEST_UPDATES = [
  { title: "Project Milestones reached", date: "2 hours ago", author: "Sarah M.", category: "Engineering" },
  { title: "New design system guidelines", date: "5 hours ago", author: "John D.", category: "Design" },
  { title: "Infrastructure migration complete", date: "1 day ago", author: "DevOps", category: "Ops" }
];

const SYSTEM_LOGS = [
  { time: '2024-03-12 14:23:01', event: 'Database Backup Completed', source: 'SQL-Primary', status: 'Success' },
  { time: '2024-03-12 14:20:45', event: 'Node Auto-scaled', source: 'AWS-East-1', status: 'Info' },
  { time: '2024-03-12 14:18:12', event: 'Failed Login Attempt', source: 'Auth-API', status: 'Warning' },
  { time: '2024-03-12 14:15:33', event: 'CDN Cache Purged', source: 'Cloudflare', status: 'Success' },
  { time: '2024-03-12 14:12:09', event: 'SSL Certificate Renewed', source: 'Let\'s Encrypt', status: 'Success' },
];

const BAR_CHART_DATA = [
  { label: 'Jan', revenue: 4500, profit: 3200 },
  { label: 'Feb', revenue: 5200, profit: 3800 },
  { label: 'Mar', revenue: 4800, profit: 3400 },
  { label: 'Apr', revenue: 6100, profit: 4200 },
  { label: 'May', revenue: 5500, profit: 4000 },
  { label: 'Jun', revenue: 6700, profit: 4800 },
  { label: 'Jul', revenue: 7000, profit: 5100 },
  { label: 'Aug', revenue: 7200, profit: 5300 },
];

const BAR_CHART_SERIES = [
  { key: 'revenue', label: 'Revenue', color: 'var(--color-ds-primary-500)' },
  { key: 'profit', label: 'Profit', color: 'var(--color-indigo-500)' },
];

const PIE_CHART_DATA = [
  { label: 'Direct', value: 4500, color: 'var(--color-ds-primary-500)' },
  { label: 'Organic', value: 3800, color: 'var(--color-indigo-500)' },
  { label: 'Referral', value: 2400, color: 'var(--color-purple-500)' },
  { label: 'Social', value: 1200, color: 'var(--color-emerald-500)' },
];

const TEAM_AVATARS = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
];

export function DashboardExample() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Simulation state for animated numbers
  const [metrics, setMetrics] = useState({
    revenue: 45231.89,
    tasks: 1240,
    efficiency: 94.2
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setMetrics(prev => ({
        revenue: prev.revenue + (Math.random() > 0.5 ? 150.50 : -90.25),
        tasks: prev.tasks + (Math.random() > 0.5 ? 5 : -3),
        efficiency: parseFloat(Math.min(100, Math.max(90, prev.efficiency + (Math.random() > 0.5 ? 0.2 : -0.1))).toFixed(1))
      }));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({ type: 'success', description: 'Dashboard data refreshed successfully' });
    }, 1500);
  };

  return (
    <div className="min-h-screen ds-page">
      <Helmet>
        <title>Analytics Dashboard | Dashkit UI</title>
        <meta name="description" content="A full-featured analytics and management interface demonstrating cards, interactive charts, and real-time statistics built with Dashkit UI." />
      </Helmet>
      <Navbar>
        <NavbarBrand>
           <div className="flex items-center gap-2">
             <img src="/logos-example/full-04.png" alt="Dashkit Logo" className="h-8 dark:invert" />
           </div>
        </NavbarBrand>

        <NavbarLinks>
           <a href="#" className="text-sm font-medium text-foreground">Overview</a>
           <a href="/charts" className="text-sm font-medium text-muted-foreground">Charts</a>
           <a href="#" className="text-sm font-medium text-muted-foreground">Analytics</a>
           <a href="#" className="text-sm font-medium text-muted-foreground">Team</a>
        </NavbarLinks>

        <NavbarActions>
          <IconButton icon={<FiSearch size={18} />} />
          <FloatBadge dot color="error" pulse>
            <IconButton icon={<FiBell size={18} />} />
          </FloatBadge>
          <ThemeToggle />
          <Button onClick={() => setIsModalOpen(true)}>New Project</Button>
          <Avatar src={TEAM_AVATARS[0]} size="sm" bordered className="cursor-pointer" />
        </NavbarActions>
      </Navbar>

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem href="/">Home</BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem active>Dashboard</BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Project Overview
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Select
              value="this-week"
              options={[
                { label: 'This Week', value: 'this-week' },
                { label: 'Last 30 Days', value: 'last-30' },
                { label: 'Custom Range', value: 'custom' }
              ]}
              className="w-48"
            />
            <Button variant="outlined" loading={isLoading} onClick={handleRefresh}>
              {isLoading ? 'Refreshing...' : 'Analyze'}
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card shadowed className="border-none">
            <CardContent className="flex flex-col gap-1">
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Total Revenue</p>
              <div className="flex items-baseline justify-between tabular-nums">
                <h3 className="text-2xl font-bold tracking-tight text-foreground">
                  <AnimateNumber value={metrics.revenue} prefix="$" precision={2} />
                </h3>
                <span className="text-[11px] font-bold text-ds-success-600 bg-ds-success-600/10 dark:text-ds-success-400 dark:bg-ds-success-500/15 px-2 py-0.5 rounded-full">+12.5%</span>
              </div>
              <p className="text-sm text-ds-400 mt-1">vs last month</p>
            </CardContent>
          </Card>

          <Card shadowed className="border-none">
            <CardContent className="flex flex-col gap-1">
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Active Tasks</p>
              <div className="flex items-baseline justify-between tabular-nums">
                <h3 className="text-2xl font-bold tracking-tight text-foreground">
                  <AnimateNumber value={metrics.tasks} />
                </h3>
                <span className="text-[11px] font-bold text-ds-500 bg-ds-100 dark:bg-ds-800 px-2 py-0.5 rounded-full">82%</span>
              </div>
              <div className="h-1 w-full bg-ds-200 dark:bg-ds-800 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-primary w-[82%]" />
              </div>
            </CardContent>
          </Card>

          <Card shadowed className="border-none">
            <CardContent className="flex flex-col gap-1">
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Efficiency Rate</p>
              <div className="flex items-baseline justify-between tabular-nums">
                <h3 className="text-2xl font-bold tracking-tight text-foreground">
                   <AnimateNumber value={metrics.efficiency} precision={1} suffix="%" />
                </h3>
                <span className="text-[11px] font-bold text-ds-info-600 bg-ds-info-600/10 dark:text-ds-info-400 dark:bg-ds-info-500/15 px-2 py-0.5 rounded-full">94%</span>
              </div>
              <div className="flex gap-1 mt-3">
                 {[1,2,3,4,5,6].map(i => (
                   <div key={i} className={cn("h-1 flex-1 rounded-full", i <= 5 ? "bg-foreground" : "bg-ds-100 dark:bg-ds-800")} />
                 ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Overview Section */}
        <section className="flex flex-col gap-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-ds-400 flex items-center gap-2">
             <FiPieChart /> Activity Overview
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <Card className="h-full" shadowed>
                <CardHeader>
                  <div className="flex items-start justify-between w-full">
                    <div className="flex flex-col gap-1">
                      <CardTitle>Performance Metrics</CardTitle>
                      <CardDescription>Visualizing project growth and device distribution.</CardDescription>
                    </div>
                    <Dropdown>
                      <DropdownTrigger asChild>
                        <IconButton icon={<FiMoreVertical />} />
                      </DropdownTrigger>
                      <DropdownContent align="end">
                        <DropdownItem leftIcon={<FiExternalLink />} onClick={() => {}}>View all reports</DropdownItem>
                        <DropdownItem leftIcon={<FiTrendingUp />} onClick={() => {}}>Export to CSV</DropdownItem>
                      </DropdownContent>
                    </Dropdown>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-6 flex-1 min-h-[320px]">
                  <AreaChart 
                    data={PERFORMANCE_DATA} 
                    series={PERFORMANCE_SERIES}
                  />
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col gap-6">
              <Card shadowed>
                <CardHeader>
                  <CardTitle>Team Status</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <AvatarGroup max={4} size="md" spacing="md">
                    {TEAM_AVATARS.map((url, i) => (
                      <Avatar key={i} src={url} alt={`Member ${i + 1}`} />
                    ))}
                  </AvatarGroup>
                  <p className="text-sm text-ds-500">Your team has completed 24 tasks today.</p>
                  <div className="flex gap-2">
                    <Chip label="Mobile App" onDelete={() => {}} />
                    <Chip label="Dashboard" onDelete={() => {}} />
                  </div>
                </CardContent>
              </Card>

              <Card shadowed>
                <CardHeader>
                  <CardTitle>System Config</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                  <Switch label="Auto-Scaling" description="Enable dynamic node creation." defaultChecked />
                  <Switch label="Maintenance Mode" description="Block all external traffic." />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Financial Section */}
        <section className="flex flex-col gap-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-ds-400 flex items-center gap-2">
             <FiTrendingUp /> Financial Performance
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card shadowed className="h-full">
              <CardHeader>
                <div className="flex items-start justify-between w-full">
                  <div className="flex flex-col gap-1">
                    <CardTitle>Revenue & Profit Trends</CardTitle>
                    <CardDescription>Comparison of monthly gross revenue vs net profit margins.</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                     <Badge content="Live Data" color="base" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col justify-end pt-12 pb-4">
                <BarChart 
                  data={BAR_CHART_DATA}
                  series={BAR_CHART_SERIES}
                  height={260}
                  rounded
                />
              </CardContent>
            </Card>

            <Card shadowed className="h-full">
              <CardHeader>
                <div className="flex flex-col gap-1">
                  <CardTitle>Acquisition Channels</CardTitle>
                  <CardDescription>Distribution of traffic and conversion across primary sources.</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <PieChart
                  data={PIE_CHART_DATA}
                  innerRadius={0.6}
                  className="max-w-[280px]"
                />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Resources & Activity Section */}
        <section className="flex flex-col gap-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-ds-400 flex items-center gap-2">
             <FiGrid /> Resources & Logs
          </h2>
          <div className="w-full">
            <Tabs defaultValue="blog">
              <TabsList>
                <TabsTrigger value="blog">Latest Updates</TabsTrigger>
                <TabsTrigger value="logs">System Logs</TabsTrigger>
              </TabsList>

              <TabsContent value="blog">
                <div className="pt-2">
                  <Table framed={false} className="table-fixed">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Category</TableHead>
                        <TableHead>Activity</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Timeline</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {LATEST_UPDATES.map((post, i) => (
                        <TableRow key={i}>
                          <TableCell>
                            <div className="w-fit">
                              <Badge
                                variant='soft'
                                color={post.category === 'Engineering' ? 'info' : post.category === 'Design' ? 'warning' : 'base'}
                                content={post.category}
                              />
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{post.title}</TableCell>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Avatar src={TEAM_AVATARS[i + 1]} alt={post.author} size="sm" />
                              <span>{post.author}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            {post.date}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="logs">
                <div className="pt-2">
                  <Table framed={false} className="table-fixed">
                    <TableCaption>Real-time system event logs across all clusters.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Event</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {SYSTEM_LOGS.map((log, i) => (
                        <TableRow key={i}>
                          <TableCell className="font-medium">{log.time}</TableCell>
                          <TableCell className="font-medium">{log.event}</TableCell>
                          <TableCell className="font-medium">{log.source}</TableCell>
                          <TableCell className="font-medium">
                            <div className="flex">
                              <Badge
                                content={log.status}
                                variant='soft'
                                color={log.status === 'Success' ? 'success' : log.status === 'Warning' ? 'warning' : 'info'}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Projects Section */}
        <section className="flex flex-col gap-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-ds-400 flex items-center gap-2">
             <FiGrid /> Active Projects
          </h2>

          <div className="w-full">
            <Accordion type="multiple" defaultValue={['item-1']} shadowed>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <FiCheckCircle size={20} className="text-ds-500" />
                    Phase 1: Foundation
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                   <div className="py-2 text-sm text-ds-500 flex flex-col gap-4">
                     <p>Implement core UI elements and accessibility foundations. Focus on design tokens and basic interactions.</p>
                     <div className="flex items-center justify-between">
                       <div className="flex items-center gap-4">
                         <Badge content="On Track" color="base" />
                         <span className="text-xs text-ds-400">Due Dec 12, 2026</span>
                       </div>
                       <AvatarGroup max={3} size="md" spacing="sm">
                         <Avatar src={TEAM_AVATARS[1]} alt="Sarah M." />
                         <Avatar src={TEAM_AVATARS[2]} alt="John D." />
                         <Avatar src={TEAM_AVATARS[3]} alt="Alex K." />
                         <Avatar alt="More" />
                       </AvatarGroup>
                     </div>
                   </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <FiClock size={20} className="text-ds-500" />
                    Phase 2: Integration
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                   <p className="py-2 text-sm text-ds-500">Connecting external API services and real-time database syncing across distributed nodes.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <FiZap size={20} className="text-ds-500" />
                    Phase 3: Performance Optimization
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                   <p className="py-2 text-sm text-ds-500">Optimizing bundle sizes, implementing edge caching, and fine-tuning database queries for scale.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <FiUsers size={20} className="text-ds-500" />
                    Phase 4: Feedback & Pilot
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                   <p className="py-2 text-sm text-ds-500">Launching to a subset of users to gather real-world usage patterns and edge cases.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <FiPieChart size={20} className="text-ds-500" />
                    Phase 5: Global Rollout
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                   <p className="py-2 text-sm text-ds-500">Final production deployment across all regions with multi-cluster traffic management.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Settings Section */}
        <section className="flex flex-col gap-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-ds-400 flex items-center gap-2">
             <FiSettings /> Account Settings
          </h2>

          <div className="w-full">
            <Card shadowed>
              <CardHeader>
                <CardTitle>Account Preferences</CardTitle>
                <CardDescription>Manage your display and data settings across the platform.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-ds-700 dark:text-ds-300">Username</label>
                    <Input placeholder="carllosnc" />
                    <p className="text-[11px] text-ds-400">This is your public display name.</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-ds-700 dark:text-ds-300">Email Address</label>
                    <Input placeholder="hello@dashkit.ui" type="email" />
                  </div>

                  <div className="flex flex-col gap-6 md:col-span-2 pt-8 mt-4">
                    <Divider />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      <Switch label="Public Profile" description="Allow others to see your stats." defaultChecked />
                      <Switch label="Direct Mentions" description="Enable push notifications for @mentions." />
                      <Switch label="Daily Digest" description="Receive a summary of your activity." />
                      <Switch label="Security Alerts" description="Notify on suspicious login attempts." defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <ModalHeader onClose={() => setIsModalOpen(false)}>
          <h3 className="text-lg font-semibold">Create New Project</h3>
        </ModalHeader>
        <ModalContent className="flex flex-col gap-6">
          <Input label="Project Name" placeholder="E-commerce Redesign" required />
          <Select 
            label="Priority"
            options={[
              { label: 'Low', value: 'low' },
              { label: 'Medium', value: 'medium' },
              { label: 'High', value: 'high' }
            ]}
          />
        </ModalContent>
        <ModalFooter>
          <Button variant="outlined" onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button onClick={() => { setIsModalOpen(false); toast({ type: 'success', description: 'Project created!' }); }}>Create</Button>
        </ModalFooter>
      </Modal>

      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-[100] hidden lg:block">
        <Dock position="left">
           <DockItem icon={<FiGrid />} label="Overview" />
           <DockItem icon={<FiMenu />} label="Navigation Menu" href="/docs/navigation-menu" />
           <DockItem icon={<FiPieChart />} label="Analytics" />
           <DockItem icon={<FiTrendingUp />} label="Growth" />
           <DockItem icon={<FiUsers />} label="Team" />
           <DockItem icon={<FiBell />} label="Alerts" />
           <DockItem icon={<FiSettings />} label="Settings" />
        </Dock>
      </div>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <DrawerHeader>
          <h2 className="text-xl font-bold text-block-fg dark:text-block-dark-fg tracking-tight">
             Notifications
          </h2>
          <p className="text-sm text-ds-500">
             Stay up to date with your team's progress.
          </p>
        </DrawerHeader>
        <div className="flex flex-col gap-4 py-6 px-6 overflow-y-auto">
           {[1,2,3,4,5].map(i => (
             <div key={i} className="flex gap-4 p-4 rounded-md hover:bg-ds-50 dark:hover:bg-ds-900 transition-colors border border-transparent hover:border-ds-border dark:hover:border-ds-dark-border">
                <div className="size-10 rounded-full bg-ds-primary-500/10 flex items-center justify-center shrink-0">
                   <FiBell className="text-ds-primary-500" />
                </div>
                <div>
                   <div className="text-sm font-bold">New comment on "Auth Logic"</div>
                   <div className="text-xs text-ds-500">2 hours ago</div>
                </div>
             </div>
           ))}
        </div>
      </Drawer>
    </div>
  );
}


