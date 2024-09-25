/* eslint-disable consistent-return */
/* eslint-disable no-console */
import React from 'react';
import includes from 'lodash/includes';
import { Redirect } from 'react-router-dom';

import {
  AUTH_HOTEL_NAME,
  AUTH_HOTEL_SIGNOUT_REDIRECT_TO,
  WHITELIST_PAGES
} from '../config/auth';
import { clearLocalStorage, getLocalStorage, updateLocalStorage } from './localStorageFunctions';

const AuthHandler = {
  name: AUTH_HOTEL_NAME,
  signIn: (name = AuthHandler.name, value) => {
    updateLocalStorage(name, value);
  },
  signOut: (name = AuthHandler.name) => {
    clearLocalStorage(name);

    // eslint-disable-next-line max-len
    if (includes(WHITELIST_PAGES, window.location.pathname)) return false; // return if this page is whitelist for silent jwt

    /**
     *  check if user is logged in then only call @signOut
     *  which redirects user to defined(login or /) screen, if not done then user might
     * face infinite redirect issue
     */
    return <Redirect to={AUTH_HOTEL_SIGNOUT_REDIRECT_TO} />;
  },
  authCheck: (name = AuthHandler.name) => {
    const token = getLocalStorage(name);
    if (token) {
      return typeof token === 'string' ? JSON.parse(token) : token;
    }
    return false;
  },
};
export default AuthHandler;
