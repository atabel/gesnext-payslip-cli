const puppeteer = require('puppeteer');

let page;
let browser;

const getCookies = () => page.cookies();

const getPageContent = () => page.content();

const type = (selector, text) => page.type(selector, text);

const getElementContent = async (selector) => {
  const handle = await page.$(selector);
  const content = await page.evaluate((element) => element.textContent, handle);
  await handle.dispose();
  return content;
};

const click = (selector) => page.click(selector);

const waitForNavigation = () => page.waitForNavigation();

const clickAndWaitForNavigation = (selector) =>
  Promise.all([waitForNavigation(), click(selector)]);

const waitFor = (selector) => page.waitForSelector(selector);

const goTo = (url) => page.goto(url);

const closeBrowser = () => browser.close();

const launchBrowser = async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
};

module.exports = {
  launchBrowser,
  closeBrowser,
  goTo,
  waitFor,
  getElementContent,
  clickAndWaitForNavigation,
  type,
  getPageContent,
  getCookies,
};
