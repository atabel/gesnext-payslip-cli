const { run } = require('../common/runner');
const {
  launchBrowser,
  closeBrowser,
  goTo,
  waitFor,
  getElementContent,
  clickAndWaitForNavigation,
  type,
  getPageContent,
  getCookies,
} = require('../common/browser');
const { log } = require('../common/logger');
const { downloadFile } = require('./downloader');
const {
  RELATIVE_PAYSLIP_LIST_URL,
  RELATIVE_PAYSLIP_URL_REGEXP,
} = require('./urls');
const {
  LOGIN_FORM_SELECTOR,
  LOGIN_USER_INPUT_SELECTOR,
  LOGIN_PASSWORD_INPUT_SELECTOR,
  LOGIN_SUBMIT_BUTTON_SELECTOR,
  PAYSLIP_LINK_SELECTOR,
} = require('./selectors');

const getPayslipFilename = date => {
  const [day, month, year] = date.trim().split('-');
  return `payslip_${year}-${month}-${day}.pdf`;
};

const getPayslipUrlFromPage = ({ domain, pageContent }) => {
  const [, relativePayslipUrl] = pageContent.match(RELATIVE_PAYSLIP_URL_REGEXP);
  return `${domain}${relativePayslipUrl}`;
};

const goToPayslipPage = async ({ domain, monthsBack }) => {
  await goTo(`${domain}${RELATIVE_PAYSLIP_LIST_URL}`);

  const payslipLinkSelector = PAYSLIP_LINK_SELECTOR(monthsBack);
  const date = await getElementContent(payslipLinkSelector);
  await clickAndWaitForNavigation(payslipLinkSelector);
  return date;
};

const getPayslipDetails = async ({ domain, monthsBack }) => {
  const date = await goToPayslipPage({ domain, monthsBack });

  const pageContent = await getPageContent();
  const url = getPayslipUrlFromPage({ domain, pageContent });

  return { url, date };
};

const logIn = async ({ domain, user, password }) => {
  await goTo(domain);
  await waitFor(LOGIN_FORM_SELECTOR);
  await type(LOGIN_USER_INPUT_SELECTOR, user);
  await type(LOGIN_PASSWORD_INPUT_SELECTOR, password);
  await clickAndWaitForNavigation(LOGIN_SUBMIT_BUTTON_SELECTOR);
  return getCookies();
};

module.exports = async ({ domain, user, password, monthsBack = 0 }) => {
  try {
    await launchBrowser();

    const cookies = await run('Logging in', () =>
      logIn({ domain, user, password })
    );

    while (monthsBack >= 0) {
      const { url, date } = await run('Retrieving payslip URL', () =>
        getPayslipDetails({ domain, monthsBack })
      );
      const filename = getPayslipFilename(date);

      await run('Downloading payslip', () =>
        downloadFile({ url, cookies, filePath: filename })
      );
      log(`Payslip downloaded as ${filename}`);
      monthsBack--;
    }

    await closeBrowser();
    log('\nDone!');
  } catch (error) {
    log('\nThe payslip was not downloaded');
    process.exit();
  }
};
