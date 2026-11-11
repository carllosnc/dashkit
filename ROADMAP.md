# Dashkit Roadmap

This document outlines planned improvements, architectural milestones, and strategic initiatives for Dashkit.

## AI-First Ecosystem

Initiatives to make Dashkit fully optimized for AI coding assistants (Cursor, Claude Code, GitHub Copilot, Antigravity, Windsurf, Aider) and generative UI workflows.

### Structured Model Documentation
- [x] Implement automated generation of `/public/llms.txt` and `/public/llms-full.txt` during build.
- [x] Include core CLI instructions, design token definitions, and component API summaries in `llms.txt`.
- [x] Consolidate full MDX component docs and usage examples into `llms-full.txt` for RAG and context-window consumption.
- [x] Enrich `llms.txt` with `:root` / `.dark` editable token tables (`--ds-primary`, `--ds-bg`, `--ds-card`, `--radius`, `--ds-primary-gradient`), dynamic theme attributes (`data-primary`, `data-base`, `data-dark-bg="oled"`), and a subcomponent composition cheat sheet.

### AI-First Customization & Styling Architecture
- [x] Connect all geometric radius tokens (`--radius-sm` through `--radius-2xl`) proportionally to `--radius` in `dashkit.css`.
- [x] Derive `ds-primary-gradient` and `ds-danger-gradient` from semantic `--ds-primary` and `--ds-danger` tokens (with `--ds-primary-gradient: none` support for flat themes).
- [x] Configure `extendTailwindMerge` in `cn.ts` so standard Tailwind classes (`rounded-*`, `bg-none`) deterministically override `ds-rounded*` and `ds-*-gradient`.
- [x] Replace hardcoded neutral color scales with semantic tokens (`text-foreground`, `text-muted-foreground`) and add `data-slot` attributes across form components.
- [ ] Extend `data-slot` attributes and native HTML prop forwarding (`ComponentPropsWithoutRef` + `ref`) across all remaining overlay, navigation, and data display components.
- [x] Propagate scoped theme attributes (`data-primary`, `data-base`) to portalled overlays (`Select`, `Combobox`, `DatePicker`, `Modal`, `Popover`).

### Machine-Readable Registry, CLI and MCP
- [x] Export a public `registry.json` schema on build containing component metadata, dependencies, and file manifests.
- [x] Add `--json` output flag to CLI commands (`dashkit list --json`, `dashkit info <component> --json`).
- [x] Support installing multiple components in a single CLI call (`dashkit add <components...>`) so AI agents can scaffold an entire view in one command.
- [x] Add non-interactive TTY guards (`!process.stdin.isTTY`) to `dashkit init` and `dashkit add` so autonomous agents never hang on interactive prompts.
- [x] Automatically generate and maintain a root barrel file (`src/dashkit/index.ts`) during `dashkit add` so AI imports from `@/dashkit` always resolve alongside `@/dashkit/<Component>`.
- [ ] Develop an official Dashkit MCP (Model Context Protocol) server (`@dashkit/mcp`) with search and component scaffolding tools.

### Repository Agent Rules and Skills
- [x] Document the 3-Tier AI Customization Hierarchy (`dashkit.css` tokens → component `cva` variants → `className` & `data-slot`) in `.agents/skills/dashkit-developer/SKILL.md`, `customization.mdx`, and `llms-full.txt`.
- [x] Synchronize `.agents/skills/dashkit-developer/SKILL.md` to reference `src/dashkit/` instead of legacy paths.
- [x] Expand `AGENTS.md` and create a root `.cursorrules` with Tailwind v4 rules, CVA standards, and pure-usage patterns.
- [ ] Add automated lint checks to verify agent compliance with file structure and styling guidelines.

### Code Metadata and Zero-Ambiguity APIs
- [ ] Add JSDoc descriptions and `@example` usage blocks across all 55 component declarations for inline LLM autocomplete (explicitly distinguishing prop-driven `options={...}` components from compound `children` components).
- [ ] Enforce discriminated unions on variant and color props to prevent invalid value generation by models.
- [ ] Document all component prop interfaces with explicit `@default` tags.

### Downstream Consumer AI Tooling
- [x] Inject consumer AI rules/skills (`AGENTS.md`, `.cursorrules`, or `.agents/skills/dashkit/SKILL.md`) automatically during `dashkit init` (or via `dashkit ai-rules`) with resolved paths from `dashkit.json`, component catalog, and the 3-tier customization protocol.
- [ ] Create a dedicated Dashkit UI Builder AI Skill (`SKILL.md`) with best practices, layout recipes, component pairing rules, and design guidelines for generating high-craft UIs using Dashkit.
- [ ] Publish system prompts and golden template examples for generative UI workflows (dashboards, tables, forms).

## Component Library Enhancements

- [ ] Data grid virtual scrolling for large dataset tables.
- [ ] Command palette (KBar / Command menu) component.
- [ ] Multi-select tag input with keyboard navigation.
- [ ] File upload dropzone component with progress indicators.
