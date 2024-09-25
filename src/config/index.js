/* eslint-disable max-len */
/* eslint-disable import/no-cycle */
import { generatePath } from 'react-router-dom';

import IMAGE_URLS from '../constants/images';
import { toBool } from '../helpers/functions';
import { routes } from '../routes/constant';
// const { data } = useHotelContext();

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const DEFAULT_TIMEOUT = 5 * 60 * 1000; // 5 Minutes timeout for api calls
const LOGIN_CAROUSEL_SLIDE_TIMEOUT = 5 * 1000; // 5 seconds timeout per slide
const OTP_RESEND_TIME = 60 * 1000; // 1 Min time for resend otp
const skipAuthCheck = (process.env.REACT_APP_SKIP_AUTH_CHECK
  && toBool(process.env.REACT_APP_SKIP_AUTH_CHECK))
|| false; // make it false on prod
const BANK_STATEMENT_MAX_SIZE = 26214400; // in bytes
const DOC_UPLOAD_MAX_SIZE = 10485760; // in bytes

const DEFAULT_DATA = {
  MULTIPLEFIFTYTHOUSAND: 50000,
  // AGEOFBUSINESS: ['Less than 1 year', '1 to 2 years', '2 to 5 years', '5 years and above'],
  // TURNOVERMONTHLYSALES: ['1,00,000- 2,00,000', '2,00,001 - 4,00,000', '4,00,001 - 10,00,000', 'Greater than 10,00,000'],
  // NATUREOFBUSINESS: ['Retailer', 'Wholesaler', 'Manufacturer', 'Service Provider', 'Wholesaler & Retailer'],
  // PROFILEOFBUSINESS: ['2&3 Wheelers', 'Abrasives & Grinding', 'Accounting', 'Accounting Book-keeping', 'Wholesale Goods '],
  BUSINESSOWNERSHIP: ['Owned', 'Rented'],
  RESIDENCEOWNERSHIP: ['Owned', 'Rented'],
  ITRDOCONE: ['2023', '2022', '2021', '2020', '2019'],
  ITRDOCTWO: ['2023', '2022', '2021', '2020', '2019'],
  // RESIDENCEPINCODE: ['332025', '332026', '332027', '332032', '332035', '332038', '332065', '332070', '332072', '332074', '332075', '332078'],
  // BUSINESSPINCODE: ['332025', '332026', '332027', '332032', '332035', '332038', '332065', '332070', '332072', '332074', '332075', '332078'],
  // BUSINESSTYPES: ['Proprietor', 'Company', 'Partnership'],
  // GST: ['Yes', 'No'],
  // GENDER: ['Male', 'Female', 'Other'],
  // MARITIALSTATUS: ['Single', 'Married'],
  IDENTITYSELECTEDDOCNAME: ['Aadhar Card', 'Passport', 'Driving License', 'Voter ID'],
  BUSINESSSELECTEDFORCOMPANYDOCNAME: ['Udyog Aadhar', 'Udhyam', 'Shop Establishment Certificate', 'Food License Certificate'],
  BUSINESSSELECTEDFORADDRESSDOCNAME: ['Rental Agreement', 'Utility Bills'],
  // BANKNAME: ['Axis Bank', 'Allahabad Bank', 'Andra Bank', 'AU Small Finance Bank', 'Federal Bank', 'HDFC Bank', 'ICICI Bank'],
  // ACCOUNTTYPE: ['Saving', 'Current', 'Other'],
  // cjpId: '639c65d4f42d7d010d20f2b0',
};

const ENABLE_CLEVERTAP = ['production', 'testing', 'uat', 'development'].includes(process.env.REACT_APP_NODE_ENV);
const IF_NOT_DEV_ENV = ['production', 'testing', 'uat'].includes(process.env.REACT_APP_NODE_ENV);
const BankList = [
  {
    label: 'Axis Bank',
    value: 'Axis Bank',
    img: IMAGE_URLS.BANK_ICON_LIST.AXIS,
  },
  {
    label: 'Allahabad Bank',
    value: 'Allahabad Bank',
    img: IMAGE_URLS.BANK_ICON_LIST.ALLAHABAD,
  },
  {
    label: 'Andra Bank',
    value: 'Andra Bank',
    img: IMAGE_URLS.BANK_ICON_LIST.ANDRA,
  },
  {
    label: 'AU Small Finance Bank',
    value: 'AU Small Finance Bank',
    img: IMAGE_URLS.BANK_ICON_LIST.AU,
  },
  {
    label: 'Federal Bank',
    value: 'Federal Bank',
    img: IMAGE_URLS.BANK_ICON_LIST.FEDERAL,
  },
  {
    label: 'HDFC Bank',
    value: 'HDFC Bank',
    img: IMAGE_URLS.BANK_ICON_LIST.HDFC,
  },
  {
    label: 'ICICI Bank',
    value: 'ICICI Bank',
    img: IMAGE_URLS.BANK_ICON_LIST.ICICI,
  }
];

const WHITELIST_LEAVESITE_POPUP = [
  routes.auth.login,
  routes.auth.logout,
];

const ADD_HOTEL_DETAIL = [
  {
    'titel': 'Room Detail',
    'describe': 'Check your revenue detail monthly, quaterly, yearly',
  },
  {
    'titel': 'Food Menu',
    'describe': 'Check your expense detail monthly, quaterly, yearly',
  },
  {
    'titel': 'Employee Detail',
    'describe': 'Check your profit & loss detail monthly, quaterly, yearly',
  },
];

const OVERVIEW_DETAIL = [
  {
    'titel': 'Revenue',
    'describe': 'Check your monthly, quaterly, yearly revenue detail',
  },
  {
    'titel': 'Expense',
    'describe': 'Check your expense detail monthly, quaterly, yearly',
  },
  {
    'titel': 'Profit & Loss',
    'describe': 'Check your monthly, quaterly, yearly profit & loss detail ',
  },
];

const Reservations_DETAIL = [
  {
    'titel': 'Room Check In',
    'describe': 'Check your revenue detail monthly, quaterly, yearly',
  },
  {
    'titel': 'Room Check Out',
    'describe': 'Check your expense detail monthly, quaterly, yearly',
  },
  {
    'titel': 'Food Service',
    'describe': 'Check your profit & loss detail monthly, quaterly, yearly',
  },
  {
    'titel': 'Booked Room',
    'describe': 'Check your profit & loss detail monthly, quaterly, yearly',
  },
];

const Expense_DETAIL = [
  {
    'titel': 'Kitchen',
    'describe': 'Add your Groceries,Vegetable,Dairy expense etc',
  },
  {
    'titel': 'Employee Salary',
    'describe': 'Add your employee salary etc ',
  },
  {
    'titel': 'Hotel Maintanance',
    'describe': 'Add your utility bills, paints, ',
  },
  {
    'titel': 'Hotel Travel',
    'describe': 'Check your profit & loss detail monthly, quaterly, yearly ',
  },
];

export {
  BASE_URL,
  DEFAULT_TIMEOUT,
  LOGIN_CAROUSEL_SLIDE_TIMEOUT,
  DEFAULT_DATA,
  OTP_RESEND_TIME,
  WHITELIST_LEAVESITE_POPUP,
  skipAuthCheck,
  BankList,
  BANK_STATEMENT_MAX_SIZE,
  DOC_UPLOAD_MAX_SIZE,
  ENABLE_CLEVERTAP,
  IF_NOT_DEV_ENV,
  ADD_HOTEL_DETAIL,
  OVERVIEW_DETAIL,
  Reservations_DETAIL,
  Expense_DETAIL
};
