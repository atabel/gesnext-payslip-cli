const LOGIN_FORM_SELECTOR = '#loginEMSS';
const LOGIN_USER_INPUT_SELECTOR = '#userlogin';
const LOGIN_PASSWORD_INPUT_SELECTOR = '#pwdlogin';
const LOGIN_SUBMIT_BUTTON_SELECTOR = '#buttonenter';

const PAYSLIP_LINK_SELECTOR = (backFromLast) =>
  `table.tablaestados tr:nth-child(${backFromLast + 2}) a`;

module.exports = {
  LOGIN_FORM_SELECTOR,
  LOGIN_USER_INPUT_SELECTOR,
  LOGIN_PASSWORD_INPUT_SELECTOR,
  LOGIN_SUBMIT_BUTTON_SELECTOR,
  PAYSLIP_LINK_SELECTOR,
};
