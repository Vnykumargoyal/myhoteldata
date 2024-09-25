import { ERRORS } from '../constants';
import { isMobileNumber, isOTP } from './regex-validators';

const isInvalidMobileNumber = (value) => {
  if (!isMobileNumber(value)) {
    return ERRORS.INVALID_MOBILE;
  }
  return ERRORS.NO_ERROR;
};

const isInvalidOTP = (otp) => {
  if (!isOTP(otp)) {
    return ERRORS.ENTER_VALID_OTP;
  }
  return ERRORS.NO_ERROR;
};

export {
  isInvalidMobileNumber,
  isInvalidOTP
};
