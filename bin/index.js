#!/usr/bin/env node

const program = require('commander');
const downloadPayslip = require('./download-payslip');

program
  .description('Download payslips from GesNext employee portal')
  .option('-h, --host <url>', 'URL of the portal')
  .option('-u, --user <user>', 'User')
  .option('-p, --password <password>', 'Password')
  .option('-o, --otp <otp>', 'One-time password')
  .option(
    '-m, --months [number]',
    'Months back (defaults to last payslip)',
    parseInt
  )
  .option('-d, --output-dir [dir]', 'Output directory')
  .parse(process.argv);

const {
  host: domain,
  user,
  password,
  months: monthsBack,
  otp,
  outputDir,
} = program;

if (!domain || !user || !password) {
  program.help();
}

// In the login form, the otp needs to be concatenated to the password
const loginPassword = otp ? password + otp : password;

downloadPayslip({
  domain,
  user,
  password: loginPassword,
  monthsBack,
  outputDir,
});
