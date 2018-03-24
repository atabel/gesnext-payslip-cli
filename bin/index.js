#!/usr/bin/env node

const program = require('commander');
const downloadPayslip = require('./download-payslip');

program
  .description('Download payslips from GesNext employee portal')
  .option('-h, --host <url>', 'URL of the portal')
  .option('-u, --user <user>', 'User')
  .option('-p, --password <password>', 'Password')
  .option(
    '-m, --months [number]',
    'Months back (defaults to last payslip)',
    parseInt
  )
  .parse(process.argv);

const { host: domain, user, password, months: monthsBack } = program;

if (!domain || !user || !password) {
  program.help();
}

downloadPayslip({ domain, user, password, monthsBack });
