import fs from 'fs';
import path from 'path';
import { registry } from './registry';

const projectRoot = path.resolve(__dirname, '..');
const pagesDir = path.resolve(projectRoot, 'src/pages');
const publicDir = path.resolve(projectRoot, 'public');

export interface ComponentCategory {
  name: string;
  components: Array<{
    name: string;
    slug: string;
    mdxFile: string;
  }>;
}

export const CATEGORIES: ComponentCategory[] = [
  {
    name: 'Layout & Containers',
    components: [
      { name: 'Accordion', slug: 'accordion', mdxFile: 'accordion.mdx' },
      { name: 'BentoGrid', slug: 'bento-grid', mdxFile: 'bento-grid.mdx' },
      { name: 'Card', slug: 'card', mdxFile: 'card.mdx' },
      { name: 'Surface', slug: 'surface', mdxFile: 'surface.mdx' },
      { name: 'Divider', slug: 'divider', mdxFile: 'divider.mdx' },
      { name: 'ScrollArea', slug: 'scrollarea', mdxFile: 'scroll-area.mdx' },
    ],
  },
  {
    name: 'Navigation',
    components: [
      { name: 'Navbar', slug: 'navbar', mdxFile: 'navbar.mdx' },
      { name: 'NavigationMenu', slug: 'navigation-menu', mdxFile: 'navigation-menu.mdx' },
      { name: 'Sidebar', slug: 'sidebar', mdxFile: 'sidebar.mdx' },
      { name: 'Breadcrumb', slug: 'breadcrumb', mdxFile: 'breadcrumb.mdx' },
      { name: 'Tabs', slug: 'tabs', mdxFile: 'tabs.mdx' },
      { name: 'Stepper', slug: 'stepper', mdxFile: 'stepper.mdx' },
      { name: 'Pagination', slug: 'pagination', mdxFile: 'pagination.mdx' },
      { name: 'Dock', slug: 'dock', mdxFile: 'dock.mdx' },
    ],
  },
  {
    name: 'Forms & Inputs',
    components: [
      { name: 'Button', slug: 'button', mdxFile: 'button.mdx' },
      { name: 'IconButton', slug: 'iconbutton', mdxFile: 'icon-button.mdx' },
      { name: 'ButtonGroup', slug: 'buttongroup', mdxFile: 'button-group.mdx' },
      { name: 'Input', slug: 'input', mdxFile: 'input.mdx' },
      { name: 'Textarea', slug: 'textarea', mdxFile: 'textarea.mdx' },
      { name: 'Checkbox', slug: 'checkbox', mdxFile: 'checkbox.mdx' },
      { name: 'Radio', slug: 'radio', mdxFile: 'radio.mdx' },
      { name: 'Switch', slug: 'switch', mdxFile: 'switch.mdx' },
      { name: 'Select', slug: 'select', mdxFile: 'select.mdx' },
      { name: 'Combobox', slug: 'combobox', mdxFile: 'combobox.mdx' },
      { name: 'Slider', slug: 'slider', mdxFile: 'slider.mdx' },
      { name: 'DateField', slug: 'datefield', mdxFile: 'date-field.mdx' },
      { name: 'DatePicker', slug: 'datepicker', mdxFile: 'datepicker.mdx' },
      { name: 'OtpInput', slug: 'otpinput', mdxFile: 'otp-input.mdx' },
      { name: 'ColorPicker', slug: 'colorpicker', mdxFile: 'color-picker.mdx' },
      { name: 'CopyField', slug: 'copyfield', mdxFile: 'copy-field.mdx' },
      { name: 'TagInput', slug: 'taginput', mdxFile: 'tag-input.mdx' },
      { name: 'FileUpload', slug: 'fileupload', mdxFile: 'file-upload.mdx' },
    ],
  },
  {
    name: 'Feedback & Overlays',
    components: [
      { name: 'Modal', slug: 'modal', mdxFile: 'modal.mdx' },
      { name: 'Drawer', slug: 'drawer', mdxFile: 'drawer.mdx' },
      { name: 'Dropdown', slug: 'dropdown', mdxFile: 'dropdown-menu.mdx' },
      { name: 'Popover', slug: 'popover', mdxFile: 'popover.mdx' },
      { name: 'Tooltip', slug: 'tooltip', mdxFile: 'tooltip.mdx' },
      { name: 'Toast', slug: 'toast', mdxFile: 'toast.mdx' },
      { name: 'Backdrop', slug: 'backdrop', mdxFile: 'backdrop.mdx' },
      { name: 'Spinner', slug: 'spinner', mdxFile: 'spinner.mdx' },
      { name: 'ProgressBar', slug: 'progressbar', mdxFile: 'progressbar.mdx' },
      { name: 'CircularProgress', slug: 'circularprogress', mdxFile: 'circular-progress.mdx' },
      { name: 'Skeleton', slug: 'skeleton', mdxFile: 'skeleton.mdx' },
      { name: 'FloatActionMenu', slug: 'float-action-menu', mdxFile: 'float-action-menu.mdx' },
      { name: 'CommandPalette', slug: 'commandpalette', mdxFile: 'command-palette.mdx' },
    ],
  },
  {
    name: 'Data Display & Metrics',
    components: [
      { name: 'Avatar', slug: 'avatar', mdxFile: 'avatar.mdx' },
      { name: 'Badge', slug: 'badge', mdxFile: 'badge.mdx' },
      { name: 'FloatBadge', slug: 'floatbadge', mdxFile: 'badge.mdx' },
      { name: 'Chip', slug: 'chip', mdxFile: 'chip.mdx' },
      { name: 'ListTile', slug: 'listtile', mdxFile: 'list-tile.mdx' },
      { name: 'StatsCard', slug: 'statscard', mdxFile: 'stats-card.mdx' },
      { name: 'AnimateNumber', slug: 'animatenumber', mdxFile: 'animate-number.mdx' },
      { name: 'SystemLogs', slug: 'systemlogs', mdxFile: 'system-logs.mdx' },
      { name: 'Table', slug: 'table', mdxFile: 'table.mdx' },
    ],
  },
  {
    name: 'Visualization & Media',
    components: [
      { name: 'AreaChart', slug: 'areachart', mdxFile: 'area-chart.mdx' },
      { name: 'BarChart', slug: 'barchart', mdxFile: 'bar-chart.mdx' },
      { name: 'LineChart', slug: 'linechart', mdxFile: 'line-chart.mdx' },
      { name: 'PieChart', slug: 'piechart', mdxFile: 'pie-chart.mdx' },
      { name: 'ImageExpander', slug: 'imageexpander', mdxFile: 'image-expander.mdx' },
    ],
  },
];

export function stripEmojis(str: string): string {
  return str.replace(/\p{Extended_Pictographic}/gu, '');
}

export function toHeadingAnchor(heading: string): string {
  return heading
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

export function extractDescriptionFromMdx(content: string): string {
  const lines = content.split('\n');
  let foundTitle = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('# ')) {
      foundTitle = true;
      continue;
    }
    if (foundTitle && trimmed.length > 0 && !trimmed.startsWith('#') && !trimmed.startsWith('import') && !trimmed.startsWith('<')) {
      return stripEmojis(trimmed);
    }
  }
  return '';
}

export function convertPropertyDocToMarkdown(docStr: string): string {
  const titleMatch = docStr.match(/title=['"]([^'"]*)['"]/);
  const title = titleMatch ? titleMatch[1] : '';

  const propsMatch = docStr.match(/properties=\{([\s\S]*?)\}\s*(?:\/>|>[\s\S]*?<\/PropertyDoc>)/);
  if (!propsMatch) return '';

  try {
    const properties = new Function('return ' + propsMatch[1])();
    if (!Array.isArray(properties)) return '';

    const lines: string[] = [];
    if (title) {
      lines.push(`#### ${title}\n`);
    }
    lines.push('| Property | Type | Default | Description |');
    lines.push('| :--- | :--- | :--- | :--- |');

    for (const p of properties) {
      const prop = `\`${p.prop || ''}\``;
      const type = p.type ? `\`${p.type.replace(/\|/g, '\\|')}\`` : '-';
      const def = p.defaultValue && p.defaultValue !== '—' ? `\`${p.defaultValue}\`` : '-';
      const desc = (p.description || '').replace(/\n/g, ' ').replace(/\|/g, '\\|');
      lines.push(`| ${prop} | ${type} | ${def} | ${desc} |`);
    }

    return '\n' + lines.join('\n') + '\n';
  } catch {
    return '';
  }
}

function stripTopLevelExports(text: string): string {
  const exportRegex = /^export\s+(?:const|function)\s+[A-Za-z0-9_]+/gm;
  let result = '';
  let lastIndex = 0;

  while (true) {
    exportRegex.lastIndex = lastIndex;
    const match = exportRegex.exec(text);
    if (!match) {
      result += text.slice(lastIndex);
      break;
    }

    result += text.slice(lastIndex, match.index);

    let i = match.index;
    let depth = 0;
    let enteredBlock = false;
    let inString: string | null = null;
    let escaped = false;

    while (i < text.length) {
      const ch = text[i];

      if (inString) {
        if (escaped) {
          escaped = false;
        } else if (ch === '\\') {
          escaped = true;
        } else if (ch === inString) {
          inString = null;
        }
        i++;
        continue;
      }

      if (ch === '\'' || ch === '"' || ch === '`') {
        inString = ch;
        i++;
        continue;
      }

      if (ch === '{' || ch === '(' || ch === '[') {
        depth++;
        enteredBlock = true;
      } else if (ch === '}' || ch === ')' || ch === ']') {
        depth = Math.max(0, depth - 1);
        if (enteredBlock && depth === 0) {
          i++;
          if (text[i] === ';') i++;
          break;
        }
      }
      i++;
    }

    lastIndex = i;
  }

  return result;
}

function stripNotProseDivs(text: string): string {
  const openRegex = /<div\b[^>]*\bnot-prose\b[^>]*>/g;
  let result = '';
  let lastIndex = 0;

  while (true) {
    openRegex.lastIndex = lastIndex;
    const match = openRegex.exec(text);
    if (!match) {
      result += text.slice(lastIndex);
      break;
    }

    result += text.slice(lastIndex, match.index);

    let i = match.index + match[0].length;
    let depth = 1;

    while (i < text.length && depth > 0) {
      const nextOpen = text.indexOf('<div', i);
      const nextClose = text.indexOf('</div>', i);

      if (nextClose === -1) {
        i = text.length;
        break;
      }

      if (nextOpen !== -1 && nextOpen < nextClose) {
        const after = text[nextOpen + 4];
        if (after === '>' || after === ' ' || after === '\n' || after === '\r' || after === '\t') {
          depth++;
        }
        i = nextOpen + 4;
      } else {
        depth--;
        i = nextClose + 6;
      }
    }

    lastIndex = i;
  }

  return result;
}

export function cleanMdxForDocumentation(content: string): string {
  const parts = content.split(/(```[\s\S]*?```)/g);
  let removedTitleH1 = false;

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) {
      // Inside code block: preserve code, normalize paths, strip emojis
      parts[i] = stripEmojis(parts[i].replace(/@\/components\//g, '@/dashkit/'));
    } else {
      // Outside code block
      let text = parts[i];

      // Remove import statements and inline demo exports
      text = text.replace(/^import\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '');
      text = stripTopLevelExports(text);

      // Remove the top-level MDX H1 title (already emitted as `## <ComponentName>` by the generator)
      if (!removedTitleH1 && /^#\s+.+$/m.test(text)) {
        text = text.replace(/^#\s+.+$\n?/m, '');
        removedTitleH1 = true;
      }

      // Demote all remaining MDX headings by one level (## -> ###, ### -> ####, etc.)
      // so they nest under `## <ComponentName>`. Note: H3+ subsection headings (e.g.
      // `### Import`, `### Installation`, `### Props`) are component-scoped and allowed
      // to repeat across components, while H1/H2 anchors are strictly unique.
      text = text.replace(/^(#{1,5})\s+/gm, (_match, hashes: string) => `#${hashes} `);

      // Remove <Preview ...> ... </Preview> and <div className="not-prose"> ... </div>
      text = text.replace(/<Preview[\s\S]*?<\/Preview>/g, '');
      text = stripNotProseDivs(text);

      // Convert <PropertyDoc ... /> to Markdown tables
      text = text.replace(/<PropertyDoc[\s\S]*?(?:\/>|<\/PropertyDoc>)/g, (match) => {
        return convertPropertyDocToMarkdown(match);
      });

      // Remove residual JSX tags
      text = text.replace(/<\/?[A-Za-z0-9]+(?:\s+[^>]*?)?\/?>/g, '');

      // Normalize import paths and strip emojis
      text = stripEmojis(text.replace(/@\/components\//g, '@/dashkit/'));

      parts[i] = text;
    }
  }

  let result = parts.join('');
  result = result.replace(/\n{3,}/g, '\n\n');
  return result.trim();
}

export function generateLlmsTxt(): string {
  const lines: string[] = [];

  lines.push('# Dashkit UI\n');
  lines.push('> Open-source React component library built with Tailwind CSS v4. Copy-paste distribution model giving developers complete source code ownership, minimal runtime overhead, and accessible building blocks.\n');
  lines.push('Dashkit components are installed directly into your repository source code via the CLI. It uses pure Tailwind v4 tokens, CSS variables, and standard React primitives with Framer Motion for micro-interactions.\n');

  lines.push('## Quick Start\n');
  lines.push('Initialize Dashkit in your project:\n');
  lines.push('```bash');
  lines.push('bunx carllosnc/dashkit init');
  lines.push('```\n');
  lines.push('Add components individually:\n');
  lines.push('```bash');
  lines.push('bunx carllosnc/dashkit add button');
  lines.push('bunx carllosnc/dashkit add card');
  lines.push('bunx carllosnc/dashkit add sidebar');
  lines.push('```\n');

  lines.push('## CLI Reference\n');
  lines.push('- `dashkit init [-y] [-c <dir>] [--css-dir <dir>] [--ai-rules [file]] [--no-ai-rules] [-f] [--no-install] [--json]`: Configures `dashkit.json`, installs `dashkit.css` and `utils/`, injects `@import` into the main stylesheet, and generates AI assistant instructions (`AGENTS.md`).');
  lines.push('- `dashkit add <components...> [--all] [-o <dir>] [-t] [-f] [--no-install]`: Scaffolds one or more components, resolves dependencies in a single batch, and updates the root `index.ts` barrel file.');
  lines.push('- `dashkit info <component> [--json]`: Outputs component exports, dependencies, and TypeScript Props definitions.');
  lines.push('- `dashkit list [--installed] [--json]`: Lists all registry components with status.');
  lines.push('- `dashkit diff [component] [--json]`: Compares local component files against the upstream registry.');
  lines.push('- `dashkit ai-rules [-o <file>]`: Generates or updates AI coding assistant rules in `AGENTS.md` or `.cursorrules`.');
  lines.push('- `dashkit doctor`: Verifies CSS imports, dependencies, and directory configuration.\n');

  lines.push('## Design Tokens and Theming (`dashkit.css`)\n');
  lines.push('Dashkit uses a two-layer token system in `dashkit.css`: `@theme inline` maps semantic Tailwind utilities (`bg-background`, `text-foreground`, `bg-card`, `text-primary`, `border-border`) to underlying `:root` and `.dark` CSS custom properties.\n');
  lines.push('### Editable `:root` & `.dark` Variables');
  lines.push('- `--ds-bg` / `--ds-fg`: Main application background and foreground text.');
  lines.push('- `--ds-card` / `--ds-card-fg`: Card and container surfaces.');
  lines.push('- `--ds-popover` / `--ds-popover-fg` / `--ds-popover-border`: Dropdowns, modals, and floating overlays.');
  lines.push('- `--ds-primary` / `--ds-primary-fg`: Primary brand action color (`ds-primary-gradient` derives automatically from `--ds-primary`).');
  lines.push('- `--ds-secondary` / `--ds-secondary-fg`: Secondary action surface and text.');
  lines.push('- `--ds-muted` / `--ds-muted-fg`: Muted backgrounds and secondary/helper text.');
  lines.push('- `--ds-accent` / `--ds-accent-fg`: Hover and subtle selection highlights.');
  lines.push('- `--ds-border` / `--ds-border-subtle`: Default and subtle dividers/borders.');
  lines.push('- `--ds-input-bg` / `--ds-input-border` / `--ds-input-focus` / `--ds-input-fg` / `--ds-input-ring`: Form control tokens.');
  lines.push('- `--ds-danger`, `--ds-success`, `--ds-warning`, `--ds-info` (plus `*-fg` pairs): Semantic feedback states.');
  lines.push('- `--ds-chart-1` through `--ds-chart-5`: Categorical data visualization palette.');
  lines.push('- `--radius`: Master border radius (`0.75rem` default). `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, and `--radius-2xl` scale proportionally from `--radius` (set `--radius: 0rem` for sharp corners).');
  lines.push('- `--ds-pill-radius`: Pill radius for `Button`, `Switch`, `Chip`, `Slider`, and `ProgressBar` (`calc(var(--radius) * 9999)` default; automatically becomes `0rem` when `--radius: 0rem`, or set explicitly e.g. `--ds-pill-radius: var(--radius-md)`).');
  lines.push('- `--ds-border-width`: Structural border width for Cards, Buttons, Chips, and Inputs (`1px` default; set to `2px` for Neo-Brutalism).');
  lines.push('- `--ds-button-border`: Border color for filled and soft Buttons (`transparent` default; set to `var(--ds-border)` or `var(--ds-primary)` for bordered buttons).');
  lines.push('- `--ds-button-shadow`, `--ds-button-outlined-shadow`, `--ds-button-soft-shadow`, `--ds-card-shadow`, `--ds-input-shadow`: Elevation or hard Neo-Brutalist offset shadows (e.g. `3px 3px 0px 0px var(--ds-border)`) or CRT glow shadows.');
  lines.push('- `--ds-primary-gradient` / `--ds-danger-gradient`: Optional gradient overrides (set to `none` for flat buttons).\n');

  lines.push('### Dynamic Runtime Theme Attributes');
  lines.push('Apply on `<html>`, `<body>`, or any scoped container `<div>`:');
  lines.push('- `data-base`: `zinc` (default), `slate`, `gray`, `neutral`, `stone`, `taupe`, `mauve`, `mist`, `olive`.');
  lines.push('- `data-primary`: `blue` (default), `violet`, `indigo`, `emerald`, `green`, `rose`, `orange`, `amber`, `cyan`, `teal`, `fuchsia`, `red`, `yellow`, `lime`, `sky`, `purple`, `pink`.');
  lines.push('- `data-dark-bg`: `oled` (enables pure `#000000` black background when `.dark` is active).\n');

  lines.push('### 3-Tier AI Customization Protocol');
  lines.push('1. **Tier 1 (Global Theme)**: Edit `:root` / `.dark` tokens or `data-base` / `data-primary` in `dashkit.css`. Never scatter inline theme classes across pages.');
  lines.push('2. **Tier 2 (Component-Wide Style)**: Edit `cva(...)` variants directly inside `src/dashkit/<Component>/<Component>.tsx`.');
  lines.push('3. **Tier 3 (One-Off Instance Override)**: Pass `className` (merged via `cn()`, which resolves `rounded-*` and `bg-none` against `ds-rounded*` and `ds-*-gradient`) or target sub-elements via `data-slot` (`className="[&_[data-slot=label]]:uppercase [&_[data-slot=trigger]]:rounded-full"`).\n');

  const totalComponents = Object.keys(registry).length;

  lines.push('## Component API Patterns (Compound vs. Prop-Driven)\n');
  lines.push('- **Compound Components (use subcomponents via `children`)**:');
  lines.push('  - `Card`: `Card`, `CardHeader` (props: `leftIcon`, `action`), `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`');
  lines.push('  - `BentoGrid`: `BentoGrid`, `BentoGridItem`');
  lines.push('  - `Tabs`: `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`');
  lines.push('  - `Accordion`: `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent`');
  lines.push('  - `Modal`: `Modal`, `ModalHeader`, `ModalContent`, `ModalFooter`');
  lines.push('  - `Drawer`: `Drawer`, `DrawerHeader`, `DrawerContent`, `DrawerFooter`');
  lines.push('  - `Dropdown`: `Dropdown`, `DropdownTrigger`, `DropdownContent`, `DropdownItem`, `DropdownLabel`, `DropdownSeparator`');
  lines.push('  - `Popover`: `Popover`, `PopoverTrigger`, `PopoverContent`');
  lines.push('  - `Table`: `TableContainer`, `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, `TableCaption`');
  lines.push('  - `Navbar`: `Navbar`, `NavbarBrand`, `NavbarLinks`, `NavbarActions`');
  lines.push('  - `NavigationMenu`: `NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuTrigger`, `NavigationMenuContent`, `NavigationMenuLink`, `NavigationMenuViewport`');
  lines.push('  - `Sidebar`: `SidebarProvider`, `Sidebar`, `SidebarTrigger`, `SidebarContent`, `SidebarHeader`, `SidebarSection`, `SidebarItem`, `SidebarSubList`, `SidebarSubItem`, `SidebarFooter`');
  lines.push('  - `Breadcrumb`: `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbSeparator`, `BreadcrumbEllipsis`');
  lines.push('  - `Stepper`: `Stepper`, `Step`');
  lines.push('  - `Dock`: `Dock`, `DockItem`');
  lines.push('  - `ButtonGroup`: `ButtonGroup`, `ButtonGroupItem`');
  lines.push('  - `Avatar`: `Avatar`, `AvatarGroup`');
  lines.push('- **Prop-Driven Components (pass data via props, do NOT invent subcomponents)**:');
  lines.push('  - `Select`, `Combobox`: Pass `options={[{ value, label }]}`, `value`, `onChange`, `label`.');
  lines.push('  - `Input`, `Textarea`, `DatePicker`, `DateField`, `ColorPicker`, `CopyField`, `OtpInput`, `Checkbox`, `Radio`, `Switch`, `Slider`: Pass `label`, `description` / `helperText`, `error` directly as props.');
  lines.push('  - `StatsCard`: Pass `title`, `value`, `trend`, `trendLabel`, `status`, `icon`, `chart`.');
  lines.push('  - `AreaChart`, `BarChart`, `LineChart`, `PieChart`: Pass `data` and `series` props.\n');

  lines.push('## Component Catalog\n');
  lines.push(`Complete list of ${totalComponents} production-ready components. For full API signatures, props tables, and code snippets, see [llms-full.txt](llms-full.txt).\n`);

  for (const cat of CATEGORIES) {
    lines.push(`### ${cat.name}\n`);
    for (const comp of cat.components) {
      let desc = '';
      const mdxPath = path.join(pagesDir, comp.mdxFile);
      if (fs.existsSync(mdxPath)) {
        desc = extractDescriptionFromMdx(fs.readFileSync(mdxPath, 'utf8'));
      }
      const descPart = desc ? `: ${desc}` : '';
      const anchor = toHeadingAnchor(comp.name);
      lines.push(`- [${comp.name}](llms-full.txt#${anchor})${descPart}`);
    }
    lines.push('');
  }

  return lines.join('\n').trim() + '\n';
}

export function generateLlmsFullTxt(): string {
  const lines: string[] = [];

  lines.push('# Dashkit UI - Full Technical Documentation\n');
  lines.push('> Complete API reference, component specifications, CLI commands, and design system tokens for Dashkit.\n');

  lines.push('## Core Architecture & Guidelines\n');
  lines.push('- Source Ownership: Every component is scaffolded directly into your codebase (default `src/dashkit/`).');
  lines.push('- Tailwind CSS v4: All styling relies on Tailwind v4 CSS classes, CVA variants, and @variant dark.');
  lines.push('- Pure Usage: Rely on built-in component props and variants rather than ad-hoc inline class overrides.');
  lines.push('- AI Customization Hierarchy: (1) Edit `dashkit.css` tokens (`--ds-*`, `--radius`) for global theme changes; (2) Edit component `cva(...)` in `src/dashkit/<Component>/` for app-wide component changes; (3) Use `className` and `data-slot` selectors (`[&_[data-slot=label]]:...`) for one-off instance tweaks.');
  lines.push('- Block-based Layouts: Use the Card component to partition page sections and views.');
  lines.push('- Bun First: Optimized for bun and bunx package management.\n');

  lines.push('## CLI Commands\n');
  lines.push('```bash');
  lines.push('# Initialize project');
  lines.push('bunx carllosnc/dashkit init');
  lines.push('');
  lines.push('# Add component with unit tests');
  lines.push('bunx carllosnc/dashkit add <component> --tests');
  lines.push('');
  lines.push('# Inspect registry in JSON format');
  lines.push('bunx carllosnc/dashkit list --json');
  lines.push('```\n');

  const processedSlugs = new Set<string>();

  for (const cat of CATEGORIES) {
    for (const comp of cat.components) {
      if (processedSlugs.has(comp.slug)) continue;
      processedSlugs.add(comp.slug);

      lines.push(`## ${comp.name}\n`);
      lines.push(`- Category: ${cat.name}`);
      lines.push(`- Slug: \`${comp.slug}\``);
      lines.push(`- Installation: \`bunx carllosnc/dashkit add ${comp.slug}\``);

      const regEntry = registry[comp.slug];
      if (regEntry) {
        if (regEntry.dependencies && regEntry.dependencies.length > 0) {
          lines.push(`- NPM Dependencies: ${regEntry.dependencies.map(d => `\`${d}\``).join(', ')}`);
        }
        if (regEntry.registryDependencies && regEntry.registryDependencies.length > 0) {
          lines.push(`- Dashkit Dependencies: ${regEntry.registryDependencies.map(d => `\`${d}\``).join(', ')}`);
        }
      }
      lines.push('');

      const mdxPath = path.join(pagesDir, comp.mdxFile);
      if (fs.existsSync(mdxPath)) {
        const raw = fs.readFileSync(mdxPath, 'utf8');
        const cleaned = cleanMdxForDocumentation(raw);
        lines.push(cleaned);
      }
      lines.push('\n');
    }
  }

  return lines.join('\n').trim() + '\n';
}

export interface RegistryJsonEntry {
  slug: string;
  name: string;
  category: string;
  description: string;
  installCommand: string;
  files: string[];
  dependencies: string[];
  registryDependencies: string[];
  exports: string[];
  propsDefinitions: string[];
}

export interface RegistryJsonSchema {
  name: string;
  totalComponents: number;
  components: Record<string, RegistryJsonEntry>;
}

export function generateRegistryJson(): RegistryJsonSchema {
  const categoryBySlug = new Map<string, { category: string; mdxFile: string }>();
  for (const cat of CATEGORIES) {
    for (const comp of cat.components) {
      categoryBySlug.set(comp.slug, { category: cat.name, mdxFile: comp.mdxFile });
    }
  }

  const components: Record<string, RegistryJsonEntry> = {};
  const sortedKeys = Object.keys(registry).sort((a, b) => a.localeCompare(b));

  for (const key of sortedKeys) {
    const entry = registry[key];
    const catInfo = categoryBySlug.get(key);
    let description = '';
    if (catInfo) {
      const mdxPath = path.join(pagesDir, catInfo.mdxFile);
      if (fs.existsSync(mdxPath)) {
        description = extractDescriptionFromMdx(fs.readFileSync(mdxPath, 'utf8'));
      }
    }

    const nonTestFiles = entry.files.filter((f) => !/\.(test|spec)\.(ts|tsx)$/.test(f));
    const exportsList: string[] = [];
    const propsDefinitions: string[] = [];

    for (const relFile of nonTestFiles) {
      const absFile = path.resolve(projectRoot, relFile);
      if (!fs.existsSync(absFile)) continue;
      const source = fs.readFileSync(absFile, 'utf8');

      for (const match of source.matchAll(/export\s+(?:function|const)\s+([A-Za-z0-9_]+)/g)) {
        if (!exportsList.includes(match[1])) {
          exportsList.push(match[1]);
        }
      }

      for (const match of source.matchAll(/export\s+(?:interface|type)\s+[A-Za-z0-9_]*Props\b[\s\S]*?(?=\nexport\s|\nconst\s|\nfunction\s|$)/g)) {
        propsDefinitions.push(stripEmojis(match[0].trim()));
      }
    }

    components[key] = {
      slug: key,
      name: entry.name,
      category: catInfo?.category ?? 'General',
      description,
      installCommand: `bunx carllosnc/dashkit add ${key}`,
      files: nonTestFiles,
      dependencies: entry.dependencies ?? [],
      registryDependencies: entry.registryDependencies ?? [],
      exports: exportsList,
      propsDefinitions,
    };
  }

  return {
    name: 'Dashkit UI Registry',
    totalComponents: sortedKeys.length,
    components,
  };
}

export function buildLlmsFiles(): { llmsPath: string; llmsFullPath: string; registryJsonPath: string } {
  fs.mkdirSync(publicDir, { recursive: true });

  const llmsContent = generateLlmsTxt();
  const llmsFullPathContent = generateLlmsFullTxt();
  const registrySchema = generateRegistryJson();

  const llmsPath = path.join(publicDir, 'llms.txt');
  const llmsFullPath = path.join(publicDir, 'llms-full.txt');
  const registryJsonPath = path.join(publicDir, 'registry.json');

  fs.writeFileSync(llmsPath, llmsContent, 'utf8');
  fs.writeFileSync(llmsFullPath, llmsFullPathContent, 'utf8');
  fs.writeFileSync(registryJsonPath, JSON.stringify(registrySchema, null, 2) + '\n', 'utf8');

  return { llmsPath, llmsFullPath, registryJsonPath };
}

// Run directly if invoked via CLI
const isDirectRun = process.argv[1] && (
  process.argv[1].endsWith('generate-llms.ts') ||
  process.argv[1].endsWith('generate-llms') ||
  process.argv[1].includes('generate-llms')
);

if (isDirectRun) {
  const result = buildLlmsFiles();
  console.log(`Generated ${result.llmsPath}`);
  console.log(`Generated ${result.llmsFullPath}`);
}
