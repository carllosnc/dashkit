#!/usr/bin/env node
import { Command } from 'commander';
import { handleAdd, handleInit, handleDoctor, handleList, handleInfo, handleAiRules, handleDiff } from './commands';
import { startMcpServer } from './mcp';

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
  .description('Initialize Dashkit in your project (installs dashkit.css, utils, dashkit.json, and AI rules)')
  .option('-y, --yes', 'Accept all defaults without prompting')
  .option('-c, --components-dir <dir>', 'Directory to store Dashkit components')
  .option('-o, --output <dir>', 'Alias for --components-dir')
  .option('--css-dir <dir>', 'Directory to store dashkit.css')
  .option('--ai-rules [file]', 'Generate AI assistant instructions (defaults to AGENTS.md)')
  .option('--no-ai-rules', 'Skip generating AI assistant instructions')
  .option('-f, --force', 'Overwrite existing dashkit.css and utility files')
  .option('--no-install', 'Do not automatically install base dependencies')
  .option('--json', 'Output initialization result as JSON for LLMs and scripts')
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

program
  .command('mcp')
  .description('Start the Dashkit MCP (Model Context Protocol) server over stdio')
  .action(startMcpServer);

// parseAsync (not parse) so async action handlers are awaited and their
// rejections surface instead of becoming unhandled promise rejections.
program.parseAsync();
