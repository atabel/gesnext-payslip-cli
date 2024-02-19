# ViewNext Payslip CLI

ViewNext Payslip CLI is a command line tool written in Node to download payslips from the [GesNext](http://www.gesnext.com) employee portal. The portal is an old, slow and not-so-nice website used by [Telefónica](https://www.telefonica.com) and presumably other companies mainly to allow employees to download their payslips in PDF format. Thanks to this tool you might never have to look at it again.

## Installation

You need Node.js to run this tool.

```
npm i -g viewnext-payslip-cli
```

## Usage

```
Usage: viewnext-payslip [options]

Options:

  -h, --host <url>           URL of the portal
  -u, --user <user>          User
  -p, --password <password>  Password
  -o, --otp <otp>            One-time password
  -m, --months [number]      Months back (defaults to last payslip)
  -h, --help                 output usage information
```

This will download the payslip PDF file to your current folder. If you don't want to manually run this command every time, you could for example set up a [cron job](https://en.wikipedia.org/wiki/Cron) to do it for you once a month.

## Kudos

Kudos to @soyguijarro for the original idea and the [first version of this tool](https://github.com/soyguijarro/gesnext-payslip-cli)
