/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-else-return */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
import get from 'lodash/get';
import parse from 'html-react-parser';

import { ENABLE_CLEVERTAP } from '../config';
import { ACTIVE_LOAN_ID, FIRST_TIME_LOGIN, LOGIN_FROM } from '../config/auth';
import { CLEVERTAP_EVENTS } from '../constants';
import { getLocalStorage } from '../utils/localStorageFunctions';

/* eslint-disable no-useless-escape */
const formatPrice = (amount, prefix = '₹', options = { hasPrefix: true }) => {
  const fn = Intl.NumberFormat('en-IN');
  // eslint-disable-next-line no-param-reassign
  // amount /= 100;
  if (Number.isNaN(amount)) {
    amount = 0;
  }
  if (!options.hasPrefix) {
    return `${fn.format(amount)}`;
  }
  return `${prefix} ${fn.format(amount)}`;
};

const validateEmail = (email) => (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/).test(
  email
);

const notContainsSpace = (text) => /^\S+$/i.test(text);

const isNumber = (num) => /^[0-9]+$/.test(num);
const isIfscCode = (ifsc) => /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc);
const isAlphabet = (text) => /^[a-zA-Z ]+$/.test(text);
const isAddress = (text) => /^[a-zA-Z0-9\s,'-./]+$/.test(text);
const isFullName = (name) => /^[a-z0-9][a-z0-9 ]*$/i.test(name);
const panValidateWithForthLetterP = (pan) => (/^([A-Z]){3}([P]){1}([A-Z]){1}([0-9]){4}([A-Z]){1}?$/).test(pan);
const panValidateWithForthLetterC = (pan) => (/^([A-Z]){3}([C]){1}([A-Z]){1}([0-9]){4}([A-Z]){1}?$/).test(pan);
const panValidateWithForthLetterF = (pan) => (/^([A-Z]){3}([F]){1}([A-Z]){1}([0-9]){4}([A-Z]){1}?$/).test(pan);
const GSTValidate = (gst) => (/^([0-9a-zA-Z]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{3})+$/).test(gst);
const validatePAN = (pan) => (/^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/).test(pan);
const isAlphaNumeric = (text) => /^[a-z0-9]+$/i.test(text);
const capitalizeFirstString = (value) => value.charAt(0).toUpperCase() + value.slice(1);
const bytesToSize = (bytes) => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return 'n/a';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  if (i === 0) return `${bytes} ${sizes[i]})`;
  return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
};

const allNumberCheck = ['6666666666', '7777777777', '8888888888', '9999999999'];

const LENDER = 'FL';

const defaultEventProperty = {
  product_type: 'TL',
};

const isValidAccountNumber = (number) => {
  if (isNumber(number) && number.length >= 6 && number.length <= 18) {
    return true;
  }
  return false;
};

const getRouterPathname = () => window.location.pathname.replace(process.env.PUBLIC_URL, '');

const mask = (a) => {
  if (a) {
    let masked = '';
    let withoutMask = '';
    let addSpace = '';
    if (a.length > 4) {
      masked = a.substr(0, a.length - 4).replace(/\d/g, '*');
      addSpace = masked.match(/.{1,5}/g);
      addSpace = addSpace.join(' ');
      withoutMask = a.substr(masked.length);
      return `${addSpace} ${withoutMask}`;
    }
    return a.substr(0);
  }
  return '';
};

const toBool = (val) => val !== 'false';

const customerID = () => {
  const id = getLocalStorage(ACTIVE_LOAN_ID);
  return id;
};

const FirstTimeLogin = () => {
  const val = getLocalStorage(FIRST_TIME_LOGIN);
  return val;
};

const getBankName = (bank) => {
  if (!bank) return '';
  return bank.split(',')[0];
};

const toLowerCase = (value) => {
  if (!value || typeof value !== 'string') return '';
  return value.toLowerCase();
};

const getPageID = (pageID) => {
  try {
    if (pageID) return `tl_${pageID}`;
    let { pathname } = window.location;
    // get string after last formard slash in pathname
    pathname = pathname?.toLowerCase().split('/').pop().replace(/-/g, '_');
    return `tl_${pathname}`;
  } catch (err) {
    return 'tl_';
  }
};

const getID = (id) => {
  const pageID = getPageID();
  return toLowerCase(`${pageID}_${id}`);
};

const PARTNER_CODES = {
  DEFAULT: 'tl',
};

const pushClevertapEvent = (name, data) => {
  if (ENABLE_CLEVERTAP) {
    window.clevertap?.event.push(name, {
      ...data,
      ...defaultEventProperty,
      // Lender: LENDER.toUpperCase(),
    });
  }
};

const pushProfileProperties = (data) => {
  if (ENABLE_CLEVERTAP) {
    window.clevertap.profile.push({
      Site: {
        ...data,
      },
    });
  }
};

const pushLoginSuccessfullEvent = (loggedInFrom = LOGIN_FROM.BROWSER) => {
  pushClevertapEvent(CLEVERTAP_EVENTS.COMMON.LOGIN_SUCCESSFULL, {
    LoggedInFrom: loggedInFrom,
  });
};

const pushClevertapUserLogin = (mobileNumber) => {
  if (ENABLE_CLEVERTAP && mobileNumber && window.clevertap) {
    window.clevertap.onUserLogin.push({
      Site: {
        Identity: mobileNumber,
        Phone: `+91${mobileNumber}`,
        'Product Type': 'TL',
        // optional fields. controls whether the user will be sent email, push etc.
        'MSG-email': true, // Disable email notifications
        'MSG-push': true, // Enable push notifications
        'MSG-sms': true, // Enable sms notifications
        'MSG-whatsapp': true, // Enable WhatsApp notifications
      },
    });
  }
};

const convertToWords = (number) => {
  const words = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
  return words[number];
};

const showLenderName = (name) => {
  if (name === 'FL') {
    return 'FlexiLoans';
  }
  return 'FlexiLoans';
};

const LENDERS = {
  fl: 'FlexiLoans',
  lk: 'Lending Kart',
  indifi: 'Indifi',
};

const renderParsedHTML = (html = '') => {
  if (!html || typeof html !== 'string') return '';
  return parse(html);
};

const getLenderName = (code) => {
  const lenderCode = toLowerCase(code);
  return get(LENDERS, lenderCode, '');
};

const convertToISTDate = (date) => new Date(new Date(date).getTime() + (330 * 60000));

const getEndpointFromURL = (url) => {
  if (!url) return '';
  let endpoint = '';
  // To get endpoint only (skipping base url)
  if (url.includes('api/')) {
    endpoint = url.split('api/')[1];
  } else if (url.includes('los/')) {
    endpoint = url.split('los/')[1];
  }
  return endpoint || url;
};

const getIndexOfArray = (obj, val) => {
  let indexItem;
  if (obj && val) {
    indexItem = obj.indexOf(val);
    if (indexItem !== -1) {
      return indexItem;
    }
  }
  return false;
};

const getIndexOfObj = (obj, val) => {
  let indexItem;
  if (obj && val) {
    const arr = Object?.keys(obj);
    indexItem = arr?.indexOf(val);
    if (indexItem !== -1) {
      return indexItem;
    }
  }
  return false;
};

const getArrayList = (obj, val) => {
  let indexItem;
  let newObj = [];
  if (obj && val) {
    indexItem = obj?.indexOf(val);
    if (indexItem !== -1) {
      return obj;
    } else {
      newObj = [...obj, val];
      return newObj;
    }
  } else if (obj) {
    return obj;
  }
};

const getArrayOfObj = (obj, pincode, city) => {
  let indexItem;
  let newObj = {};
  if (obj && pincode) {
    const arr = Object?.keys(obj);
    indexItem = arr?.indexOf(pincode);
    if (indexItem !== -1) {
      return obj;
    } else {
      newObj = obj;
      newObj[pincode] = city;
      return newObj;
    }
  } else if (obj) {
    return obj;
  }
};

const convertToBoolean = (val) => {
  const value = `${val}`;
  switch (value?.toLowerCase().trim()) {
    case 'true':
    case 'yes':
    case '1':
      return true;
    case 'false':
    case 'no':
    case '0':
      return false;
    default:
      return val;
  }
};

const base64toBlob = (base64Data, fileName) => {
  const sliceSize = 1024;
  const byteCharacters = atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  let options = null;
  if (fileName && fileName.includes('.')) {
    const val = fileName.split('.');
    const extension = val[val.length - 1];
    if (extension) {
      if (extension.toLowerCase() === 'pdf') {
        options = { type: 'application/pdf' };
      } else {
        options = { type: `image/${extension}` };
      }
    }
  }
  const blob = new Blob(byteArrays, options);
  return new File([blob], fileName, options);
};

export {
  formatPrice,
  panValidateWithForthLetterP,
  panValidateWithForthLetterC,
  panValidateWithForthLetterF,
  validatePAN,
  GSTValidate,
  isAlphaNumeric,
  isAlphabet,
  validateEmail,
  bytesToSize,
  mask,
  isIfscCode,
  isValidAccountNumber,
  isNumber,
  capitalizeFirstString,
  toBool,
  customerID,
  getRouterPathname,
  notContainsSpace,
  getPageID,
  isAddress,
  isFullName,
  getBankName,
  convertToWords,
  FirstTimeLogin,
  showLenderName,
  pushClevertapEvent,
  pushProfileProperties,
  PARTNER_CODES,
  LENDER,
  defaultEventProperty,
  allNumberCheck,
  convertToISTDate,
  getID,
  toLowerCase,
  getEndpointFromURL,
  getIndexOfArray,
  getArrayList,
  getArrayOfObj,
  getIndexOfObj,
  convertToBoolean,
  pushLoginSuccessfullEvent,
  pushClevertapUserLogin,
  base64toBlob,
  renderParsedHTML,
  getLenderName
};
