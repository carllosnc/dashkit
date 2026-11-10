#!/usr/bin/env node
import { Command } from 'commander';
import { handleAdd, handleInit, handleDoctor, handleList, handleInfo, handleAiRules, handleDiff } from './commands';

const program = new Command();

program
  .name('dashkit')
  .description('Dashkit CLI - Add premium components to your project')
  .version('1.0.0');

program
  .command('add')
  .description('Add one or more components to your project')
  .argument('[components...]', 'Components to add')
  .option('-a, --all', 'Add all available components in the registry')
  .option('-o, --output <dir>', 'Output directory (defaults to smart detection)')
  .option('--no-install', 'Do not automatically install dependencies')
  .option('-f, --force', 'Overwrite existing component files')
  .option('-t, --tests', 'Include test files for the component (*.test.tsx)')
  .action(handleAdd);

program
  .command('diff')
  .description('Compare installed component files with the upstream Dashkit registry')
  .argument('[component]', 'Optional component slug or name to inspect')
  .option('--json', 'Output diff report as JSON')
  .action(handleDiff);

program
  .command('info')
  .description('Show component metadata, dependencies, exports, and props')
  .argument('<component>', 'Component slug or name to inspect')
  .option('--json', 'Output component metadata as JSON')
  .action(handleInfo);

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

program
  .command('ai-rules')
  .description('Generate AI assistant instructions (AGENTS.md / .cursorrules) for your project')
  .option('-o, --output <file>', 'Target file path (defaults to AGENTS.md)')
  .action(handleAiRules);

// parseAsync (not parse) so async action handlers are awaited and their
// rejections surface instead of becoming unhandled promise rejections.
program.parseAsync();
