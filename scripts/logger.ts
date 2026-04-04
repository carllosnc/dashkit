import chalk from 'chalk';

export type MessageState = 'success' | 'warning' | 'error' | 'info';

const ICONS = {
  success: '[SUCCESS]',
  warning: '[WARNING]',
  error: '[ERROR]',
  info: '[INFO]'
};

const COLORS = {
  success: chalk.green,
  warning: chalk.yellow,
  error: chalk.red,
  info: chalk.blue
};

export function showMessage(message: string, state: MessageState = 'info') {
  const icon = ICONS[state];
  const color = COLORS[state];
  console.log(color(`${icon} ${message}`));
}

export const logger = {
  success: (message: string) => showMessage(message, 'success'),
  warning: (message: string) => showMessage(message, 'warning'),
  error: (message: string) => showMessage(message, 'error'),
  info: (message: string) => showMessage(message, 'info'),
  bold: (message: string) => console.log(chalk.bold(message))
};
