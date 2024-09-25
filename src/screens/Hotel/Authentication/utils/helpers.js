/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
import get from 'lodash/get';

import { allNumberCheck } from '../../../../helpers/functions';
import { isNumber } from '../../../../helpers/regex-validators';

const handleMobileInputChange = (e, setMobileNumber, setError, setErrorFromApi) => {
  const { value } = e.target;
  if (value.length <= 10 && (isNumber(value) || !value.length)) {
    if (allNumberCheck.includes(value)) {
      return true;
    } else {
      setError('');
      setMobileNumber(value);
      setErrorFromApi('');
    }
  }
};

const handleOTPInputChange = (e, setOTP, setError, setErrorFromApi) => {
  const { value } = e.target;
  if (value.length <= 6 && (isNumber(value) || !value.length)) {
    setError('');
    setOTP(value);
    setErrorFromApi('');
  }
};

const EVENTS = {
  LANDED: 'landed',
  LOGGEDIN: 'loggedIn',
};

const skipParams = ['id'];

const getUTMsForClevertap = (params = {}) => {
  const UTMs = { ...params };
  // Delete each property in skipParams array from UTMs
  skipParams.forEach((utm) => delete UTMs[utm]);
  return UTMs;
};

const getUTMsToBeLogged = (params = {}) => {
  const NoUTMs = { source_utms: null };
  try {
    const UTMs = { ...params };
    if (UTMs && Object.keys(UTMs)?.length) {
      return {
        source_utms: {
          source: get(UTMs, 'utm_source', ''),
          medium: get(UTMs, 'utm_medium', ''),
          campaign: get(UTMs, 'utm_campaign', ''),
        },
      };
    }
    return NoUTMs;
  } catch (e) {
    return NoUTMs;
  }
};

const generateCreateCJPPayload = (data, UTMs = {}) => {
  if (!data) return {};
  // eslint-disable-next-line object-curly-newline, max-len
  const { rateOfInterest, segment, mobileNumber, merchantId, lenderName, externalId, businessName, validTill, isPanValidated, gstNumber, pincode, city, isProprietor, state, referralCodeValue, pan, referenceCode } = data;
  return ({
    rateOfInterest,
    userSegment: segment,
    mobileNumber,
    merchantId,
    lenderName,
    lendingProductName: 'TL',
    externalId,
    businessName,
    validTill: validTill || null,
    isPanValidated: isPanValidated || null,
    gstNumber: gstNumber || null,
    pincode: pincode || null,
    city: city || null,
    isProprietor: isProprietor || null,
    state: state || null,
    referenceCode: referralCodeValue || referenceCode || null,
    panNumber: pan || null,
    ...getUTMsToBeLogged(UTMs),
  });
};

const generateFetchCJPListPayload = (UTMs = {}) => ({
  data: {
    select: { customer_journey: ['_default'] },
    ...getUTMsToBeLogged(UTMs),
  },
});

const generateFetchCJPPayload = (isOfferValid, referenceCode) => ({
  data: {
    select: { customer_journey: ['_all'] },
    isOfferValid,
    firstCallAfterLogin: true,
    referenceCode: referenceCode || null,
  },
});

const generateFetchEligibilityPayload = (externalID, mobileNumber) => ({
  data: { externalID, mobileNumber },
});

const generateConfigMasterPayload = () => ({
  data: [
    'tenureMaster', 'ageOfBusiness', 'monthlyBusinessTurnOver', 'natureOfBusiness', 'typeOfBusiness', 'profileOfBusiness', 'pincodeCity', 'businessOwnership', 'residenceOwnership', 'states', 'gender', 'maritalStatus'
  ],
});

export {
  handleMobileInputChange,
  handleOTPInputChange,
  skipParams,
  EVENTS,
  getUTMsToBeLogged,
  getUTMsForClevertap,
  generateCreateCJPPayload,
  generateFetchCJPListPayload,
  generateFetchCJPPayload,
  generateFetchEligibilityPayload,
  generateConfigMasterPayload
};
