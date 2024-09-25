/* eslint-disable import/no-cycle */
import { LOCAL_STORAGE_HOTEL_ON_UNLOAD } from '../constants';
import { toBool } from '../helpers/functions';
import { routes } from '../routes/constant';

const AUTH_HOTEL_NAME = 'auth-session-info';
const ACTIVE_LOAN_ID = 'active-loan-id';
const FIRST_TIME_LOGIN = 'first-time-login';
const AUTH_HOTEL_SIGNOUT_REDIRECT_TO = routes.auth.login;
const AUTH_HOTEL_CALL_JWT_MINUTES = 10; // call jwt in 10 minutes
const INACTIVITY_TIMEOUT_DURATION = 1000 * 60 * 30; // 30 Minutes
const DISABLE_REFRESH_TOKEN = toBool(process.env.REACT_APP_DISABLE_REFRESH_TOKEN) || false;
const FORCE_REDIRECT_401 = toBool(process.env.REACT_APP_FORCE_REDIRECT_401) || false;
const DISABLE_WORKFLOW_REDIRECT = toBool(process.env.REACT_APP_DISABLE_WORKFLOW_REDIRECT) || false;
const IS_ENABLE_DEV_ERRORS = toBool(process.env.REACT_APP_ENABLE_DEV_ERRORS);

const disableErrorMessages = [
];
const LOGIN_FROM = {
  APP: 'OneApp',
  BROWSER: 'Browser',
};

const clearCreditStorage = () => {
  localStorage.removeItem(AUTH_HOTEL_NAME);
  sessionStorage.removeItem(LOCAL_STORAGE_HOTEL_ON_UNLOAD);
  localStorage.removeItem(ACTIVE_LOAN_ID);
  localStorage.removeItem(FIRST_TIME_LOGIN);
};

/* below pages are whitelisted from silent/refresh token.
if you don't require to check for login/refresh token add below */
const WHITELIST_PAGES = [
  routes.auth.login
];

export {
  AUTH_HOTEL_NAME,
  AUTH_HOTEL_SIGNOUT_REDIRECT_TO,
  AUTH_HOTEL_CALL_JWT_MINUTES,
  INACTIVITY_TIMEOUT_DURATION,
  WHITELIST_PAGES,
  clearCreditStorage,
  DISABLE_REFRESH_TOKEN,
  FORCE_REDIRECT_401,
  DISABLE_WORKFLOW_REDIRECT,
  disableErrorMessages,
  IS_ENABLE_DEV_ERRORS,
  ACTIVE_LOAN_ID,
  FIRST_TIME_LOGIN,
  LOGIN_FROM
};
