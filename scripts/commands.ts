import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import enquirer from 'enquirer';
import { registry, type ComponentConfig } from './registry';
import { runDoctor, getPackageManager, getMissingDependencies } from './doctor';
import { getProjectInfo, getFolderStructure, saveConfig, loadConfig } from './utils';
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

interface CopyResult {
  copied: number;
  kept: string[];
}

async function copyComponentFiles(
  component: ComponentConfig,
  targetDir: string,
  force = false
): Promise<CopyResult> {
  // Resolve and validate every source first, then detect conflicts before writing
  // anything, so existing user files are never overwritten silently.
  const files: Array<{ sourcePath: string; targetPath: string; exists: boolean }> = [];

  for (const file of component.files) {
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
  allDeps = new Set<string>()
) {
  const component = registry[componentName.toLowerCase()];
  if (!component) {
    logger.error(`Component "${componentName}" not found in registry.`);
    if (!isDependency) process.exit(1);
    process.exitCode = 1;
    return;
  }

  const spinner = ora(isDependency ? `Adding dependency ${chalk.bold(component.name)}...` : `Adding ${chalk.bold(component.name)}...`).start();

  try {
    const targetDir = path.resolve(process.cwd(), options.output, component.name);
    await fs.ensureDir(targetDir);

    await copyComponentFiles(component, targetDir, options.force);

    if (component.dependencies) {
      component.dependencies.forEach((dep: string) => allDeps.add(dep));
    }

    if (component.registryDependencies) {
      for (const depName of component.registryDependencies) {
        await addComponent(depName, options, true, allDeps);
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

export async function handleAdd(componentName: string | undefined, options: CliOptions) {
  // Smart default output detection
  if (!options.output) {
    const config = await loadConfig();
    if (config?.componentsDir) {
      options.output = config.componentsDir;
    } else {
      const info = await getProjectInfo();
      options.output = getFolderStructure(info).components;
    }
  }

  const componentNames = componentName ? [componentName] : await promptComponentSelection();

  if (componentNames.length > 0) {
    for (const name of componentNames) {
      await addComponent(name, options);
    }
  }
}

export async function handleInit() {
  const info = await getProjectInfo();
  const defaults = getFolderStructure(info);
  let spinner: ReturnType<typeof ora> | undefined;

  try {
    const componentsDirPrompt = new Input({
      name: 'componentsDir',
      message: 'Where would you like to store your components?',
      initial: defaults.components
    });
    let componentsDir = await componentsDirPrompt.run();

    if (!componentsDir.replace(/\\/g, '/').split('/').pop()?.includes('dashkit')) {
      componentsDir = path.join(componentsDir, 'dashkit').replace(/\\/g, '/');
    }

    const cssDirPrompt = new Input({
      name: 'cssDir',
      message: 'Where would you like to store your dashkit.css?',
      initial: defaults.css || '.'
    });
    const cssDirRaw = await cssDirPrompt.run();
    const cssDir = cssDirRaw === '.' ? '' : cssDirRaw;

    const confirmPrompt = new Confirm({
      name: 'save',
      message: 'Save these settings to dashkit.json?',
      initial: true
    });
    const shouldSave = await confirmPrompt.run();

    spinner = ora('Initializing Dashkit...').start();

    // Ensure CSS installation
    const targetPath = path.resolve(process.cwd(), cssDir, 'dashkit.css');
    const sourcePath = path.resolve(projectRoot, 'src', 'dashkit', 'dashkit.css');
    await installDashkitCss(targetPath, sourcePath);

    // Create dashkit and utils folders
    const fullComponentsDir = path.resolve(process.cwd(), componentsDir);
    const utilsDir = path.join(fullComponentsDir, 'utils');
    await fs.ensureDir(utilsDir);

    // Default to copying cn.ts utility
    const targetCnPath = path.join(utilsDir, 'cn.ts');
    const sourceCnPath = path.resolve(projectRoot, 'src', 'dashkit', 'utils', 'cn.ts');
    if (!(await fs.pathExists(targetCnPath)) && (await fs.pathExists(sourceCnPath))) {
      await fs.copy(sourceCnPath, targetCnPath);
    }

    if (shouldSave) {
      await saveConfig({ componentsDir, cssDir });
    }

    spinner.stop();
    logger.success('Dashkit initialized successfully.');

    logger.bold('\nInitialization Summary:');
    logger.info(`  Components Dir: ${chalk.bold(componentsDir)}`);
    logger.info(`  CSS Dir:        ${chalk.bold(cssDir || 'root')}`);
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

export async function handleDoctor() {
  await runDoctor();
}
