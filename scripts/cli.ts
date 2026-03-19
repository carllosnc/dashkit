import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { fileURLToPath } from 'url';
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
}

async function addComponent(componentName: string, options: CliOptions, isDependency = false) {
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

    // 2. Handle registry dependencies recursively
    if (component.registryDependencies) {
      for (const depName of component.registryDependencies) {
        await addComponent(depName, options, true);
      }
    }

    if (!isDependency) {
      spinner.succeed(chalk.green(`\nSuccessfully added ${chalk.bold(component.name)}!\n`));

      // 3. Dependency Instructions
      if (component.dependencies && component.dependencies.length > 0) {
        console.log(chalk.cyan('Next steps:'));
        console.log(`Ensure you have these dependencies installed:`);
        console.log(chalk.bold(`  npm install ${component.dependencies.join(' ')}\n`));
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
  .action(async (componentName, options) => {
    await addComponent(componentName, options);
  });

program.parse();
