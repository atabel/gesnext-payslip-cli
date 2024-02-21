const chalk = require('chalk');

// eslint-disable-next-line
const log = console.log;

const success = (message) => `${chalk.green('✔')} ${message}`;

const failure = (message) => `${chalk.red('❌')} ${message}`;

const processing = (message) => `${chalk.cyan('%s')} ${message}`;

const accent = (message) => chalk.cyan(message);

module.exports = {
  log,
  success,
  failure,
  processing,
  accent,
};
