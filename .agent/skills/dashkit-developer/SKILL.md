---
name: dashkit-developer
description: A professional skill for building and maintaining the Dashkit UI ecosystem. It covers component architecture, CLI registry synchronization, MDX documentation standards, and critical design consistency rules like pure usage and Bun-first development.
---

# Dashkit Developer Skill

This skill provides instructions and patterns for extending the Dashkit UI library. Dashkit is a copy-paste component library where users own the source code.

## Component Reuse & Creation Rules

- **CRITICAL**: Before creating a new component for a screen or example, always check the `src/components/` folder first. Reuse existing components whenever possible to maintain visual consistency and avoid code duplication.

- **PURE USAGE**: When using Dashkit components, avoid ad-hoc customizations. Use the components as purely as possible, relying on their built-in props and variants to achieve the desired result.

- **ALWAYS USE BUN**: This project is optimized for Bun. Always use `bun` and `bunx` instead of `npm`, `npx`, `pnpm`, or `yarn` for package management, script execution, and documentation examples.
- Only create a new component if the functionality is unique and not covered by existing building blocks.

## Design

- When creating examples, avoid customization. Use components as purely as possible, relying on their built-in props and variants to achieve the desired result.
- Always design screens using a block-based approach, utilizing the `Card` component to define sections.
- Avoid customizing colors, padding, or margins in Dashkit components. Use the default styles provided by the library.

## Component Structure

Every component should be located in `src/components/[ComponentName]/` and typically consists of:
- `[ComponentName].tsx`: The main component implementation.
- `use[ComponentName].ts` (optional): For complex state logic.
- `[ComponentName]Context.tsx` (optional): For complex state sharing.

### Best Practices

- **Component Refactoring**:
  - **Preserve Behavior & Styling**: When refactoring, NEVER change an existing feature or styling outcome. Focus purely on code organization and structural improvements.
  - **Single File**: Create a dedicated file for each component (avoid grouping multiple components in one file).
  - **Styling Strategy**: Prefer moving Tailwind class strings to a dedicated `[ComponentName].css` file using standard CSS classes. If kept in the `.tsx` file, move them to the top as constant variables (e.g., `const COMPONENT_BASE = "..."`).
  - **Named Functions**: Use standard named function component syntax (`function MyComponent() { ... }`) instead of anonymous arrow functions within `forwardRef` or as standalone variables.
  - **Clean Code**: Remove all non-essential comments and eliminate trailing spaces.

- Use **Tailwind CSS v4** for all styling.
  - When creating a component style file (`.css`), never use `@utility`. Always use standard CSS classes.
  - Separate state-related Tailwind modifiers (e.g., `hover:`, `focus:`, `disabled:`) into a dedicated `@apply` block, distinct from the base styles.
  - Always include `@reference` to the project's central CSS file (e.g., `../dashkit.css`) at the top of component style files to enable IntelliSense and proper token inheritance.
- Use `framer-motion` for animations.
- Use the `cn` utility from `src/utils/cn` for class merging.
- Ensure proper accessibility (ARIA roles, keyboard navigation).
- Support both **Light** and **Dark** modes.

- **Token Efficiency**: To optimize context usage and save tokens:
  - Use `replace_file_content` or `multi_replace_file_content` for targeted edits instead of overwriting entire files with `write_to_file`.
  - Provide concise explanations for code changes, avoiding redundant summaries of the work done.
  - When viewing or searching files, limit the range or results to what is strictly necessary for the task.
  - **Minimal Output**: Use extremely concise, "caveman-style" communication for updates and summaries when appropriate to keep the conversation focused and brief.

## Registry Management

New components **MUST** be added to the registry in `scripts/registry.ts` to be discoverable by the CLI.

### Adding to Registry

Edit `scripts/registry.ts` and add a new entry to the `registry` object:

```typescript
'component-slug': {
  name: 'ComponentName',
  files: ['src/components/ComponentName/ComponentName.tsx'],
  dependencies: ['framer-motion', 'clsx', 'tailwind-merge'], // NPM packages
  registryDependencies: ['button'], // Other Dashkit components
},
```

## Documentation

Each component should have an MDX documentation file in `src/pages/[component-slug].mdx`.

## Kitchen Sink

Always update `src/pages/examples/AllComponentsExample.tsx` to include a showcase card for the new component.
