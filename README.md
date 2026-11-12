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

- **Source Ownership:** Components live directly within your project tree rather than behind locked node_modules packages.
- **Tailwind CSS v4 Native:** Crafted around Tailwind v4 architecture, utilizing modern CSS variables and token-driven design.
- **React 19 Ready:** Designed for modern React standards, supporting server components, actions, and client-side transitions.
- **Motion and Micro-Interactions:** Built with Framer Motion for smooth, hardware-accelerated animations and spring physics.
- **High-Contrast Aesthetics:** Balanced typography scales, deliberate contrast ratios, and first-class dark mode integration.
- **Automated CLI Workflow:** A dedicated command-line interface to initialize stylesheets, resolve dependencies, and scaffold components.

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

- `dashkit init [-y]`: Configures `dashkit.json`, copies `dashkit.css` and `utils/`, and injects the `@import` into your main CSS file.
- `dashkit add [components...]`: Scaffolds one or more components, resolves dependencies in a single batch, and updates the root `index.ts` barrel.
  - `-a, --all`: Add all 56 registry components at once.
  - `-o, --output <dir>`: Specify a custom destination path.
  - `--no-install`: Skip automatic installation of third-party package dependencies.
  - `-f, --force`: Overwrite existing files on disk.
  - `-t, --tests`: Include Vitest unit test files (`*.test.tsx`).
- `dashkit info <component> [--json]`: Outputs component metadata, exports, dependencies, and TypeScript `*Props` definitions.
- `dashkit list [--installed] [--json]`: Lists all available components from the registry with installation status.
- `dashkit diff [component] [--json]`: Compares installed local component files against the upstream registry (`up-to-date`, `modified`, `missing`).
- `dashkit ai-rules [-o <file>]`: Generates or updates AI coding assistant guidelines in `AGENTS.md` (or `.cursorrules`).
- `dashkit doctor`: Runs project diagnostics to verify dependencies, CSS imports, and directory structure.

## AI-First & LLM Readiness

Dashkit provides native context for AI coding assistants (Cursor, Claude Code, Windsurf, Antigravity, GitHub Copilot):

- **`/llms.txt` & `/llms-full.txt`**: Structured LLM index and single-file full technical specification generated automatically on build (`bun run build:llms`).
- **`/registry.json`**: Machine-readable component schema with files, dependencies, exports, and TypeScript `*Props` interfaces.
- **`dashkit ai-rules`**: CLI command to inject Dashkit's 3-Tier AI Customization Protocol and component API patterns directly into consumer repositories.
- **Copy Page for AI**: Every documentation page includes a one-click button to copy clean Markdown specifications for any LLM prompt.

## Available Components

Dashkit includes 56 production-ready components:

### Layout & Containers
- Accordion
- BentoGrid
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
- Dropdown
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

- **Dashkit UI Builder Skill**: Dedicated AI agent skill (`SKILL.md`) with curated layout recipes, component pairing patterns, visual hierarchy rules, and best practices for generating modern UIs with Dashkit.
- **Official MCP Server**: Model Context Protocol server (`@dashkit/mcp`) with component search, prop inspection, and scaffolding tools.
- **Code Metadata & Typing**: JSDoc annotations with `@example` and `@default` blocks across all 56 components for inline LLM autocomplete.
- **Extended Slot & Prop Forwarding**: Complete `data-slot` coverage and `ComponentPropsWithoutRef` + `ref` forwarding across every overlay, navigation, and data display primitive.

For detailed tracking and upcoming milestones, see [ROADMAP.md](ROADMAP.md).

## Contributing

Pull requests are welcome. When contributing:

1. Always create a dedicated branch for your work (e.g. `feat/new-component`, `fix/input-focus`).
2. Verify that all checks pass locally with `bun run check:all`.
3. Submit a pull request targeting `master`. Direct pushes to `master` are blocked.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more details.
