import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { registry } from './registry';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Find the Dashkit root dir (where the source components are)
const projectRoot = path.resolve(__dirname, '..');

const program = new Command();

program
  .name('dashkit-ui')
  .description('Dashkit CLI - Add premium components to your project')
  .version('0.0.1');

interface CliOptions {
  output: string;
  install: boolean;
}

// Helper to get package manager
function getPackageManager() {
  const cwd = process.cwd();
  if (fs.existsSync(path.resolve(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (fs.existsSync(path.resolve(cwd, 'yarn.lock'))) return 'yarn';
  if (fs.existsSync(path.resolve(cwd, 'package-lock.json'))) return 'npm';
  return 'bun';
}

// Helper to check if dependency is installed
async function getMissingDependencies(deps: string[]) {
  const pkgPath = path.resolve(process.cwd(), 'package.json');
  if (!(await fs.pathExists(pkgPath))) return deps;

  try {
    const pkg = await fs.readJson(pkgPath);
    const installed = {
      ...pkg.dependencies,
      ...pkg.devDependencies
    };
    return deps.filter(dep => !installed[dep]);
  } catch {
    return deps;
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

    // 1. Copy Files
    for (const file of component.files) {
      const sourcePath = path.resolve(projectRoot, file);
      const fileName = path.basename(file);
      const targetPath = path.join(targetDir, fileName);

      if (await fs.pathExists(sourcePath)) {
        await fs.copy(sourcePath, targetPath);
      } else {
        spinner.fail(`File not found: ${sourcePath}`);
        if (!isDependency) process.exit(1);
        return;
      }
    }

    // Accumulate dependencies
    if (component.dependencies) {
      component.dependencies.forEach(dep => allDeps.add(dep));
    }

    // 2. Handle registry dependencies recursively
    if (component.registryDependencies) {
      for (const depName of component.registryDependencies) {
        await addComponent(depName, options, true, allDeps);
      }
    }

    if (!isDependency) {
      spinner.succeed(chalk.green(`\nSuccessfully added ${chalk.bold(component.name)}!`));

      // 3. Dependency Installation
      const missingDeps = await getMissingDependencies(Array.from(allDeps));

      if (missingDeps.length > 0) {
        if (options.install) {
          const pm = getPackageManager();
          const installCmd = pm === 'npm' ? 'install' : 'add';
          const command = `${pm} ${installCmd} ${missingDeps.join(' ')}`;

          console.log(chalk.cyan(`\nInstalling missing dependencies: ${chalk.bold(missingDeps.join(', '))}`));
          const installSpinner = ora(`Running ${chalk.bold(command)}...`).start();

          try {
            execSync(command, { stdio: 'inherit', cwd: process.cwd() });
            installSpinner.succeed(chalk.green('Dependencies installed successfully!'));
          } catch {
            installSpinner.fail(chalk.red('Failed to install dependencies. Please install them manually:'));
            console.log(chalk.bold(`  ${command}\n`));
          }
        } else {
          console.log(chalk.cyan('\nNext steps:'));
          console.log(`Ensure you have these dependencies installed:`);
          const pm = getPackageManager();
          const installCmd = pm === 'npm' ? 'install' : 'add';
          console.log(chalk.bold(`  ${pm} ${installCmd} ${missingDeps.join(' ')}\n`));
        }
      }

      console.log(`${chalk.gray('Location:')} ${targetDir}\n`);
    } else {
      spinner.stop(); // Just stop the dependency spinner silently if successful
    }

  } catch (error) {
    spinner.fail(`Error adding ${isDependency ? 'dependency ' : ''}${component.name}`);
    if (error instanceof Error) {
      console.error(chalk.red(error.message));
    }
  }
}

program
  .command('add')
  .description('Add a component to your project')
  .argument('<component>', 'Component to add')
  .option('-o, --output <dir>', 'Output directory', 'src/components/dashkit')
  .option('--no-install', 'Do not automatically install dependencies')
  .action(async (componentName, options) => {
    await addComponent(componentName, options);
  });

program
  .command('doctor')
  .description('Run diagnostics on the registry and project structure')
  .action(async () => {
    console.log(chalk.bold.cyan('\n🩺 Dashkit UI - Health Check\n'));

    const components = Object.keys(registry);
    let totalErrors = 0;

    // 1. Check Source Files
    const fileSpinner = ora(`Verifying ${chalk.bold('component files')}...`).start();
    let fileErrors = 0;
    for (const [, config] of Object.entries(registry)) {
      for (const file of config.files) {
        if (!fs.existsSync(path.resolve(projectRoot, file))) {
          fileSpinner.fail(chalk.red(`  ${chalk.bold(config.name)}: Missing file -> ${file}`));
          fileErrors++;
        }
      }
    }
    if (fileErrors === 0) {
      fileSpinner.succeed(chalk.green(`Verified all files for ${chalk.bold(components.length)} components.`));
    } else {
      totalErrors += fileErrors;
    }

    // 2. Check Registry Dependencies
    const depSpinner = ora(`Verifying ${chalk.bold('registry dependencies')}...`).start();
    let depErrors = 0;
    for (const [, config] of Object.entries(registry)) {
      if (config.registryDependencies) {
        for (const dep of config.registryDependencies) {
          if (!registry[dep.toLowerCase()]) {
            depSpinner.fail(chalk.red(`  ${chalk.bold(config.name)}: Dependency "${dep}" not found in registry.`));
            depErrors++;
          }
        }
      }
    }
    if (depErrors === 0) {
      depSpinner.succeed(chalk.green('Verified all inter-component dependencies.'));
    } else {
      totalErrors += depErrors;
    }

    // 3. Check Design System Tokens (Example check)
    const tokenSpinner = ora(`Verifying ${chalk.bold('design system context')}...`).start();
    if (fs.existsSync(path.resolve(projectRoot, 'src/index.css'))) {
      tokenSpinner.succeed(chalk.green('Basic styling and Tailwind config found.'));
    } else {
      tokenSpinner.fail(chalk.red('Design system base (src/index.css) not found.'));
      totalErrors++;
    }

    // 4. Environment Info
    const pm = getPackageManager();
    console.log(chalk.gray('\nEnvironment Info:'));
    console.log(`  Package Manager: ${chalk.bold(pm)}`);
    console.log(`  Project Root: ${chalk.bold(process.cwd())}\n`);

    if (totalErrors === 0) {
      console.log(chalk.bold.green('✨ Everything looks good! Your component library is healthy.\n'));
    } else {
      console.log(chalk.bold.red(`⚠️ Found ${totalErrors} issues. Please address them before distributing.\n`));
      process.exit(1);
    }
  });

program.parse();
