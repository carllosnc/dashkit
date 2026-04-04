import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { getProjectInfo, getFolderStructure, loadConfig } from './utils';
import { logger } from './logger';

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

export async function runDoctor() {
  logger.bold('\nDashkit UI - Health Check\n');
  const info = await getProjectInfo();
  const config = await loadConfig();
  const css = config?.cssDir ?? getFolderStructure(info).css;
  let totalErrors = 0;

  // 1. Check Core Dependencies
  const coreSpinner = ora(`Verifying ${chalk.bold('core dependencies')}...`).start();
  const coreMissing = await getMissingDependencies(['react', 'react-dom', 'typescript', 'tailwindcss']);
  coreSpinner.stop();

  if (coreMissing.length === 0) {
    logger.success('React, TypeScript, and TailwindCSS are correctly installed.');
  } else {
    logger.warning(`Missing some core dependencies: ${coreMissing.join(', ')}`);
  }

  // 2. Check dashkit.css
  const dashkitSpinner = ora(`Verifying ${chalk.bold('dashkit.css')}...`).start();
  const dashkitPath = path.resolve(process.cwd(), css, 'dashkit.css');
  dashkitSpinner.stop();

  if (fs.existsSync(dashkitPath)) {
    logger.success(`dashkit.css found in ${css === '' ? 'root' : css + '/'}.`);
  } else {
    logger.error('dashkit.css not found. Please run "dashkit init".');
    totalErrors++;
  }

  // 3. Check Design System Tokens
  const tokenSpinner = ora(`Verifying ${chalk.bold('design system context')}...`).start();
  const baseCssPath = path.resolve(process.cwd(), css, 'index.css');
  tokenSpinner.stop();

  if (fs.existsSync(baseCssPath)) {
    logger.success(`Basic styling (${path.join(css, 'index.css')}) found.`);
  } else {
    logger.info(`Design system base (${path.join(css, 'index.css')}) not found.`);
  }

  // 4. Environment Info
  const pm = getPackageManager();
  logger.bold('\nEnvironment Info:');
  logger.bold(`  Package Manager: ${pm}`);
  logger.bold(`  Project Root: ${process.cwd()}\n`);

  if (totalErrors === 0) {
    logger.success('Everything looks good! Your component library is healthy.\n');
  } else {
    logger.error(`Found ${totalErrors} issues. Please address them before distributing.\n`);
    process.exit(1);
  }
}
