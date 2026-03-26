import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { registry, type ComponentConfig } from './registry';
import { runDoctor, getPackageManager, getMissingDependencies } from './doctor';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Find the Dashkit root dir (where the source components are)
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

async function autoImportStyle(targetDir: string) {
  const cssFiles = ['index.css', 'globals.css', 'app.css', 'App.css'];
  const importStatement = '@import "./dashkit.css";';
  const tailwindImportRegex = /@import\s+['"]tailwindcss['"];/;

  for (const fileName of cssFiles) {
    const indexPath = path.resolve(targetDir, fileName);
    if (!(await fs.pathExists(indexPath))) continue;

    try {
      const content = await fs.readFile(indexPath, 'utf-8');
      if (content.includes(importStatement)) return;

      const updatedContent = tailwindImportRegex.test(content)
        ? content.replace(tailwindImportRegex, (match) => `${match}\n${importStatement}`)
        : `${importStatement}\n${content}`;

      await fs.writeFile(indexPath, updatedContent);
      console.log(chalk.green(`dashkit.css imported in ${fileName}.`));
      return;
    } catch {
      // Sliently skip on error
    }
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
  const cwd = process.cwd();
  const srcExists = await fs.pathExists(path.resolve(cwd, 'src'));
  const targetDir = srcExists ? path.resolve(cwd, 'src') : cwd;
  
  const targetPath = path.resolve(targetDir, 'dashkit.css');
  const sourcePath = path.resolve(projectRoot, 'src', 'dashkit.css');

  if (await installDashkitCss(targetPath, sourcePath)) {
    await autoImportStyle(targetDir);
  }
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
      component.dependencies.forEach(dep => allDeps.add(dep));
    }

    if (component.registryDependencies) {
      for (const depName of component.registryDependencies) {
        await addComponent(depName, options, true, allDeps);
      }
    }

    if (!isDependency) {
      spinner.succeed(chalk.green(`Component ${chalk.bold(component.name)} added.`));
      await ensureDashkitCss();

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
    await runDoctor(projectRoot);
  });

program.parse();
