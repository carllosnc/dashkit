import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import clsx from 'clsx';
import {
  FiCpu,
  FiZap,
  FiActivity,
  FiKey,
  FiShield,
  FiDollarSign,
  FiSettings,
  FiCheckCircle,
  FiClock,
  FiCopy,
  FiPlus,
  FiExternalLink,
  FiMoreVertical,
  FiTerminal,
  FiRefreshCw,
  FiSliders,
  FiLock,
} from 'react-icons/fi';
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
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
import {
  Table,
  TableContainer,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../dashkit/Table/Table";
import { useToast } from '../../dashkit/Toast/useToast';
import { ThemeToggle } from '../../partials/ThemeToggle';
import { ThemeCustomizer } from '../../partials/ThemeCustomizer';

interface RequestLog {
  id: string;
  promptSnippet: string;
  model: string;
  tokensIn: number;
  tokensOut: number;
  latencyMs: number;
  status: 'Completed' | 'Cached' | 'Streaming' | 'Throttled';
  timestamp: string;
  clientApp: string;
}

const recentLogs: RequestLog[] = [
  {
    id: 'req_8f1a20',
    promptSnippet: 'Explain causal self-attention mechanisms in Transformer decoders...',
    model: 'claude-3-5-sonnet',
    tokensIn: 840,
    tokensOut: 620,
    latencyMs: 382,
    status: 'Completed',
    timestamp: '2s ago',
    clientApp: 'dashkit-agent',
  },
  {
    id: 'req_3c9b74',
    promptSnippet: 'Extract schema fields from raw invoice PDF text payload...',
    model: 'gpt-4o',
    tokensIn: 1420,
    tokensOut: 210,
    latencyMs: 245,
    status: 'Cached',
    timestamp: '14s ago',
    clientApp: 'invoice-worker',
  },
  {
    id: 'req_9a4d11',
    promptSnippet: 'Streaming markdown code snippet for React state reducer hook...',
    model: 'deepseek-v3',
    tokensIn: 520,
    tokensOut: 790,
    latencyMs: 410,
    status: 'Streaming',
    timestamp: '28s ago',
    clientApp: 'code-editor',
  },
  {
    id: 'req_5e2f89',
    promptSnippet: 'Multi-lingual translation for Spanish and Portuguese locales...',
    model: 'gemini-1-5-pro',
    tokensIn: 640,
    tokensOut: 390,
    latencyMs: 310,
    status: 'Completed',
    timestamp: '1m ago',
    clientApp: 'i18n-service',
  },
  {
    id: 'req_12bc78',
    promptSnippet: 'Vector embeddings similarity re-ranking for customer support KB...',
    model: 'text-embedding-3',
    tokensIn: 2100,
    tokensOut: 0,
    latencyMs: 140,
    status: 'Completed',
    timestamp: '2m ago',
    clientApp: 'rag-pipeline',
  },
  {
    id: 'req_77df33',
    promptSnippet: 'Automated test suite generation from OpenAPI specification...',
    model: 'claude-3-5-sonnet',
    tokensIn: 1840,
    tokensOut: 980,
    latencyMs: 512,
    status: 'Completed',
    timestamp: '4m ago',
    clientApp: 'ci-runner',
  },
];

const modelLogos: Record<string, { src: string; name: string }> = {
  'claude-3-5-sonnet': { src: '/logos/models/anthropic.png', name: 'Anthropic' },
  'gpt-4o': { src: '/logos/models/openai.png', name: 'OpenAI' },
  'deepseek-v3': { src: '/logos/models/deepseek.png', name: 'DeepSeek' },
  'gemini-1-5-pro': { src: '/logos/models/google.png', name: 'Google' },
  'text-embedding-3': { src: '/logos/models/openai.png', name: 'OpenAI' },
};

const apiKeys = [
  { id: 'key_prod_01', name: 'Production Gateway', prefix: 'dk_live_9a4f...', rpmLimit: '2,000 RPM', created: '14d ago', status: 'Active' },
  { id: 'key_stag_02', name: 'Staging & Preview', prefix: 'dk_test_3b81...', rpmLimit: '500 RPM', created: '28d ago', status: 'Active' },
  { id: 'key_agent_03', name: 'Autonomous Coding Agent', prefix: 'dk_live_7c29...', rpmLimit: '1,200 RPM', created: '4d ago', status: 'Active' },
  { id: 'key_rag_04', name: 'RAG Pipeline & Retrieval', prefix: 'dk_live_6c19...', rpmLimit: '1,500 RPM', created: '2d ago', status: 'Active' },
];

const tokenSeries = [
  { key: 'tokens', label: 'Tokens / min', color: 'var(--color-primary)' },
];

export const AiGatewayDashboardExample = () => {
  const [activeNav, setActiveNav] = useState('overview');
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('7d');
  const [selectedModel, setSelectedModel] = useState('all');
  const { toast } = useToast();

  const statsData = {
    '24h': {
      throughput: { value: 3.8, trend: 14.2, label: 'vs yesterday' },
      latency: { value: 374, trend: -14.6, label: 'faster edge routing' },
      cost: { value: 0.0026, trend: -8.1, label: 'cache savings' },
      successRate: { value: 99.94, precision: 2, trend: 0.2, label: 'high uptime' },
    },
    '7d': {
      throughput: { value: 14.8, trend: 24.6, label: 'vs last week' },
      latency: { value: 385, trend: -12.4, label: 'optimized stream' },
      cost: { value: 0.0028, trend: -6.2, label: 'blended / 1k tokens' },
      successRate: { value: 99.92, precision: 2, trend: 0.4, label: 'high stability' },
    },
    '30d': {
      throughput: { value: 62.4, trend: 38.5, label: 'vs last month' },
      latency: { value: 392, trend: -9.8, label: 'global anycast' },
      cost: { value: 0.0031, trend: -4.5, label: 'volume discount' },
      successRate: { value: 99.88, precision: 2, trend: 0.1, label: 'enterprise tier' },
    },
  };

  const chartData = {
    '24h': {
      tokens: [
        { label: '00:00', tokens: 180000 },
        { label: '04:00', tokens: 140000 },
        { label: '08:00', tokens: 420000 },
        { label: '12:00', tokens: 890000 },
        { label: '16:00', tokens: 960000 },
        { label: '20:00', tokens: 710000 },
        { label: 'Now', tokens: 820000 },
      ],
    },
    '7d': {
      tokens: [
        { label: 'Mon', tokens: 3800000 },
        { label: 'Tue', tokens: 4600000 },
        { label: 'Wed', tokens: 5200000 },
        { label: 'Thu', tokens: 6100000 },
        { label: 'Fri', tokens: 5900000 },
        { label: 'Sat', tokens: 3400000 },
        { label: 'Sun', tokens: 3200000 },
      ],
    },
    '30d': {
      tokens: [
        { label: 'Week 1', tokens: 24000000 },
        { label: 'Week 2', tokens: 28500000 },
        { label: 'Week 3', tokens: 31200000 },
        { label: 'Week 4', tokens: 35800000 },
      ],
    },
  };

  const currentStats = statsData[timeRange];
  const currentChart = chartData[timeRange];

  const filteredLogs = recentLogs.filter((log) => {
    return selectedModel === 'all' || log.model === selectedModel;
  });

  const handleCreateKey = () => {
    toast({
      title: 'API Key Created',
      description: 'New production key dk_live_88x2 generated.',
      type: 'success',
    });
  };

  return (
    <SidebarProvider>
      <div className="flex h-[100dvh] w-full overflow-hidden bg-background text-foreground font-sans">
      <Helmet>
        <title>AI & Model Gateway Console | Dashkit UI</title>
        <meta
          name="description"
          content="An enterprise AI and LLM Gateway console featuring streaming telemetry, model fallback pipelines, and guardrail monitoring."
        />
      </Helmet>

      {/* LEFT COLLAPSIBLE SIDEBAR */}
      <Sidebar collapsible defaultOpen>
        <SidebarHeader>
          <SidebarHeaderOpen>
            <div className="flex items-center gap-3">
              <Avatar fallback="AI" size="sm" />
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-sm text-foreground truncate">Model Gateway</span>
                <span className="text-xs text-muted-foreground truncate">Edge Mesh • US / EU</span>
              </div>
            </div>
          </SidebarHeaderOpen>
          <SidebarHeaderClose>
            <Avatar fallback="AI" size="sm" />
          </SidebarHeaderClose>
        </SidebarHeader>

        <SidebarContent>
          <SidebarSection title="Gateway Core">
            <SidebarItem
              icon={<FiActivity size={17} />}
              active={activeNav === 'overview'}
              onClick={() => setActiveNav('overview')}
            >
              Overview & Telemetry
            </SidebarItem>
            <SidebarItem
              icon={<FiCpu size={17} />}
              active={activeNav === 'models'}
              onClick={() => setActiveNav('models')}
            >
              Model Registry
            </SidebarItem>
            <SidebarItem
              icon={<FiTerminal size={17} />}
              active={activeNav === 'logs'}
              onClick={() => setActiveNav('logs')}
            >
              Request Logs
            </SidebarItem>
            <SidebarItem
              icon={<FiZap size={17} />}
              active={activeNav === 'caching'}
              onClick={() => setActiveNav('caching')}
            >
              Semantic Cache
            </SidebarItem>
          </SidebarSection>

          <SidebarSection title="Governance & Security">
            <SidebarItem
              icon={<FiKey size={17} />}
              active={activeNav === 'keys'}
              onClick={() => setActiveNav('keys')}
            >
              API Credentials
            </SidebarItem>
            <SidebarItem
              icon={<FiShield size={17} />}
              active={activeNav === 'guardrails'}
              onClick={() => setActiveNav('guardrails')}
            >
              PII & Guardrails
            </SidebarItem>
            <SidebarItem
              icon={<FiDollarSign size={17} />}
              active={activeNav === 'billing'}
              onClick={() => setActiveNav('billing')}
            >
              Cost & Quotas
            </SidebarItem>
          </SidebarSection>

          <SidebarSection title="Settings">
            <SidebarItem
              icon={<FiSliders size={17} />}
              active={activeNav === 'routing'}
              onClick={() => setActiveNav('routing')}
            >
              Fallback Routing
            </SidebarItem>
            <SidebarItem
              icon={<FiSettings size={17} />}
              active={activeNav === 'settings'}
              onClick={() => setActiveNav('settings')}
            >
              Gateway Settings
            </SidebarItem>
          </SidebarSection>
        </SidebarContent>

        <SidebarFooter>
          <SidebarFooterOpen>
            <div className="flex items-center gap-3">
              <Avatar fallback="DK" size="sm" />
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-foreground truncate">Core Engineering</span>
                <span className="text-xs text-muted-foreground truncate">Tier 4 Enterprise</span>
              </div>
            </div>
          </SidebarFooterOpen>
          <SidebarFooterClose>
            <Avatar fallback="DK" size="sm" />
          </SidebarFooterClose>
        </SidebarFooter>
      </Sidebar>

      {/* RIGHT MAIN VIEWPORT */}
      <div className="flex-1 flex flex-col h-[100dvh] min-w-0 overflow-hidden">
        {/* TOP NAVBAR */}
        <header className="h-16 shrink-0 border-b border-border bg-card px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <SidebarTrigger size="sm" className="md:hidden" />
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <ThemeCustomizer size="sm" />
            <ThemeToggle size="sm" />
            <Button
              variant="soft"
              size="sm"
              leftIcon={<FiExternalLink size={14} />}
              className="hidden md:inline-flex"
              onClick={() => window.open("https://github.com/dashkit-ui/dashkit", "_blank")}
            >
              Docs API
            </Button>
            <Button
              variant="filled"
              size="sm"
              leftIcon={<FiPlus size={14} />}
              onClick={handleCreateKey}
            >
              <span className="hidden sm:inline">Create API Key</span>
              <span className="sm:hidden">New Key</span>
            </Button>
          </div>
        </header>

        {/* SCROLLABLE DASHBOARD BODY */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-7xl w-full mx-auto flex flex-col gap-6">
            {/* HERO TITLE & SEGMENTED TIMEFRAME */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  AI & Model Gateway Console
                </h1>
                <p className="text-sm text-muted-foreground">
                  Unified inference endpoint, intelligent model routing, streaming telemetry, and guardrails.
                </p>
              </div>

              {/* TIMEFRAME TABS (PILLS VARIANT) */}
              <Tabs
                value={timeRange}
                onValueChange={(val) => setTimeRange(val as '24h' | '7d' | '30d')}
                variant="pills"
                className="w-fit shrink-0"
              >
                <TabsList>
                  <TabsTrigger value="24h">24h</TabsTrigger>
                  <TabsTrigger value="7d">7d</TabsTrigger>
                  <TabsTrigger value="30d">30d</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* 4 STATS CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <StatsCard
                title="Token Throughput"
                value={currentStats.throughput.value}
                suffix="M"
                precision={1}
                trend={currentStats.throughput.trend}
                trendLabel={currentStats.throughput.label}
                status="success"
                icon={<FiZap size={18} />}
              />
              <StatsCard
                title="P95 Gateway Latency"
                value={currentStats.latency.value}
                suffix="ms"
                trend={currentStats.latency.trend}
                trendLabel={currentStats.latency.label}
                status="success"
                icon={<FiClock size={18} />}
              />
              <StatsCard
                title="Avg Cost / 1k Tokens"
                value={currentStats.cost.value}
                prefix="$"
                precision={4}
                trend={currentStats.cost.trend}
                trendLabel={currentStats.cost.label}
                status="success"
                icon={<FiDollarSign size={18} />}
              />
              <StatsCard
                title="Routing Reliability"
                value={currentStats.successRate.value}
                suffix="%"
                precision={currentStats.successRate.precision}
                trend={currentStats.successRate.trend}
                trendLabel={currentStats.successRate.label}
                status="success"
                icon={<FiCheckCircle size={18} />}
              />
            </div>

            {/* TELEMETRY & MODEL CAPACITY (BALANCED 8:4 GRID - 2 CARDS) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* THROUGHPUT STREAM (8 COLS) */}
              <Card className="lg:col-span-8 flex flex-col h-full">
                <CardHeader
                  leftIcon={<FiActivity size={18} />}
                  action={
                    <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-500">
                      <span className="relative flex size-2 shrink-0">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                      </span>
                      <span>Live Stream</span>
                    </div>
                  }
                >
                  <CardTitle as="h2">Inference Token Telemetry</CardTitle>
                  <CardDescription>
                    Real-time prompt and completion tokens routed through anycast edge nodes
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-end pt-2 min-h-[220px]">
                  <div className="h-60 w-full">
                    <AreaChart data={currentChart.tokens} series={tokenSeries} />
                  </div>
                </CardContent>
              </Card>

              {/* MODEL CAPACITY & RATE LIMITS (4 COLS) */}
              <Card className="lg:col-span-4 flex flex-col h-full">
                <CardHeader leftIcon={<FiCpu size={18} />}>
                  <CardTitle as="h2">Model Monthly Quotas</CardTitle>
                  <CardDescription>
                    Monthly token allocation and rate limits
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between gap-4 pt-1">
                  <div className="flex flex-col gap-4">
                    {[
                      { name: 'Claude 3.5 Sonnet', provider: 'Anthropic', logo: '/logos/models/anthropic.png', used: '6.8M', limit: '10M', pct: 68 },
                      { name: 'GPT-4o', provider: 'OpenAI', logo: '/logos/models/openai.png', used: '5.4M', limit: '10M', pct: 54 },
                      { name: 'DeepSeek V3', provider: 'DeepSeek', logo: '/logos/models/deepseek.png', used: '16.2M', limit: '20M', pct: 81 },
                      { name: 'Gemini 1.5 Pro', provider: 'Google', logo: '/logos/models/google.png', used: '3.2M', limit: '10M', pct: 32 },
                    ].map((m) => (
                      <div key={m.name} className="flex flex-col gap-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="size-5 rounded bg-muted/60 dark:bg-muted/80 p-0.5 border border-border/60 flex items-center justify-center shrink-0">
                              <img
                                src={m.logo}
                                alt={m.provider}
                                className="size-full object-contain rounded-xs"
                              />
                            </div>
                            <span className="font-medium text-sm text-foreground truncate">
                              {m.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0 text-xs">
                            <span className="text-muted-foreground">
                              {m.used} <span className="text-muted-foreground/40">/</span> {m.limit}
                            </span>
                            <span className="font-semibold text-foreground min-w-[32px] text-right">
                              {m.pct}%
                            </span>
                          </div>
                        </div>
                        <ProgressBar value={m.pct} color="primary" size="sm" />
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3 pt-2">
                    <Divider />
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="relative flex size-2 shrink-0">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                        </span>
                        <span className="font-medium text-foreground">4 Active Providers</span>
                      </div>
                      <span className="text-muted-foreground font-medium">Smart Auto-Fallback</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* RECENT INVOCATIONS TABLE (FULL WIDTH ROW - 1 CARD) */}
            <Card className="w-full">
              <CardHeader
                className="flex-col sm:flex-row sm:items-start gap-3"
                leftIcon={<FiTerminal size={18} />}
                action={
                  <div className="overflow-x-auto max-w-full no-scrollbar">
                    <Tabs
                    value={selectedModel}
                    onValueChange={(val) => setSelectedModel(val)}
                    variant="pills"
                    className="w-fit shrink-0"
                  >
                    <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="claude-3-5-sonnet">Claude</TabsTrigger>
                      <TabsTrigger value="gpt-4o">GPT-4o</TabsTrigger>
                      <TabsTrigger value="deepseek-v3">DeepSeek</TabsTrigger>
                      <TabsTrigger value="gemini-1-5-pro">Gemini</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  </div>
                }
              >
                <CardTitle as="h2" className="text-base font-bold">Recent Gateway Invocations</CardTitle>
                <CardDescription>
                  Live request trace payloads, token breakdowns, and routing latency
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <TableContainer className="font-sans">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Prompt Snippet</TableHead>
                        <TableHead>Model</TableHead>
                        <TableHead>Tokens</TableHead>
                        <TableHead>Latency</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell>
                            <div className="flex flex-col min-w-0 gap-1 max-w-xl">
                              <span className="font-medium text-sm text-foreground truncate">
                                {log.promptSnippet}
                              </span>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span className="font-medium text-muted-foreground/90">
                                  {log.id}
                                </span>
                                <span className="text-muted-foreground/30 text-[10px]">•</span>
                                <span className="text-muted-foreground">{log.clientApp}</span>
                                <span className="text-muted-foreground/30 text-[10px]">•</span>
                                <span>{log.timestamp}</span>
                              </div>
                            </div>
                          </TableCell>

                          <TableCell>
                            <div className="flex items-center gap-2 whitespace-nowrap">
                              <div className="size-5 rounded bg-muted/60 dark:bg-muted/80 p-0.5 border border-border/60 flex items-center justify-center shrink-0">
                                <img
                                  src={modelLogos[log.model]?.src || '/logos/models/openai.png'}
                                  alt={modelLogos[log.model]?.name || log.model}
                                  className="size-full object-contain rounded-xs"
                                />
                              </div>
                              <span className="text-sm font-medium text-foreground">
                                {log.model}
                              </span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <div className="flex items-center gap-1.5 text-xs whitespace-nowrap">
                              <span className="text-foreground font-medium">{log.tokensIn.toLocaleString()} in</span>
                              <span className="text-muted-foreground/40">•</span>
                              <span className="text-muted-foreground">{log.tokensOut.toLocaleString()} out</span>
                            </div>
                          </TableCell>

                          <TableCell>
                            <span className="text-xs font-medium text-foreground whitespace-nowrap">
                              {log.latencyMs}ms
                            </span>
                          </TableCell>

                          <TableCell>
                            <div className="flex items-center gap-2 whitespace-nowrap">
                              <span
                                className={clsx(
                                  'size-2 rounded-full shrink-0',
                                  log.status === 'Completed'
                                    ? 'bg-emerald-500'
                                    : log.status === 'Cached'
                                    ? 'bg-sky-500'
                                    : log.status === 'Streaming'
                                    ? 'bg-primary animate-pulse'
                                    : 'bg-amber-500'
                                )}
                              />
                              <span className="text-xs font-medium text-foreground">{log.status}</span>
                            </div>
                          </TableCell>

                          <TableCell className="text-right">
                            <div className="flex items-center justify-end">
                              <Dropdown>
                                <DropdownTrigger asChild>
                                  <IconButton
                                    variant="ghost"
                                    size="sm"
                                    icon={<FiMoreVertical size={16} />}
                                    aria-label={`Actions for request ${log.id}`}
                                  />
                                </DropdownTrigger>
                                <DropdownContent align="end">
                                  <DropdownItem
                                    leftIcon={<FiCopy size={14} />}
                                    onClick={() => {
                                      navigator.clipboard?.writeText(log.promptSnippet);
                                      toast({
                                        title: 'Prompt Copied',
                                        description: 'Snippet copied to clipboard.',
                                        type: 'success',
                                      });
                                    }}
                                  >
                                    Copy Prompt Text
                                  </DropdownItem>
                                  <DropdownItem
                                    leftIcon={<FiTerminal size={14} />}
                                    onClick={() => {
                                      toast({
                                        title: 'Trace Payload',
                                        description: `Streaming raw JSON trace for ${log.id}...`,
                                        type: 'info',
                                      });
                                    }}
                                  >
                                    View Raw Trace JSON
                                  </DropdownItem>
                                  <DropdownSeparator />
                                  <DropdownItem
                                    leftIcon={<FiRefreshCw size={14} />}
                                    onClick={() => {
                                      toast({
                                        title: 'Prompt Replay Queued',
                                        description: `Re-dispatching ${log.id} to ${log.model}...`,
                                        type: 'info',
                                      });
                                    }}
                                  >
                                    Replay Request
                                  </DropdownItem>
                                </DropdownContent>
                              </Dropdown>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>

            {/* CREDENTIALS & GUARDRAILS (BALANCED 2 EQUAL COLS - 2 CARDS) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              {/* API KEYS MANAGEMENT */}
              <Card className="flex flex-col h-full">
                <CardHeader
                  leftIcon={<FiKey size={18} />}
                  action={
                    <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>{apiKeys.length} Active Keys</span>
                    </div>
                  }
                >
                  <CardTitle as="h2">API Gateway Credentials</CardTitle>
                  <CardDescription>Bearer token authentication and RPM throttles</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between divide-y divide-border/60 pt-1">
                  {apiKeys.map((key) => (
                    <div key={key.id} className="flex items-center justify-between gap-4 py-2.5 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="size-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                          <FiKey size={15} />
                        </div>
                        <div className="flex flex-col min-w-0 gap-0.5">
                          <span className="font-semibold text-sm text-foreground truncate">{key.name}</span>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="text-muted-foreground/90 font-mono font-medium">{key.prefix}</span>
                            <span className="text-muted-foreground/30 text-[10px]">•</span>
                            <span>{key.rpmLimit}</span>
                            <span className="text-muted-foreground/30 text-[10px]">•</span>
                            <span>Created {key.created}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-500 pt-0.5">
                            <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
                            <span>{key.status}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        leftIcon={<FiCopy size={13} />}
                        onClick={() => {
                          navigator.clipboard?.writeText(key.prefix);
                          toast({
                            title: 'Key Copied',
                            description: `${key.name} token prefix copied.`,
                            type: 'success',
                          });
                        }}
                      >
                        Copy
                      </Button>
                    </div>
                  ))}

                  <div className="flex items-center justify-between text-xs pt-3">
                    <span className="text-muted-foreground font-medium">Automatic Key Rotation</span>
                    <div className="flex items-center gap-1.5 font-medium text-emerald-500">
                      <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>90d Policy Enforced</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* SECURITY & GUARDRAILS AUDIT */}
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
                  <CardTitle as="h2">Safety Guardrails & Compliance</CardTitle>
                  <CardDescription>Real-time PII anonymization and injection protection</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between divide-y divide-border/60 pt-1">
                  {[
                    {
                      icon: <FiShield size={15} />,
                      label: 'PII Redaction Engine',
                      detail: 'Masking SSNs, credit cards, and emails on ingress',
                      status: 'Active',
                      stat: '142 masked today',
                    },
                    {
                      icon: <FiLock size={15} />,
                      label: 'Prompt Injection Defense',
                      detail: 'Heuristic & embedding-based jailbreak blocking',
                      status: 'Clean',
                      stat: '0 breaches',
                    },
                    {
                      icon: <FiCheckCircle size={15} />,
                      label: 'Content Safety Moderation',
                      detail: 'Hate speech, harassment, and toxicity filter',
                      status: 'Passed',
                      stat: '100% compliant',
                    },
                    {
                      icon: <FiDollarSign size={15} />,
                      label: 'Cost Budget Caps',
                      detail: 'Hard circuit breaker at $250.00 / day threshold',
                      status: 'Strict',
                      stat: 'Usage at 24%',
                    },
                  ].map((sec) => (
                    <div key={sec.label} className="flex items-center justify-between gap-4 py-2.5 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="size-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                          {sec.icon}
                        </div>
                        <div className="flex flex-col min-w-0 gap-0.5">
                          <span className="font-semibold text-foreground text-sm truncate">{sec.label}</span>
                          <span className="text-xs text-muted-foreground truncate">{sec.detail}</span>
                          <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-500 pt-0.5">
                            <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
                            <span>{sec.status}</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-[11px] text-muted-foreground shrink-0">{sec.stat}</span>
                    </div>
                  ))}

                  <div className="flex items-center justify-between text-xs pt-3">
                    <span className="text-muted-foreground font-medium">Enterprise Audit Trail</span>
                    <div className="flex items-center gap-1.5 font-medium text-emerald-500">
                      <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>SOC2 & HIPAA Compliant</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
    </SidebarProvider>
  );
};
