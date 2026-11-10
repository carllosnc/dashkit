import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import enquirer from 'enquirer';
import { registry, type ComponentConfig } from './registry';
import { runDoctor, getPackageManager, getMissingDependencies } from './doctor';
import {
  getProjectInfo,
  getFolderStructure,
  saveConfig,
  loadConfig,
  findMainCssFile,
  getRelativeCssImport,
  injectDashkitCss
} from './utils';
import { logger } from './logger';

interface Enquirer {
  MultiSelect: {
    new (options: {
      name: string;
      message: string;
      choices: Array<{ name: string; message: string; value: string }>;
      symbols?: {
        indicator?: string | ((state: unknown, choice: { enabled: boolean }) => string);
        pointer?: string;
      };
    }): { run(): Promise<string[]> };
  };
  Input: {
    new (options: {
      name: string;
      message: string;
      initial?: string;
    }): { run(): Promise<string> };
  };
  Confirm: {
    new (options: {
      name: string;
      message: string;
      initial?: boolean;
    }): { run(): Promise<boolean> };
  };
}

const { MultiSelect, Input, Confirm } = enquirer as unknown as Enquirer;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');

export interface CliOptions {
  output: string;
  install: boolean;
  force?: boolean;
  tests?: boolean;
}

async function installDashkitCss(targetPath: string, sourcePath: string) {
  if (await fs.pathExists(targetPath)) return true;

  try {
    if (await fs.pathExists(sourcePath)) {
      await fs.copy(sourcePath, targetPath);
      logger.success('dashkit.css installed.');
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

// Components import shared helpers from ../utils (cn.ts, scrollLock.ts, ...).
// Copy every non-test util so copied components always resolve their imports;
// existing user files are never overwritten unless force is set.
async function copyUtilsFiles(targetUtilsDir: string, force = false): Promise<string[]> {
  const sourceUtilsDir = path.resolve(projectRoot, 'src', 'dashkit', 'utils');
  if (!(await fs.pathExists(sourceUtilsDir))) return [];

  const utilFiles = (await fs.readdir(sourceUtilsDir)).filter(
    (file) => /\.(ts|tsx)$/.test(file) && !/\.(test|spec)\.(ts|tsx)$/.test(file)
  );

  const copied: string[] = [];
  await fs.ensureDir(targetUtilsDir);

  for (const file of utilFiles) {
    const targetPath = path.join(targetUtilsDir, file);
    if (!force && (await fs.pathExists(targetPath))) continue;
    await fs.copy(path.join(sourceUtilsDir, file), targetPath);
    copied.push(file);
  }

  return copied;
}

interface CopyResult {
  copied: number;
  kept: string[];
}

async function copyComponentFiles(
  component: ComponentConfig,
  targetDir: string,
  force = false,
  includeTests = false
): Promise<CopyResult> {
  // If includeTests is false, exclude test files (*.test.tsx, *.spec.tsx)
  const candidateFiles = includeTests
    ? component.files
    : component.files.filter((file) => !/\.(test|spec)\.(ts|tsx)$/.test(file));

  // Resolve and validate every source first, then detect conflicts before writing
  // anything, so existing user files are never overwritten silently.
  const files: Array<{ sourcePath: string; targetPath: string; exists: boolean }> = [];

  for (const file of candidateFiles) {
    const sourcePath = path.resolve(projectRoot, file);
    const targetPath = path.join(targetDir, path.basename(file));

    if (!(await fs.pathExists(sourcePath))) {
      throw new Error(`File not found: ${sourcePath}`);
    }
    files.push({ sourcePath, targetPath, exists: await fs.pathExists(targetPath) });
  }

  const conflicts = files.filter(file => file.exists);
  let overwrite = force;

  if (conflicts.length > 0 && !overwrite) {
    if (process.stdin.isTTY && process.stdout.isTTY) {
      try {
        const prompt = new Confirm({
          name: 'overwrite',
          message: `${conflicts.length} file(s) for ${component.name} already exist. Overwrite?`,
          initial: false
        });
        overwrite = await prompt.run();
      } catch {
        // Cancelled (e.g. Ctrl+C): treat as "no" so user files stay untouched
        overwrite = false;
      }
    }
    // Non-interactive sessions never overwrite; existing files are kept below
  }

  const result: CopyResult = { copied: 0, kept: [] };

  for (const file of files) {
    if (file.exists && !overwrite) {
      result.kept.push(path.basename(file.targetPath));
      continue;
    }
    await fs.copy(file.sourcePath, file.targetPath);
    result.copied += 1;
  }

  if (result.kept.length > 0) {
    logger.warning(
      `Kept existing file(s) for ${component.name}: ${result.kept.join(', ')} (use --force to overwrite).`
    );
  }

  return result;
}

async function installDependencies(deps: string[]) {
  const missingDeps = await getMissingDependencies(deps);
  if (missingDeps.length === 0) return;

  const pm = getPackageManager();
  const installCmd = pm === 'npm' ? 'install' : 'add';
  const command = `${pm} ${installCmd} ${missingDeps.join(' ')}`;

  const spinner = ora(`Installing dependencies...`).start();
  try {
    execSync(command, { stdio: 'inherit', cwd: process.cwd() });
    spinner.stop();
    logger.success('Dependencies installed.');
  } catch {
    spinner.stop();
    logger.error('Failed to install dependencies. Please run:');
    logger.bold(`  ${command}`);
    process.exitCode = 1;
  }
}

async function addComponent(
  componentName: string,
  options: CliOptions,
  isDependency = false,
  allDeps = new Set<string>(),
  visited = new Set<string>()
) {
  const registryKey = componentName.toLowerCase();
  const component = registry[registryKey];
  if (!component) {
    logger.error(`Component "${componentName}" not found in registry.`);
    if (!isDependency) process.exit(1);
    process.exitCode = 1;
    return;
  }

  // Guard against cycles and diamond dependencies in registryDependencies —
  // without this a self/cycle reference would recurse until the stack blows.
  if (visited.has(registryKey)) return;
  visited.add(registryKey);

  const spinner = ora(isDependency ? `Adding dependency ${chalk.bold(component.name)}...` : `Adding ${chalk.bold(component.name)}...`).start();

  try {
    const targetDir = path.resolve(process.cwd(), options.output, component.name);
    await fs.ensureDir(targetDir);

    await copyComponentFiles(component, targetDir, options.force, options.tests);

    if (component.dependencies) {
      component.dependencies.forEach((dep: string) => allDeps.add(dep));
    }

    if (component.registryDependencies) {
      for (const depName of component.registryDependencies) {
        await addComponent(depName, options, true, allDeps, visited);
      }
    }

    if (!isDependency) {
      spinner.stop();
      logger.success(`Component ${chalk.bold(component.name)} added.`);

      if (options.install) {
        await installDependencies(Array.from(allDeps));
      } else {
        const missingDeps = await getMissingDependencies(Array.from(allDeps));
        if (missingDeps.length > 0) {
          const pm = getPackageManager();
          const installCmd = pm === 'npm' ? 'install' : 'add';
          logger.info(`Install missing dependencies: ${chalk.bold(`${pm} ${installCmd} ${missingDeps.join(' ')}`)}`);
        }
      }
    } else {
      spinner.stop();
    }
  } catch (error) {
    spinner.stop();
    logger.error(`Error adding ${isDependency ? 'dependency ' : ''}${component.name}`);
    if (error instanceof Error) logger.error(error.message);
    process.exitCode = 1;
  }
}

async function promptComponentSelection(): Promise<string[]> {
  const choices = Object.keys(registry).map(key => ({
    name: key,
    message: registry[key].name,
    value: key
  })).sort((a, b) => a.message.localeCompare(b.message));

  try {
    const prompt = new MultiSelect({
      name: 'components',
      message: 'Select components to add (Space to select, Enter to confirm):',
      choices,
      symbols: {
        indicator: (_: unknown, choice: { enabled: boolean; }) => {
          return choice.enabled ? '[●]' : '[ ]';
        },
      }
    });

    return await prompt.run();
  } catch {
    process.exit(0);
  }
}

async function updateRootBarrelFile(baseDir: string) {
  if (!(await fs.pathExists(baseDir))) return;

  const entries = await fs.readdir(baseDir, { withFileTypes: true });
  const componentDirs: string[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name === 'utils') continue;
    const indexFile = path.join(baseDir, entry.name, 'index.ts');
    if (await fs.pathExists(indexFile)) {
      componentDirs.push(entry.name);
    }
  }

  if (componentDirs.length === 0) return;
  componentDirs.sort((a, b) => a.localeCompare(b));

  const barrelPath = path.join(baseDir, 'index.ts');
  const existingLines: string[] = [];

  if (await fs.pathExists(barrelPath)) {
    const current = await fs.readFile(barrelPath, 'utf8');
    for (const line of current.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (trimmed.length > 0) {
        existingLines.push(trimmed);
      }
    }
  }

  const exportSet = new Set<string>(existingLines);
  for (const dir of componentDirs) {
    exportSet.add(`export * from './${dir}';`);
  }

  const sortedExports = Array.from(exportSet).sort((a, b) => a.localeCompare(b));
  await fs.writeFile(barrelPath, sortedExports.join('\n') + '\n', 'utf8');
}

export async function handleAdd(
  componentNameArg: string | string[] | undefined,
  options: CliOptions
) {
  const info = await getProjectInfo();
  const defaults = getFolderStructure(info);
  const config = await loadConfig();

  // Smart default output detection
  if (!options.output) {
    options.output = config?.componentsDir ?? defaults.components;
  }

  // Components import ../utils/cn (and overlays import ../utils/scrollLock) and
  // their CSS relies on dashkit.css tokens; emit/check these prerequisites here
  // (previously only `init` did, and only cn.ts).
  const targetUtilsDir = path.resolve(process.cwd(), options.output, 'utils');
  const copiedUtils = await copyUtilsFiles(targetUtilsDir, options.force);
  if (copiedUtils.length > 0) {
    logger.success(`Installed utils/${copiedUtils.join(', utils/')}.`);
  }

  const cssDir = config?.cssDir ?? defaults.css;
  const cssPath = path.resolve(process.cwd(), cssDir, 'dashkit.css');
  if (!(await fs.pathExists(cssPath))) {
    logger.warning(`dashkit.css not found at ${cssPath} — run \`dashkit init\` to install it (component styles need its tokens).`);
  }

  const normalizedArgs = Array.isArray(componentNameArg)
    ? componentNameArg
    : componentNameArg
      ? [componentNameArg]
      : [];

  let componentNames: string[];
  if (normalizedArgs.length > 0) {
    componentNames = normalizedArgs;
  } else if (!process.stdin.isTTY || !process.stdout.isTTY) {
    logger.error('No component specified in non-interactive mode. Usage: dashkit add <components...>');
    process.exitCode = 1;
    return;
  } else {
    componentNames = await promptComponentSelection();
  }

  if (componentNames.length > 0) {
    // Shared across the whole run so multi-selection doesn't re-copy shared deps
    const visited = new Set<string>();
    for (const name of componentNames) {
      await addComponent(name, options, false, new Set<string>(), visited);
    }
    const baseDir = path.resolve(process.cwd(), options.output);
    await updateRootBarrelFile(baseDir);
  }
}

export interface ListOptions {
  installed?: boolean;
  json?: boolean;
}

export async function handleList(options: ListOptions = {}) {
  const info = await getProjectInfo();
  const defaults = getFolderStructure(info);
  const config = await loadConfig();
  const componentsDir = config?.componentsDir ?? defaults.components;
  const targetBase = path.resolve(process.cwd(), componentsDir);

  const keys = Object.keys(registry).sort((a, b) =>
    registry[a].name.localeCompare(registry[b].name)
  );

  const entries = keys.map((key) => {
    const comp = registry[key];
    const compPath = path.join(targetBase, comp.name);
    const isInstalled = fs.existsSync(compPath);
    return {
      key,
      name: comp.name,
      installed: isInstalled,
      dependencies: comp.dependencies ?? [],
      registryDependencies: comp.registryDependencies ?? []
    };
  });

  const filtered = options.installed ? entries.filter((e) => e.installed) : entries;

  if (options.json) {
    console.log(JSON.stringify(filtered, null, 2));
    return;
  }

  const installedCount = entries.filter((e) => e.installed).length;
  logger.bold('\nDashkit Components Registry\n');
  logger.info(`Components directory: ${chalk.bold(componentsDir)}`);
  logger.info(`Total: ${chalk.bold(String(entries.length))} components (${chalk.green(`${installedCount} installed`)})\n`);

  for (const item of filtered) {
    const statusBadge = item.installed
      ? chalk.green('[installed]')
      : chalk.dim('[available]');
    const nameStr = chalk.bold(item.name.padEnd(20));
    const regDeps = item.registryDependencies.length > 0
      ? chalk.cyan(` (requires: ${item.registryDependencies.join(', ')})`)
      : '';
    console.log(`  ${statusBadge} ${nameStr}${regDeps}`);
  }

  console.log();
  if (!options.installed) {
    logger.info(`Tip: Run ${chalk.bold('dashkit add <component>')} to install a component.`);
  }
}

export interface InitOptions {
  yes?: boolean;
}

export async function handleInit(options: InitOptions = {}) {
  const info = await getProjectInfo();
  const defaults = getFolderStructure(info);
  const mainCssFile = await findMainCssFile();
  let spinner: ReturnType<typeof ora> | undefined;

  try {
    let componentsDir: string;
    let cssDirRaw: string;
    let shouldSave: boolean;
    let shouldInjectCss: boolean;

    const isNonInteractive = Boolean(options.yes) || !process.stdin.isTTY || !process.stdout.isTTY;

    if (isNonInteractive) {
      componentsDir = defaults.components;
      cssDirRaw = defaults.css || '.';
      shouldSave = true;
      shouldInjectCss = Boolean(mainCssFile);
    } else {
      const componentsDirPrompt = new Input({
        name: 'componentsDir',
        message: 'Where would you like to store your components?',
        initial: defaults.components
      });
      componentsDir = await componentsDirPrompt.run();

      const cssDirPrompt = new Input({
        name: 'cssDir',
        message: 'Where would you like to store your dashkit.css?',
        initial: defaults.css || '.'
      });
      cssDirRaw = await cssDirPrompt.run();

      if (mainCssFile) {
        const relMain = path.relative(process.cwd(), mainCssFile).replace(/\\/g, '/');
        const confirmInject = new Confirm({
          name: 'injectCss',
          message: `Import dashkit.css into ${relMain}?`,
          initial: true
        });
        shouldInjectCss = await confirmInject.run();
      } else {
        shouldInjectCss = false;
      }

      const confirmPrompt = new Confirm({
        name: 'save',
        message: 'Save these settings to dashkit.json?',
        initial: true
      });
      shouldSave = await confirmPrompt.run();
    }

    if (!componentsDir.replace(/\\/g, '/').split('/').pop()?.includes('dashkit')) {
      componentsDir = path.join(componentsDir, 'dashkit').replace(/\\/g, '/');
    }
    const cssDir = cssDirRaw === '.' ? '' : cssDirRaw;

    spinner = ora('Initializing Dashkit...').start();

    // Ensure CSS installation
    const targetPath = path.resolve(process.cwd(), cssDir, 'dashkit.css');
    const sourcePath = path.resolve(projectRoot, 'src', 'dashkit', 'dashkit.css');
    await installDashkitCss(targetPath, sourcePath);

    // Create dashkit and utils folders
    const fullComponentsDir = path.resolve(process.cwd(), componentsDir);
    const utilsDir = path.join(fullComponentsDir, 'utils');
    await fs.ensureDir(utilsDir);

    // Copy shared utils (cn.ts, scrollLock.ts, ...) so every component's
    // ../utils imports resolve in the user's project.
    await copyUtilsFiles(utilsDir);

    let injectedCssFile: string | null = null;
    if (shouldInjectCss && mainCssFile) {
      const injectResult = await injectDashkitCss(mainCssFile, targetPath);
      if (injectResult.updated) {
        injectedCssFile = path.relative(process.cwd(), mainCssFile).replace(/\\/g, '/');
      }
    }

    if (shouldSave) {
      await saveConfig({ componentsDir, cssDir });
    }

    spinner.stop();
    logger.success('Dashkit initialized successfully.');

    logger.bold('\nInitialization Summary:');
    logger.info(`  Components Dir: ${chalk.bold(componentsDir)}`);
    logger.info(`  CSS Dir:        ${chalk.bold(cssDir || 'root')}`);
    if (injectedCssFile) {
      logger.info(`  Main CSS:       ${chalk.bold(injectedCssFile)} (imported dashkit.css)`);
    } else if (mainCssFile) {
      const relMain = path.relative(process.cwd(), mainCssFile).replace(/\\/g, '/');
      const relImport = getRelativeCssImport(mainCssFile, targetPath);
      logger.info(`  Main CSS:       ${chalk.bold(relMain)} (add: @import "${relImport}";)`);
    }
    if (shouldSave) logger.info('  Configuration:  dashkit.json created');

  } catch (error) {
    if (error instanceof Error && error.message === 'cancelled') {
       process.exit(0);
    }
    logger.error('Failed to initialize Dashkit.');
    if (error instanceof Error) logger.error(error.message);
    process.exitCode = 1;
  } finally {
    // Always stop the spinner, even when a step throws — otherwise ora's
    // render interval keeps the process alive forever.
    spinner?.stop();
  }
}

export interface InfoOptions {
  json?: boolean;
}

export async function handleInfo(componentQuery: string, options: InfoOptions = {}) {
  const query = componentQuery.toLowerCase();
  const matchedKey = Object.keys(registry).find(
    (k) => k === query || registry[k].name.toLowerCase() === query
  );

  if (!matchedKey) {
    logger.error(`Component "${componentQuery}" not found in registry.`);
    process.exitCode = 1;
    return;
  }

  const comp = registry[matchedKey];
  const info = await getProjectInfo();
  const defaults = getFolderStructure(info);
  const config = await loadConfig();
  const componentsDir = config?.componentsDir ?? defaults.components;
  const compPath = path.resolve(process.cwd(), componentsDir, comp.name);
  const installed = await fs.pathExists(compPath);

  const nonTestFiles = comp.files.filter((f) => !/\.(test|spec)\.(ts|tsx)$/.test(f));
  const exportsList: string[] = [];
  const typeBlocks: string[] = [];

  for (const relFile of nonTestFiles) {
    const absFile = path.resolve(projectRoot, relFile);
    if (!(await fs.pathExists(absFile))) continue;
    const source = await fs.readFile(absFile, 'utf8');

    for (const match of source.matchAll(/export\s+(?:function|const)\s+([A-Za-z0-9_]+)/g)) {
      if (!exportsList.includes(match[1])) {
        exportsList.push(match[1]);
      }
    }

    for (const match of source.matchAll(/export\s+(?:interface|type)\s+[A-Za-z0-9_]*Props\b[\s\S]*?(?=\nexport\s|\nconst\s|\nfunction\s|$)/g)) {
      typeBlocks.push(match[0].trim());
    }
  }

  const payload = {
    key: matchedKey,
    name: comp.name,
    installed,
    installCommand: `bunx carllosnc/dashkit add ${matchedKey}`,
    files: nonTestFiles,
    dependencies: comp.dependencies ?? [],
    registryDependencies: comp.registryDependencies ?? [],
    exports: exportsList,
    propsDefinitions: typeBlocks,
  };

  if (options.json) {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  logger.bold(`\n${comp.name} (${matchedKey})\n`);
  logger.info(`Status:                ${installed ? chalk.green('installed') : chalk.dim('available')}`);
  logger.info(`Install:               ${chalk.bold(payload.installCommand)}`);
  logger.info(`Exports:               ${exportsList.join(', ') || comp.name}`);
  logger.info(`NPM Dependencies:      ${payload.dependencies.join(', ') || 'none'}`);
  logger.info(`Registry Dependencies: ${payload.registryDependencies.join(', ') || 'none'}`);

  if (typeBlocks.length > 0) {
    logger.bold('\nProps Definitions:');
    for (const block of typeBlocks) {
      console.log(`\n${block}`);
    }
  }
  console.log();
}

export interface AiRulesOptions {
  output?: string;
}

export async function handleAiRules(options: AiRulesOptions = {}) {
  const info = await getProjectInfo();
  const defaults = getFolderStructure(info);
  const config = await loadConfig();
  const componentsDir = (config?.componentsDir ?? defaults.components).replace(/\\/g, '/');
  const cssDir = (config?.cssDir ?? (defaults.css || '.')).replace(/\\/g, '/');
  const cssFile = cssDir === '.' || cssDir === '' ? 'dashkit.css' : `${cssDir}/dashkit.css`;
  const targetFile = options.output || 'AGENTS.md';
  const targetPath = path.resolve(process.cwd(), targetFile);

  const allSlugs = Object.keys(registry).sort((a, b) => a.localeCompare(b));

  const rulesBlock = [
    '<!-- dashkit:ai-rules:start -->',
    '## Dashkit UI — AI Assistant Guidelines',
    '',
    `- **Components Directory**: \`${componentsDir}\` (import from \`${componentsDir}/<Component>\` or barrel \`${componentsDir}\`)`,
    `- **Theme & Tokens File**: \`${cssFile}\``,
    `- **Install Components**: \`bunx carllosnc/dashkit add <components...>\``,
    `- **Inspect Component Props**: \`bunx carllosnc/dashkit info <component> --json\``,
    `- **Available Components (${allSlugs.length})**: ${allSlugs.map((s) => `\`${s}\``).join(', ')}`,
    '',
    '### 3-Tier AI Customization Protocol',
    `1. **Global Theme (\`${cssFile}\`)**: Edit \`:root\` / \`.dark\` variables (\`--ds-primary\`, \`--ds-bg\`, \`--ds-card\`, \`--radius\`, \`--ds-primary-gradient\`) or set \`data-primary\` / \`data-base\` attributes. Never scatter inline theme classes across pages.`,
    `2. **Component Variants (\`${componentsDir}/<Component>/<Component>.tsx\`)**: Edit \`cva(...)\` variants directly inside the component file when changing a component across the app.`,
    '3. **Instance Overrides (`className` & `data-slot`)**: Use `className` (merged via `cn()`) or `data-slot` selectors (`className="[&_[data-slot=label]]:uppercase"`) for one-off tweaks.',
    '',
    '### Component API Patterns',
    '- **Compound (`children`)**: `Card` (`CardHeader`, `CardContent`, `CardFooter`), `Tabs` (`TabsList`, `TabsTrigger`, `TabsContent`), `Accordion` (`AccordionItem`, `AccordionTrigger`, `AccordionContent`), `Modal` (`ModalHeader`, `ModalContent`, `ModalFooter`), `Drawer` (`DrawerHeader`, `DrawerContent`, `DrawerFooter`), `Dropdown`, `Popover`, `Table`, `Navbar`, `Breadcrumb`, `Stepper`.',
    '- **Prop-Driven (`options` / props)**: `Select` & `Combobox` use `options={[{ value, label }]}`; `Input`, `Textarea`, `DatePicker`, `DateField`, `ColorPicker`, `CopyField`, `OtpInput`, `Checkbox`, `Radio`, `Switch`, `Slider` take `label`, `description`/`helperText`, `error` as props; `StatsCard` takes `title`, `value`, `trend`, `status`, `chart`.',
    '<!-- dashkit:ai-rules:end -->',
  ].join('\n');

  if (await fs.pathExists(targetPath)) {
    const existing = await fs.readFile(targetPath, 'utf8');
    const markerRegex = /<!-- dashkit:ai-rules:start -->[\s\S]*?<!-- dashkit:ai-rules:end -->/;
    const updated = markerRegex.test(existing)
      ? existing.replace(markerRegex, rulesBlock)
      : `${existing.trimEnd()}\n\n${rulesBlock}\n`;
    await fs.writeFile(targetPath, updated, 'utf8');
  } else {
    await fs.ensureDir(path.dirname(targetPath));
    await fs.writeFile(targetPath, `# Project AI Instructions\n\n${rulesBlock}\n`, 'utf8');
  }

  logger.success(`AI rules written to ${targetFile}.`);
}

export async function handleDoctor() {
  await runDoctor();
}
