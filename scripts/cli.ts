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
}

const { MultiSelect } = enquirer as unknown as Enquirer;

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

type ProjectType = 'next' | 'vite' | 'other';

interface ProjectInfo {
  type: ProjectType;
  hasSrc: boolean;
  hasApp: boolean;
}

async function getProjectInfo(): Promise<ProjectInfo> {
  const cwd = process.cwd();
  const packageJsonPath = path.resolve(cwd, 'package.json');
  const hasSrc = await fs.pathExists(path.resolve(cwd, 'src'));
  const hasApp = await fs.pathExists(path.resolve(cwd, 'app')) || await fs.pathExists(path.resolve(cwd, 'src', 'app'));

  let type: ProjectType = 'other';

  if (await fs.pathExists(packageJsonPath)) {
    try {
      const pkg = await fs.readJson(packageJsonPath);
      if (pkg.dependencies?.next || pkg.devDependencies?.next) type = 'next';
      else if (pkg.dependencies?.vite || pkg.devDependencies?.vite) type = 'vite';
    } catch {
      // Ignore parse errors
    }
  }

  return { type, hasSrc, hasApp };
}

async function isReactProject(): Promise<boolean> {
  const packageJsonPath = path.resolve(process.cwd(), 'package.json');
  if (!(await fs.pathExists(packageJsonPath))) {
    return false;
  }

  try {
    const packageJson = await fs.readJson(packageJsonPath);
    return !!(
      (packageJson.dependencies && packageJson.dependencies.react) ||
      (packageJson.devDependencies && packageJson.devDependencies.react)
    );
  } catch {
    return false;
  }
}


async function installDashkitCss(targetPath: string, sourcePath: string) {
  if (await fs.pathExists(targetPath)) return true;

  try {
    if (await fs.pathExists(sourcePath)) {
      await fs.copy(sourcePath, targetPath);
      console.log(chalk.green(`dashkit.css installed.`));
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

async function ensureDashkitCss() {
  const { hasSrc } = await getProjectInfo();
  const cwd = process.cwd();
  const targetDir = hasSrc ? path.resolve(cwd, 'src') : cwd;

  const targetPath = path.resolve(targetDir, 'dashkit.css');
  const sourcePath = path.resolve(projectRoot, 'src', 'dashkit.css');

  await installDashkitCss(targetPath, sourcePath);
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
    spinner.succeed(chalk.green('Dependencies installed.'));
  } catch {
    spinner.fail(chalk.red('Failed to install dependencies. Please run:'));
    console.log(chalk.bold(`  ${command}`));
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
    console.error(chalk.red(`\nError: Component "${componentName}" not found in registry.`));
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
      spinner.succeed(chalk.green(`Component ${chalk.bold(component.name)} added.`));

      if (options.install) {
        await installDependencies(Array.from(allDeps));
      } else {
        const missingDeps = await getMissingDependencies(Array.from(allDeps));
        if (missingDeps.length > 0) {
          const pm = getPackageManager();
          const installCmd = pm === 'npm' ? 'install' : 'add';
          console.log(chalk.cyan(`Note: Install missing dependencies: ${chalk.bold(`${pm} ${installCmd} ${missingDeps.join(' ')}`)}`));
        }
      }
    } else {
      spinner.stop();
    }
  } catch (error) {
    spinner.fail(`Error adding ${isDependency ? 'dependency ' : ''}${component.name}`);
    if (error instanceof Error) console.error(chalk.red(error.message));
  }
}

program
  .command('add')
  .description('Add a component to your project')
  .argument('[component]', 'Component to add')
  .option('-o, --output <dir>', 'Output directory (defaults to smart detection)')
  .option('--no-install', 'Do not automatically install dependencies')
  .action(async (componentName: string | undefined, options: CliOptions) => {
    if (!(await isReactProject())) {
      console.error(chalk.red('\nError: Dashkit can only be added to a React project.'));
      console.error(chalk.gray('Make sure you are in the root of your React project (package.json should exist and have "react" as a dependency).'));
      process.exit(1);
    }

    // Smart default output detection
    if (!options.output) {
      const { hasSrc } = await getProjectInfo();
      options.output = hasSrc ? 'src/components/dashkit' : 'components/dashkit';
    }

    let componentNames: string[] = [];

    if (componentName) {
      componentNames = [componentName];
    } else {
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

        componentNames = await prompt.run();
      } catch {
        process.exit(0);
      }
    }

    if (componentNames.length > 0) {
      for (const name of componentNames) {
        await addComponent(name, options);
      }
    }
  });

program
  .command('init')
  .description('Initialize Dashkit in your project (installs dashkit.css)')
  .action(async () => {
    if (!(await isReactProject())) {
      console.error(chalk.red('\nError: Dashkit can only be initialized in a React project.'));
      console.error(chalk.gray('Make sure you are in the root of your React project (package.json should exist and have "react" as a dependency).'));
      process.exit(1);
    }

    const spinner = ora('Initializing Dashkit...').start();
    try {
      await ensureDashkitCss();
      spinner.succeed(chalk.green('Dashkit initialized successfully.'));
    } catch (error) {
      spinner.fail(chalk.red('Failed to initialize Dashkit.'));
      if (error instanceof Error) console.error(chalk.red(error.message));
    }
  });

program
  .command('doctor')
  .description('Run diagnostics on the registry and project structure')
  .action(async () => {
    await runDoctor();
  });

program.parse();
