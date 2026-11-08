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

export function cleanMdxForDocumentation(content: string): string {
  const parts = content.split(/(```[\s\S]*?```)/g);

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) {
      // Inside code block: preserve code, normalize paths, strip emojis
      parts[i] = stripEmojis(parts[i].replace(/@\/components\//g, '@/dashkit/'));
    } else {
      // Outside code block
      let text = parts[i];

      // Remove import statements
      text = text.replace(/^import\s+[\s\S]*?from\s+['"][^'"]+['"];?\s*$/gm, '');

      // Remove <Preview ...> ... </Preview>
      text = text.replace(/<Preview[\s\S]*?<\/Preview>/g, '');

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
  lines.push('- `dashkit init [-y]`: Configures dashkit.json and injects design token stylesheet (dashkit.css).');
  lines.push('- `dashkit add <component> [-o <dir>] [-t] [-f] [--no-install]`: Scaffolds component and resolves dependencies.');
  lines.push('- `dashkit list [--installed] [--json]`: Lists all registry components with status.');
  lines.push('- `dashkit doctor`: Verifies CSS imports, dependencies, and directory configuration.\n');

  lines.push('## Design Tokens and Theming\n');
  lines.push('Dashkit relies on CSS custom properties configured in `dashkit.css`:');
  lines.push('- `--color-primary`: Main theme accent color.');
  lines.push('- `--color-background`: Light (#ffffff) and dark (#09090b) page background.');
  lines.push('- `--color-foreground`: High-contrast body text.');
  lines.push('- `--color-muted`: Secondary text and subtle borders.');
  lines.push('- `--color-border`: Standard card and input border.');
  lines.push('- `--color-card`: Card and surface backgrounds.');
  lines.push('- `--radius-*`: Tokenized border radii (sm, md, lg, full).\n');

  lines.push('## Component Catalog\n');
  lines.push('Complete list of 55 production-ready components. For full API signatures, props tables, and code snippets, see [llms-full.txt](llms-full.txt).\n');

  for (const cat of CATEGORIES) {
    lines.push(`### ${cat.name}\n`);
    for (const comp of cat.components) {
      let desc = '';
      const mdxPath = path.join(pagesDir, comp.mdxFile);
      if (fs.existsSync(mdxPath)) {
        desc = extractDescriptionFromMdx(fs.readFileSync(mdxPath, 'utf8'));
      }
      const descPart = desc ? `: ${desc}` : '';
      lines.push(`- [${comp.name}](llms-full.txt#${comp.slug})${descPart}`);
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
  lines.push('- Tailwind CSS v4: All styling relies on Tailwind v4 CSS classes, BEM naming, and @variant dark.');
  lines.push('- Pure Usage: Rely on built-in component props and variants rather than ad-hoc inline class overrides.');
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

  lines.push('## Components\n');

  const processedSlugs = new Set<string>();

  for (const cat of CATEGORIES) {
    lines.push(`### Category: ${cat.name}\n`);

    for (const comp of cat.components) {
      if (processedSlugs.has(comp.slug)) continue;
      processedSlugs.add(comp.slug);

      lines.push(`## ${comp.name}\n`);
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

export function buildLlmsFiles(): { llmsPath: string; llmsFullPath: string } {
  fs.mkdirSync(publicDir, { recursive: true });

  const llmsContent = generateLlmsTxt();
  const llmsFullPathContent = generateLlmsFullTxt();

  const llmsPath = path.join(publicDir, 'llms.txt');
  const llmsFullPath = path.join(publicDir, 'llms-full.txt');

  fs.writeFileSync(llmsPath, llmsContent, 'utf8');
  fs.writeFileSync(llmsFullPath, llmsFullPathContent, 'utf8');

  return { llmsPath, llmsFullPath };
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
