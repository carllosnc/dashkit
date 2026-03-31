import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { AnimateNumber } from '../../components/AnimateNumber/AnimateNumber';
import {
  FiGrid, FiUsers, FiSettings,
  FiMoreVertical, FiExternalLink,
  FiZap, FiTrendingUp, FiCheckCircle,
  FiCalendar, FiMessageSquare, FiFileText, FiLayout,
  FiSearch, FiBell, FiDatabase, FiDollarSign, FiCreditCard,
  FiActivity, FiPieChart, FiShield, FiBriefcase, FiArchive, FiCommand, FiPlus, FiHelpCircle, FiHome
} from 'react-icons/fi';
import { Sidebar, SidebarHeader, SidebarFooter, SidebarSection, SidebarItem, SidebarHeaderOpen, SidebarHeaderClose, SidebarFooterOpen } from '../../components/Sidebar/Sidebar';
import { FloatActionMenu } from '../../components/FloatActionMenu/FloatActionMenu';
import { Dock, DockItem } from '../../components/Dock/Dock';
import { cn } from '../../utils/cn';
import { Button } from '../../components/Button/Button';
import { IconButton } from '../../components/IconButton/IconButton';
import { Input } from '../../components/Input/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/Card/Card';
import { Badge, FloatBadge } from '../../components/Badge/Badge';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../../components/Table/Table';
import { Avatar, AvatarGroup } from '../../components/Avatar/Avatar';
import { AreaChart } from '../../components/AreaChart/AreaChart';
import { BarChart } from '../../components/BarChart/BarChart';
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownSeparator } from '../../components/Dropdown/Dropdown';
import { Navbar, NavbarBrand, NavbarActions } from '../../components/Navbar/Navbar';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import { ThemeToggle } from '../../partials/ThemeToggle';

const PROJECT_HEALTH_DATA = [
  { label: 'Jan', health: 65, velocity: 40 },
  { label: 'Feb', health: 72, velocity: 38 },
  { label: 'Mar', health: 85, velocity: 55 },
  { label: 'Apr', health: 80, velocity: 62 },
  { label: 'May', health: 92, velocity: 58 },
  { label: 'Jun', health: 95, velocity: 70 },
];

const PERFORMANCE_DATA = [
  { label: 'Front', completed: 65, pending: 35 },
  { label: 'Back', completed: 48, pending: 52 },
  { label: 'Design', completed: 90, pending: 10 },
  { label: 'Ops', completed: 55, pending: 45 },
];

const AVATARS = [
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop",
];

export const SidebarDashboardExample = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Simulation state for animated numbers
  const [metrics, setMetrics] = useState({
    revenue: 48250,
    users: 2420,
    tasks: 128,
    velocity: 64.5
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setMetrics(prev => ({
        revenue: prev.revenue + (Math.random() > 0.5 ? 120 : -80),
        users: prev.users + (Math.random() > 0.5 ? 15 : -10),
        tasks: Math.min(150, Math.max(0, prev.tasks + (Math.random() > 0.5 ? 1 : -1))),
        velocity: parseFloat((prev.velocity + (Math.random() > 0.5 ? 0.8 : -0.5)).toFixed(1))
      }));
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      <Helmet>
        <title>SaaS Dashboard | Dashkit UI</title>
        <meta name="description" content="A high-fidelity SaaS-style dashboard layout featuring a fixed sidebar, collapsible navigation, and dense data visualizations built with Dashkit UI." />
      </Helmet>
      {/* Sidebar */}
      <Sidebar
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      >
        <SidebarHeader>
          <SidebarHeaderOpen>
            <div className="flex items-center justify-center w-full gap-3">
              <img src="/logos-example/full-02.png" alt="Dashkit Logo" className="h-8 dark:invert" />
            </div>
          </SidebarHeaderOpen>
          <SidebarHeaderClose>
            <div className="flex items-center justify-center w-full">
              <img src="/logos-example/logo-02.png" alt="D" className="h-7 dark:invert" />
            </div>
          </SidebarHeaderClose>
        </SidebarHeader>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <SidebarSection title="Main" collapsible>
            <SidebarItem
              icon={<FiGrid size={18} />}
              active={activeTab === 'Overview'}
              onClick={() => setActiveTab('Overview')}
            >
              Overview
            </SidebarItem>
            <SidebarItem
              icon={<FiLayout size={18} />}
              active={activeTab === 'Projects'}
              onClick={() => setActiveTab('Projects')}
              badgeSlot={<Badge content="New" variant="soft" />}
            >
              Projects
            </SidebarItem>
            <SidebarItem
              icon={<FiCalendar size={18} />}
              active={activeTab === 'Calendar'}
              onClick={() => setActiveTab('Calendar')}
            >
              Calendar
            </SidebarItem>
          </SidebarSection>

          <SidebarSection
            title="Management"
            collapsible
            badge={isSidebarOpen && <Badge color="warning" content="Beta" variant="soft" />}
          >
            <SidebarItem icon={<FiUsers size={18} />} badgeSlot={<Badge color="success" dot />}>Team</SidebarItem>
            <SidebarItem icon={<FiMessageSquare size={18} />} badgeSlot={<Badge variant="soft" color="danger" content={+99} />}>Messages</SidebarItem>
            <SidebarItem icon={<FiFileText size={18} />}>Reports</SidebarItem>
            <SidebarItem icon={<FiBriefcase size={18} />}>Clients</SidebarItem>
          </SidebarSection>

          <SidebarSection title="Data & Analytics" collapsible defaultOpen={false}>
            <SidebarItem icon={<FiActivity size={18} />}>Realtime</SidebarItem>
            <SidebarItem icon={<FiPieChart size={18} />}>Analytics</SidebarItem>
            <SidebarItem icon={<FiArchive size={18} />}>Logs</SidebarItem>
          </SidebarSection>

          <SidebarSection title="Infrastructure" collapsible defaultOpen={false}>
            <SidebarItem icon={<FiDatabase size={18} />}>Databases</SidebarItem>
            <SidebarItem icon={<FiShield size={18} />} badgeSlot={<Badge color="success" content="Encrypted" variant="soft" />}>Security</SidebarItem>
            <SidebarItem icon={<FiCreditCard size={18} />}>Billing</SidebarItem>
            <SidebarItem icon={<FiDollarSign size={18} />}>Transactions</SidebarItem>
          </SidebarSection>
        </div>

        <SidebarFooter>
          <Dropdown>
            <DropdownTrigger asChild>
              <button className="flex items-center gap-3 w-full p-2 md:p-1.5 rounded-xl hover:bg-muted/50 text-left outline-none group shrink-0">
                <Avatar src={AVATARS[0]} size="sm" className="shrink-0" />
                <SidebarFooterOpen>
                  <div className="flex-1 overflow-hidden py-0.5">
                    <p className="text-sm font-bold truncate leading-tight">John Doe</p>
                    <p className="text-[10px] text-muted-foreground truncate leading-tight">john@example.com</p>
                  </div>
                  <FiMoreVertical className="size-4 text-muted-foreground group-hover:text-foreground shrink-0" />
                </SidebarFooterOpen>
              </button>
            </DropdownTrigger>
            <DropdownContent align="end" className="w-56" side="right" sideOffset={12}>
               <div className="px-3 py-2 flex items-center gap-3 border-b border-border/50 mb-1">
                 <Avatar src={AVATARS[0]} size="xs" />
                 <div className="flex flex-col">
                   <p className="text-xs font-bold leading-none">John Doe</p>
                   <p className="text-[10px] text-muted-foreground mt-1">Free Plan</p>
                 </div>
               </div>
               <DropdownItem leftIcon={<FiSettings size={14} />}>Profile Settings</DropdownItem>
               <DropdownItem leftIcon={<FiZap size={14} />}>Upgrade to Pro</DropdownItem>
               <DropdownSeparator />
               <DropdownItem destructive leftIcon={<FiExternalLink size={14} />}>Sign Out</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </SidebarFooter>
      </Sidebar>

      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <Navbar blur={false} sticky={false} className="bg-card">
           <NavbarBrand>
              <div className="flex items-center gap-2.5 px-1">
                 <div className="size-7 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FiTrendingUp className="size-4 text-primary" />
                 </div>
                 <h2 className="font-bold text-sm tracking-tight hidden sm:block">Growth Overview</h2>
              </div>
           </NavbarBrand>

           <div className="flex-1 flex items-center justify-center max-w-md mx-auto">
              <Input
                placeholder="Search metrics, reports... (⌘K)"
                leftIcon={<FiSearch size={18} />}
              />
           </div>

           <NavbarActions>
              <ThemeToggle />
              <FloatBadge dot color="danger" pulse>
                <IconButton
                  variant="soft"
                  icon={
                      <FiBell className="size-[1.2rem]" />
                  }
                />
              </FloatBadge>
              <IconButton
                variant="soft"
                icon={<FiSettings className="size-[1.2rem]" />}
              />
              <div className="h-6 w-px bg-border/50 mx-1 hidden lg:block" />
              <Button variant="filled" size="sm" leftIcon={<FiZap size={14} />}>Upgrade</Button>
           </NavbarActions>
        </Navbar>

        <main className="flex-1 overflow-y-auto p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="max-w-6xl mx-auto w-full space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-lg font-medium tracking-tight mb-1">Project Portfolio</h1>
              <p className="text-muted-foreground">Monitor your team performance and project health.</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outlined" leftIcon={<FiExternalLink />}>Share Report</Button>
              <Button variant="filled" leftIcon={<FiZap />}>Optimize Workflow</Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
               <CardContent>
                  <div className="flex items-center justify-between mb-2">
                     <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Total Revenue</span>
                     <div className="size-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                       <FiTrendingUp className="size-4" />
                     </div>
                  </div>
                  <div className="flex items-baseline gap-2 tabular-nums">
                     <span className="text-2xl font-bold tracking-tight">
                        <AnimateNumber value={metrics.revenue} prefix="$" />
                     </span>
                     <Badge color="success" className="text-[10px] py-0 px-1" content="+12%" />
                  </div>
               </CardContent>
            </Card>

            <Card>
               <CardContent>
                  <div className="flex items-center justify-between mb-2">
                     <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Active Users</span>
                     <div className="size-8 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center">
                       <FiUsers className="size-4" />
                     </div>
                  </div>
                  <div className="flex items-baseline gap-2 tabular-nums">
                     <span className="text-2xl font-bold tracking-tight">
                        <AnimateNumber value={metrics.users} />
                     </span>
                     <Badge color="info" className="text-[10px] py-0 px-1" content="+5%" />
                  </div>
               </CardContent>
            </Card>

            <Card>
               <CardContent>
                  <div className="flex items-center justify-between mb-2">
                     <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Completed Tasks</span>
                     <div className="size-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                       <FiCheckCircle className="size-4" />
                     </div>
                  </div>
                  <div className="flex items-baseline gap-2 tabular-nums">
                     <span className="text-2xl font-bold tracking-tight">
                        <AnimateNumber value={metrics.tasks} />
                     </span>
                     <span className="text-xs text-muted-foreground">/ 150</span>
                  </div>
               </CardContent>
            </Card>

            <Card>
               <CardContent>
                  <div className="flex items-center justify-between mb-2">
                     <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Avg. Velocity</span>
                     <div className="size-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                       <FiZap className="size-4" />
                     </div>
                  </div>
                  <div className="flex items-baseline gap-2 tabular-nums">
                     <span className="text-2xl font-bold tracking-tight">
                        <AnimateNumber value={metrics.velocity} precision={1} />
                     </span>
                     <span className="text-xs text-muted-foreground">pts / week</span>
                  </div>
               </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Project Health Score</CardTitle>
                <CardDescription>Visualizing project stability and velocity over the last 6 months.</CardDescription>
              </CardHeader>
              <CardContent>
                <AreaChart
                  data={PROJECT_HEALTH_DATA}
                  series={[
                    { key: 'health', label: 'Health', color: 'var(--color-ds-primary-600)' },
                    { key: 'velocity', label: 'Velocity', color: 'var(--color-ds-primary-400)' }
                  ]}
                />
              </CardContent>
            </Card>

            <Card>
               <CardHeader>
                 <CardTitle>Performance by Team</CardTitle>
                 <CardDescription>Distribution of tasks across departments.</CardDescription>
               </CardHeader>
               <CardContent>
                 <BarChart
                   data={PERFORMANCE_DATA}
                   series={[
                     { key: 'completed', label: 'Completed', color: 'var(--color-ds-primary-500)' },
                     { key: 'pending', label: 'Pending', color: 'var(--color-ds-primary-200)' }
                   ]}
                   height={300}
                 />
               </CardContent>
            </Card>
          </div>

          {/* Project Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Projects</CardTitle>
                  <CardDescription>Overview of currently active development sprints.</CardDescription>
                </div>
                <Button variant="soft" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent className="pb-0 px-0">
              <Table framed={false}>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[30%]">Project Name</TableHead>
                    <TableHead className="w-[20%]">Status</TableHead>
                    <TableHead className="w-[25%]">Progress</TableHead>
                    <TableHead className="w-[15%]">Assignees</TableHead>
                    <TableHead className="text-right w-[10%]">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: 'Mobile App Redesign', status: 'In Progress', color: 'info' as const, progress: 65, users: 3 },
                    { name: 'Cloud Migration', status: 'Completed', color: 'success' as const, progress: 100, users: 4 },
                    { name: 'Security Audit', status: 'On Hold', color: 'warning' as const, progress: 45, users: 2 },
                    { name: 'API Documentation', status: 'In Progress', color: 'info' as const, progress: 20, users: 5 },
                  ].map((p, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell>
                        <Badge color={p.color} content={p.status} className="w-fit font-bold" variant="soft" />
                      </TableCell>
                      <TableCell>
                        <ProgressBar
                          value={p.progress}
                          size="xs"
                          showLabel
                          labelPosition="side"
                          className="max-w-[140px]"
                        />
                      </TableCell>
                      <TableCell>
                         <AvatarGroup size="xs" spacing="sm">
                            {[1, 2, 3].slice(0, p.users).map((u, idx) => (
                              <Avatar
                                key={u}
                                src={AVATARS[(i + idx + 1) % AVATARS.length]}
                              />
                            ))}
                         </AvatarGroup>
                      </TableCell>
                      <TableCell className="text-right">
                        <Dropdown>
                          <DropdownTrigger>
                             <IconButton variant="ghost" icon={<FiMoreVertical />} />
                          </DropdownTrigger>
                          <DropdownContent align="end">
                             <DropdownItem leftIcon={<FiLayout size={14} />}>Details</DropdownItem>
                             <DropdownItem leftIcon={<FiSettings size={14} />}>Settings</DropdownItem>
                          </DropdownContent>
                        </Dropdown>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          </div>
        </main>

        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] hidden md:block">
          <Dock>
             <DockItem icon={<FiHome />} label="Dashboard" />
             <DockItem icon={<FiMessageSquare />} label="Messages" />
             <DockItem icon={<FiArchive />} label="Project Archive" />
             <DockItem icon={<FiBriefcase />} label="Workspaces" />
             <DockItem icon={<FiGrid />} label="All Apps" />
             <DockItem icon={<FiSettings />} label="Settings" />
          </Dock>
        </div>

        <FloatActionMenu
          label="Commands"
          icon={<FiCommand />}
          position="bottom-right"
          className="absolute"
        >
          <div className="grid grid-cols-1 gap-1">
            {[
              { label: 'New Project', icon: <FiPlus />, color: 'text-primary' },
              { label: 'Invite Team', icon: <FiUsers />, color: 'text-emerald-500' },
              { label: 'Project Files', icon: <FiFileText />, color: 'text-ds-primary-500' },
              { label: 'Activity Logs', icon: <FiActivity />, color: 'text-ds-400' },
              { label: 'Support & Help', icon: <FiHelpCircle />, color: 'text-amber-500' },
            ].map((action, i) => (
              <button
                key={i}
                className="flex items-center gap-3 w-full p-2.5 rounded-lg hover:bg-ds-50 dark:hover:bg-ds-800 group text-left"
              >
                <div className={cn("size-8 rounded-lg bg-ds-100 dark:bg-ds-800 flex items-center justify-center group-hover:bg-ds-200 dark:group-hover:bg-ds-700", action.color)}>
                  {action.icon}
                </div>
                <span className="text-sm font-medium text-ds-700 dark:text-ds-300 group-hover:text-ds-950 dark:group-hover:text-ds-50">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </FloatActionMenu>
      </div>
    </div>
  );
};
