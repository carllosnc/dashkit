# AGENTS.md

## Git Workflow

- **Never commit directly to `master`.** The `master` branch is protected: direct pushes are blocked and changes are only merged via pull request.
- Always create a dedicated branch for your work (e.g. `chore/update-deps`, `feat/button`, `fix/modal-close`).
- Push the branch and open a pull request targeting `master`.
- Pull requests require the `build_test_lint` CI check to pass and 1 approving review before merge.

## Commands

- `bun run test` — run the test suite
- `bun run lint` — run ESLint
- `bun run build` — typecheck and build
- `bun run check:all` — test + lint + build
- `bun run build:cli` — build the CLI bundle
- `bun run build:llms` — regenerate `public/llms.txt`, `public/llms-full.txt`, and `public/registry.json`

## Architecture & Styling Guidelines

- **Bun First**: Always use `bun` and `bunx` instead of `npm`, `npx`, `pnpm`, or `yarn`.
- **Component Location**: All UI components live in `src/dashkit/[ComponentName]/` with `[ComponentName].tsx`, `[ComponentName].test.tsx`, and `index.ts`, and must be registered in `scripts/registry.ts` and exported in `src/dashkit/index.ts`.
- **Tailwind CSS v4 & CVA**: Use single-file utility-first styling with `class-variance-authority` (`cva`) and `cn` from `src/dashkit/utils/cn`. Never create per-component `.css` files.
- **Semantic Tokens**: Always use semantic tokens (`bg-background`, `text-foreground`, `text-muted-foreground`, `bg-card`, `bg-popover`, `border-border`, `bg-input-bg`, `text-input-fg`) instead of hardcoded neutral scales.
- **Pure Usage**: In pages and examples (`src/pages/`), use components purely via their built-in props and variants.

## 3-Tier AI Customization Protocol

1. **Tier 1 — Global Theme (`src/dashkit/dashkit.css`)**: For theme-wide changes (brand colors, dark/OLED mode, border radius, flat vs. gradient surfaces), edit `:root` and `.dark` variables (`--ds-primary`, `--ds-bg`, `--ds-card`, `--radius`, `--ds-primary-gradient`) or apply `data-primary` / `data-base` attributes.
2. **Tier 2 — Component Variants (`src/dashkit/[Component]/[Component].tsx`)**: For app-wide changes to a specific component, edit its `cva(...)` definition directly in the component file.
3. **Tier 3 — Instance Overrides (`className` & `data-slot`)**: For one-off layout tweaks on a single screen, pass `className` or target internal slots via `data-slot` (e.g. `className="[&_[data-slot=label]]:uppercase"`).
