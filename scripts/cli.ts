import { Command } from 'commander';
import { handleAdd, handleInit, handleDoctor } from './commands';

const program = new Command();

program
  .name('dashkit')
  .description('Dashkit CLI - Add premium components to your project')
  .version('0.0.1');

program
  .command('add')
  .description('Add a component to your project')
  .argument('[component]', 'Component to add')
  .option('-o, --output <dir>', 'Output directory (defaults to smart detection)')
  .option('--no-install', 'Do not automatically install dependencies')
  .option('-f, --force', 'Overwrite existing component files')
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

