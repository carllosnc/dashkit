---
name: dashkit-developer
description: A professional skill for building and maintaining the Dashkit UI ecosystem. It covers component architecture, CLI registry synchronization, MDX documentation standards, and critical design consistency rules like pure usage and Bun-first development.
---

# Dashkit Developer Skill

This skill provides instructions and patterns for extending the Dashkit UI library. Dashkit is a copy-paste component library where users own the source code.

## Component Reuse & Creation Rules

- **CRITICAL**: Before creating a new component for a screen or example, always check the `src/dashkit/` folder first. Reuse existing components whenever possible to maintain visual consistency and avoid code duplication.

- **PURE USAGE**: When using Dashkit components, avoid ad-hoc customizations. Use the components as purely as possible, relying on their built-in props and variants to achieve the desired result.

- **ALWAYS USE BUN**: This project is optimized for Bun. Always use `bun` and `bunx` instead of `npm`, `npx`, `pnpm`, or `yarn` for package management, script execution, and documentation examples.
- Only create a new component if the functionality is unique and not covered by existing building blocks.

## Design & AI Customization Protocol

- **PURE USAGE IN PAGES**: When building screens or examples, use components as purely as possible, relying on their built-in props and variants. Always design screens using a block-based approach, utilizing the `Card` component to define sections.
- **3-TIER AI CUSTOMIZATION HIERARCHY**: Because Dashkit is an AI-first, copy-paste library where the project owns the source code, always apply user customization requests at the highest applicable level rather than scattering inline classes across pages:
  1. **Level 1 — Global Theme & Brand (`src/dashkit/dashkit.css`)**: For theme-wide requests (colors, dark mode, roundness/sharpness, flat vs. gradient surfaces), edit ONLY `src/dashkit/dashkit.css` (`:root`, `.dark`, `--radius`, `--ds-primary`, `--ds-primary-gradient`, or `data-base`/`data-primary` attributes). All `--radius-*` tokens scale automatically from `--radius`, and `ds-primary-gradient` derives automatically from `--ds-primary`.
  2. **Level 2 — Component-Wide Variants (`src/dashkit/[Component]/[Component].tsx`)**: When a prompt asks to change how a specific component looks everywhere (e.g., "make all inputs taller" or "add a neon button variant"), edit the `cva(...)` definition or base classes directly inside that component's `.tsx` file. Keep page JSX clean.
  3. **Level 3 — One-Off Instance Overrides (`className` & `data-slot`)**: For layout adjustments or single-instance exceptions on a page, pass `className` (merged safely via `cn()`, which supports overriding `ds-rounded*` and `ds-*-gradient`). To style internal parts of composite form components without adding custom props, target `data-slot` attributes (e.g. `className="[&_[data-slot=label]]:text-primary [&_[data-slot=trigger]]:rounded-full"`).

## Component Structure

Every component should be located in `src/dashkit/[ComponentName]/` and typically consists of:
- `[ComponentName].tsx`: The main component implementation.
- `use[ComponentName].ts` (optional): For complex state logic.
- `[ComponentName]Context.ts` (optional): For complex state sharing.
- `[ComponentName].test.tsx`: Unit tests covering core behavior and accessibility.
- `index.ts`: Barrel export for the component and its subcomponents/hooks.

### Best Practices

- **Component Refactoring**:
  - **Preserve Behavior & Styling**: When refactoring, NEVER change an existing feature or styling outcome. Focus purely on code organization and structural improvements.
  - **Single File**: Create a dedicated file for each component (avoid grouping multiple components in one file). Each component is self-contained without companion `.css` files.
  - **Styling Strategy**: Single-file utility-first architecture using Tailwind CSS v4 and `class-variance-authority` (`cva`) for multi-variant components. Do NOT create separate `.css` files for components.
  - **Named Functions**: Use standard named function component syntax (`function MyComponent() { ... }`) instead of anonymous arrow functions within `forwardRef` or as standalone variables.
  - **Clean Code**: Remove all non-essential comments and eliminate trailing spaces.

- Use **Tailwind CSS v4** utility classes and `cva` for all component styling.
  - **GLOBAL TOKENS**: Central tokens, themes (light/dark/oled), and shared utilities live in `src/dashkit/dashkit.css`.
  - **UTILITY-FIRST & CVA**: Declare variants with `cva` inside the component `.tsx` file. Do not export runtime variant objects directly if they violate `react-refresh/only-export-components`; export `type Props extends VariantProps<typeof variants>`.
  - **THEMING**: Use inline Tailwind utility classes (e.g. `dark:bg-ds-900`) and design system semantic tokens (`bg-card`, `text-foreground`, `text-muted-foreground`, `border-border`, etc.).
- Use `framer-motion` for animations.
- Use the `cn` utility from `src/dashkit/utils/cn` (`../utils/cn` inside components) for class merging.
- Ensure proper accessibility (ARIA roles, keyboard navigation).
- Support both **Light** and **Dark** modes.

- **Token Efficiency**: To optimize context usage and save tokens:
  - Use targeted file edits instead of overwriting entire files when making incremental changes.
  - Provide concise explanations for code changes, avoiding redundant summaries of the work done.
  - When viewing or searching files, limit the range or results to what is strictly necessary for the task.
  - **Minimal Output**: Use concise communication for updates and summaries when appropriate to keep the conversation focused and brief.

## Registry Management

New components **MUST** be added to the registry in `scripts/registry.ts` (and exported in `src/dashkit/index.ts`) to be discoverable by the CLI and pass registry integrity tests.

### Adding to Registry

Edit `scripts/registry.ts` and add a new entry to the `registry` object listing every file in the component directory:

```typescript
'component-slug': {
  name: 'ComponentName',
  files: [
    'src/dashkit/ComponentName/ComponentName.tsx',
    'src/dashkit/ComponentName/ComponentName.test.tsx',
    'src/dashkit/ComponentName/index.ts',
  ],
  dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'class-variance-authority'], // NPM packages
  registryDependencies: ['button'], // Other Dashkit components
},
```

## Documentation

Each component should have an MDX documentation file in `src/pages/[component-slug].mdx`.

## Kitchen Sink

Always update `src/pages/examples/AllComponentsExample.tsx` to include a showcase card for the new component.
