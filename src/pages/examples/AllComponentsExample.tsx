import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '../../partials/Header';
import { Footer } from '../../partials/Footer';
import { Button } from '../../dashkit/Button/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../dashkit/Card';
import { IconButton } from '../../dashkit/IconButton/IconButton';
import { Chip } from '../../dashkit/Chip/Chip';
import { Divider } from '../../dashkit/Divider/Divider';
import { Badge, FloatBadge } from '../../dashkit/Badge';
import { AnimateNumber } from '../../dashkit/AnimateNumber';
import { CircularProgress } from '../../dashkit/CircularProgress/CircularProgress';
import { Avatar, AvatarGroup } from '../../dashkit/Avatar';
import { Input } from '../../dashkit/Input/Input';
import { CopyField } from '../../dashkit/CopyField/CopyField';
import { ListTile } from '../../dashkit/ListTile/ListTile';
import { Checkbox } from '../../dashkit/Checkbox/Checkbox';
import { Radio } from '../../dashkit/Radio/Radio';
import { Switch } from '../../dashkit/Switch/Switch';
import { Textarea } from '../../dashkit/Textarea/Textarea';
import { ButtonGroup, ButtonGroupItem } from '../../dashkit/ButtonGroup/ButtonGroup';
import { Select } from '../../dashkit/Select/Select';
import { Combobox } from '../../dashkit/Combobox/Combobox';
import { DatePicker } from '../../dashkit/DatePicker/DatePicker';
import { DateField } from '../../dashkit/DateField/DateField';
import { Slider } from '../../dashkit/Slider/Slider';
import { Spinner } from '../../dashkit/Spinner/Spinner';
import { ColorPicker } from '../../dashkit/ColorPicker/ColorPicker';
import { Skeleton } from '../../dashkit/Skeleton/Skeleton';
import { Surface } from '../../dashkit/Surface/Surface';
import { Backdrop } from '../../dashkit/Backdrop/Backdrop';
import { Modal, ModalHeader, ModalContent, ModalFooter } from '../../dashkit/Modal';
import { Drawer, DrawerHeader, DrawerContent, DrawerFooter } from '../../dashkit/Drawer/Drawer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../dashkit/Tabs/Tabs';
import { OtpInput } from '../../dashkit/OtpInput/OtpInput';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../dashkit/Accordion';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator } from '../../dashkit/Breadcrumb';
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator
} from '../../dashkit/Dropdown';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '../../dashkit/Popover';
import { Tooltip, TooltipTrigger, TooltipContent } from '../../dashkit/Tooltip/Tooltip';
import { useToast } from '../../dashkit/Toast/useToast';
import { AreaChart } from '../../dashkit/AreaChart/AreaChart';
import { LineChart } from '../../dashkit/LineChart/LineChart';
import { BarChart } from '../../dashkit/BarChart/BarChart';
import { PieChart } from '../../dashkit/PieChart/PieChart';
import { ImageExpander } from '../../dashkit/ImageExpander/ImageExpander';
import { ProgressBar } from '../../dashkit/ProgressBar/ProgressBar';
import { Pagination } from '../../dashkit/Pagination';
import { FloatActionMenu } from '../../dashkit/FloatActionMenu/FloatActionMenu';
import { Dock, DockItem } from '../../dashkit/Dock/Dock';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption
} from '../../dashkit/Table/Table';
import { SystemLogs } from '../../dashkit/SystemLogs/SystemLogs';
import { Stepper, Step } from '../../dashkit/Stepper';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, NavigationMenuViewport } from '../../dashkit/NavigationMenu';
import { ScrollArea } from '../../dashkit/ScrollArea/ScrollArea';
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
  FiMenu,
  FiLayers
} from 'react-icons/fi';
import { 
  HiOutlineCurrencyDollar, 
  HiOutlineUsers, 
  HiOutlineArrowPathRoundedSquare,
  HiOutlineShieldCheck
} from 'react-icons/hi2';
import { StatsCard } from '../../dashkit/StatsCard/StatsCard';

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
  const [sliderValue, setSliderValue] = useState(50);
  const [buttonGroupSelection, setButtonGroupSelection] = useState('week');
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
    { key: 'revenue', label: 'Revenue ($)', color: 'var(--color-chart-1)' },
    { key: 'users', label: 'New Users', color: 'var(--color-chart-2)' },
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
    { key: 'speed', label: 'Response Time (ms)', color: 'var(--color-chart-1)' },
    { key: 'stability', label: 'System Stability (%)', color: 'var(--color-chart-2)' },
    { key: 'uptime', label: 'Uptime (%)', color: 'var(--color-chart-3)' },
    { key: 'errors', label: 'Errors', color: 'var(--color-chart-5)' },
  ];

  const barChartData = [
    { label: 'Americas', sales: 12400, target: 10000 },
    { label: 'Europe', sales: 15800, target: 14000 },
    { label: 'Asia', sales: 9200, target: 12000 },
    { label: 'Oceania', sales: 4500, target: 5000 },
    { label: 'Middle East', sales: 7800, target: 8000 },
  ];

  const barChartSeries = [
    { key: 'sales', label: 'Actual Sales ($)', color: 'var(--color-chart-1)' },
    { key: 'target', label: 'Target ($)', color: 'var(--color-chart-2)' },
  ];

  const pieChartData = [
    { label: 'Desktop', value: 4500, color: 'var(--color-chart-1)' },
    { label: 'Mobile', value: 3200, color: 'var(--color-chart-2)' },
    { label: 'Tablet', value: 1200, color: 'var(--color-chart-3)' },
    { label: 'Other', value: 600, color: 'var(--color-chart-4)' },
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

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12 flex flex-col gap-6">
        <header className="mb-2">
          <h1 className="text-4xl font-medium tracking-tight">Kitchen Sink</h1>
        </header>

        {/* BUTTONS */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>Buttons are used to trigger actions across variants and sizes.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="filled">Filled</Button>
              <Button variant="outlined">Outlined</Button>
              <Button variant="soft">Soft</Button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button variant="filled" size="lg">Large</Button>
              <Button variant="outlined" size="lg">Large</Button>
              <Button variant="soft" size="lg">Large</Button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button variant="filled" size="sm">Small</Button>
              <Button variant="outlined" size="sm">Small</Button>
              <Button variant="soft" size="sm">Small</Button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button variant="filled" leftIcon={<FiPlus />}>With Icon</Button>
              <Button variant="outlined" leftIcon={<FiPlus />}>With Icon</Button>
              <Button variant="soft" leftIcon={<FiPlus />}>With Icon</Button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button variant="filled" loading>Loading</Button>
              <Button variant="outlined" loading>Loading</Button>
              <Button variant="soft" loading>Loading</Button>
            </div>
          </CardContent>
        </Card>

        {/* ICON BUTTONS */}
        <Card>
          <CardHeader>
            <CardTitle>Icon Buttons</CardTitle>
            <CardDescription>Compact circular and rounded triggers for icon-driven interactions.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center gap-4 py-4">
            <IconButton icon={<FiPlus />} variant="filled" aria-label="Add item" />
            <IconButton icon={<FiDownload />} variant="filled" rounded aria-label="Download file" />
            <IconButton icon={<FiEdit2 />} variant="soft" aria-label="Edit details" />
            <IconButton icon={<FiShare2 />} rounded aria-label="Share resource" />
            <IconButton icon={<FiTrash2 />} variant="ghost" aria-label="Delete resource" />
          </CardContent>
        </Card>

        {/* BUTTON GROUPS */}
        <Card>
          <CardHeader>
            <CardTitle>Button Groups</CardTitle>
            <CardDescription>Grouped button controls for segmented actions and dual triggers.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Horizontal Segmented</span>
              <ButtonGroup>
                <ButtonGroupItem 
                  selected={buttonGroupSelection === 'day'} 
                  onClick={() => setButtonGroupSelection('day')}
                >
                  Day
                </ButtonGroupItem>
                <ButtonGroupItem 
                  selected={buttonGroupSelection === 'week'} 
                  onClick={() => setButtonGroupSelection('week')}
                >
                  Week
                </ButtonGroupItem>
                <ButtonGroupItem 
                  selected={buttonGroupSelection === 'month'} 
                  onClick={() => setButtonGroupSelection('month')}
                >
                  Month
                </ButtonGroupItem>
                <ButtonGroupItem 
                  selected={buttonGroupSelection === 'year'} 
                  onClick={() => setButtonGroupSelection('year')}
                >
                  Year
                </ButtonGroupItem>
              </ButtonGroup>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Vertical Alignment</span>
              <ButtonGroup vertical className="w-fit">
                <ButtonGroupItem className="justify-start">Top Action</ButtonGroupItem>
                <ButtonGroupItem className="justify-start" selected>Middle Action</ButtonGroupItem>
                <ButtonGroupItem className="justify-start">Bottom Action</ButtonGroupItem>
              </ButtonGroup>
            </div>
          </CardContent>
        </Card>

        {/* FLOAT ACTION MENU */}
        <Card>
          <CardHeader>
            <CardTitle>Float Action Menu</CardTitle>
            <CardDescription>Floating speed-dial button anchored for global shortcuts (inspect bottom right).</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <p className="text-sm text-muted-foreground">
              The floating action menu stays permanently docked at the bottom-right corner of this demo page for quick global actions.
            </p>
            <div className="p-4 bg-muted/40 border border-border ds-rounded flex items-center justify-between">
              <span className="text-xs font-medium text-foreground">Status: Active at bottom-right viewport</span>
              <Badge content="Active" color="success" />
            </div>
          </CardContent>
        </Card>

        {/* INPUTS & TEXT FIELDS */}
        <Card>
          <CardHeader>
            <CardTitle>Inputs & Text Fields</CardTitle>
            <CardDescription>Versatile text inputs supporting icons, prefixes, suffixes, helpers, and validation states.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Input label="Username" placeholder="e.g. alexrivera" leftIcon={<FiUser />} />
              <Input 
                label="Password" 
                type="password" 
                placeholder="••••••••" 
                leftIcon={<FiLock />} 
                helperText="Must contain at least 8 characters." 
              />
              <Input label="Search Library" placeholder="Type to filter..." leftIcon={<FiSearch />} />
              <Input label="Website Domain" prefix="https://" placeholder="mycompany.com" />
              <Input label="Unit Price" prefix="$" suffix="USD" defaultValue="149.00" />
              <Input 
                label="Error State" 
                defaultValue="invalid-email@" 
                error="Please enter a valid corporate email." 
              />
              <Input 
                label="Disabled Field" 
                disabled 
                defaultValue="system-managed@dashkit.dev" 
                helperText="This field is read-only." 
              />
              <Input 
                label="Required Email" 
                required 
                placeholder="john@example.com" 
                helperText="We'll never share your email." 
              />
              <Input 
                label="Formatted Code" 
                placeholder="XXX-XXXX" 
                defaultValue="SDK-9082" 
              />
            </div>
          </CardContent>
        </Card>

        {/* COPY FIELD */}
        <Card>
          <CardHeader>
            <CardTitle>Copy Field</CardTitle>
            <CardDescription>Interactive field with one-click clipboard copying and visual confirmation.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <CopyField value="npm i @dashkit/ui" label="Install Command" />
            <CopyField value="https://dashkit.dev/docs/components" label="Documentation URL" />
          </CardContent>
        </Card>

        {/* TEXTAREA */}
        <Card>
          <CardHeader>
            <CardTitle>Textarea</CardTitle>
            <CardDescription>Multiline text input with auto-resize and character helper text.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Textarea 
              label="Project Description" 
              placeholder="Outline the scope and specifications of your project..." 
              helperText="Supports markdown formatting."
              rows={4}
            />
          </CardContent>
        </Card>

        {/* SELECT */}
        <Card>
          <CardHeader>
            <CardTitle>Select</CardTitle>
            <CardDescription>Accessible drop-down menu for choosing a single option.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <Select
              label="Report Frequency"
              options={options}
              value={selected}
              onChange={setSelected}
              description="Choose how metric summaries are aggregated."
            />
            <Select
              label="Disabled Selection"
              options={options}
              value="weekly"
              disabled
              description="This frequency cannot be modified."
            />
          </CardContent>
        </Card>

        {/* COMBOBOX */}
        <Card>
          <CardHeader>
            <CardTitle>Combobox</CardTitle>
            <CardDescription>Filterable autocomplete selector with single and multi-tag capabilities.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <Combobox 
              label="Primary Framework" 
              options={techOptions} 
              value={comboSingle} 
              onChange={(val) => setComboSingle(val as string)} 
              description="Search or pick your preferred frontend technology."
            />
            <Combobox 
              label="Tech Stack Selection" 
              options={techOptions} 
              value={comboMulti} 
              onChange={(val) => setComboMulti(val as string[])} 
              multiple
              description="Select multiple technologies for your stack."
            />
          </CardContent>
        </Card>

        {/* DATE PICKER */}
        <Card>
          <CardHeader>
            <CardTitle>Date Picker</CardTitle>
            <CardDescription>Interactive calendar overlays with year/month fast navigation.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <DatePicker 
              label="Event Date" 
              value={date} 
              onChange={setDate} 
              description="Pick an appointment or event date from the calendar."
            />
            <DatePicker 
              label="Locked Milestone" 
              disabled 
              placeholder="Not selectable"
              description="This date field is currently archived."
            />
          </CardContent>
        </Card>

        {/* DATE FIELD */}
        <Card>
          <CardHeader>
            <CardTitle>Date Field</CardTitle>
            <CardDescription>Keyboard-friendly date input with independent editable segments.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <DateField 
              label="Date of Birth" 
              value={fieldDate} 
              onChange={setFieldDate} 
              description="Navigate segments with Tab or Arrow keys."
            />
            <DateField 
              label="Required Milestone" 
              isRequired
              error="Please enter a valid upcoming date"
              description="This date field is mandatory."
            />
          </CardContent>
        </Card>

        {/* CHECKBOXES */}
        <Card>
          <CardHeader>
            <CardTitle>Checkboxes</CardTitle>
            <CardDescription>Multi-option toggles with indeterminate and disabled states.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Checkbox label="Enable continuous deployment" defaultChecked />
            <Checkbox label="Send automated weekly digest" description="Summary of team pull requests and activity." />
            <Checkbox label="Enforce 2-factor authentication" disabled defaultChecked description="Mandated by workspace security policy." />
          </CardContent>
        </Card>

        {/* RADIO BUTTONS */}
        <Card>
          <CardHeader>
            <CardTitle>Radio Buttons</CardTitle>
            <CardDescription>Mutually exclusive selection options in a unified radio group.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Radio name="billing" label="Monthly Billing" description="Charged monthly, cancel anytime without fees." defaultChecked />
            <Radio name="billing" label="Annual Billing" description="Save 20% on all enterprise plans." />
            <Radio name="billing" label="Enterprise Custom" disabled description="Contact sales for custom contract invoicing." />
          </CardContent>
        </Card>

        {/* SWITCHES */}
        <Card>
          <CardHeader>
            <CardTitle>Switches</CardTitle>
            <CardDescription>Instant toggles for active settings, feature flags, and permissions.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Switch label="Dark Mode Sync" description="Sync theme automatically with system preferences." defaultChecked />
            <Switch label="Email Notifications" description="Receive alert emails for server incidents." />
            <Switch label="Read-Only Mode" disabled description="Controlled by organization admin." />
          </CardContent>
        </Card>

        {/* SLIDERS */}
        <Card>
          <CardHeader>
            <CardTitle>Sliders</CardTitle>
            <CardDescription>Smooth range slider controls with real-time value output.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <Slider 
              label={`Volume Level: ${sliderValue}%`} 
              value={sliderValue} 
              onChange={setSliderValue} 
              min={0} 
              max={100} 
            />
            <Slider 
              label="Threshold (Disabled)" 
              value={75} 
              disabled 
              min={0} 
              max={100} 
            />
          </CardContent>
        </Card>

        {/* COLOR SELECTION */}
        <Card>
          <CardHeader>
            <CardTitle>Color Selection</CardTitle>
            <CardDescription>Interactive color picker with preset palette and hex feedback.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <ColorPicker 
              value={accentColor} 
              onChange={setAccentColor} 
              helperText="Choose an accent color for theme tokens."
            />
            <div className="flex items-center gap-3 p-3 ds-rounded border border-dashed border-border/60 bg-muted/30 h-10">
              <div className="size-5 rounded border border-black/10 dark:border-white/10" style={{ backgroundColor: accentColor }} />
              <span className="text-xs font-mono font-medium text-foreground uppercase">{accentColor}</span>
            </div>
          </CardContent>
        </Card>

        {/* OTP INPUT */}
        <Card>
          <CardHeader>
            <CardTitle>OTP Input</CardTitle>
            <CardDescription>Segmented verification inputs for multi-factor codes and PINs.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-col gap-2">
              <OtpInput length={6} value={otp} onChange={setOtp} />
              <span className="text-xs text-muted-foreground">Enter the 6-digit verification code sent to your device.</span>
            </div>
            <Button variant="outlined" size="sm" onClick={() => setOtp('')}>Clear Code</Button>
          </CardContent>
        </Card>

        {/* STATS CARDS (2x2 Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <StatsCard
            title="Total Revenue"
            value={showcaseMetrics.revenue}
            prefix="$"
            trend={12.5}
            trendLabel="vs last month"
            status="success"
            icon={<HiOutlineCurrencyDollar className="size-6" />}
            chart={{
              data: [40, 35, 55, 45, 60, 75, 70, 90]
            }}
          />
          <StatsCard
            title="Active Users"
            value={showcaseMetrics.users}
            trend={-2.4}
            trendLabel="vs yesterday"
            status="danger"
            icon={<HiOutlineUsers className="size-6" />}
            chart={{
              data: [80, 85, 75, 70, 65, 60, 55, 58]
            }}
          />
          <StatsCard
            title="Conversion Rate"
            value={showcaseMetrics.conversion}
            suffix="%"
            precision={1}
            status="info"
            icon={<HiOutlineArrowPathRoundedSquare className="size-6" />}
            chart={{
              data: [60, 62, 65, 63, 68, 70, 67, 68]
            }}
          />
          <StatsCard
            title="System SLA"
            value={showcaseMetrics.sla}
            suffix="%"
            precision={2}
            status="success"
            icon={<HiOutlineShieldCheck className="size-6" />}
            description="SLA target: 99.9%"
            chart={{
              data: [99.8, 99.9, 99.85, 99.95, 99.9, 99.99, 99.9, 99.95]
            }}
          />
        </div>

        {/* ANIMATED NUMBERS */}
        <Card>
          <CardHeader>
            <CardTitle>Animated Numbers</CardTitle>
            <CardDescription>Smoothly transitioning numeric values with easing and precision controls.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-6 tabular-nums">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Total Revenue</span>
              <div className="text-2xl font-bold tracking-tight text-foreground">
                <AnimateNumber value={showcaseMetrics.revenue} prefix="$" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Conversion</span>
              <div className="text-2xl font-bold tracking-tight text-success">
                <AnimateNumber value={showcaseMetrics.conversion} suffix="%" precision={1} />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Active Users</span>
              <div className="text-2xl font-bold tracking-tight text-foreground">
                <AnimateNumber value={showcaseMetrics.users} />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Uptime SLA</span>
              <div className="text-2xl font-bold tracking-tight text-info">
                <AnimateNumber value={showcaseMetrics.sla} suffix="%" precision={2} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CIRCULAR PROGRESS */}
        <Card>
          <CardHeader>
            <CardTitle>Circular Progress</CardTitle>
            <CardDescription>Radial progress gauges with multiple sizes and state colors.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center justify-around gap-6 py-4">
            <div className="flex flex-col items-center gap-2">
              <CircularProgress value={78} size="md" color="primary" />
              <span className="text-xs font-medium text-muted-foreground">Primary (78%)</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <CircularProgress value={92} size="md" color="success" />
              <span className="text-xs font-medium text-muted-foreground">Success (92%)</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <CircularProgress value={45} size="md" color="warning" />
              <span className="text-xs font-medium text-muted-foreground">Warning (45%)</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <CircularProgress value={18} size="md" color="danger" />
              <span className="text-xs font-medium text-muted-foreground">Danger (18%)</span>
            </div>
          </CardContent>
        </Card>

        {/* BADGES */}
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
            <CardDescription>Contextual status tags, floating count overlays, and pulsing indicators.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge content="Success" color="success" />
              <Badge content="Warning" color="warning" />
              <Badge content="Danger" color="danger" />
              <Badge content="Info" color="info" />
              <Badge content="Base" color="base" />
              <Badge content="99+" color="danger" />
              <Badge content="Live" color="success" pulse />
            </div>

            <Divider variant="dashed" />

            <div className="flex flex-wrap items-center gap-6">
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
            </div>
          </CardContent>
        </Card>

        {/* CHIPS */}
        <Card>
          <CardHeader>
            <CardTitle>Chips</CardTitle>
            <CardDescription>Tag elements with tonal variants, selection states, and delete buttons.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center gap-3">
            <Chip label="Default" />
            <Chip label="Success" color="success" />
            <Chip label="Warning" color="warning" />
            <Chip label="Danger" color="danger" />
            <Chip label="Info" color="info" />
            <Chip label="Filled" variant="filled" />
            <Chip label="Outlined" variant="outlined" />
            <Chip label="Tonal" variant="tonal" />
            <Chip label="Selected" variant="filled" selected />
            <Chip label="With Icon" icon={<FiInfo />} />
            <Chip label="Removable" onDelete={() => {}} />
            <Chip label="Disabled" disabled />
          </CardContent>
        </Card>

        {/* AVATAR */}
        <Card>
          <CardHeader>
            <CardTitle>Avatar</CardTitle>
            <CardDescription>User profile portraits with fallback initials and stacked group displays.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <Avatar src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" size="lg" />
              <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" size="md" />
              <Avatar fallback="AR" size="md" />
              <Avatar fallback="JD" size="sm" />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Stacked Avatar Group</span>
              <AvatarGroup max={4}>
                <Avatar src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" />
                <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" />
                <Avatar fallback="TC" />
                <Avatar fallback="BL" />
                <Avatar fallback="MN" />
                <Avatar fallback="EK" />
              </AvatarGroup>
            </div>
          </CardContent>
        </Card>

        {/* LIST TILE */}
        <Card>
          <CardHeader>
            <CardTitle>List Tile</CardTitle>
            <CardDescription>Settings and navigation rows with leading icons and chevron actions.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col divide-y divide-border">
            <ListTile
              title="Profile Settings"
              subtitle="Manage your personal information and email"
              leading={<FiUser size={18} />}
              trailing={<FiChevronRight size={16} />}
              interactive
            />
            <ListTile
              title="Push Notifications"
              subtitle="Configure how you receive push alerts"
              leading={<FiBell size={18} />}
              trailing={<FiChevronRight size={16} />}
              interactive
            />
            <ListTile
              title="Security & 2FA"
              subtitle="Manage two-factor authentication and passwords"
              leading={<FiLock size={18} />}
              trailing={<FiChevronRight size={16} />}
              interactive
            />
          </CardContent>
        </Card>

        {/* SYSTEM LOGS */}
        <Card>
          <CardHeader>
            <CardTitle>System Logs</CardTitle>
            <CardDescription>Monochrome console viewer for runtime outputs, logs, and server diagnostics.</CardDescription>
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

        {/* DATA TABLE */}
        <Card>
          <CardHeader>
            <CardTitle>Data Table</CardTitle>
            <CardDescription>Structured tabular presentation with status badges and synchronized pagination.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="overflow-x-auto border border-border ds-rounded">
              <Table>
                <TableCaption>Recent enterprise invoice transactions.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Invoice ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((trx) => (
                    <TableRow key={trx.id}>
                      <TableCell className="font-semibold text-foreground">{trx.id}</TableCell>
                      <TableCell>{trx.customer}</TableCell>
                      <TableCell className="text-muted-foreground">{trx.date}</TableCell>
                      <TableCell className="text-right font-medium">${trx.amount.toFixed(2)}</TableCell>
                      <TableCell className="flex justify-center">
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
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <span className="text-sm font-medium text-muted-foreground">
                Showing page {paginationPage} of 10 pages
              </span>
              <Pagination 
                currentPage={paginationPage} 
                totalPages={10} 
                onChange={setPaginationPage} 
              />
            </div>
          </CardContent>
        </Card>

        {/* AREA CHART */}
        <Card>
          <CardHeader>
            <CardTitle>Area Chart</CardTitle>
            <CardDescription>Multi-series area chart highlighting volume trends over time.</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <AreaChart data={chartData} series={chartSeries} />
          </CardContent>
        </Card>

        {/* LINE CHART */}
        <Card>
          <CardHeader>
            <CardTitle>Line Chart</CardTitle>
            <CardDescription>Continuous performance metrics tracking latency and stability.</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <LineChart data={lineChartData} series={lineChartSeries} />
          </CardContent>
        </Card>

        {/* BAR CHART */}
        <Card>
          <CardHeader>
            <CardTitle>Bar Chart</CardTitle>
            <CardDescription>Categorical comparisons showing regional performance vs target.</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <BarChart data={barChartData} series={barChartSeries} />
          </CardContent>
        </Card>

        {/* PIE & DONUT CHARTS */}
        <Card>
          <CardHeader>
            <CardTitle>Pie & Donut Charts</CardTitle>
            <CardDescription>Proportional breakdown of client traffic across platforms.</CardDescription>
          </CardHeader>
          <CardContent className="h-72 flex items-center justify-center">
            <PieChart data={pieChartData} innerRadius={0.6} animate />
          </CardContent>
        </Card>

        {/* NAVIGATION MENU */}
        <Card className="overflow-visible">
          <CardHeader>
            <CardTitle>Navigation Menu</CardTitle>
            <CardDescription>Complex header navigation featuring animated sliding viewports.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-20">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger value="company">Company</NavigationMenuTrigger>
                  <NavigationMenuContent value="company">
                    <div className="w-[280px] p-2 flex flex-col gap-1">
                      <NavigationMenuLink className="font-medium text-sm">About Us</NavigationMenuLink>
                      <NavigationMenuLink className="font-medium text-sm">Customers</NavigationMenuLink>
                      <NavigationMenuLink className="font-medium text-sm">Careers</NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger value="resources">Resources</NavigationMenuTrigger>
                  <NavigationMenuContent value="resources">
                    <div className="w-[380px] p-2 grid grid-cols-2 gap-2">
                      <NavigationMenuLink className="group">
                        <div className="text-sm font-bold group-hover:text-primary transition-colors">Docs</div>
                        <div className="text-xs text-muted-foreground">API documentation.</div>
                      </NavigationMenuLink>
                      <NavigationMenuLink className="group">
                        <div className="text-sm font-bold group-hover:text-primary transition-colors">Help</div>
                        <div className="text-xs text-muted-foreground">Community support.</div>
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

        {/* BREADCRUMBS */}
        <Card>
          <CardHeader>
            <CardTitle>Breadcrumbs</CardTitle>
            <CardDescription>Hierarchical pathway indicating current position within nested views.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem href="/">Home</BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem href="/examples">Examples</BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem active>All Components</BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </CardContent>
        </Card>

        {/* TABS */}
        <Card>
          <CardHeader>
            <CardTitle>Tabs</CardTitle>
            <CardDescription>Segmented views for organizing high-density panels in a single block.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="account">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <Input label="Display Name" defaultValue="Alex Rivera" />
                  <Input label="Email Address" defaultValue="alex@company.com" />
                </div>
              </TabsContent>
              <TabsContent value="security">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <Input label="Current Password" type="password" placeholder="••••••••" />
                  <Input label="New Password" type="password" placeholder="••••••••" />
                </div>
              </TabsContent>
              <TabsContent value="settings">
                <div className="flex flex-col gap-3 pt-2">
                  <Switch label="Marketing Communications" defaultChecked />
                  <Switch label="Incident Webhooks" defaultChecked />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* STEPPER */}
        <Card>
          <CardHeader>
            <CardTitle>Stepper</CardTitle>
            <CardDescription>Interactive multi-stage progress component for multi-step flows.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            <Stepper activeStep={activeStepper} onChange={setActiveStepper}>
              <Step title="Account Details" description="Personal information" />
              <Step title="Organization" description="Workspace setup" />
              <Step title="Payment" description="Select billing tier" />
              <Step title="Review & Finish" description="Confirm subscription" />
            </Stepper>

            <div className="flex justify-between items-center pt-2">
              <Button 
                variant="outlined" 
                disabled={activeStepper <= 1} 
                onClick={() => setActiveStepper(prev => Math.max(1, prev - 1))}
              >
                Previous Step
              </Button>
              <Button 
                variant="filled" 
                disabled={activeStepper >= 4} 
                onClick={() => setActiveStepper(prev => Math.min(4, prev + 1))}
              >
                {activeStepper >= 4 ? 'Completed' : 'Next Step'}
              </Button>
            </div>

            <Divider variant="dashed" />

            <div className="flex flex-col gap-4">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Vertical Layout with Custom Icons</span>
              <Stepper activeStep={2} orientation="vertical">
                <Step title="Order Confirmed" description="Your data has been validated." icon={<FiCheckCircle size={16} />} />
                <Step title="Processing Payment" description="We are securing the funds." icon={<FiLock size={16} />} />
                <Step title="Packaging" description="Generating labels." icon={<FiPackage size={16} />} />
                <Step title="Shipped" description="Dispatched to local courier." icon={<FiTruck size={16} />} />
              </Stepper>
            </div>
          </CardContent>
        </Card>

        {/* DOCK */}
        <Card>
          <CardHeader>
            <CardTitle>Dock</CardTitle>
            <CardDescription>Floating dock launcher with magnification effects on hover.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-10 py-8">
            <div className="flex flex-col items-center gap-3">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Bottom Position</span>
              <Dock position="bottom">
                <DockItem icon={<FiGrid />} label="Dashboard" />
                <DockItem icon={<FiMenu />} label="Navigation" href="/docs/navigation-menu" />
                <DockItem icon={<FiPieChart />} label="Analytics" />
                <DockItem icon={<FiTrendingUp />} label="Growth" />
                <DockItem icon={<FiUsers />} label="Team" />
                <DockItem icon={<FiBell />} label="Alerts" />
                <DockItem icon={<FiSettings />} label="Settings" />
              </Dock>
            </div>
          </CardContent>
        </Card>

        {/* POPOVER - FIXED & CLEAN */}
        <Card>
          <CardHeader>
            <CardTitle>Popover</CardTitle>
            <CardDescription>Floating contextual containers for rich forms, actions, and profile cards.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4 py-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outlined" leftIcon={<FiInfo />}>Dimensions</Button>
              </PopoverTrigger>
              <PopoverContent side="bottom" align="center" className="w-80 p-4">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <h4 className="text-sm font-bold text-foreground">Dimensions</h4>
                    <p className="text-xs text-muted-foreground">Adjust layout specifications for this layer.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Width" defaultValue="100%" />
                    <Input label="Height" defaultValue="auto" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Top" defaultValue="0px" />
                    <Input label="Left" defaultValue="0px" />
                  </div>
                  <Button size="sm" variant="filled" className="w-full">Save Changes</Button>
                </div>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="soft" leftIcon={<FiUser />}>User Profile</Button>
              </PopoverTrigger>
              <PopoverContent side="bottom" align="start" className="w-80 p-4">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" size="md" />
                    <div className="flex flex-col">
                      <h4 className="font-bold text-sm text-foreground">Alex Rivera</h4>
                      <p className="text-xs text-muted-foreground">Senior UI Architect</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Lead frontend engineer creating accessible components with the Dashkit design system.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="filled" size="sm" className="flex-1">Follow</Button>
                    <Button variant="soft" size="sm" className="flex-1">Message</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </CardContent>
        </Card>

        {/* DROPDOWN MENU */}
        <Card>
          <CardHeader>
            <CardTitle>Dropdown Menu</CardTitle>
            <CardDescription>Actionable menus with labels, icons, dividers, and destructive items.</CardDescription>
          </CardHeader>
          <CardContent className="py-4">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="outlined" rightIcon={<FiChevronRight className="rotate-90" />}>
                  Options Menu
                </Button>
              </DropdownTrigger>
              <DropdownContent className="w-56">
                <DropdownLabel>My Account</DropdownLabel>
                <DropdownSeparator />
                <DropdownItem leftIcon={<FiUser />}>Profile Details</DropdownItem>
                <DropdownItem leftIcon={<FiEdit2 />}>Project Settings</DropdownItem>
                <DropdownItem leftIcon={<FiShare2 />}>Invite Members</DropdownItem>
                <DropdownSeparator />
                <DropdownLabel>Danger Zone</DropdownLabel>
                <DropdownItem destructive leftIcon={<FiTrash2 />}>Delete Workspace</DropdownItem>
              </DropdownContent>
            </Dropdown>
          </CardContent>
        </Card>

        {/* TOOLTIP */}
        <Card>
          <CardHeader>
            <CardTitle>Tooltip</CardTitle>
            <CardDescription>Contextual hints that emerge smoothly on mouse hover or keyboard focus.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center justify-around gap-6 py-6">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outlined" size="sm">Hover Me</Button>
              </TooltipTrigger>
              <TooltipContent>Top contextual tooltip</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <IconButton icon={<FiInfo />} variant="soft" aria-label="Help information" />
              </TooltipTrigger>
              <TooltipContent>Detailed help information tooltip</TooltipContent>
            </Tooltip>
          </CardContent>
        </Card>

        {/* TOAST NOTIFICATIONS */}
        <Card>
          <CardHeader>
            <CardTitle>Toast Notifications</CardTitle>
            <CardDescription>Non-blocking toast alerts with success, error, and informational styles.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3 py-4">
            <Button 
              variant="outlined" 
              onClick={() => toast({ 
                title: "Action Successful", 
                description: "Your settings have been saved.",
                type: "success",
                invert: true
              })}
            >
              Success Toast
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => toast({ 
                title: "Operation Failed", 
                description: "Server connection could not be established.",
                type: "error",
                invert: true
              })}
            >
              Error Toast
            </Button>
            <Button 
              variant="outlined" 
              onClick={() => toast({ 
                title: "System Update", 
                description: "A newer release is ready for installation.",
                type: "info",
                invert: true
              })}
            >
              Info Toast
            </Button>
          </CardContent>
        </Card>

        {/* MODALS */}
        <Card>
          <CardHeader>
            <CardTitle>Modals</CardTitle>
            <CardDescription>Focused dialog boxes supporting multiple sizes from small to full-screen.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3 py-4">
            <Button onClick={() => { setModalSize('sm'); setIsModalOpen(true); }}>Small Modal</Button>
            <Button onClick={() => { setModalSize('md'); setIsModalOpen(true); }}>Medium Modal</Button>
            <Button onClick={() => { setModalSize('lg'); setIsModalOpen(true); }}>Large Modal</Button>

            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              size={modalSize}
            >
              <ModalHeader onClose={() => setIsModalOpen(false)}>
                <h3 className="font-bold text-lg">{modalSize.toUpperCase()} Modal</h3>
                <p className="text-xs text-muted-foreground">Demonstration of the Dashkit Modal overlay.</p>
              </ModalHeader>
              <ModalContent className="flex flex-col gap-4">
                <p className="text-sm text-muted-foreground">
                  Modals are used for focused user interactions without losing current page context.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <Input label="First Name" defaultValue="Alex" />
                  <Input label="Last Name" defaultValue="Rivera" />
                </div>
              </ModalContent>
              <ModalFooter>
                <Button variant="outlined" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsModalOpen(false)}>Save Changes</Button>
              </ModalFooter>
            </Modal>
          </CardContent>
        </Card>

        {/* DRAWERS */}
        <Card>
          <CardHeader>
            <CardTitle>Drawers</CardTitle>
            <CardDescription>Off-canvas sliding sidebars supporting Left, Right, Top, and Bottom positions.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3 py-4">
            <Button onClick={() => { setDrawerPosition('left'); setIsDrawerOpen(true); }}>Left Drawer</Button>
            <Button onClick={() => { setDrawerPosition('right'); setIsDrawerOpen(true); }}>Right Drawer</Button>
            <Button onClick={() => { setDrawerPosition('top'); setIsDrawerOpen(true); }}>Top Drawer</Button>
            <Button onClick={() => { setDrawerPosition('bottom'); setIsDrawerOpen(true); }}>Bottom Drawer</Button>

            <Drawer
              isOpen={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
              position={drawerPosition}
            >
              <DrawerHeader>
                <h2 className="text-lg font-bold">Drawer ({drawerPosition.toUpperCase()})</h2>
                <p className="text-xs text-muted-foreground">Secondary panel for complex settings.</p>
              </DrawerHeader>
              <DrawerContent>
                <div className="p-4 flex flex-col gap-4">
                  <p className="text-sm text-muted-foreground">
                    Drawers are ideal for deep detail sheets, filters, or mobile navigation menus.
                  </p>
                  <Input label="Configuration Title" defaultValue="Default Profile" />
                  <Textarea label="Notes" rows={3} placeholder="Additional setup notes..." />
                </div>
              </DrawerContent>
              <DrawerFooter>
                <Button variant="outlined" onClick={() => setIsDrawerOpen(false)}>Close Panel</Button>
              </DrawerFooter>
            </Drawer>
          </CardContent>
        </Card>

        {/* SURFACE */}
        <Card>
          <CardHeader>
            <CardTitle>Surface</CardTitle>
            <CardDescription>Semantic container panels with theme-aware background tiers and borders.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Surface className="p-4 flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <FiLayers className="text-muted-foreground shrink-0" size={16} />
                <span className="font-semibold text-sm text-foreground">Default Surface</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">Clean, neutral container for general purposes.</p>
            </Surface>
            <Surface variant="info" className="p-4 flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <FiInfo className="text-info shrink-0" size={16} />
                <span className="font-semibold text-sm text-info">Info Surface</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">Helpful contextual information container.</p>
            </Surface>
            <Surface variant="success" className="p-4 flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-success shrink-0" size={16} />
                <span className="font-semibold text-sm text-success">Success Surface</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">Affirmative verification and status container.</p>
            </Surface>
          </CardContent>
        </Card>

        {/* ACCORDION */}
        <Card>
          <CardHeader>
            <CardTitle>Accordion</CardTitle>
            <CardDescription>Collapsible panels with smooth height transitions for FAQ and grouped disclosures.</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is Dashkit fully accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. Dashkit adheres to WAI-ARIA authoring practices, keyboard navigation, and focus state requirements.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Does it support Tailwind CSS v4?</AccordionTrigger>
                <AccordionContent>
                  Yes. Built natively on Tailwind CSS v4 with semantic color tokens and CSS variables.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I copy-paste source code directly?</AccordionTrigger>
                <AccordionContent>
                  Dashkit provides pure, unencumbered source files so you own your UI code completely.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* SCROLL AREA */}
        <Card>
          <CardHeader>
            <CardTitle>Scroll Area</CardTitle>
            <CardDescription>Custom theme-styled scrollbars maintaining native hardware acceleration.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-44 w-full border border-border ds-rounded overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4 flex flex-col gap-2">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="p-3 bg-muted/50 border border-border ds-rounded text-xs font-medium">
                      Scrollable Item #{i + 1}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>

        {/* DIVIDERS */}
        <Card>
          <CardHeader>
            <CardTitle>Dividers</CardTitle>
            <CardDescription>Horizontal and vertical separators with solid, dashed, or centered text styles.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <Divider />
              <Divider variant="dashed" />
              <Divider>OR CONTINUE WITH</Divider>
            </div>
          </CardContent>
        </Card>

        {/* SPINNERS */}
        <Card>
          <CardHeader>
            <CardTitle>Spinners</CardTitle>
            <CardDescription>High-performance animated indicators across token-backed colors.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center justify-around gap-6 py-4">
            <div className="flex flex-col items-center gap-2">
              <Spinner color="var(--color-primary)" />
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Primary</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-success">
              <Spinner />
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Success</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-danger">
              <Spinner />
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Danger</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-info">
              <Spinner />
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Info</span>
            </div>
          </CardContent>
        </Card>

        {/* SKELETONS */}
        <Card>
          <CardHeader>
            <CardTitle>Skeletons</CardTitle>
            <CardDescription>Animated placeholders for data loading states, profile cards, and text lines.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex flex-col gap-2 flex-1">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
            <Skeleton className="h-20 w-full rounded-md" />
          </CardContent>
        </Card>

        {/* PROGRESS BARS */}
        <Card>
          <CardHeader>
            <CardTitle>Progress Bars</CardTitle>
            <CardDescription>Linear bars indicating completion progress with top or inline labels.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 py-2">
            <ProgressBar label="Storage Quota" value={68} showLabel labelPosition="top" />
            <ProgressBar label="Sync Status" value={92} showLabel labelPosition="side" />
          </CardContent>
        </Card>

        {/* BACKDROP */}
        <Card>
          <CardHeader>
            <CardTitle>Backdrop</CardTitle>
            <CardDescription>Full-screen scrim overlay dimming underlying page content for focused views.</CardDescription>
          </CardHeader>
          <CardContent className="py-4">
            <Button onClick={() => setIsBackdropOpen(true)}>Show Backdrop</Button>
            <Backdrop show={isBackdropOpen} onClick={() => setIsBackdropOpen(false)}>
              <Surface className="p-8 max-w-sm text-center">
                <h3 className="text-xl font-bold mb-2">Backdrop Overlay</h3>
                <p className="text-muted-foreground text-sm mb-6">Click anywhere outside to dismiss this overlay.</p>
                <Button className="w-full" onClick={() => setIsBackdropOpen(false)}>Dismiss</Button>
              </Surface>
            </Backdrop>
          </CardContent>
        </Card>

        {/* IMAGE EXPANDER */}
        <Card>
          <CardHeader>
            <CardTitle>Image Expander</CardTitle>
            <CardDescription>Click-to-expand image container with smooth lightbox zooming.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3 py-2">
            <ImageExpander caption="Abstract pattern #1">
              <img
                src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&q=80"
                className="aspect-video w-full object-cover ds-rounded"
                alt="Abstract pattern 1"
              />
            </ImageExpander>
            <ImageExpander caption="Abstract pattern #2">
              <img
                src="https://images.unsplash.com/photo-1550684847-75bdda21cc95?w=600&q=80"
                className="aspect-video w-full object-cover ds-rounded"
                alt="Abstract pattern 2"
              />
            </ImageExpander>
          </CardContent>
        </Card>
      </main>

      <Footer />

      {/* Global Floating Action Menu */}
      <FloatActionMenu
        label="Actions"
        icon={<FiPlus />}
        position="bottom-right"
      >
        <div className="flex flex-col gap-2">
          <Button variant="soft" className="justify-start">Quick Action One</Button>
          <Button variant="soft" className="justify-start">Quick Action Two</Button>
        </div>
      </FloatActionMenu>
    </div>
  );
};
