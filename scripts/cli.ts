#!/usr/bin/env node
import { Command } from 'commander';
import { handleAdd, handleInit, handleDoctor, handleList } from './commands';

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
  .option('-t, --tests', 'Include test files for the component (*.test.tsx)')
  .action(handleAdd);

program
  .command('list')
  .description('List all available components in Dashkit registry')
  .option('--installed', 'Show only components installed in the current project')
  .option('--json', 'Output component list as JSON')
  .action(handleList);

program
  .command('init')
  .description('Initialize Dashkit in your project (installs dashkit.css)')
  .option('-y, --yes', 'Accept all defaults without prompting')
  .action(handleInit);

program
  .command('doctor')
  .description('Run diagnostics on the registry and project structure')
  .action(handleDoctor);

// parseAsync (not parse) so async action handlers are awaited and their
// rejections surface instead of becoming unhandled promise rejections.
program.parseAsync();
