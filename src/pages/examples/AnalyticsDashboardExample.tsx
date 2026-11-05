import { useState } from 'react';
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
} from 'react-icons/fi';
import { Header } from '../../partials/Header';
import { Footer } from '../../partials/Footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../dashkit/Card';
import { StatsCard } from '../../dashkit/StatsCard/StatsCard';
import { AreaChart } from '../../dashkit/AreaChart/AreaChart';
import { BarChart } from '../../dashkit/BarChart/BarChart';
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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
              <p className="text-muted-foreground text-base">
                Real-time metrics, growth performance, and billing overview for your workspace.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-44">
                <Select
                  options={environmentOptions}
                  value={selectedEnvironment}
                  onChange={setSelectedEnvironment}
                />
              </div>
              <Button variant="outlined" leftIcon={<FiDownload />}>
                Export
              </Button>
            </div>
          </div>
        </div>

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
