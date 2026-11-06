import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  FiArrowLeft,
  FiDownload,
  FiDollarSign,
  FiUsers,
  FiActivity,
  FiTrendingUp,
  FiLayers,
  FiCreditCard,
  FiPieChart,
  FiServer,
  FiGlobe,
  FiCpu,
  FiHardDrive,
  FiZap,
  FiShield,
} from 'react-icons/fi';
import { CircularProgress } from '../../dashkit/CircularProgress/CircularProgress';

import { Header } from '../../partials/Header';
import { Footer } from '../../partials/Footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../dashkit/Card';
import { StatsCard } from '../../dashkit/StatsCard/StatsCard';
import { AreaChart } from '../../dashkit/AreaChart/AreaChart';
import { BarChart } from '../../dashkit/BarChart/BarChart';
import { PieChart } from '../../dashkit/PieChart/PieChart';
import { ProgressBar } from '../../dashkit/ProgressBar/ProgressBar';
import { Divider } from '../../dashkit/Divider/Divider';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../../dashkit/Table/Table';
import { Badge } from '../../dashkit/Badge/Badge';
import { Avatar } from '../../dashkit/Avatar/Avatar';
import { Button } from '../../dashkit/Button/Button';
import { Select } from '../../dashkit/Select/Select';
import { Tabs, TabsList, TabsTrigger } from '../../dashkit/Tabs/Tabs';

const revenueData12m = [
  { label: 'Jan', revenue: 28000, target: 25000 },
  { label: 'Feb', revenue: 31000, target: 27000 },
  { label: 'Mar', revenue: 29500, target: 28000 },
  { label: 'Apr', revenue: 34000, target: 30000 },
  { label: 'May', revenue: 37500, target: 32000 },
  { label: 'Jun', revenue: 36000, target: 33000 },
  { label: 'Jul', revenue: 41000, target: 35000 },
  { label: 'Aug', revenue: 43500, target: 37000 },
  { label: 'Sep', revenue: 42000, target: 38000 },
  { label: 'Oct', revenue: 46000, target: 40000 },
  { label: 'Nov', revenue: 49500, target: 42000 },
  { label: 'Dec', revenue: 54000, target: 45000 },
];

const revenueData30d = [
  { label: 'W1', revenue: 11200, target: 10000 },
  { label: 'W2', revenue: 12800, target: 11000 },
  { label: 'W3', revenue: 14100, target: 11500 },
  { label: 'W4', revenue: 15900, target: 12500 },
];

const revenueData7d = [
  { label: 'Mon', revenue: 1800, target: 1600 },
  { label: 'Tue', revenue: 2300, target: 1800 },
  { label: 'Wed', revenue: 2100, target: 1800 },
  { label: 'Thu', revenue: 2900, target: 2000 },
  { label: 'Fri', revenue: 3400, target: 2200 },
  { label: 'Sat', revenue: 1900, target: 1500 },
  { label: 'Sun', revenue: 1600, target: 1400 },
];

const planDistribution = [
  { label: 'Starter', active: 340 },
  { label: 'Pro', active: 620 },
  { label: 'Team', active: 280 },
  { label: 'Enterprise', active: 95 },
];

interface Transaction {
  id: string;
  name: string;
  email: string;
  plan: string;
  date: string;
  amount: string;
  status: 'success' | 'warning' | 'danger';
  statusLabel: string;
}

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  badge: string;
  badgeColor: 'success' | 'info' | 'warning' | 'primary';
  time: string;
  icon: 'trending' | 'user' | 'credit' | 'zap' | 'download';
}

const initialActivities: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'Enterprise Plan Upgrade',
    description: 'Acme Corp converted to Enterprise Annual',
    badge: '+$2,400/yr',
    badgeColor: 'success',
    time: 'Just now',
    icon: 'trending',
  },
  {
    id: 'act-2',
    title: 'New Team Member',
    description: 'sarah.wong@fintech.io joined Analytics team',
    badge: 'Workspace',
    badgeColor: 'info',
    time: '2m ago',
    icon: 'user',
  },
  {
    id: 'act-3',
    title: 'Automated Webhook Batch',
    description: '1,420 transaction events dispatched to BigQuery',
    badge: 'Synced',
    badgeColor: 'success',
    time: '5m ago',
    icon: 'zap',
  },
];

const incomingActivitiesPool: Omit<ActivityItem, 'id' | 'time'>[] = [
  {
    title: 'Custom Revenue Export',
    description: 'Q3 Financial summary downloaded by Finance',
    badge: 'Exported',
    badgeColor: 'info',
    icon: 'download',
  },
  {
    title: 'Pro Plan Subscription',
    description: 'Nordic Labs subscribed to Pro Monthly',
    badge: '+$149/mo',
    badgeColor: 'success',
    icon: 'credit',
  },
  {
    title: 'Quota Threshold Notice',
    description: 'API requests reached 84% of monthly limit',
    badge: 'Notice',
    badgeColor: 'warning',
    icon: 'zap',
  },
  {
    title: 'New Admin Member',
    description: 'lucas.silva@nubank.br joined billing admins',
    badge: 'Admin',
    badgeColor: 'info',
    icon: 'user',
  },
  {
    title: 'Enterprise Seat Added',
    description: 'Stripe Payments added 10 analyst seats',
    badge: '+$350/mo',
    badgeColor: 'success',
    icon: 'trending',
  },
];

interface RegionData {
  country: string;
  code: string;
  revenue: string;
  share: number;
  users: string;
  growth: string;
  growthType: 'success' | 'info' | 'warning';
}

const topRegionsData: RegionData[] = [
  { country: 'United States', code: 'US', revenue: '$28,450', share: 48, users: '640 active', growth: '+14.2%', growthType: 'success' },
  { country: 'European Union', code: 'EU', revenue: '$14,200', share: 26, users: '348 active', growth: '+8.6%', growthType: 'success' },
  { country: 'United Kingdom', code: 'GB', revenue: '$6,800', share: 12, users: '162 active', growth: '+5.4%', growthType: 'success' },
  { country: 'Brazil & LatAm', code: 'BR', revenue: '$3,100', share: 8, users: '115 active', growth: '+22.5%', growthType: 'success' },
  { country: 'Asia-Pacific', code: 'APAC', revenue: '$1,450', share: 6, users: '70 active', growth: '+18.1%', growthType: 'success' },
];

const trafficSourcesData = [
  { label: 'Organic Search', value: 42, color: 'var(--color-chart-1)' },
  { label: 'Direct Traffic', value: 28, color: 'var(--color-chart-2)' },
  { label: 'Referral & Partner', value: 18, color: 'var(--color-chart-4)' },
  { label: 'Social & Media', value: 12, color: 'var(--color-chart-3)' },
];

const recentTransactions: Transaction[] = [
  {
    id: 'tx-1',
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    plan: 'Enterprise Yearly',
    date: 'Today, 14:32',
    amount: '$1,990.00',
    status: 'success',
    statusLabel: 'Completed',
  },
  {
    id: 'tx-2',
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    plan: 'Pro Monthly',
    date: 'Today, 12:15',
    amount: '$49.00',
    status: 'success',
    statusLabel: 'Completed',
  },
  {
    id: 'tx-3',
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    plan: 'Team Annual',
    date: 'Yesterday, 19:40',
    amount: '$588.00',
    status: 'warning',
    statusLabel: 'Processing',
  },
  {
    id: 'tx-4',
    name: 'William Kim',
    email: 'will@kim.dev',
    plan: 'Starter Monthly',
    date: 'Yesterday, 09:21',
    amount: '$19.00',
    status: 'danger',
    statusLabel: 'Failed',
  },
  {
    id: 'tx-5',
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    plan: 'Pro Annual',
    date: 'Oct 24, 2026',
    amount: '$390.00',
    status: 'success',
    statusLabel: 'Completed',
  },
];

export const AnalyticsDashboardExample = () => {
  const [timeRange, setTimeRange] = useState('12m');
  const [selectedEnvironment, setSelectedEnvironment] = useState('production');
  const [activities, setActivities] = useState<ActivityItem[]>(initialActivities);

  useEffect(() => {
    let poolIndex = 0;
    const interval = window.setInterval(() => {
      const nextTemplate = incomingActivitiesPool[poolIndex % incomingActivitiesPool.length];
      poolIndex++;

      const newEntry: ActivityItem = {
        ...nextTemplate,
        id: `act-${Date.now()}`,
        time: 'Just now',
      };

      setActivities((prev) => [
        newEntry,
        { ...prev[0], time: '1m ago' },
        { ...prev[1], time: '4m ago' },
      ]);
    }, 4500);

    return () => window.clearInterval(interval);
  }, []);

  const environmentOptions = [
    { value: 'production', label: 'Production' },
    { value: 'staging', label: 'Staging' },
    { value: 'development', label: 'Development' },
  ];

  const currentChartData =
    timeRange === '7d'
      ? revenueData7d
      : timeRange === '30d'
      ? revenueData30d
      : revenueData12m;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <Helmet>
        <title>Analytics Dashboard Example | Dashkit UI</title>
        <meta
          name="description"
          content="A modern SaaS analytics dashboard with metrics, revenue trends, tier distributions, and transaction records built purely with Dashkit components."
        />
      </Helmet>
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10 flex flex-col gap-6">
        {/* Navigation & Header */}
        <div className="flex flex-col gap-4">
          <Link
            to="/examples"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors w-fit"
          >
            <FiArrowLeft size={16} />
            Back to Examples
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
            <p className="text-muted-foreground text-base">
              Real-time metrics, growth performance, and billing overview for your workspace.
            </p>
          </div>
        </div>

        {/* Dashboard Toolbar Bar */}
        <Card className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <FiServer className="size-3.5 text-muted-foreground" />
              Environment:
            </span>
            <div className="w-44">
              <Select
                options={environmentOptions}
                value={selectedEnvironment}
                onChange={setSelectedEnvironment}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outlined" leftIcon={<FiDownload />}>
              Export Report
            </Button>
          </div>
        </Card>

        {/* KPI Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Monthly Recurring Revenue"
            value={54000}
            prefix="$"
            trend={14.2}
            trendLabel="vs last period"
            status="success"
            animate
            icon={<FiDollarSign className="size-4" />}
            chart={{
              data: [35, 38, 36, 42, 40, 45, 48, 54],
            }}
          />
          <StatsCard
            title="Active Subscribers"
            value={1335}
            trend={8.5}
            trendLabel="vs last period"
            status="success"
            animate
            icon={<FiUsers className="size-4" />}
            chart={{
              data: [980, 1040, 1100, 1180, 1220, 1290, 1335],
            }}
          />
          <StatsCard
            title="Avg. Revenue Per User"
            value={40.45}
            prefix="$"
            precision={2}
            trend={2.1}
            trendLabel="vs last period"
            status="success"
            animate
            icon={<FiTrendingUp className="size-4" />}
            chart={{
              data: [38, 38.5, 39, 39.2, 39.8, 40.1, 40.45],
            }}
          />
          <StatsCard
            title="Churn Rate"
            value={1.4}
            suffix="%"
            precision={1}
            trend={-0.3}
            trendLabel="vs last period"
            status="success"
            animate
            icon={<FiActivity className="size-4" />}
            chart={{
              data: [2.1, 1.9, 1.8, 1.7, 1.6, 1.5, 1.4],
            }}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader
              leftIcon={<FiTrendingUp size={18} />}
              action={
                <Tabs value={timeRange} onValueChange={setTimeRange}>
                  <TabsList>
                    <TabsTrigger value="7d">7 Days</TabsTrigger>
                    <TabsTrigger value="30d">30 Days</TabsTrigger>
                    <TabsTrigger value="12m">12 Months</TabsTrigger>
                  </TabsList>
                </Tabs>
              }
            >
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Compare actual revenue vs target forecast</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72 w-full">
                <AreaChart
                  data={currentChartData}
                  series={[
                    {
                      key: 'revenue',
                      label: 'Actual Revenue ($)',
                      color: 'var(--color-chart-1)',
                      fillOpacity: 0.25,
                    },
                    {
                      key: 'target',
                      label: 'Target Forecast ($)',
                      color: 'var(--color-chart-4)',
                      strokeDasharray: '5 5',
                      fillOpacity: 0.04,
                    },
                  ]}
                  height="100%"
                  showGrid
                  showLabels
                  showTooltip
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader leftIcon={<FiLayers size={18} />}>
              <CardTitle>Subscriptions by Plan</CardTitle>
              <CardDescription>Active customer accounts per tier</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72 w-full">
                <BarChart
                  data={planDistribution}
                  series={[{ key: 'active', label: 'Subscribers' }]}
                  height="100%"
                  showGrid
                  showLabels
                  showTooltip
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance & Resource Metrics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader
              leftIcon={<FiPieChart size={18} />}
              action={
                <Badge
                  content="Organic +18%"
                  color="success"
                  variant="soft"
                />
              }
            >
              <CardTitle>Acquisition Channels</CardTitle>
              <CardDescription>Traffic sources and customer signup attribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div className="h-52 flex items-center justify-center">
                  <PieChart data={trafficSourcesData} innerRadius={0.55} showLabels={false} />
                </div>
                <div className="flex flex-col gap-3">
                  {trafficSourcesData.map((item) => (
                    <div key={item.label} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="size-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-muted-foreground truncate">{item.label}</span>
                      </div>
                      <span className="font-semibold text-foreground ml-2">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader
              leftIcon={<FiServer size={18} />}
              action={
                <Badge
                  content="Operational"
                  color="success"
                  variant="soft"
                />
              }
            >
              <CardTitle>Platform Usage & Quotas</CardTitle>
              <CardDescription>Real-time resource utilization and workspace limits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground flex items-center gap-2">
                      <FiGlobe className="size-4 text-muted-foreground" />
                      API Requests
                    </span>
                    <span className="text-xs text-muted-foreground">84,200 / 100,000 (84%)</span>
                  </div>
                  <ProgressBar value={84} color="primary" size="sm" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground flex items-center gap-2">
                      <FiHardDrive className="size-4 text-muted-foreground" />
                      Database Storage
                    </span>
                    <span className="text-xs text-muted-foreground">14.8 GB / 20 GB (74%)</span>
                  </div>
                  <ProgressBar value={74} color="primary" size="sm" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground flex items-center gap-2">
                      <FiZap className="size-4 text-muted-foreground" />
                      Webhook Events
                    </span>
                    <span className="text-xs text-muted-foreground">91,500 / 100,000 (91%)</span>
                  </div>
                  <ProgressBar value={91} color="primary" size="sm" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground flex items-center gap-2">
                      <FiCpu className="size-4 text-muted-foreground" />
                      Background Compute
                    </span>
                    <span className="text-xs text-muted-foreground">320 / 1,000 hrs (32%)</span>
                  </div>
                  <ProgressBar value={32} color="primary" size="sm" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Health & Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="flex flex-col justify-between">
            <CardHeader
              leftIcon={<FiShield size={18} />}
              action={
                <Badge
                  content="99.98% SLA"
                  color="success"
                  variant="soft"
                />
              }
            >
              <CardTitle>System Health</CardTitle>
              <CardDescription>Live infrastructure availability & performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6 py-2">
                <div className="shrink-0 flex items-center justify-center">
                  <CircularProgress
                    value={99}
                    size="lg"
                    color="success"
                    showValue
                  />
                </div>
                <div className="flex flex-col gap-2.5 flex-1 min-w-0">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">30-Day Uptime</span>
                    <span className="font-semibold text-foreground">99.98%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Global P99 Latency</span>
                    <span className="font-semibold text-foreground">18ms</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Active Incidents</span>
                    <Badge content="0 Active" color="success" variant="soft" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="flex flex-col justify-between">
            <CardHeader
              leftIcon={<FiActivity size={18} />}
              action={
                <Badge
                  content="Live Feed"
                  color="success"
                  variant="soft"
                />
              }
            >
              <CardTitle>Real-Time Activity</CardTitle>
              <CardDescription>Live customer events, upgrades, and workspace actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col divide-y divide-border/40">
                {activities.slice(0, 3).map((act) => {
                  const getIcon = () => {
                    switch (act.icon) {
                      case 'trending':
                        return <FiTrendingUp className="size-3.5 text-ds-success-600 dark:text-ds-success-400" />;
                      case 'user':
                        return <FiUsers className="size-3.5 text-ds-primary-600 dark:text-ds-primary-400" />;
                      case 'credit':
                        return <FiCreditCard className="size-3.5 text-ds-success-600 dark:text-ds-success-400" />;
                      case 'download':
                        return <FiDownload className="size-3.5 text-ds-info-600 dark:text-ds-info-400" />;
                      case 'zap':
                      default:
                        return <FiZap className="size-3.5 text-ds-warning-600 dark:text-ds-warning-400" />;
                    }
                  };

                  return (
                    <div
                      key={act.id}
                      className="flex items-center justify-between py-2 first:pt-0 last:pb-0 gap-3"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="size-7 rounded-full bg-muted/60 border border-border/60 flex items-center justify-center shrink-0">
                          {getIcon()}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-semibold text-foreground truncate">{act.title}</span>
                          <span className="text-[11px] text-muted-foreground truncate">{act.description}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Badge content={act.badge} color={act.badgeColor} variant="soft" />
                        <span className="text-[11px] text-muted-foreground tabular-nums">{act.time}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Geographic Markets Section */}
        <Card>
          <CardHeader
            leftIcon={<FiGlobe size={18} />}
            action={
              <Badge
                content="142 Countries"
                color="info"
                variant="soft"
              />
            }
          >
            <CardTitle>Top Geographic Markets</CardTitle>
            <CardDescription>
              Global revenue distribution, active customer concentration, and regional expansion
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-6 items-stretch">
              <div className="flex-1 flex flex-col justify-between gap-4 py-1">
                {topRegionsData.map((reg) => (
                  <div
                    key={reg.code}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{reg.country}</span>
                        <span className="text-xs text-muted-foreground">({reg.users})</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-foreground">{reg.revenue}</span>
                        <span className="text-xs text-muted-foreground w-8 text-right">{reg.share}%</span>
                        <Badge content={reg.growth} color={reg.growthType} variant="soft" />
                      </div>
                    </div>
                    <ProgressBar value={reg.share} color="primary" size="sm" />
                  </div>
                ))}
              </div>

              <Divider orientation="vertical" className="hidden lg:block self-stretch" />
              <Divider orientation="horizontal" className="lg:hidden" />

              <div className="lg:w-80 flex flex-col justify-between gap-4 py-1">
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1">Global Expansion Insights</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Regional adoption continues to accelerate outside North America, led by Latin America (+22.5%) and Asia-Pacific (+18.1%).
                  </p>
                </div>

                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between py-1 text-xs">
                    <span className="text-muted-foreground">Primary Market Share</span>
                    <span className="font-semibold text-foreground">US & Canada (48%)</span>
                  </div>
                  <div className="flex items-center justify-between py-1 text-xs">
                    <span className="text-muted-foreground">Fastest Growing Region</span>
                    <span className="font-semibold text-ds-success-600 dark:text-ds-success-400">LatAm (+22.5%)</span>
                  </div>
                  <div className="flex items-center justify-between py-1 text-xs">
                    <span className="text-muted-foreground">Regional Compliance</span>
                    <Badge content="GDPR / CCPA" color="success" variant="soft" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table Section */}
        <Card>
          <CardHeader
            leftIcon={<FiCreditCard size={18} />}
            action={
              <Badge
                content={`${recentTransactions.length} records`}
                color="info"
                variant="soft"
              />
            }
          >
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest customer billing events and plan upgrades</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead align="right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((tx) => {
                  const initials = tx.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase();

                  return (
                    <TableRow key={tx.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar size="sm" fallback={initials} />
                          <div className="flex flex-col">
                            <span className="font-medium text-foreground">{tx.name}</span>
                            <span className="text-xs text-muted-foreground">{tx.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{tx.plan}</TableCell>
                      <TableCell className="text-muted-foreground">{tx.date}</TableCell>
                      <TableCell>
                        <Badge
                          content={tx.statusLabel}
                          color={tx.status}
                          variant="soft"
                        />
                      </TableCell>
                      <TableCell align="right" className="font-medium text-foreground">
                        {tx.amount}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};
