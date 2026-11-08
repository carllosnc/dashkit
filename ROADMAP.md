# Dashkit Roadmap

This document outlines planned improvements, architectural milestones, and strategic initiatives for Dashkit.

## AI-First Ecosystem

Initiatives to make Dashkit fully optimized for AI coding assistants (Cursor, Claude Code, GitHub Copilot, Antigravity, Windsurf, Aider) and generative UI workflows.

### Structured Model Documentation
- [ ] Implement automated generation of `/public/llms.txt` and `/public/llms-full.txt` during build.
- [ ] Include core CLI instructions, design token definitions, and component API summaries in `llms.txt`.
- [ ] Consolidate full MDX component docs and usage examples into `llms-full.txt` for RAG and context-window consumption.

### Machine-Readable Registry and MCP
- [ ] Export a public `registry.json` schema on build containing component metadata, dependencies, and file manifests.
- [ ] Add `--json` output flag to CLI commands (`dashkit list --json`, `dashkit info <component> --json`).
- [ ] Develop an official Dashkit MCP (Model Context Protocol) server (`@dashkit/mcp`) with search and component scaffolding tools.

### Repository Agent Rules and Skills
- [ ] Synchronize `.agent/skills/dashkit-developer/SKILL.md` to reference `src/dashkit/` instead of legacy paths.
- [ ] Expand `AGENTS.md` and create a root `.cursorrules` with Tailwind v4 rules, BEM standards, and pure-usage patterns.
- [ ] Add automated lint checks to verify agent compliance with file structure and styling guidelines.

### Code Metadata and Zero-Ambiguity APIs
- [ ] Add JSDoc descriptions and `@example` usage blocks across all 55 component declarations for inline LLM autocomplete.
- [ ] Enforce discriminated unions on variant and color props to prevent invalid value generation by models.
- [ ] Document all component prop interfaces with explicit `@default` tags.

### Downstream Consumer AI Tooling
- [ ] Add `dashkit ai-rules` CLI command to scaffold recommended `.cursorrules` or `.github/copilot-instructions.md` into user projects.
- [ ] Publish system prompts and golden template examples for generative UI workflows (dashboards, tables, forms).

## Component Library Enhancements

- [ ] Data grid virtual scrolling for large dataset tables.
- [ ] Command palette (KBar / Command menu) component.
- [ ] Multi-select tag input with keyboard navigation.
- [ ] File upload dropzone component with progress indicators.
