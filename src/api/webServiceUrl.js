/* eslint-disable max-len */
/* eslint-disable prefer-template */
/* eslint-disable import/prefer-default-export */
const AUTH_SERVICE = process.env.REACT_APP_AUTH_SERVICE_API;
const LOS_SERVICE = process.env.REACT_APP_LOS_SERVICE_API;
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const UTILITY_SERVICE = process.env.REACT_APP_UTILITY_SERVICE_API;
const TL = 'TL';
const AuthURL = (endpoint) => {
  // eslint-disable-next-line no-param-reassign
  endpoint = endpoint.toLowerCase();
  return AUTH_SERVICE + endpoint;
};

// const LOSURL = (endpoint) => LOS_SERVICE + endpoint;

const ConfigURL = (endpoint) => {
  // eslint-disable-next-line no-param-reassign
  endpoint = endpoint.toLowerCase();
  return LOS_SERVICE + endpoint;
};

const PayLaterURL = (endpoint, isLocal) => {
  if (isLocal) {
    return `http://localhost:5001/${endpoint.toLowerCase()}`;
  }
  // eslint-disable-next-line no-param-reassign
  endpoint = endpoint.toLowerCase();
  return LOS_SERVICE + endpoint;
};

const BASEIURL = (endpoint) => BASE_URL + endpoint;

// const TEMPURL = (endpoint) => {
//   // eslint-disable-next-line no-param-reassign
//   endpoint = endpoint?.toLowerCase();
//   return `http://localhost:5001/los/` + endpoint;
// };

const UtilityURL = (endpoint, isLocal) => {
  if (isLocal) {
    return `http://localhost:5001/${endpoint}`;
  }
  return UTILITY_SERVICE + endpoint;
};

const API_URL = {
  // hotelAddressAPI: `https://nominatim.openstreetmap.org/search?q=${hotel}+Hotel&format=json`,
  sendSMS: AuthURL('send-otp'),
  registrationUser: AuthURL('registration'),
  validateOTP: AuthURL('validate-otp'),
  resendSMS: AuthURL('send-otp'),
  pincode: ConfigURL('pincode'),
  hotelDetail: ConfigURL('hotel-details'),
  validateEmail: ConfigURL('validateEmail'),

  // fetchActive: LOSURL(`fetch?loanProduct=${TL}`),
  // fetchEligibilityForTermLoan: BASEIURL(`fetch_eligibility?loanProduct=${TL}`),
  // refreshToken: `${AUTH_SERVICE}refresh-access-token`,
  // getConfigMaster: ConfigURL('term_loan/get_config_master'),
  // maskAadhar: ConfigURL('v1/aadhar/mask'),
  // gstDetails: CGIDURL('gstDetails'),
  // customerJourney: BASEIURL('cjp/create'),
  // fetchRedirectionUrl: PayLaterURL('fetch-redirection-url'),
};

export {
  API_URL,
  LOS_SERVICE
};
