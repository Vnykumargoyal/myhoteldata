const isNumber = (num) => /^[0-9]+$/.test(num);
const isMobileNumber = (num) => /^[6789]\d{9}$/.test(num);
const isOTP = (num) => /\d{6}$/.test(num);

export {
  isNumber,
  isMobileNumber,
  isOTP
};
