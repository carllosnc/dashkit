<p align="center">
  <img src="public/logo.svg" alt="Dashkit UI Logo" width="120" /><br />
  <br />
  <a href="https://github.com/carllosnc/dashkit/actions/workflows/ci.yml">
    <img src="https://github.com/carllosnc/dashkit/actions/workflows/ci.yml/badge.svg" alt="CI" />
  </a>
</p>

# Dashkit UI

Dashkit is an open-source React component library built with Tailwind CSS v4. It delivers accessible, composable UI components through a copy-paste distribution model, giving developers complete source code ownership and minimal runtime overhead.

## Highlights

- Source Ownership: Components live directly within your project tree rather than behind locked node_modules packages.
- Tailwind CSS v4 Native: Crafted around Tailwind v4 architecture, utilizing modern CSS variables and token-driven design.
- React 19 Ready: Designed for modern React standards, supporting server components, actions, and client-side transitions.
- Motion and Micro-Interactions: Built with Framer Motion for smooth, hardware-accelerated animations and spring physics.
- High-Contrast Aesthetics: Balanced typography scales, deliberate contrast ratios, and first-class dark mode integration.
- Automated CLI Workflow: A dedicated command-line interface to initialize stylesheets, resolve dependencies, and scaffold components.

## Getting Started

### Initialize Dashkit in Your Project

Run the initialization command to create the configuration file and inject the design token stylesheet (`dashkit.css`) into your application entry:

```bash
bunx carllosnc/dashkit init
```

For npm, pnpm, or yarn environments:

```bash
npx github:carllosnc/dashkit init
# or
pnpm dlx github:carllosnc/dashkit init
```

### Adding Components

Add components individually. The CLI automatically resolves local Dashkit dependencies and required npm packages:

```bash
bunx carllosnc/dashkit add button
bunx carllosnc/dashkit add card
bunx carllosnc/dashkit add sidebar
```

## CLI Reference

Dashkit provides an interactive CLI to streamline component integration.

### Commands

- `dashkit init`: Configures `dashkit.json` and imports base design system CSS into your global styles.
  - `-y, --yes`: Accept defaults non-interactively.
- `dashkit add [component]`: Scaffolds a component and its sub-components into your target directory.
  - `-o, --output <dir>`: Specify a custom destination path (overrides detected paths).
  - `--no-install`: Skip automatic installation of third-party package dependencies.
  - `-f, --force`: Overwrite existing files on disk.
  - `-t, --tests`: Include Vitest unit test files (`*.test.tsx`).
- `dashkit list`: Lists all available components from the registry.
  - `--installed`: Filter to show only components present in the local project.
  - `--json`: Format the output as JSON for tooling pipelines.
- `dashkit doctor`: Runs project diagnostics to verify dependencies, CSS imports, and directory structure.

## Available Components

Dashkit includes 55 production-ready components:

### Layout & Containers
- Card
- Surface
- Divider
- ScrollArea

### Navigation
- Navbar
- NavigationMenu
- Sidebar
- Breadcrumb
- Tabs
- Stepper
- Pagination
- Dock

### Forms & Inputs
- Button
- IconButton
- ButtonGroup
- Input
- Textarea
- Checkbox
- Radio
- Switch
- Select
- Combobox
- Slider
- DateField
- DatePicker
- OtpInput
- ColorPicker
- CopyField

### Feedback & Overlays
- Modal
- Drawer
- Popover
- Tooltip
- Toast
- Backdrop
- Spinner
- ProgressBar
- CircularProgress
- Skeleton
- FloatActionMenu

### Data Display & Metrics
- Avatar
- Badge
- FloatBadge
- Chip
- ListTile
- StatsCard
- AnimateNumber
- SystemLogs
- Table

### Visualization & Media
- AreaChart
- BarChart
- LineChart
- PieChart
- ImageExpander

## Local Development

If you want to contribute or explore the documentation site locally:

### Clone and Install

```bash
git clone https://github.com/carllosnc/dashkit.git
cd dashkit
bun install
```

### Development Server

Start Vite in development mode:

```bash
bun run dev
```

### Quality & Verification Commands

- `bun run test`: Run the Vitest test suite.
- `bun run lint`: Run ESLint checks.
- `bun run build`: Typecheck with TypeScript and build documentation bundle.
- `bun run check:all`: Execute test, lint, and build sequentially.
- `bun run build:cli`: Compile the CLI bundle using tsup.

## Roadmap

Dashkit is actively expanding its capabilities with an emphasis on developer ergonomics and AI-first readiness:

- Structured Model Documentation: Automated `llms.txt` and `llms-full.txt` for coding agents and LLM context windows.
- Machine-Readable Registry & MCP: Public `registry.json` endpoint and official Model Context Protocol server.
- Repository Agent Rules: Synchronized skill files and comprehensive guidelines for autonomous coding assistants.
- Code Metadata & Typing: JSDoc annotations with `@example` blocks and strict discriminated unions across all components.
- Downstream AI Tooling: CLI command to scaffold AI rules (`.cursorrules`) into consuming applications.

For detailed tracking and upcoming milestones, see [ROADMAP.md](ROADMAP.md).

## Contributing

Pull requests are welcome. When contributing:

1. Always create a dedicated branch for your work (e.g. `feat/new-component`, `fix/input-focus`).
2. Verify that all checks pass locally with `bun run check:all`.
3. Submit a pull request targeting `master`. Direct pushes to `master` are blocked.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more details.
