import { Command } from 'commander';
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

const program = new Command();

program
  .name('dashkit')
  .description('Dashkit CLI - Add premium components to your project')
  .version('0.0.1');

interface CliOptions {
  output: string;
  install: boolean;
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

async function copyComponentFiles(component: ComponentConfig, targetDir: string) {
  for (const file of component.files) {
    const sourcePath = path.resolve(projectRoot, file);
    const targetPath = path.join(targetDir, path.basename(file));

    if (!(await fs.pathExists(sourcePath))) {
      throw new Error(`File not found: ${sourcePath}`);
    }
    await fs.copy(sourcePath, targetPath);
  }
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
    return;
  }

  const spinner = ora(isDependency ? `Adding dependency ${chalk.bold(component.name)}...` : `Adding ${chalk.bold(component.name)}...`).start();

  try {
    const targetDir = path.resolve(process.cwd(), options.output, component.name);
    await fs.ensureDir(targetDir);

    await copyComponentFiles(component, targetDir);

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

async function handleAdd(componentName: string | undefined, options: CliOptions) {
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

async function handleInit() {

  const info = await getProjectInfo();
  const defaults = getFolderStructure(info);

  try {
    const componentsDirPrompt = new Input({
      name: 'componentsDir',
      message: 'Where would you like to store your components?',
      initial: defaults.components
    });
    const componentsDir = await componentsDirPrompt.run();

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

    const spinner = ora('Initializing Dashkit...').start();

    // Ensure CSS installation
    const targetPath = path.resolve(process.cwd(), cssDir, 'dashkit.css');
    const sourcePath = path.resolve(projectRoot, 'src', 'dashkit.css');
    await installDashkitCss(targetPath, sourcePath);

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
  }
}

async function handleDoctor() {
  await runDoctor();
}

program
  .command('add')
  .description('Add a component to your project')
  .argument('[component]', 'Component to add')
  .option('-o, --output <dir>', 'Output directory (defaults to smart detection)')
  .option('--no-install', 'Do not automatically install dependencies')
  .action(handleAdd);

program
  .command('init')
  .description('Initialize Dashkit in your project (installs dashkit.css)')
  .action(handleInit);

program
  .command('doctor')
  .description('Run diagnostics on the registry and project structure')
  .action(handleDoctor);

program.parse();
