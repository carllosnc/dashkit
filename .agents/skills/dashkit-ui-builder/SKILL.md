---
name: dashkit-ui-builder
description: Builds high-craft dashboards, tables, forms, and application screens using Dashkit components. Covers layout recipes (BentoGrid, Sidebar, Navbar, Card), component pairing rules, prop-driven vs. compound component APIs, semantic token usage, and the 3-tier customization protocol.
---

# Dashkit UI Builder Skill

Use this skill when generating application screens, dashboards, data tables, settings pages, or forms with Dashkit.

## 1. Non-Negotiable Rules

1. **Discover Before Writing**: Run `bunx dashkit list --json` to see available components and `bunx dashkit info <name> --json` to inspect exact props and dependencies before writing JSX.
2. **Pure Component Usage**: Use Dashkit components via their built-in props and variants (`variant`, `color`, `size`, `status`). Never wrap or reimplement existing components with ad-hoc HTML/Tailwind divs.
3. **Semantic Tokens Only**: Use `bg-background`, `text-foreground`, `text-muted-foreground`, `bg-card`, `bg-popover`, `border-border`, `bg-muted`, `bg-primary`, `text-primary-foreground`. Never hardcode Tailwind neutral scales (`bg-zinc-*`, `text-slate-*`, `border-gray-*`, `neutral-*`, `stone-*`).
4. **No Nested Interactive Elements**:
   - For a link styled as a button, use `<Button asChild><a href="...">...</a></Button>`.
   - For an icon link, use `<IconButton href="..." icon={...} aria-label="..." />` (automatically renders `<a>`).
5. **Distinguish Prop-Driven vs. Compound Components**:
   - **Prop-driven**: `Select` (`options={...}`), `Combobox` (`options={...}`), `StatsCard` (`title`, `value`, `trend`), `Pagination` (`totalPages`, `currentPage`, `onPageChange`), `BarChart`/`AreaChart`/`LineChart`/`PieChart` (`data`, `series`), `SystemLogs` (`logs`).
   - **Compound (`children`)**: `Card` (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`), `Table` (`TableContainer`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`), `Tabs` (`TabsList`, `TabsTrigger`, `TabsContent`), `Modal` (`ModalHeader`, `ModalContent`, `ModalFooter`), `Drawer` (`DrawerHeader`, `DrawerContent`, `DrawerFooter`), `Accordion`, `Breadcrumb`, `Dropdown`, `NavigationMenu`, `Sidebar`.

## 2. Layout Recipes

### Application Shell
- Root: `<SidebarProvider>` wrapping `<Sidebar>` (collapsible navigation with `SidebarSection`, `SidebarItem`) and a main column (`flex-1 flex flex-col min-w-0`).
- Top bar: `<Navbar sticky blur>` containing `<SidebarTrigger />`, page `<Breadcrumb />`, and user actions (`<IconButton />`, `<Avatar />`).
- Content area: `<ScrollArea>` or padded `<main className="p-4 md:p-6 space-y-6">`.

### Analytics & KPI Dashboard
- Top KPI strip: `<BentoGrid cols={{ base: 1, sm: 2, lg: 4 }} gap="md">` with `<StatsCard>` items (`status="success" | "danger" | "warning" | "info" | "neutral"`, optional `chart={{ data }}`).
- Charts & breakdown row: `<BentoGrid cols={{ base: 1, lg: 3 }} gap="md">` with a `<BentoGridItem colSpan={{ base: 1, lg: 2 }}>` hosting `<Card>` + `<AreaChart>` or `<BarChart>`, paired with a 1-column `<Card>` hosting `<PieChart>` or `<ListTile>` activity feed.

### Data Table & Management View
- Header bar: Page title + primary `<Button variant="filled" color="primary">` CTA.
- Filter bar: `<Toolbar>` or flex row with `<Input placeholder="Search..." />`, `<Select options={...} />`, and `<DatePicker />`.
- Data surface: `<Card>` wrapping `<TableContainer>` -> `<Table>` with `<Badge>` status indicators and row action `<Dropdown>` or `<IconButton variant="ghost" />`.
- Footer: `<Pagination>` aligned with result count (`text-sm text-muted-foreground`).

### Settings & Multi-Section Forms
- Organize sections inside `<Card>` blocks with `<CardHeader>` (`<CardTitle>`, `<CardDescription>`), `<CardContent className="space-y-4">`, `<Divider />` between logical groups, and `<CardFooter className="justify-end gap-2">` with `<Button variant="outlined">` (Cancel) and `<Button variant="filled">` (Save).
- Use `<Switch>` for boolean preferences, `<Select>` / `<Combobox>` for enumerated choices, `<OtpInput>` for verification codes, and `<Surface variant="warning" | "danger">` for callouts or danger zones.

## 3. Component Pairing Rules

| Goal | Primary Component | Pair With |
| --- | --- | --- |
| Destructive confirmation | `Button color="danger"` | `Modal` + `useToast()` |
| Async form submission | `Button loading={isPending}` | `ToastProvider` + `toast({ type: 'success' })` |
| Row or card status | `Badge` (counts/dots) or `Chip` (filter tags) | `TableCell`, `ListTile`, `FloatBadge` |
| Long-running task progress | `ProgressBar` or `CircularProgress` | `Surface` or `Card` |
| Loading placeholders | `Skeleton` | Match target layout (`variant="text" | "circular" | "rectangular"`) |
| Contextual hints | `Tooltip` | `IconButton` or truncated labels |
| Slide-over detail editor | `Drawer` (`position="right"`) | `TableRow` click handler |

## 4. 3-Tier Customization Protocol

When the user asks to change styling, apply the change at the highest appropriate tier:
1. **Tier 1 — Global Theme (`dashkit.css`)**: Brand colors, dark/OLED mode, border radius, or flat vs. gradient surfaces (`--ds-primary`, `--ds-bg`, `--radius`, `data-primary`, `data-base`).
2. **Tier 2 — Component Variants (`[Component].tsx`)**: App-wide changes to a specific component (`cva(...)` variants or base classes).
3. **Tier 3 — Instance Overrides (`className` & `data-slot`)**: One-off layout tweaks via `className` or internal slot selectors like `[&_[data-slot=label]]:uppercase`.
