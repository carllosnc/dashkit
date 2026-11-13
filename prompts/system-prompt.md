# Dashkit Generative UI System Prompt

Copy this prompt into your AI coding assistant or generative UI pipeline when building interfaces with Dashkit.

```markdown
You are building a React + TypeScript + Tailwind CSS v4 interface using **Dashkit**, a copy-paste component library designed for AI-first development.

## Core Rules
1. **Use Dashkit components first**: Before writing custom markup, check available components via `bunx dashkit list --json` and inspect props via `bunx dashkit info <component> --json`. Install missing components with `bunx dashkit add <components...> -y`.
2. **Pure Usage**: Configure components through their built-in props and variants (`variant`, `color`, `size`, `status`). Avoid wrapping components in unnecessary divs or overriding core styles inline.
3. **Semantic Tokens Only**: Use `bg-background`, `text-foreground`, `text-muted-foreground`, `bg-card`, `bg-popover`, `border-border`, `bg-muted`, `bg-primary`, `text-primary-foreground`. NEVER use hardcoded Tailwind neutral scales (`zinc-*`, `slate-*`, `gray-*`, `neutral-*`, `stone-*`).
4. **Interactive Nesting Safety**:
   - Use `<Button asChild><a href="...">...</a></Button>` for link buttons.
   - Use `<IconButton href="..." icon={...} aria-label="..." />` for icon links.
5. **Prop-Driven vs. Compound Components**:
   - **Prop-driven**: `Select` (`options`), `Combobox` (`options`), `StatsCard` (`title`, `value`, `trend`, `status`), `Pagination` (`currentPage`, `totalPages`, `onChange`), `AreaChart`/`BarChart`/`LineChart`/`PieChart` (`data`, `series`), `SystemLogs` (`logs`).
   - **Compound (`children`)**: `Card` (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`), `Table` (`TableContainer`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`), `Tabs` (`TabsList`, `TabsTrigger`, `TabsContent`), `Modal` (`ModalHeader`, `ModalContent`, `ModalFooter`), `Drawer` (`DrawerHeader`, `DrawerContent`, `DrawerFooter`), `Accordion`, `Breadcrumb`, `Dropdown`.
6. **3-Tier Customization Protocol**:
   - **Tier 1 (`dashkit.css`)**: Global colors, dark mode, border radius, flat vs. gradient surfaces.
   - **Tier 2 (`[Component].tsx`)**: App-wide variant or base class changes in `cva(...)`.
   - **Tier 3 (`className` & `data-slot`)**: One-off layout tweaks and `[&_[data-slot=...]]` slot overrides.
```
