import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '../../partials/Header';
import { Footer } from '../../partials/Footer';
import { Button } from '../../components/Button/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/Card/Card';
import { IconButton } from '../../components/IconButton/IconButton';
import { Chip } from '../../components/Chip/Chip';
import { Divider } from '../../components/Divider/Divider';
import { Badge, FloatBadge } from '../../components/Badge/Badge';
import { AnimateNumber } from '../../components/AnimateNumber';
import { CircularProgress } from '../../components/CircularProgress/CircularProgress';
import { Avatar, AvatarGroup } from '../../components/Avatar/Avatar';
import { Input } from '../../components/Input/Input';
import { Checkbox } from '../../components/Checkbox/Checkbox';
import { Radio } from '../../components/Radio/Radio';
import { Switch } from '../../components/Switch/Switch';
import { Textarea } from '../../components/Textarea/Textarea';
import { ButtonGroup } from '../../components/ButtonGroup/ButtonGroup';
import { Select } from '../../components/Select/Select';
import { Combobox } from '../../components/Combobox/Combobox';
import { DatePicker } from '../../components/DatePicker/DatePicker';
import { DateField } from '../../components/DateField/DateField';
import { Spinner } from '../../components/Spinner/Spinner';
import { ColorPicker } from '../../components/ColorPicker/ColorPicker';
import { Skeleton } from '../../components/Skeleton/Skeleton';
import { Backdrop } from '../../components/Backdrop/Backdrop';
import { Modal, ModalHeader, ModalContent, ModalFooter } from '../../components/Modal/Modal';
import { Drawer, DrawerHeader, DrawerContent, DrawerFooter } from '../../components/Drawer/Drawer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/Tabs/Tabs';
import { OtpInput } from '../../components/OtpInput/OtpInput';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../components/Accordion';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator } from '../../components/Breadcrumb/Breadcrumb';
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator
} from '../../components/Dropdown/Dropdown';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '../../components/Popover/Popover';
import { useToast } from '../../components/Toast/useToast';
import { AreaChart } from '../../components/AreaChart/AreaChart';
import { LineChart } from '../../components/LineChart/LineChart';
import { BarChart } from '../../components/BarChart/BarChart';
import { PieChart } from '../../components/PieChart/PieChart';
import { ImageExpander } from '../../components/ImageExpander/ImageExpander';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import { Pagination } from '../../components/Pagination';
import { FloatActionMenu } from '../../components/FloatActionMenu/FloatActionMenu';
import { Dock, DockItem } from '../../components/Dock/Dock';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption
} from '../../components/Table/Table';
import { SystemLogs } from '../../components/SystemLogs/SystemLogs';
import { Stepper, Step } from '../../components/Stepper';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport
} from '../../components/NavigationMenu/NavigationMenu';
import { ScrollArea } from '../../components/ScrollArea/ScrollArea';
import {
  FiPlus,
  FiTrash2,
  FiEdit2,
  FiShare2,
  FiDownload,
  FiInfo,
  FiBell,
  FiMail,
  FiUser,
  FiLock,
  FiSearch,
  FiChevronRight,
  FiGrid,
  FiSettings,
  FiPieChart,
  FiTrendingUp,
  FiUsers,
  FiCheckCircle,
  FiPackage,
  FiTruck,
  FiMenu
} from 'react-icons/fi';

export const AllComponentsExample = () => {
  const [selected, setSelected] = useState('daily');
  const [comboSingle, setComboSingle] = useState('react');
  const [comboMulti, setComboMulti] = useState(['nextjs', 'tailwind']);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [fieldDate, setFieldDate] = useState<Date | null>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState<'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'>('md');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isBackdropOpen, setIsBackdropOpen] = useState(false);
  const [drawerPosition, setDrawerPosition] = useState<'left' | 'right' | 'top' | 'bottom'>('right');
  const [otp, setOtp] = useState('');
  const [activeStepper, setActiveStepper] = useState(1);
  const [paginationPage, setPaginationPage] = useState(1);
  const [accentColor, setAccentColor] = useState('#3B82F6');
  const { toast } = useToast();

  const [showcaseMetrics, setShowcaseMetrics] = useState({
    revenue: 24500,
    conversion: 68.4,
    users: 1240,
    sla: 99.9
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setShowcaseMetrics(prev => ({
        revenue: prev.revenue + (Math.random() > 0.5 ? 250 : -150),
        conversion: parseFloat(Math.min(100, Math.max(0, prev.conversion + (Math.random() > 0.5 ? 0.5 : -0.3))).toFixed(1)),
        users: prev.users + (Math.random() > 0.5 ? 8 : -4),
        sla: parseFloat(Math.min(100, Math.max(99, prev.sla + (Math.random() > 0.5 ? 0.01 : -0.01))).toFixed(2))
      }));
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const options = [
    { value: 'daily', label: 'Daily Reports' },
    { value: 'weekly', label: 'Weekly Summary' },
    { value: 'monthly', label: 'Monthly Performance' },
    { value: 'yearly', label: 'Annual Statistics' },
  ];

  const techOptions = [
    { value: 'react', label: 'React.js' },
    { value: 'nextjs', label: 'Next.js' },
    { value: 'tailwind', label: 'Tailwind CSS' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'bun', label: 'Bun' },
    { value: 'vite', label: 'Vite' },
  ];

  const chartData = [
    { label: 'Jan', revenue: 4500, users: 1200 },
    { label: 'Feb', revenue: 5200, users: 1450 },
    { label: 'Mar', revenue: 4800, users: 1600 },
    { label: 'Apr', revenue: 6100, users: 1900 },
    { label: 'May', revenue: 5900, users: 2100 },
    { label: 'Jun', revenue: 7200, users: 2400 },
  ];

  const chartSeries = [
    { key: 'revenue', label: 'Revenue ($)', color: 'var(--color-ds-primary-600)' },
    { key: 'users', label: 'New Users', color: 'var(--color-ds-primary-400)' },
  ];

  const lineChartData = [
    { label: 'Mon', speed: 85, stability: 95, uptime: 99.9, errors: 2 },
    { label: 'Tue', speed: 82, stability: 92, uptime: 99.8, errors: 5 },
    { label: 'Wed', speed: 90, stability: 98, uptime: 100, errors: 0 },
    { label: 'Thu', speed: 88, stability: 94, uptime: 99.7, errors: 8 },
    { label: 'Fri', speed: 94, stability: 96, uptime: 99.9, errors: 3 },
    { label: 'Sat', speed: 96, stability: 99, uptime: 100, errors: 1 },
    { label: 'Sun', speed: 98, stability: 98, uptime: 100, errors: 0 },
  ];

  const lineChartSeries = [
    { key: 'speed', label: 'Response Time (ms)', color: 'var(--color-ds-primary-500)' },
    { key: 'stability', label: 'System Stability (%)', color: 'var(--color-ds-primary-300)' },
    { key: 'uptime', label: 'Uptime (%)', color: 'var(--color-ds-primary-700)' },
    { key: 'errors', label: 'Errors', color: 'var(--color-ds-primary-400)' },
  ];

  const barChartData = [
    { label: 'Americas', sales: 12400, target: 10000 },
    { label: 'Europe', sales: 15800, target: 14000 },
    { label: 'Asia', sales: 9200, target: 12000 },
    { label: 'Oceania', sales: 4500, target: 5000 },
    { label: 'Middle East', sales: 7800, target: 8000 },
  ];

  const barChartSeries = [
    { key: 'sales', label: 'Actual Sales ($)', color: 'var(--color-ds-primary-600)' },
    { key: 'target', label: 'Target ($)', color: 'var(--color-ds-primary-300)' },
  ];

  const pieChartData = [
    { label: 'Desktop', value: 4500, color: 'var(--color-ds-primary-600)' },
    { label: 'Mobile', value: 3200, color: 'var(--color-ds-primary-500)' },
    { label: 'Tablet', value: 1200, color: 'var(--color-ds-primary-400)' },
    { label: 'Other', value: 600, color: 'var(--color-ds-primary-300)' },
  ];

  const transactions = [
    { id: 'TRX-001', customer: 'Alex Rivers', amount: 1250.00, status: 'Completed', date: '2024-03-20' },
    { id: 'TRX-002', customer: 'Jordan Smith', amount: 840.50, status: 'Pending', date: '2024-03-21' },
    { id: 'TRX-003', customer: 'Taylor Brooks', amount: 2100.00, status: 'Completed', date: '2024-03-21' },
    { id: 'TRX-004', customer: 'Morgan Lee', amount: 450.00, status: 'Failed', date: '2024-03-22' },
    { id: 'TRX-005', customer: 'Casey Jones', amount: 1100.25, status: 'Completed', date: '2024-03-22' },
  ];

   return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <Helmet>
        <title>Component Showcase | Dashkit UI</title>
        <meta name="description" content="Explore the complete Dashkit component library and design system. A comprehensive exhibition of all UI elements including charts, forms, and interactive components." />
      </Helmet>
      <Header />

      <main className="flex-1 flex flex-col gap-[20px] max-w-3xl w-full mx-auto px-6 py-20">
        <header className="flex flex-col gap-2 mb-4">
          <h1 className="text-4xl font-medium tracking-tighter">Kitchen Sink</h1>
          <p className="text-lg text-muted-foreground">
            Explore the complete Dashkit component library and design system in one place.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>Buttons are used to trigger actions.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              <Button variant="filled">Button</Button>
              <Button variant="outlined">Button</Button>
              <Button variant="soft">Button</Button>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="filled" size="lg">Button</Button>
              <Button variant="outlined" size="lg">Button</Button>
              <Button variant="soft" size="lg">Button</Button>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="filled" size="sm">Button</Button>
              <Button variant="outlined" size="sm">Button</Button>
              <Button variant="soft" size="sm">Button</Button>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="filled" leftIcon={<FiPlus />}>Button</Button>
              <Button variant="outlined" leftIcon={<FiPlus />}>Button</Button>
              <Button variant="soft" leftIcon={<FiPlus />}>Button</Button>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="filled" loading>Button</Button>
              <Button variant="outlined" loading>Button</Button>
              <Button variant="soft" loading>Button</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Icon Buttons</CardTitle>
            <CardDescription>Icon buttons are used to trigger actions with icons.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <IconButton icon={<FiPlus />} variant="filled" />
            <IconButton icon={<FiDownload />} variant="filled" rounded />
            <IconButton icon={<FiEdit2 />} variant="soft" />
            <IconButton icon={<FiShare2 />} rounded />
            <IconButton icon={<FiTrash2 />} variant="ghost" className="text-danger" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Backdrop</CardTitle>
            <CardDescription>A full-screen overlay for dimmed or focused states.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => setIsBackdropOpen(true)}>Show Backdrop</Button>
            </div>
            <Backdrop show={isBackdropOpen} onClick={() => setIsBackdropOpen(false)}>
              <div className="bg-card p-8 rounded-2xl shadow-2xl max-w-sm text-center border border-border/50 animate-in zoom-in-95 duration-200">
                <div className="size-16 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiInfo size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">Backdrop Overlay</h3>
                <p className="text-muted-foreground mb-6">This content is perfectly centered on top of the blurred backdrop.</p>
                <Button className="w-full" onClick={() => setIsBackdropOpen(false)}>Close Overlay</Button>
              </div>
            </Backdrop>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scroll Area</CardTitle>
            <CardDescription>Custom theme-aware scrollbars with native performance.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 w-full border border-ds-200 dark:border-ds-800 ds-rounded overflow-hidden bg-ds-50/50 dark:bg-ds-900/50">
              <ScrollArea className="h-full">
                <div className="p-4 flex flex-col gap-3">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="p-3 bg-card border border-border ds-rounded text-sm text-ds-600">
                      Scrollable item #{i + 1} - Demonstrating the minimalist custom scrollbar.
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Chips</CardTitle>
            <CardDescription>Chips are used to display tags.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Chip label="Base" />
            <Chip label="Success" color="success" />
            <Chip label="Warning" color="warning" />
            <Chip label="Danger" color="danger" />
            <Chip label="Info" color="info" />

            <Divider variant="dashed" className="w-full my-2" />

            <Chip label="Filled" variant="filled" />
            <Chip label="Outlined" variant="outlined" />
            <Chip label="Tonal" variant="tonal" />

            <Divider variant="dashed" className="w-full my-2" />

            <Chip label="Selected Base" variant='filled' selected />
            <Chip label="Selected Success" color="success" selected />
            <Chip label="Selected Outlined" variant="outlined" selected />
            <Chip label="Selected Tonal" variant="tonal" selected />

            <Divider variant="dashed" className="w-full my-2" />

            <Chip label="With Icon" icon={<FiInfo />} />
            <Chip label="With Delete" onDelete={() => {}} />
            <Chip label="Disabled" disabled />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
            <CardDescription>Badges are used to display status or notifications.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            <div className="flex flex-wrap gap-4 items-center">
              <Badge content="Success" color="success" />
              <Badge content="Warning" color="warning" />
              <Badge content="Danger" color="danger" />
              <Badge content="Info" color="info" />
              <Badge content="Base" color="base" />
              <Badge content={99} color="danger" />
              <Badge content={100} max={99} color="danger" />
            </div>

            <Divider variant="dashed" />

            <div className="flex flex-wrap gap-8 items-center">
              <FloatBadge content={5} color="danger">
                <Button variant="outlined" leftIcon={<FiBell />}>Notifications</Button>
              </FloatBadge>

              <FloatBadge dot color="success" position="top-right">
                <Avatar src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" />
              </FloatBadge>

              <FloatBadge content={<FiPlus className="size-2"/>} color="info" position="bottom-right">
                <div className="size-10 bg-muted rounded-full flex items-center justify-center">
                  <FiMail />
                </div>
              </FloatBadge>

              <Badge content="New" color="success" pulse />
              <Badge dot color="danger" pulse />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Animated Metrics</CardTitle>
            <CardDescription>Numbers that smoothly transition to their new values.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-6 tabular-nums">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Revenue</span>
              <div className="text-2xl font-bold tracking-tight text-ds-950 dark:text-ds-50">
                <AnimateNumber value={showcaseMetrics.revenue} prefix="$" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Conversion</span>
              <div className="text-2xl font-bold tracking-tight text-ds-success-600">
                <AnimateNumber value={showcaseMetrics.conversion} suffix="%" precision={1} />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Active Users</span>
              <div className="text-2xl font-bold tracking-tight text-ds-950 dark:text-ds-50">
                <AnimateNumber value={showcaseMetrics.users} />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">SLA</span>
              <div className="text-2xl font-bold tracking-tight text-ds-info-600">
                <AnimateNumber value={showcaseMetrics.sla} suffix="%" precision={2} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Circular Progress</CardTitle>
            <CardDescription>Premium indicators for status and health metrics.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap items-end gap-10">
            <div className="flex flex-col items-center gap-3">
              <CircularProgress value={75} size="sm" showValue />
              <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">Small</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <CircularProgress value={showcaseMetrics.conversion} size="md" showValue color="success" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">Medium</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <CircularProgress value={showcaseMetrics.sla} size="lg" showValue color="info" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">Large</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <CircularProgress value={35} size="md" variant="soft" color="danger" showValue />
              <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-60">Soft Variant</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Breadcrumbs</CardTitle>
            <CardDescription>Navigation helpers to show the current page's location within a hierarchy.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem href="/">Home</BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem href="/components">Components</BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem active>Kitchen Sink</BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <Divider variant="dashed" />

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem href="/">Dashboard</BreadcrumbItem>
                <BreadcrumbSeparator>
                  <FiChevronRight className="size-4 text-ds-400" />
                </BreadcrumbSeparator>
                <BreadcrumbItem href="/projects">Projects</BreadcrumbItem>
                <BreadcrumbSeparator>
                  <FiChevronRight className="size-4 text-ds-400" />
                </BreadcrumbSeparator>
                <BreadcrumbItem active>Dashkit UI</BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Color Selection</CardTitle>
            <CardDescription>Premium color picker with curated palette support.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              <ColorPicker 
                label="Accent Color" 
                value={accentColor} 
                onChange={setAccentColor} 
                helperText="This color will be used for your branding."
              />
              <div className="flex items-center gap-3 p-3 ds-rounded border border-dashed border-border/50 bg-ds-50/10 h-9">
                <div className="size-4 ds-rounded border border-black/10 dark:border-white/10" style={{ backgroundColor: accentColor }} />
                <span className="text-xs font-medium tabular-nums text-ds-600 uppercase">{accentColor}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inputs & Forms</CardTitle>
            <CardDescription>Form elements for data entry and selection.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Username" placeholder="Enter your username" leftIcon={<FiUser />} />
              <Input label="Password" type="password" placeholder="••••••••" leftIcon={<FiLock />} helperText="Use at least 8 characters." />
              <Input label="Search" placeholder="Search..." leftIcon={<FiSearch />} />
              <Input label="Error State" placeholder="Invalid input" error="This field is required." />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Checkboxes</CardTitle>
            <CardDescription>Checkboxes are used to select one or more items.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <Checkbox label="Default Checkbox" />
            <Checkbox label="Checked by Default" defaultChecked />
            <Checkbox
              label="With Description"
              description="This is a helper text to provide more context."
            />
            <Divider variant="dashed" />
            <Checkbox label="Disabled Checkbox" disabled />
            <Checkbox label="Checked and Disabled" defaultChecked disabled />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Radio Buttons</CardTitle>
            <CardDescription>Radio buttons are used for selecting one option from a list.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <Radio name="example" label="Option One" defaultChecked />
              <Radio name="example" label="Option Two" />
              <Radio
                name="example"
                label="Option Three with Description"
                description="Choose this for standard features."
              />
            </div>

            <Divider variant="dashed" />

            <div className="flex flex-col gap-4 opacity-75">
              <Radio name="disabled-example" label="Disabled Option" disabled />
              <Radio name="disabled-example" label="Selected and Disabled" defaultChecked disabled />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Switches</CardTitle>
            <CardDescription>Switches are used to toggle binary states.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <Switch label="Default Switch" />
            <Switch label="Checked by Default" defaultChecked />
            <Switch
              label="With Description"
              description="Keep your data synced across devices."
            />

            <Divider variant="dashed" />

            <Switch label="Disabled Switch" disabled />
            <Switch label="Checked and Disabled" defaultChecked disabled />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Button Groups</CardTitle>
            <CardDescription>Button groups allow you to group multiple buttons together.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-medium text-muted-foreground">Horizontal</h4>
              <ButtonGroup>
                <Button variant="outlined">Daily</Button>
                <Button variant="outlined">Weekly</Button>
                <Button variant="outlined">Monthly</Button>
              </ButtonGroup>
            </div>

            <Divider variant="dashed" />

            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-medium text-muted-foreground">Icon Groups</h4>
              <ButtonGroup>
                <IconButton icon={<FiEdit2 />} variant="ghost" />
                <IconButton icon={<FiShare2 />} variant="ghost" />
                <IconButton icon={<FiTrash2 />} variant="ghost" />
              </ButtonGroup>
            </div>

            <Divider variant="dashed" />

            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-medium text-muted-foreground">Vertical</h4>
              <ButtonGroup vertical className="w-fit">
                <Button variant="outlined" className="justify-start">Top Action</Button>
                <Button variant="outlined" className="justify-start">Middle Action</Button>
                <Button variant="outlined" className="justify-start">Bottom Action</Button>
              </ButtonGroup>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Select</CardTitle>
            <CardDescription>Select components are used for picking a single value from a list.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label="Report Type"
                options={options}
                value={selected}
                onChange={setSelected}
                description="Select how the data should be grouped."
              />
              <Select
                label="Disabled Selection"
                options={options}
                value="weekly"
                disabled
                description="This selection is currently locked."
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dropdown Menu</CardTitle>
            <CardDescription>Overlays for lists of actions or selection options.</CardDescription>
          </CardHeader>
          <CardContent>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="outlined" rightIcon={<FiChevronRight className="rotate-90" />}>
                  Open Menu
                </Button>
              </DropdownTrigger>
              <DropdownContent className="w-56">
                <DropdownLabel>My Account</DropdownLabel>
                <DropdownSeparator />
                <DropdownItem leftIcon={<FiUser />}>Profile</DropdownItem>
                <DropdownItem leftIcon={<FiEdit2 />}>Project Settings</DropdownItem>
                <DropdownItem leftIcon={<FiShare2 />}>Team Access</DropdownItem>
                <DropdownSeparator />
                <DropdownLabel>Danger Zone</DropdownLabel>
                <DropdownItem destructive leftIcon={<FiTrash2 />}>Delete Account</DropdownItem>
              </DropdownContent>
            </Dropdown>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Navigation Menu</CardTitle>
            <CardDescription>A premium component for complex headers with sliding transitions.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-24">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger value="company">Company</NavigationMenuTrigger>
                  <NavigationMenuContent value="company">
                    <div className="w-[300px] p-2 flex flex-col gap-1">
                      <NavigationMenuLink className="font-medium text-sm">About Us</NavigationMenuLink>
                      <NavigationMenuLink className="font-medium text-sm">Customers</NavigationMenuLink>
                      <NavigationMenuLink className="font-medium text-sm">Careers</NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger value="resources">Resources</NavigationMenuTrigger>
                  <NavigationMenuContent value="resources">
                    <div className="w-[450px] p-2 grid grid-cols-2 gap-2">
                       <NavigationMenuLink className="group">
                          <div className="text-sm font-bold group-hover:text-primary transition-colors">Documentation</div>
                          <div className="text-xs text-muted-foreground">Start integrating our tools.</div>
                       </NavigationMenuLink>
                       <NavigationMenuLink className="group">
                          <div className="text-sm font-bold group-hover:text-primary transition-colors">Help Center</div>
                          <div className="text-xs text-muted-foreground">Get answers and support.</div>
                       </NavigationMenuLink>
                       <NavigationMenuLink className="group">
                          <div className="text-sm font-bold group-hover:text-primary transition-colors">Community</div>
                          <div className="text-xs text-muted-foreground">Join our developer forum.</div>
                       </NavigationMenuLink>
                       <NavigationMenuLink className="group">
                          <div className="text-sm font-bold group-hover:text-primary transition-colors">Blog</div>
                          <div className="text-xs text-muted-foreground">Latest news and articles.</div>
                       </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger value="more">More</NavigationMenuTrigger>
                  <NavigationMenuContent value="more">
                    <div className="w-[200px] p-2 flex flex-col gap-1">
                       <NavigationMenuLink className="font-medium text-sm">Pricing</NavigationMenuLink>
                       <NavigationMenuLink className="font-medium text-sm">Contact</NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
              <NavigationMenuViewport />
            </NavigationMenu>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popover</CardTitle>
            <CardDescription>Floating panels for displaying rich content and interactive elements.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outlined" leftIcon={<FiInfo />}>Dimensions</Button>
              </PopoverTrigger>
              <PopoverContent side="bottom" align="center" className="w-72">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-bold text-ds-950 dark:text-ds-50">Dimensions</h4>
                    <p className="text-xs text-muted-foreground">Adjust the layout settings for this layer.</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label className="text-xs font-medium">Width</label>
                      <Input defaultValue="100%" className="col-span-3 h-7 text-xs" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <label className="text-xs font-medium">Height</label>
                      <Input defaultValue="auto" className="col-span-3 h-7 text-xs" />
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="soft" leftIcon={<FiUser />}>User Profile</Button>
              </PopoverTrigger>
              <PopoverContent side="top" align="start" className="w-80 p-0 overflow-hidden" sideOffset={12}>
                <div className="h-24 bg-gradient-to-br from-ds-primary-600 to-ds-primary-400" />
                <div className="p-4 -mt-10">
                  <div className="size-16 rounded-full border-4 border-popover bg-ds-100 flex items-center justify-center overflow-hidden mb-3">
                     <FiUser size={32} className="text-ds-400" />
                  </div>
                  <h4 className="font-bold text-lg text-ds-950 dark:text-ds-50">Alex Rivera</h4>
                  <p className="text-sm text-muted-foreground mb-4">Senior UI Architect</p>
                  <div className="flex gap-2">
                    <Button variant="filled" size="sm" className="flex-1">Follow</Button>
                    <Button variant="soft" size="sm" className="flex-1">Message</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Textarea</CardTitle>
            <CardDescription>Multi-line input components with support for auto-growth.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Textarea 
                label="Bio" 
                placeholder="Tell us about yourself..." 
                helperText="Share your story in a few sentences."
              />
              <Textarea 
                label="Auto-growing Message" 
                placeholder="Type more to see me grow..." 
                autoGrow 
                helperText="This textarea will automatically expand as you type."
              />
              <Textarea 
                label="Error State" 
                placeholder="Invalid entry" 
                error="Content is too long (maximum 500 characters)."
                defaultValue="This is a long message that exceeds the limit..."
              />
              <Textarea 
                label="Read-only" 
                defaultValue="This content cannot be edited by the user."
                readOnly
                helperText="Static information display."
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Combobox</CardTitle>
            <CardDescription>A searchable selection component with single and multi-select support.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            <Combobox 
              label="Single Selection" 
              options={techOptions} 
              value={comboSingle} 
              onChange={(val) => setComboSingle(val as string)} 
              description="Search for your favorite technology."
            />
            <Combobox 
              label="Multiple Choice" 
              options={techOptions} 
              value={comboMulti} 
              onChange={(val) => setComboMulti(val as string[])} 
              multiple
              description="You can select multiple values here."
            />
            <Combobox 
              label="Disabled State" 
              options={techOptions} 
              value="typescript" 
              disabled
              description="This searchable selection is disabled."
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Date Picker</CardTitle>
            <CardDescription>Interactive calendar components for date selection.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DatePicker 
                label="Single Date" 
                value={date} 
                onChange={setDate} 
                description="Pick a date from the calendar."
              />
              <DatePicker 
                label="Disabled State" 
                disabled 
                placeholder="Not selectable"
                description="This date picker is currently locked."
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Date Field</CardTitle>
            <CardDescription>HeroUI-inspired date input with individual segments for editing.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DateField 
                label="Date of Birth" 
                value={fieldDate} 
                onChange={setFieldDate} 
                description="You can edit parts of the date individually."
              />
              <DateField 
                label="Required Field" 
                isRequired
                error="Please enter a valid date"
                description="This field is mandatory."
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Spinners</CardTitle>
            <CardDescription>Loading indicators used to show background processes.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            <div className="flex flex-wrap items-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <Spinner size={16} />
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Small</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Spinner size={24} />
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Medium</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Spinner size={32} />
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Large</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Spinner size={48} thickness={3} />
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Extra Large</span>
              </div>
            </div>

            <Divider variant="dashed" />

            <div className="flex flex-wrap items-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <Spinner color="var(--color-primary)" />
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Primary</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-ds-success-600 dark:text-ds-success-400">
                <Spinner />
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Success</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-ds-danger-600 dark:text-ds-danger-400">
                <Spinner />
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Danger</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-ds-info-600 dark:text-ds-info-400">
                <Spinner />
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Info</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Skeletons</CardTitle>
            <CardDescription>Placeholder components to display while content is loading.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-10">
            {/* Shapes */}
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-medium text-muted-foreground">Shapes</h4>
              <div className="flex items-center gap-6">
                <Skeleton variant="circular" className="size-12" />
                <div className="flex flex-col gap-2 flex-1">
                  <Skeleton variant="text" className="w-1/3 h-5" />
                  <Skeleton variant="text" className="w-1/2 h-3" />
                </div>
              </div>
              <Skeleton variant="rectangular" className="w-full h-32" />
            </div>

            <Divider variant="dashed" />

            {/* Animations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-4">
                <h4 className="text-sm font-medium text-muted-foreground">Shimmer (Default)</h4>
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-full" animation="shimmer" />
                  <Skeleton className="h-4 w-[90%]" animation="shimmer" />
                  <Skeleton className="h-4 w-[75%]" animation="shimmer" />
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="text-sm font-medium text-muted-foreground">Pulse</h4>
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-full" animation="pulse" />
                  <Skeleton className="h-4 w-[90%]" animation="pulse" />
                  <Skeleton className="h-4 w-[75%]" animation="pulse" />
                </div>
              </div>
            </div>

            <Divider variant="dashed" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Progress Bars</CardTitle>
            <CardDescription>Visual indicators for task completion and data metrics.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-10">
            {/* Colors */}
            <div className="flex flex-col gap-6">
              <h4 className="text-sm font-medium text-muted-foreground">Colors</h4>
              <div className="flex flex-col gap-4">
                <ProgressBar value={100} color="success" showLabel label="Deployment Complete" />
                <ProgressBar value={75} color="primary" showLabel label="Syncing Cloud" />
                <ProgressBar value={45} color="warning" showLabel label="Background Task" />
                <ProgressBar value={20} color="danger" showLabel label="System Overload" />
              </div>
            </div>

            <Divider variant="dashed" />

            {/* Sizes */}
            <div className="flex flex-col gap-6">
              <h4 className="text-sm font-medium text-muted-foreground">Sizes</h4>
              <div className="flex flex-col gap-6">
                 <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Extra Small (xs)</span>
                    <ProgressBar size="xs" value={60} />
                 </div>
                 <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Small (sm)</span>
                    <ProgressBar size="sm" value={70} />
                 </div>
                 <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Medium (md)</span>
                    <ProgressBar size="md" value={80} />
                 </div>
                 <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Large (lg)</span>
                    <ProgressBar size="lg" value={90} />
                 </div>
              </div>
            </div>

            <Divider variant="dashed" />

            {/* Label Positions */}
            <div className="flex flex-col gap-6">
              <h4 className="text-sm font-medium text-muted-foreground">Label Positions</h4>
              <div className="flex flex-col gap-6">
                <ProgressBar label="System Resources" value={45} showLabel labelPosition="top" />
                <ProgressBar label="Build Progress" value={88} showLabel labelPosition="side" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Modals</CardTitle>
            <CardDescription>Overlays used for focus-heavy tasks or notifications.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => { setModalSize('sm'); setIsModalOpen(true); }}>Small Modal</Button>
              <Button onClick={() => { setModalSize('md'); setIsModalOpen(true); }}>Medium Modal</Button>
              <Button onClick={() => { setModalSize('lg'); setIsModalOpen(true); }}>Large Modal</Button>
              <Button onClick={() => { setModalSize('full'); setIsModalOpen(true); }}>Full Screen</Button>
            </div>

            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              size={modalSize}
            >
              <ModalHeader onClose={() => setIsModalOpen(false)}>
                <h3 className="text-xl font-bold tracking-tight">{modalSize.toUpperCase()} Modal</h3>
                <p className="text-sm text-muted-foreground tracking-tight">This is a demonstration of the Dashkit Modal component.</p>
              </ModalHeader>
              <ModalContent className="flex flex-col gap-4">
                <p className="text-sm text-ds-600 dark:text-ds-400">
                  Modals are great for displaying extra information without losing the current context. They feature:
                </p>
                <ul className="list-disc list-inside text-sm space-y-2 text-ds-700 dark:text-ds-300">
                  <li>Focus trapping for accessibility</li>
                  <li>Backdrop blur and dimming</li>
                  <li>Smooth scale and fade animations</li>
                  <li>Responsive sizing (sm to full)</li>
                  <li>Scroll locking on the body</li>
                </ul>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Input label="First Name" placeholder="John" />
                  <Input label="Last Name" placeholder="Doe" />
                </div>
              </ModalContent>
              <ModalFooter>
                <Button variant="outlined" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsModalOpen(false)}>Save Changes</Button>
              </ModalFooter>
            </Modal>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Toast Notifications</CardTitle>
            <CardDescription>Temporary notifications that appear in the corner of the screen.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button 
              variant="outlined" 
              color="success" 
              onClick={() => toast({ 
                title: "Action Successful", 
                description: "Your changes have been saved to the cloud.",
                type: "success"
              })}
            >
              Success Toast
            </Button>
            <Button 
              variant="outlined" 
              color="danger" 
              onClick={() => toast({ 
                title: "Sync Failed", 
                description: "Could not connect to the server. Please try again.",
                type: "error"
              })}
            >
              Error Toast
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => toast({ 
                title: "New Update", 
                description: "A new version of Dashkit is available.",
                type: "info"
              })}
            >
              Info Toast
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Drawers</CardTitle>
            <CardDescription>Side panels for navigation, settings, or secondary information.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => { setDrawerPosition('left'); setIsDrawerOpen(true); }}>Left Drawer</Button>
              <Button onClick={() => { setDrawerPosition('right'); setIsDrawerOpen(true); }}>Right Drawer</Button>
              <Button onClick={() => { setDrawerPosition('top'); setIsDrawerOpen(true); }}>Top Drawer</Button>
              <Button onClick={() => { setDrawerPosition('bottom'); setIsDrawerOpen(true); }}>Bottom Drawer</Button>
            </div>

            <Drawer
              isOpen={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
              position={drawerPosition}
            >
              <DrawerHeader>
                <h2 className="text-lg font-bold uppercase tracking-tight">Drawer {drawerPosition.toUpperCase()}</h2>
                <p className="text-sm text-muted-foreground">A clean side panel for secondary content.</p>
              </DrawerHeader>
              <DrawerContent>
                <div className="flex flex-col gap-4 py-8">
                  <div className="h-[500px] border-2 border-dashed rounded-xl flex items-center justify-center text-muted-foreground text-xs uppercase tracking-widest">
                    Content Area
                  </div>
                </div>
              </DrawerContent>
              <DrawerFooter>
                <Button variant="outlined" onClick={() => setIsDrawerOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsDrawerOpen(false)}>Action</Button>
              </DrawerFooter>
            </Drawer>
          </CardContent>
        </Card>

        {/* Tabs - This component provides its own card-like container */}
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <Input label="Display Name" defaultValue="John Doe" />
                <Input label="Email Address" defaultValue="john@example.com" />
              </div>
            </TabsContent>
            <TabsContent value="password">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <Input label="Current Password" type="password" placeholder="••••••••" />
                <Input label="New Password" type="password" placeholder="••••••••" />
              </div>
            </TabsContent>
            <TabsContent value="settings">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <Switch label="Marketing Emails" description="Receive updates about new features." defaultChecked />
                <Switch label="Security Alerts" description="Get notified about login attempts." defaultChecked />
              </div>
            </TabsContent>
          </Tabs>

          <Accordion shadowed type="single" defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the design system.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. It uses Framer Motion for smooth transitions.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

        <Card>
          <CardHeader>
            <CardTitle>Dividers</CardTitle>
            <CardDescription>Visual separators for grouping and organizing content.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-10">
            {/* Horizontal Variants */}
            <div className="flex flex-col gap-6">
              <Divider />
              <Divider variant="dashed" />
              <Divider variant="dotted" />
            </div>

            {/* With Content */}
            <div className="flex flex-col gap-6">
              <h4 className="text-sm font-medium text-muted-foreground">With Content</h4>
              <div className="flex flex-col gap-4">
                <Divider>Continue with</Divider>
                <Divider contentPosition="left">Left Aligned</Divider>
                <Divider contentPosition="right">Right Aligned</Divider>
                <Divider variant="dashed">Dashed with Text</Divider>
              </div>
            </div>

            {/* Vertical Orientation */}
            <div className="flex flex-col gap-6">
              <h4 className="text-sm font-medium text-muted-foreground">Vertical Orientation</h4>
              <div className="flex items-center gap-6 h-10 border rounded-lg px-4">
                <span className="text-sm font-medium">Home</span>
                <Divider orientation="vertical" />
                <span className="text-sm font-medium">Features</span>
                <Divider orientation="vertical" variant="dashed" />
                <span className="text-sm font-medium">Pricing</span>
                <Divider orientation="vertical" variant="dotted" />
                <span className="text-sm font-medium">About</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>OTP Input</CardTitle>
            <CardDescription>A secure input for one-time passwords and verification codes.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-medium text-muted-foreground">Standard (6 digits)</h4>
              <OtpInput 
                value={otp} 
                onChange={setOtp} 
                length={6}
              />
              <p className="text-xs text-muted-foreground">Current value: <code className="bg-muted px-1 rounded">{otp || 'empty'}</code></p>
            </div>

            <Divider variant="dashed" />

            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-medium text-muted-foreground">Short (4 digits)</h4>
              <OtpInput length={4} />
            </div>

            <Divider variant="dashed" />

            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-medium text-muted-foreground">Disabled State</h4>
              <OtpInput length={6} value="123456" disabled />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Avatar</CardTitle>
            <CardDescription>Visual representation of a user or entity.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {/* Sizes */}
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-medium text-muted-foreground">Sizes</h4>
              <div className="flex items-center gap-2">
                <Avatar size="xs" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" />
                <Avatar size="sm" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" />
                <Avatar size="md" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" />
                <Avatar size="lg" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" />
                <Avatar size="xl" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" />
              </div>
            </div>

            <Divider variant="dashed" />

            {/* Shapes & Fallbacks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex flex-col gap-6">
                <h4 className="text-sm font-medium text-muted-foreground">Shapes</h4>
                <div className="flex items-center gap-6">
                  <Avatar shape="circle" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" />
                  <Avatar shape="square" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" />
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <h4 className="text-sm font-medium text-muted-foreground">Fallbacks</h4>
                <div className="flex items-center gap-6">
                  <Avatar alt="Jane Doe" />
                  <Avatar fallback="JD" className="bg-primary/20 text-primary" />
                </div>
              </div>
            </div>

            <Divider variant="dashed" />

            {/* Groups */}
            <div className="flex flex-col gap-6">
              <h4 className="text-sm font-medium text-muted-foreground">Avatar Group</h4>
              <div className="flex flex-wrap gap-12">
                <AvatarGroup max={3}>
                  <Avatar src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" />
                  <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" />
                  <Avatar src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" />
                  <Avatar src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop" />
                </AvatarGroup>

                <AvatarGroup max={4} size="sm">
                  <Avatar src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" />
                  <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" />
                  <Avatar src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop" />
                  <Avatar src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop" />
                  <Avatar src="https://images.unsplash.com/photo-1544005313-94ddf0286df2??w=100&h=100&fit=crop" />
                </AvatarGroup>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Area Chart</CardTitle>
            <CardDescription>Visualizing trends and data distributions over time.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full pt-4">
              <AreaChart
                data={chartData}
                series={chartSeries}
                height="100%"
                animate
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Line Chart</CardTitle>
            <CardDescription>Visualizing trends with clear, distinct lines and markers.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full">
              <LineChart
                data={lineChartData}
                series={lineChartSeries}
                animate
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bar Chart</CardTitle>
            <CardDescription>Comparing discrete categories with grouped vertical bars.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full">
              <BarChart 
                data={barChartData} 
                series={barChartSeries} 
                animate
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pie & Donut Charts</CardTitle>
            <CardDescription>Visualizing proportional data and part-to-whole relationships.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="flex flex-col items-center gap-6">
                 <PieChart
                  data={pieChartData}
                  animate
                />
              </div>
              <div className="flex flex-col items-center gap-6">
                 <PieChart
                  data={pieChartData}
                  innerRadius={0.6}
                  animate
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Image Expander</CardTitle>
            <CardDescription>Interactive image viewer with smooth zoom and backdrop blur.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-12">
            <div className="flex flex-col gap-4 max-w-[300px]">
              <h4 className="text-sm font-medium text-muted-foreground">Interactive Grid</h4>
              <div className="grid grid-cols-2 gap-3">
                <ImageExpander caption="Abstract geometric patterns #1">
                  <img
                    src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1000&q=100"
                    className="aspect-square object-cover"
                    alt="Abstract 1"
                  />
                </ImageExpander>
                <ImageExpander caption="Abstract geometric patterns #2">
                  <img
                    src="https://images.unsplash.com/photo-1550684847-75bdda21cc95?w=1000&q=100"
                    className="aspect-square object-cover"
                    alt="Abstract 2"
                  />
                </ImageExpander>
                <ImageExpander caption="Abstract geometric patterns #3">
                  <img
                    src="https://images.unsplash.com/photo-1550684848-86a5d8727436?w=1000&q=100"
                    className="aspect-square object-cover"
                    alt="Abstract 3"
                  />
                </ImageExpander>
                <ImageExpander caption="Abstract geometric patterns #4">
                  <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&q=100"
                    className="aspect-square object-cover"
                    alt="Abstract 4"
                  />
                </ImageExpander>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dock</CardTitle>
            <CardDescription>Floating component for quick navigation or actions.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-12 py-12">
            <div className="flex flex-col items-center gap-4">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Bottom (Default)</span>
              <Dock position="bottom">
                <DockItem icon={<FiGrid />} label="Dashboard" />
                <DockItem icon={<FiMenu />} label="Navigation Menu" href="/docs/navigation-menu" />
                <DockItem icon={<FiPieChart />} label="Analytics" />
                <DockItem icon={<FiTrendingUp />} label="Growth" />
                <DockItem icon={<FiUsers />} label="Team" />
                <DockItem icon={<FiBell />} label="Alerts" />
                <DockItem icon={<FiSettings />} label="Settings" />
              </Dock>
            </div>

            <div className="flex flex-col md:flex-row gap-[100px] items-center">
              <div className="flex flex-col items-center gap-4">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Left</span>
                <Dock position="left">
                  <DockItem icon={<FiGrid />} label="Dashboard" />
                  <DockItem icon={<FiSearch />} label="Search" />
                  <DockItem icon={<FiBell />} label="Alerts" />
                </Dock>
              </div>
              <div className="flex flex-col items-center gap-4">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Right</span>
                <Dock position="right">
                  <DockItem icon={<FiGrid />} label="Dashboard" />
                  <DockItem icon={<FiSearch />} label="Search" />
                  <DockItem icon={<FiBell />} label="Alerts" />
                </Dock>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stepper</CardTitle>
            <CardDescription>Visual progress indicator for multi-step processes.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-12 py-6">
            <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
              <Stepper activeStep={activeStepper} onChange={setActiveStepper}>
                <Step title="Account Setup" description="Create a secure account." />
                <Step title="Payment Info" description="Add funding source." />
                <Step title="Review & Confirm" description="Finalize the details." />
              </Stepper>
              <div className="flex gap-2 justify-end">
                 <Button variant="outlined" disabled={activeStepper === 0} onClick={() => setActiveStepper(prev => prev - 1)}>Back</Button>
                 <Button disabled={activeStepper === 2} onClick={() => setActiveStepper(prev => prev + 1)}>{activeStepper === 2 ? 'Complete' : 'Continue'}</Button>
              </div>
            </div>

            <Divider variant="dashed" />

            <div className="flex flex-col gap-6">
               <h4 className="text-sm font-medium text-muted-foreground mb-4">Vertical Layout with Custom Icons</h4>
               <Stepper activeStep={2} orientation="vertical">
                 <Step title="Order Confirmed" description="Your data has been validated." icon={<FiCheckCircle size={16} />} />
                 <Step title="Processing Payment" description="We are securing the funds." icon={<FiLock size={16} />} />
                 <Step title="Packaging" description="Generating labels." icon={<FiPackage size={16} />} />
                 <Step title="Shipped" description="Dispatched to local courier." icon={<FiTruck size={16} />} />
               </Stepper>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Logs</CardTitle>
            <CardDescription>Terminal-style log viewer with auto-scroll and status monitoring.</CardDescription>
          </CardHeader>
          <CardContent>
            <SystemLogs 
              title="Global Distribution Service"
              session="node-primary-aws-01"
              status="Running"
              statusColor="success"
              maxHeight={300}
              logs={[
                { type: 'info', message: 'Initializing cluster bridge...', timestamp: '15:30:01' },
                { type: 'ok', message: 'Secondary nodes at 10.0.1.4 response: PONG', timestamp: '15:30:05' },
                { type: 'info', message: 'Syncing ledger state with primary...', timestamp: '15:30:12' },
                { type: 'warn', message: 'Replication lag detected in Mumbai region (450ms).', timestamp: '15:30:25' },
                { type: 'stable', message: 'Replica caught up. All systems nominal.', timestamp: '15:40:01' },
                { type: 'info', message: 'Monitoring incoming requests at /api/v2/stream', timestamp: '15:40:05' },
              ]}
            />
          </CardContent>
        </Card>

        <section className="flex flex-col gap-4">
          <Table framed>
            <TableCaption>A list of your recent invoices and their current payment status.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((trx) => (
                <TableRow key={trx.id}>
                  <TableCell className="font-bold">{trx.id}</TableCell>
                  <TableCell>{trx.customer}</TableCell>
                  <TableCell className="text-ds-500">{trx.date}</TableCell>
                  <TableCell className="text-right font-medium">${trx.amount.toFixed(2)}</TableCell>
                  <TableCell className="flex justify-end">
                    <Badge
                      content={trx.status}
                      color={
                        trx.status === 'Completed' ? 'success' :
                          trx.status === 'Pending' ? 'warning' :
                            'danger'
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex items-center justify-between border-t border-ds-200 dark:border-ds-800 pt-4">
             <span className="text-sm font-medium text-ds-500">
               Showing data for page {paginationPage}
             </span>
             <Pagination 
               currentPage={paginationPage} 
               totalPages={10} 
               onChange={setPaginationPage} 
             />
          </div>
        </section>
      </main>

      <Footer />

      <FloatActionMenu
        label="Quick Actions"
        icon={<FiPlus />}
        position="bottom-right"
      >
        <div className="flex flex-col gap-4">
          <div className="p-4 ds-rounded bg-ds-50 dark:bg-ds-800 border border-border/60">
            <h4 className="text-sm font-semibold mb-1">Create New Task</h4>
            <p className="text-xs text-muted-foreground">Add a task to your current active project.</p>
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="soft" leftIcon={<FiEdit2 />} className="justify-start">Edit Project</Button>
            <Button variant="soft" leftIcon={<FiShare2 />} className="justify-start">Share Dashboard</Button>
            <Button variant="soft" leftIcon={<FiDownload />} className="justify-start">Export Data</Button>
          </div>
        </div>
      </FloatActionMenu>
    </div>
  );
};
