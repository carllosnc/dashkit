import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { registry } from './registry';

// Helper to get package manager
export function getPackageManager() {
  const cwd = process.cwd();
  if (fs.existsSync(path.resolve(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (fs.existsSync(path.resolve(cwd, 'yarn.lock'))) return 'yarn';
  if (fs.existsSync(path.resolve(cwd, 'package-lock.json'))) return 'npm';
  return 'bun';
}

// Helper to check if dependency is installed
export async function getMissingDependencies(deps: string[]) {
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

export async function runDoctor(projectRoot: string) {
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

  // 3. Check Core Dependencies
  const coreSpinner = ora(`Verifying ${chalk.bold('core dependencies')}...`).start();
  const coreMissing = await getMissingDependencies(['react', 'react-dom', 'typescript', 'tailwindcss']);
  if (coreMissing.length === 0) {
    coreSpinner.succeed(chalk.green('React, TypeScript, and TailwindCSS are correctly installed.'));
  } else {
    coreSpinner.warn(chalk.yellow(`Missing some core dependencies: ${coreMissing.join(', ')}`));
  }

  // 4. Check Design System Tokens
  const tokenSpinner = ora(`Verifying ${chalk.bold('design system context')}...`).start();
  if (fs.existsSync(path.resolve(projectRoot, 'src/index.css'))) {
    tokenSpinner.succeed(chalk.green('Basic styling (src/index.css) found.'));
  } else {
    tokenSpinner.fail(chalk.red('Design system base (src/index.css) not found.'));
    totalErrors++;
  }

  // 5. Environment Info
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
}
