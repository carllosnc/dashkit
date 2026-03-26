import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { registry } from './registry';
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

async function ensureDashkitCss() {
  const cwd = process.cwd();

  // 1. Determine target directory (prefer 'src' if it exists)
  const srcExists = await fs.pathExists(path.resolve(cwd, 'src'));
  const targetDir = srcExists ? path.resolve(cwd, 'src') : cwd;
  const targetPath = path.resolve(targetDir, 'dashkit.css');
  const sourcePath = path.resolve(projectRoot, 'src', 'dashkit.css');

  // 2. Install dashkit.css if missing
  if (!(await fs.pathExists(targetPath))) {
    try {
      if (await fs.pathExists(sourcePath)) {
        await fs.copy(sourcePath, targetPath);
        console.log(chalk.green(`✔ dashkit.css installed.`));
      } else {
        return;
      }
    } catch {
      return;
    }
  }

  // 3. Automatically import in index.css
  const indexPath = path.resolve(targetDir, 'index.css');
  if (await fs.pathExists(indexPath)) {
    try {
      const indexContent = await fs.readFile(indexPath, 'utf-8');
      const importStatement = '@import "./dashkit.css";';
      
      if (!indexContent.includes(importStatement)) {
        const updatedContent = `${importStatement}\n${indexContent}`;
        await fs.writeFile(indexPath, updatedContent);
        console.log(chalk.green(`✔ dashkit.css imported in index.css.`));
      }
    } catch {
      // Sliently skip on error
    }
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
      spinner.succeed(chalk.green(`Component ${chalk.bold(component.name)} added.`));

      // 3. Ensure dashkit.css exists
      await ensureDashkitCss();

      // 4. Dependency Installation
      const missingDeps = await getMissingDependencies(Array.from(allDeps));

      if (missingDeps.length > 0) {
        if (options.install) {
          const pm = getPackageManager();
          const installCmd = pm === 'npm' ? 'install' : 'add';
          const command = `${pm} ${installCmd} ${missingDeps.join(' ')}`;

          const installSpinner = ora(`Installing dependencies...`).start();
          try {
            execSync(command, { stdio: 'inherit', cwd: process.cwd() });
            installSpinner.succeed(chalk.green('Dependencies installed.'));
          } catch {
            installSpinner.fail(chalk.red('Failed to install dependencies. Please run:'));
            console.log(chalk.bold(`  ${command}`));
          }
        } else {
          const pm = getPackageManager();
          const installCmd = pm === 'npm' ? 'install' : 'add';
          console.log(chalk.cyan(`Note: Install missing dependencies: ${chalk.bold(`${pm} ${installCmd} ${missingDeps.join(' ')}`)}`));
        }
      }
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
    await runDoctor(projectRoot);
  });

program.parse();
