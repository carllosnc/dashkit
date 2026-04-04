import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';

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
  console.log(chalk.bold.cyan('\nDashkit UI - Health Check\n'));
  let totalErrors = 0;

  // 1. Check Core Dependencies
  const coreSpinner = ora(`Verifying ${chalk.bold('core dependencies')}...`).start();
  const coreMissing = await getMissingDependencies(['react', 'react-dom', 'typescript', 'tailwindcss']);
  if (coreMissing.length === 0) {
    coreSpinner.succeed(chalk.green('React, TypeScript, and TailwindCSS are correctly installed.'));
  } else {
    coreSpinner.warn(chalk.yellow(`Missing some core dependencies: ${coreMissing.join(', ')}`));
  }

  // 2. Check dashkit.css
  const dashkitSpinner = ora(`Verifying ${chalk.bold('dashkit.css')}...`).start();
  const dashkitInSrc = fs.existsSync(path.resolve(process.cwd(), 'src/dashkit.css'));
  const dashkitInRoot = fs.existsSync(path.resolve(process.cwd(), 'dashkit.css'));

  if (dashkitInSrc || dashkitInRoot) {
    dashkitSpinner.succeed(chalk.green(`dashkit.css found in ${dashkitInSrc ? 'src/' : 'root'}.`));
  } else {
    dashkitSpinner.fail(chalk.red('dashkit.css not found. Please run "dashkit init".'));
    totalErrors++;
  }

  // 3. Check Design System Tokens
  const tokenSpinner = ora(`Verifying ${chalk.bold('design system context')}...`).start();
  if (fs.existsSync(path.resolve(process.cwd(), 'src/index.css'))) {
    tokenSpinner.succeed(chalk.green('Basic styling (src/index.css) found.'));
  } else {
    tokenSpinner.info(chalk.blue('Design system base (src/index.css) not found. (Optional for Vite/Next default installs)'));
  }

  // 4. Environment Info
  const pm = getPackageManager();
  console.log(chalk.gray('\nEnvironment Info:'));
  console.log(`  Package Manager: ${chalk.bold(pm)}`);
  console.log(`  Project Root: ${chalk.bold(process.cwd())}\n`);

  if (totalErrors === 0) {
    console.log(chalk.bold.green('Everything looks good! Your component library is healthy.\n'));
  } else {
    console.log(chalk.bold.red(`Found ${totalErrors} issues. Please address them before distributing.\n`));
    process.exit(1);
  }
}
