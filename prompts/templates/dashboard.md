# Golden Template: Analytics Dashboard

Reference implementation for a KPI + chart analytics dashboard using `BentoGrid`, `StatsCard`, `Card`, `AreaChart`, `Badge`, and `ListTile`.

```tsx
import {
  AreaChart,
  Badge,
  BentoGrid,
  BentoGridItem,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ListTile,
  StatsCard,
} from '@/dashkit';

const revenueData = [
  { month: 'Jan', revenue: 42000, target: 38000 },
  { month: 'Feb', revenue: 46500, target: 40000 },
  { month: 'Mar', revenue: 51200, target: 44000 },
  { month: 'Apr', revenue: 49800, target: 47000 },
  { month: 'May', revenue: 58400, target: 50000 },
  { month: 'Jun', revenue: 64900, target: 54000 },
];

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Revenue Overview
          </h1>
          <p className="text-sm text-muted-foreground">
            Real-time SaaS metrics across all active workspaces.
          </p>
        </div>
        <Button variant="filled" color="primary">
          Export Report
        </Button>
      </div>

      <BentoGrid cols={{ base: 1, sm: 2, lg: 4 }} gap="md">
        <StatsCard
          title="Monthly Recurring Revenue"
          value={64900}
          prefix="$"
          trend={11.1}
          trendLabel="vs last month"
          status="success"
        />
        <StatsCard
          title="Active Customers"
          value={1482}
          trend={4.8}
          trendLabel="vs last month"
          status="info"
        />
        <StatsCard
          title="Net Churn"
          value={1.4}
          suffix="%"
          precision={1}
          trend={-0.3}
          trendLabel="vs last month"
          status="success"
        />
        <StatsCard
          title="Open Support Tickets"
          value={23}
          trend={15.0}
          trendLabel="vs last week"
          status="warning"
        />
      </BentoGrid>

      <BentoGrid cols={{ base: 1, lg: 3 }} gap="md">
        <BentoGridItem colSpan={{ base: 1, lg: 2 }} surface="transparent" padding="none">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Revenue vs Target</CardTitle>
              <CardDescription>Six-month recurring revenue trajectory</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <AreaChart
                data={revenueData}
                series={[
                  { key: 'revenue', label: 'Revenue' },
                  { key: 'target', label: 'Target' },
                ]}
              />
            </CardContent>
          </Card>
        </BentoGridItem>

        <BentoGridItem surface="transparent" padding="none">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest workspace billing events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <ListTile
                title="Acme Corp upgraded to Enterprise"
                subtitle="2 minutes ago"
                trailing={<Badge variant="soft" color="success" content="+$2,400" />}
              />
              <ListTile
                title="Northwind Labs renewed annual plan"
                subtitle="1 hour ago"
                trailing={<Badge variant="soft" color="info" content="Annual" />}
              />
              <ListTile
                title="Initech payment retry scheduled"
                subtitle="3 hours ago"
                trailing={<Badge variant="soft" color="warning" content="Retry" />}
              />
            </CardContent>
          </Card>
        </BentoGridItem>
      </BentoGrid>
    </div>
  );
}
```
