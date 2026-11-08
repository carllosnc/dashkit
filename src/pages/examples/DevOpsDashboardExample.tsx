import { useState } from 'react';
import { cn } from '../../dashkit/utils/cn';
import { Helmet } from 'react-helmet-async';
import {
  FiLayers,
  FiFolder,
  FiZap,
  FiDatabase,
  FiActivity,
  FiTerminal,
  FiGlobe,
  FiKey,
  FiSettings,
  FiGitBranch,
  FiGitCommit,
  FiAlertCircle,
  FiClock,
  FiPlus,
  FiExternalLink,
  FiServer,
  FiCpu,
  FiHardDrive,
  FiSearch,
  FiShield,
  FiCheckCircle,
  FiMoreVertical,
  FiCopy,
  FiRotateCcw,
} from 'react-icons/fi';
import {
  Sidebar,
  SidebarHeader,
  SidebarHeaderOpen,
  SidebarHeaderClose,
  SidebarFooter,
  SidebarFooterOpen,
  SidebarFooterClose,
  SidebarSection,
  SidebarItem,
} from '../../dashkit/Sidebar/Sidebar';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../dashkit/Card';
import { StatsCard } from '../../dashkit/StatsCard/StatsCard';
import { AreaChart } from '../../dashkit/AreaChart/AreaChart';
import { ProgressBar } from '../../dashkit/ProgressBar/ProgressBar';
import { Stepper, Step } from '../../dashkit/Stepper';
import { Badge } from '../../dashkit/Badge/Badge';
import { Avatar } from '../../dashkit/Avatar/Avatar';
import { Button } from '../../dashkit/Button/Button';
import { Tabs, TabsList, TabsTrigger } from '../../dashkit/Tabs';
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
} from '../../dashkit/Dropdown';
import { IconButton } from '../../dashkit/IconButton/IconButton';
import { Divider } from '../../dashkit/Divider/Divider';
import { Breadcrumb } from '../../dashkit/Breadcrumb/Breadcrumb';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../../dashkit/Table/Table';
import { useToast } from '../../dashkit/Toast/useToast';
import { ThemeToggle } from '../../partials/ThemeToggle';
import { ThemeCustomizer } from '../../partials/ThemeCustomizer';

interface Deployment {
  id: string;
  commitMessage: string;
  commitHash: string;
  author: string;
  authorAvatar: string;
  branch: string;
  environment: 'Production' | 'Preview';
  status: 'Ready' | 'Building' | 'Failed';
  timeAgo: string;
}

const recentDeployments: Deployment[] = [
  {
    id: 'dep-101',
    commitMessage: 'feat: telemetry streaming on edge',
    commitHash: '8f2d91a',
    author: 'Alex Morgan',
    authorAvatar: 'AM',
    branch: 'main',
    environment: 'Production',
    status: 'Ready',
    timeAgo: '4m ago',
  },
  {
    id: 'dep-102',
    commitMessage: 'fix: lambda cold boot cache headers',
    commitHash: '3c19e42',
    author: 'Elena Rostova',
    authorAvatar: 'ER',
    branch: 'preview/cache-opt',
    environment: 'Preview',
    status: 'Building',
    timeAgo: '12m ago',
  },
  {
    id: 'dep-103',
    commitMessage: 'chore(deps): bump tailwind & vite',
    commitHash: 'b492ec1',
    author: 'Marcus Vance',
    authorAvatar: 'MV',
    branch: 'chore/deps-update',
    environment: 'Preview',
    status: 'Ready',
    timeAgo: '1h ago',
  },
  {
    id: 'dep-104',
    commitMessage: 'refactor: decouple edge middleware',
    commitHash: '72ea98c',
    author: 'Alex Morgan',
    authorAvatar: 'AM',
    branch: 'main',
    environment: 'Production',
    status: 'Ready',
    timeAgo: '3h ago',
  },
  {
    id: 'dep-105',
    commitMessage: 'test: fix flaky checkout runner',
    commitHash: '19ef47b',
    author: 'Sarah Chen',
    authorAvatar: 'SC',
    branch: 'fix/runner-race',
    environment: 'Preview',
    status: 'Failed',
    timeAgo: '6h ago',
  },
  {
    id: 'dep-106',
    commitMessage: 'perf: enable brotli/gzip on CDN',
    commitHash: '4a81c0e',
    author: 'Elena Rostova',
    authorAvatar: 'ER',
    branch: 'main',
    environment: 'Production',
    status: 'Ready',
    timeAgo: '9h ago',
  },
  {
    id: 'dep-107',
    commitMessage: 'feat: add otel tracing headers',
    commitHash: '9d30fe1',
    author: 'Marcus Vance',
    authorAvatar: 'MV',
    branch: 'preview/otel-trace',
    environment: 'Preview',
    status: 'Ready',
    timeAgo: '14h ago',
  },
];

const trafficSeries = [
  { key: 'requests', label: 'Req / min', color: 'var(--color-primary)' },
];

const connectedDomains = [
  { domain: 'dashkit.dev', type: 'Primary Domain', status: 'Active', certDays: '78d left' },
  { domain: 'api.dashkit.dev', type: 'API Gateway', status: 'Active', certDays: '84d left' },
  { domain: 'edge.dashkit.dev', type: 'Global Edge Anycast', status: 'Active', certDays: '142d left' },
  { domain: 'preview.dashkit.dev', type: 'Preview & Staging', status: 'Active', certDays: '88d left' },
];

export const DevOpsDashboardExample = () => {
  const [activeItem, setActiveItem] = useState('deployments');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('7d');
  const { toast } = useToast();

  const statsByTimeRange = {
    '24h': {
      deployments: { value: 14, trend: 8.2, trendLabel: 'vs yesterday' },
      successRate: { value: 100, precision: 0, trend: 0.5, trendLabel: '0 failures' },
      buildTime: { value: 39, trend: -6.4, trendLabel: 'faster builds' },
      latency: { value: 19, trend: -3.1, trendLabel: 'faster edge' },
    },
    '7d': {
      deployments: { value: 48, trend: 18.5, trendLabel: 'vs last week' },
      successRate: { value: 99.4, precision: 1, trend: 1.2, trendLabel: 'high stability' },
      buildTime: { value: 42, trend: -14.5, trendLabel: 'faster builds' },
      latency: { value: 22, trend: -4.2, trendLabel: 'faster edge' },
    },
    '30d': {
      deployments: { value: 186, trend: 26.4, trendLabel: 'vs last month' },
      successRate: { value: 99.1, precision: 1, trend: 0.9, trendLabel: 'stable releases' },
      buildTime: { value: 44, trend: -11.8, trendLabel: 'pipeline optimized' },
      latency: { value: 21, trend: -5.0, trendLabel: 'global edge' },
    },
  };

  const currentStats = statsByTimeRange[timeRange];

  const chartsByTimeRange = {
    '24h': {
      traffic: [
        { label: '00:00', requests: 12400 },
        { label: '04:00', requests: 10200 },
        { label: '08:00', requests: 28900 },
        { label: '12:00', requests: 46100 },
        { label: '16:00', requests: 52400 },
        { label: '20:00', requests: 39100 },
        { label: 'Now', requests: 41200 },
      ],
    },
    '7d': {
      traffic: [
        { label: 'Mon', requests: 240000 },
        { label: 'Tue', requests: 310000 },
        { label: 'Wed', requests: 340000 },
        { label: 'Thu', requests: 390000 },
        { label: 'Fri', requests: 420000 },
        { label: 'Sat', requests: 280000 },
        { label: 'Sun', requests: 260000 },
      ],
    },
    '30d': {
      traffic: [
        { label: 'W1', requests: 1850000 },
        { label: 'W2', requests: 2120000 },
        { label: 'W3', requests: 2390000 },
        { label: 'W4', requests: 2640000 },
      ],
    },
  };

  const currentCharts = chartsByTimeRange[timeRange];

  const filteredDeployments = recentDeployments.filter((d) => {
    return selectedBranch === 'all' || d.branch === selectedBranch;
  });

  const handleTriggerDeploy = () => {
    toast({
      title: 'Deployment Queued',
      description: 'Deploying 8f2d91a (main)...',
      type: 'info',
    });
  };

  const handleRollback = (hash: string) => {
    toast({
      title: 'Rollback Initiated',
      description: `Reverting cluster to ${hash}.`,
      type: 'warning',
    });
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground font-sans">
      <Helmet>
        <title>Cloud & DevOps Console | Dashkit UI</title>
        <meta
          name="description"
          content="A high-performance DevOps & Cloud Infrastructure dashboard example featuring collapsible Sidebar, server health metrics, and deployment pipelines."
        />
      </Helmet>

      {/* LEFT COLLAPSIBLE SIDEBAR */}
      <Sidebar collapsible defaultOpen>
        <SidebarHeader>
          <SidebarHeaderOpen>
            <div className="flex items-center gap-3">
              <Avatar fallback="DK" size="sm" />
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-sm text-foreground truncate">Dashkit Cloud</span>
                <span className="text-xs text-muted-foreground truncate">us-east-1 • Enterprise</span>
              </div>
            </div>
          </SidebarHeaderOpen>
          <SidebarHeaderClose>
            <Avatar fallback="DK" size="sm" />
          </SidebarHeaderClose>
        </SidebarHeader>

        <div className="flex-1 overflow-y-auto flex flex-col gap-1">
          <SidebarSection title="Platform">
            <SidebarItem
              icon={<FiLayers size={18} />}
              active={activeItem === 'deployments'}
              onClick={() => setActiveItem('deployments')}
              badgeSlot={<Badge content="12" color="primary" variant="soft" />}
            >
              Deployments
            </SidebarItem>
            <SidebarItem
              icon={<FiFolder size={18} />}
              active={activeItem === 'projects'}
              onClick={() => setActiveItem('projects')}
            >
              Projects
            </SidebarItem>
            <SidebarItem
              icon={<FiZap size={18} />}
              active={activeItem === 'functions'}
              onClick={() => setActiveItem('functions')}
              badgeSlot={<Badge content="Edge" color="success" variant="soft" />}
            >
              Edge Functions
            </SidebarItem>
            <SidebarItem
              icon={<FiDatabase size={18} />}
              active={activeItem === 'databases'}
              onClick={() => setActiveItem('databases')}
            >
              Databases
            </SidebarItem>
          </SidebarSection>

          <SidebarSection title="Observability">
            <SidebarItem
              icon={<FiActivity size={18} />}
              active={activeItem === 'metrics'}
              onClick={() => setActiveItem('metrics')}
            >
              Metrics & Tracing
            </SidebarItem>
            <SidebarItem
              icon={<FiTerminal size={18} />}
              active={activeItem === 'logs'}
              onClick={() => setActiveItem('logs')}
            >
              Build Logs
            </SidebarItem>
            <SidebarItem
              icon={<FiAlertCircle size={18} />}
              active={activeItem === 'alerts'}
              onClick={() => setActiveItem('alerts')}
              badgeSlot={<Badge content="0" color="success" variant="soft" />}
            >
              Incident Alerts
            </SidebarItem>
          </SidebarSection>

          <SidebarSection title="Configuration">
            <SidebarItem
              icon={<FiGlobe size={18} />}
              active={activeItem === 'domains'}
              onClick={() => setActiveItem('domains')}
            >
              Domains & DNS
            </SidebarItem>
            <SidebarItem
              icon={<FiKey size={18} />}
              active={activeItem === 'env'}
              onClick={() => setActiveItem('env')}
            >
              Env Variables
            </SidebarItem>
            <SidebarItem
              icon={<FiSettings size={18} />}
              active={activeItem === 'settings'}
              onClick={() => setActiveItem('settings')}
            >
              Project Settings
            </SidebarItem>
          </SidebarSection>
        </div>

        <SidebarFooter>
          <SidebarFooterOpen>
            <div className="flex items-center gap-3">
              <Avatar fallback="AM" size="sm" />
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-foreground truncate">Alex Morgan</span>
                <span className="text-xs text-muted-foreground truncate">Platform Lead</span>
              </div>
            </div>
          </SidebarFooterOpen>
          <SidebarFooterClose>
            <Avatar fallback="AM" size="sm" />
          </SidebarFooterClose>
        </SidebarFooter>
      </Sidebar>

      {/* RIGHT MAIN CONTENT VIEWPORT */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden">
        {/* TOP NAVBAR */}
        <header className="h-16 shrink-0 border-b bg-card px-6 flex items-center justify-between gap-4">
          <Breadcrumb
            items={[
              { label: 'Examples', href: '/examples' },
              { label: 'dashkit-web' },
              { label: 'Deployments', active: true },
            ]}
          />

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-xs font-medium text-muted-foreground mr-1">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span>All Systems Operational</span>
            </div>
            <ThemeCustomizer />
            <ThemeToggle />
            <Button
              variant="soft"
              leftIcon={<FiExternalLink size={16} />}
              onClick={() => window.open('https://dashkit.netlify.app', '_blank')}
            >
              Visit App
            </Button>

            <Button
              variant="filled"
              leftIcon={<FiPlus size={16} />}
              onClick={handleTriggerDeploy}
            >
              New Deployment
            </Button>
          </div>
        </header>

        {/* SCROLLABLE DASHBOARD BODY */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl w-full mx-auto flex flex-col gap-6">
          {/* HEADER HERO TITLE */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Deployments & Infrastructure
              </h1>
              <p className="text-sm text-muted-foreground">
                Edge telemetry, global pipelines, and production clusters.
              </p>
            </div>

            {/* TIMEFRAME SELECTOR */}
            <Tabs
              value={timeRange}
              onValueChange={(val) => setTimeRange(val as '24h' | '7d' | '30d')}
              variant="pills"
              className="w-fit shrink-0 self-start sm:self-auto"
            >
              <TabsList>
                <TabsTrigger value="24h">24h</TabsTrigger>
                <TabsTrigger value="7d">7d</TabsTrigger>
                <TabsTrigger value="30d">30d</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* 4 STATS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Active Deployments"
              value={currentStats.deployments.value}
              trend={currentStats.deployments.trend}
              trendLabel={currentStats.deployments.trendLabel}
              status="success"
              icon={<FiLayers size={18} />}
            />
            <StatsCard
              title="Deployment Success"
              value={currentStats.successRate.value}
              suffix="%"
              precision={currentStats.successRate.precision}
              trend={currentStats.successRate.trend}
              trendLabel={currentStats.successRate.trendLabel}
              status="success"
              icon={<FiCheckCircle size={18} />}
            />
            <StatsCard
              title="Avg Build Time"
              value={currentStats.buildTime.value}
              suffix="s"
              trend={currentStats.buildTime.trend}
              trendLabel={currentStats.buildTime.trendLabel}
              status="success"
              icon={<FiClock size={18} />}
            />
            <StatsCard
              title="Global P95 Latency"
              value={currentStats.latency.value}
              suffix="ms"
              trend={currentStats.latency.trend}
              trendLabel={currentStats.latency.trendLabel}
              status="success"
              icon={<FiZap size={18} />}
            />
          </div>

          {/* RECENT DEPLOYMENTS TABLE (FULL WIDTH ROW) */}
          <Card>
            <CardHeader
              leftIcon={<FiGitCommit size={18} />}
              action={
                <Tabs
                  value={selectedBranch}
                  onValueChange={(val) => setSelectedBranch(val)}
                  variant="pills"
                  className="w-fit shrink-0"
                >
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="main">main</TabsTrigger>
                  </TabsList>
                </Tabs>
              }
            >
              <CardTitle as="h2" className="text-base font-bold">Recent Deployments</CardTitle>
              <CardDescription>
                CI/CD git triggers, branch previews, and releases
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="overflow-x-auto font-sans">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Commit & Description</TableHead>
                          <TableHead>Branch</TableHead>
                          <TableHead>Env</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDeployments.map((dep) => (
                          <TableRow key={dep.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar fallback={dep.authorAvatar} size="sm" className="shrink-0" />
                                <div className="flex flex-col min-w-0 gap-0.5">
                                  <span className="font-medium text-sm text-foreground truncate">
                                    {dep.commitMessage}
                                  </span>
                                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                    <span className="text-muted-foreground/80 font-medium">{dep.commitHash}</span>
                                    <span className="text-muted-foreground/30 text-[10px]">•</span>
                                    <span className="text-muted-foreground font-normal">{dep.author}</span>
                                    <span className="text-muted-foreground/30 text-[10px]">•</span>
                                    <span>{dep.timeAgo}</span>
                                  </div>
                                </div>
                              </div>
                            </TableCell>

                            <TableCell>
                              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-muted/50 border border-border/40 text-xs font-medium text-foreground">
                                <FiGitBranch size={13} className="text-muted-foreground shrink-0" />
                                <span>{dep.branch}</span>
                              </div>
                            </TableCell>

                            <TableCell>
                              <span
                                className={cn(
                                  'text-xs font-medium',
                                  dep.environment === 'Production' ? 'text-foreground' : 'text-muted-foreground'
                                )}
                              >
                                {dep.environment}
                              </span>
                            </TableCell>

                            <TableCell>
                              <div className="inline-flex items-center gap-2 text-xs font-medium text-foreground">
                                <span
                                  className={cn(
                                    'size-2 rounded-full shrink-0',
                                    dep.status === 'Ready' && 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.35)]',
                                    dep.status === 'Building' && 'bg-amber-500 animate-pulse',
                                    dep.status === 'Failed' && 'bg-rose-500'
                                  )}
                                />
                                <span>{dep.status}</span>
                              </div>
                            </TableCell>

                            <TableCell className="text-right">
                              <div className="flex items-center justify-end">
                                <Dropdown>
                                  <DropdownTrigger asChild>
                                    <IconButton
                                      variant="ghost"
                                      icon={<FiMoreVertical size={18} />}
                                      aria-label={`Actions for deployment ${dep.commitHash}`}
                                    />
                                  </DropdownTrigger>
                                  <DropdownContent align="end">
                                    <DropdownItem
                                      leftIcon={<FiExternalLink size={14} />}
                                      onClick={() => {
                                        toast({
                                          title: 'Deployment Preview',
                                          description: `Opening preview for ${dep.commitHash}...`,
                                          type: 'info',
                                        });
                                      }}
                                    >
                                      View Deployment
                                    </DropdownItem>
                                    <DropdownItem
                                      leftIcon={<FiTerminal size={14} />}
                                      onClick={() => {
                                        toast({
                                          title: 'Pipeline Logs',
                                          description: `Streaming logs for ${dep.commitHash}...`,
                                          type: 'info',
                                        });
                                      }}
                                    >
                                      View Build Logs
                                    </DropdownItem>
                                    <DropdownItem
                                      leftIcon={<FiCopy size={14} />}
                                      onClick={() => {
                                        navigator.clipboard?.writeText(dep.commitHash);
                                        toast({
                                          title: 'SHA Copied',
                                          description: `Copied ${dep.commitHash}.`,
                                          type: 'success',
                                        });
                                      }}
                                    >
                                      Copy Commit SHA
                                    </DropdownItem>
                                    <DropdownSeparator />
                                    <DropdownItem
                                      destructive
                                      leftIcon={<FiRotateCcw size={14} />}
                                      onClick={() => handleRollback(dep.commitHash)}
                                    >
                                      Rollback Release
                                    </DropdownItem>
                                  </DropdownContent>
                                </Dropdown>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                </div>
              </CardContent>
            </Card>

          {/* INFRASTRUCTURE & DOMAINS (ROW BELOW TABLE) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* SERVER CLUSTER RESOURCE METRICS */}
            <Card className="flex flex-col h-full">
              <CardHeader leftIcon={<FiServer size={18} />}>
                <CardTitle as="h2">Cluster Resources</CardTitle>
                <CardDescription>Node capacity and cluster headroom</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground flex items-center gap-2">
                        <FiCpu size={14} className="text-muted-foreground" />
                        CPU Utilization
                      </span>
                      <span className="text-xs text-muted-foreground tabular-nums">38% (8 / 24 cores)</span>
                    </div>
                    <ProgressBar value={38} color="primary" size="sm" />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground flex items-center gap-2">
                        <FiHardDrive size={14} className="text-muted-foreground" />
                        RAM Consumption
                      </span>
                      <span className="text-xs text-muted-foreground tabular-nums">62% (19.8 / 32 GB)</span>
                    </div>
                    <ProgressBar value={62} color="primary" size="sm" />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground flex items-center gap-2">
                        <FiZap size={14} className="text-muted-foreground" />
                        Edge Cache Hit Ratio
                      </span>
                      <span className="text-xs text-muted-foreground tabular-nums">98.4%</span>
                    </div>
                    <ProgressBar value={98} color="primary" size="sm" />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-foreground flex items-center gap-2">
                        <FiDatabase size={14} className="text-muted-foreground" />
                        SSD NVMe Disk
                      </span>
                      <span className="text-xs text-muted-foreground tabular-nums">41% (164 / 400 GB)</span>
                    </div>
                    <ProgressBar value={41} color="primary" size="sm" />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <Divider />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Worker Pool Autoscaling</span>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                      <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>Active (2–16 instances)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* ACTIVE DOMAINS & SSL */}
            <Card className="flex flex-col h-full">
              <CardHeader
                leftIcon={<FiShield size={18} />}
                action={<span className="text-xs font-medium text-muted-foreground">4 Domains</span>}
              >
                <CardTitle as="h2">Domains & SSL</CardTitle>
                <CardDescription>Domain routing and certificate renewal</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between gap-4">
                <div className="flex flex-col divide-y divide-border">
                  {connectedDomains.map((dom) => (
                    <div key={dom.domain} className="flex flex-col gap-1.5 py-3 first:pt-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FiGlobe size={14} className="text-muted-foreground" />
                          <span className="font-semibold text-foreground">{dom.domain}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                          <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
                          <span>{dom.status}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{dom.type}</span>
                        <span className="tabular-nums">{dom.certDays}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-4">
                  <Divider />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">SSL Auto-Renewal</span>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-foreground">
                      <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>Enabled (Wildcard)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* OBSERVABILITY, PIPELINES & SECURITY (2X2 GRID) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* 1. EDGE REQUEST INGRESS (AreaChart) */}
            <Card className="flex flex-col h-full">
              <CardHeader
                leftIcon={<FiActivity size={18} />}
                action={
                  <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                      <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                    </span>
                    <span>Live Stream</span>
                  </div>
                }
              >
                <CardTitle as="h2">Request Ingress</CardTitle>
                <CardDescription>
                  HTTP/3 edge ingress requests
                </CardDescription>
              </CardHeader>
              <CardContent className="h-56">
                <AreaChart data={currentCharts.traffic} series={trafficSeries} />
              </CardContent>
            </Card>

            {/* 2. PIPELINE BUILD EXECUTION (Stepper Component) */}
            <Card className="flex flex-col h-full">
              <CardHeader
                leftIcon={<FiGitCommit size={18} />}
                action={
                  <Badge
                    content="Passed • 1m 39s"
                    color="success"
                    variant="soft"
                    className="normal-case tracking-normal font-medium"
                  />
                }
              >
                <CardTitle as="h2">Pipeline Stages</CardTitle>
                <CardDescription>
                  Build execution for commit 8f2d91a
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-center py-2">
                <Stepper activeStep={4} orientation="vertical" color="base" className="w-full">
                  <Step
                    className="w-full pb-3 last:pb-0 [&_.step__container]:w-full [&_.step__content]:flex-1 [&_.step__content]:min-w-0"
                    title={
                      <div className="flex items-center justify-between gap-2 w-full">
                        <span className="text-sm font-semibold text-foreground">Lint & Typecheck</span>
                        <span className="text-xs text-muted-foreground tabular-nums">14s</span>
                      </div>
                    }
                    description={
                      <div className="flex items-center justify-between gap-4 w-full">
                        <span className="text-xs text-muted-foreground truncate">tsc -b && eslint .</span>
                        <span className="text-[11px] text-muted-foreground/60 shrink-0">passed</span>
                      </div>
                    }
                  />
                  <Step
                    className="w-full pb-3 last:pb-0 [&_.step__container]:w-full [&_.step__content]:flex-1 [&_.step__content]:min-w-0"
                    title={
                      <div className="flex items-center justify-between gap-2 w-full">
                        <span className="text-sm font-semibold text-foreground">Automated Tests</span>
                        <span className="text-xs text-muted-foreground tabular-nums">28s</span>
                      </div>
                    }
                    description={
                      <div className="flex items-center justify-between gap-4 w-full">
                        <span className="text-xs text-muted-foreground truncate">vitest run (54 suites)</span>
                        <span className="text-[11px] text-muted-foreground/60 shrink-0">passed</span>
                      </div>
                    }
                  />
                  <Step
                    className="w-full pb-3 last:pb-0 [&_.step__container]:w-full [&_.step__content]:flex-1 [&_.step__content]:min-w-0"
                    title={
                      <div className="flex items-center justify-between gap-2 w-full">
                        <span className="text-sm font-semibold text-foreground">Container Build</span>
                        <span className="text-xs text-muted-foreground tabular-nums">45s</span>
                      </div>
                    }
                    description={
                      <div className="flex items-center justify-between gap-4 w-full">
                        <span className="text-xs text-muted-foreground truncate">docker build (linux/amd64)</span>
                        <span className="text-[11px] text-muted-foreground/60 shrink-0">passed</span>
                      </div>
                    }
                  />
                  <Step
                    className="w-full pb-3 last:pb-0 [&_.step__container]:w-full [&_.step__content]:flex-1 [&_.step__content]:min-w-0"
                    title={
                      <div className="flex items-center justify-between gap-2 w-full">
                        <span className="text-sm font-semibold text-foreground">Global Edge Sync</span>
                        <span className="text-xs text-muted-foreground tabular-nums">12s</span>
                      </div>
                    }
                    description={
                      <div className="flex items-center justify-between gap-4 w-full">
                        <span className="text-xs text-muted-foreground truncate">syncing 28 anycast PoPs</span>
                        <span className="text-[11px] text-muted-foreground/60 shrink-0">synced</span>
                      </div>
                    }
                  />
                </Stepper>
              </CardContent>
            </Card>

            {/* 3. EDGE POINTS OF PRESENCE */}
            <Card className="flex flex-col h-full">
              <CardHeader
                leftIcon={<FiGlobe size={18} />}
                action={
                  <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>28 PoPs Active</span>
                  </div>
                }
              >
                <CardTitle as="h2">Edge Points of Presence</CardTitle>
                <CardDescription>
                  Regional latency and ingress traffic share
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between gap-4 pt-1">
                {[
                  { code: 'IAD', region: 'North Virginia, USA', latency: '4.2ms', traffic: '38%', pct: 38 },
                  { code: 'FRA', region: 'Frankfurt, Germany', latency: '18.5ms', traffic: '27%', pct: 27 },
                  { code: 'NRT', region: 'Tokyo, Japan', latency: '41.8ms', traffic: '21%', pct: 21 },
                  { code: 'GRU', region: 'São Paulo, Brazil', latency: '27.9ms', traffic: '14%', pct: 14 },
                ].map((pop) => (
                  <div key={pop.code} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-semibold text-foreground truncate">{pop.region}</span>
                        <span className="text-xs text-muted-foreground">{pop.code}</span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0 text-xs">
                        <span className="text-muted-foreground">{pop.traffic} traffic</span>
                        <span className="font-semibold text-foreground">{pop.latency}</span>
                      </div>
                    </div>
                    <ProgressBar value={pop.pct} size="sm" color="primary" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* 4. SECURITY & COMPLIANCE */}
            <Card className="flex flex-col h-full">
              <CardHeader
                leftIcon={<FiShield size={18} />}
                action={
                  <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-500">
                    <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>Protected</span>
                  </div>
                }
              >
                <CardTitle as="h2">Security & Compliance</CardTitle>
                <CardDescription>
                  Firewall rules and automated security scans
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between divide-y divide-border/60 pt-1">
                {[
                  {
                    icon: <FiShield size={15} />,
                    label: 'DDoS Shield & WAF',
                    detail: 'Cloudflare Layer 7 active',
                    status: 'Active',
                    stat: '0 attacks blocked',
                  },
                  {
                    icon: <FiKey size={15} />,
                    label: 'Secret Detection',
                    detail: 'Repository clean & signed',
                    status: 'Clean',
                    stat: '0 leaks detected',
                  },
                  {
                    icon: <FiSearch size={15} />,
                    label: 'Vulnerability Scan',
                    detail: 'Trivy container audit passed',
                    status: 'Passed',
                    stat: '0 CVE findings',
                  },
                  {
                    icon: <FiGitBranch size={15} />,
                    label: 'Branch Protection',
                    detail: 'Strict merge & status check',
                    status: 'Strict',
                    stat: '1 approval required',
                  },
                ].map((sec) => (
                  <div key={sec.label} className="flex items-center justify-between gap-4 py-2.5 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="size-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                        {sec.icon}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-foreground text-sm truncate">{sec.label}</span>
                        <span className="text-xs text-muted-foreground truncate">{sec.detail}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end shrink-0 gap-0.5">
                      <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-500">
                        <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span>{sec.status}</span>
                      </div>
                      <span className="text-[11px] text-muted-foreground tabular-nums">{sec.stat}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      </div>
    </div>
  );
};
