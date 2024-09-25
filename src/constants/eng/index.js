/* eslint-disable max-len, import/no-cycle */
/* eslint-disable no-dupe-keys */
/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import { Typography } from '@material-ui/core';
import moment from 'moment';

import IMAGE_URLS from '../images';
import { external, routes } from '../../routes/constant';
import ExperianTAndC from '../../components/ExperianT&C';
import { openLinkInWindow } from '../../helpers/appHandlers';

/* eslint-disable quotes */
const HEADER_TITLE = 'My Data';
const LOCAL_STORAGE_HOTEL = 'myHotelData';
const LOCAL_STORAGE_HOTEL_ON_UNLOAD = 'tremloan_storage';
const FIRST_LOGIN_NUMBER = 'first_login_no';
const LOGGED_IN_FROM = 'loggedInFrom';

const CONSTANTS = {
  LOGIN: 'Login',
  SIGNIN: 'Enter your registered Email address to Login',
  HAVEACCOUCT: "New User? ",
  ALREADY_ACCOUNT: 'Already have an account?',
  REGISTRATION: 'Register',
  ADD_DETAILS: 'Add additonal detail to register',
  VERIFY_EMAIL: 'Verify your Email Address',
  OTP_SENT: 'Enter OTP sent on your email address',
  HOTELDETAIL: 'Enter your Hotel Detail',
  SHARE_ADDRESS: 'Enter your Hotel Address',
  ENTER_HOTEL_ADDRESS: 'Hotel Name and Address',
  ADD_HOTEL_DETAIL: 'Add Hotel Detail',
  ADD_HOTEL_SUBHEADING: 'Add room detail, Food Menu, employee detail',
  ADD_ROOM_HEADING: 'Add Room Detail',
  ADD_ROOM_SUBHEADING: 'Add room type, number, price',
  ADD_FOOD_DETAILS: 'Add Food Menu',
  ADD_FOOD_SUBDETAILS: 'Add Food items and price',
  ADD_EMPLOYEE_HEADING: 'Add Employee Detail',
  ADD_EMPLOYEE_SUBHEADING: "Add  employee's personal detail, occupation, salary",
  MY_BUSINESS_HEADING: 'My Business',
  MY_BUSINESS_SUBHEADING: 'Track your business from here',
  TOTAL_REVENUE_HEADING: 'Total Revenue',
  REVENUE_DETAILS_HEADING: 'Revenue Detail',
  REVENUE_BRACKUP_HEADING: 'Revenue Breakup',
  OCCUPANCY_DETAILS_HEADING: 'Occupancy Detail',
  TOTAL_EXPENSE_HEADING: 'Total Expense',
  EXPENSE_DETAILS_HEADING: 'Expense Detail',
  EXPENSE_BRACKUP_HEADING: 'Expense Breakup',
  PROFIT_HEADING: 'Profit',
};

const CTA_LABELS = {
  SEND_OTP: 'Send OTP',
  SUBMIT: 'Submit',
  EDIT: 'Edit',
  RESEND_OTP: 'Resend OTP',
  UNLOCK: 'Continue to Unlock',
  CONFIRM: 'Confirm',
  CONTINUE: 'Continue',
  CREATE_YOUR_ACCOUNT: 'Create your my data account',
  EDIT_DETAILS: 'Edit Details',
  EDIT_PAN: 'Edit Pan',
  CHANGE_PAN_NUMBER: 'Change PAN Number',
  SWITCH_BUSINESS_TYPE: 'Switch Business Type',
  LOGOUT: 'Log out',
  EDIT_GST: 'Edit GST',
  UPLOAD: 'Upload Img!!',
  VALIDATE_REQUEST: 'Validate Request!!',
  OFFER_WITH_THIS: 'Continue with original offer',
  OFFER_WITH_HIGHER_AMOUNT: 'Continue with this offer',
  I_AGREE: 'I Agree',
  VIEW_AGGREMENT: 'View Agreement',
  CLICK_HERE: 'Click here',
  GO_BACK: 'Go Back',
  OK_PROCEED: 'Ok, Proceed',
  ADD_NEW_BANK_ACCOUNT: 'Add New Bank Account',
  DONE: 'Done',
  RE_LOAD: 'Reload',
  GOT_IT: 'Got It',
  RE_UPLOAD: 'Re-upload',
  SAVE_PROCEED: 'Save & Proceed',
  RETRY: 'Retry',
  NACH_START: 'Start NACH',
  GET_OTP: 'Get OTP',
  VERIFY_OTP: 'Verify OTP',
  ADD: 'Add',
  APPLY_FOR_NEW_LOAN: 'Apply for a New Loan',
  EXISTING_APPLICATION: 'Continue to existing application',
  NEW_APPLICATION: 'Start a new application',
  APPLY_NOW: 'Apply Now',
  LOGIN: 'Login',
  NEW_REGISTRATION: 'Register',
  REGISTER: 'Registration',
  VALIDATE_OTP: 'VALIDATE OTP',
  CONFIRM_LOCATION: 'CONFIRM LOCATION',
  SAVE_AND_CONTINUE: 'SAVE AND CONTINUE',
};

const ERRORS = {
  NO_ERROR: '',
  INVALID_MOBILE: 'Enter a valid 10-digit mobile number',
  ENTER_VALID_OTP: 'Please enter a valid 6-digit OTP',
  SELECTED_AMOUNT_INVALID: 'Amount should be greater than or equal to 50K',
  SELECTED_AMOUNT_MAX_INVALID: 'Amount should be less than or equal to 1CR',
  ENTER_AMOUNT: 'Enter Amount in the multiples of 25,000',
  ERROR_404_BOTTOM: 'We can’t seem to find what you’re looking for',
  ERROR_404_LOST: 'Lost?',
  ERROR_404_NOT_FOUND: 'Page Not Found',
  ERROR_500_HEADING: 'Something is Missing',
  ERROR_500_UNEXPECTED: 'You’ve found an unexpected error',
  ERROR_500_FIXING: 'Our team is already fixing it.',
  ERROR_500_TRYING: 'You can try again in some time',
  ENTER_VALID_EMAIL: 'Enter valid email ID',
};

const ALT_CONSTANTS = {
  EDIT: 'Edit Button',
  LEFT_ARROWS: 'Left Arrows',
  RIGHT_ARROWS: 'Right Arrows',
  DOWN: 'Down Button',
  PINCODE_NOT_FOUND: 'Pincode Not Found',
  CHECK: 'Check Icon',
  PAN: 'PAN sample!!',
  GST_CHECK_NO: 'Gst Check No!!',
  KYC_FAILED: 'Kyc failed!!',
  ADD_ICON: 'Add Icon',
  ERROR_404: 'error 404',
  ERROR_500: 'error 500',
  ADDRESS_NOT_FOUND: 'Address not found',
  REDIRECT_LOADER: 'Loader',
  WATCH: 'Watch Icon Show',
  CLOSE_MODAL: 'Close Popup!!',
  UPLOAD: 'Upload image',
  MONET: 'Money icon added',
};

const INPUT_CONSTANTS = {
  PASSWORD_LABEL: 'Password',
  OWNER_LABLE: 'Owner Name',
  OWNER_NAME: 'ownerName',
  MOBILE_NUMBER_LABEL: 'Mobile Number',
  MOBILE_NUMBER_NAME: 'mobileNumber',
  PASSWORD_NAME: 'password',
  ENTER_HOTEL_NAME_LABEL: 'Enter Hotel Name',
  ENTER_HOTEL_NAME: 'hotelName',
  SEARCH_HOTEL_LOCATION_LABEL: 'Search your hotel locations',
  HOTEL_LOCATION_NAME: 'hotelLocation',
  HOTEL_ADDRESS_LABEL: 'Hotel Address',
  HOTEL_ADDRESS_NAME: 'hotelAddress',
  DOB: 'Date of Birth',
  ageOfBusiness: 'Age of business',
  turnoverMonthlySales: 'Turnover Range (Monthly Sales)',
  turnoverValueSales: 'Turnover Value',
  natureOfBusiness: 'Nature of business',
  profileOfBusiness: 'Profile of business',
  AGE_OF_BUSINESS_NAME: 'ageOfBusiness',
  TURNOVER_MONTHLY_SALES_NAME: 'turnoverMonthlySales',
  TURNOVER_VALUES_SALES_NAME: 'turnoverValueSales',
  NATURE_OF_BUSINESS_NAME: 'natureOfBusiness',
  PROFILE_OF_BUSINESS_NAME: 'profileOfBusiness',
  residenceOwnership: 'Residence Ownership',
  RESIDENCE_OWNERSHIP_NAME: 'residenceOwnership',
  businessOwnership: 'Business Ownership',
  BUSINESS_OWNERSHIP_NAME: 'businessOwnership',
  residencePinCode: 'Residence Pin Code',
  residenceCity: 'Residence Pin Code/Area',
  residenceCityOnly: 'Area',
  RESIDENCE_PINECODE_NAME: 'residencePinCode',
  businessPinCode: 'Business Pin Code',
  businessCity: 'Business Pin Code/Area',
  businessCityOnly: 'Area',
  BUSINESS_PINECODE_NAME: 'businessPinCode',
  PLACEHOLDER_PINCODE: 'Start typing your PIN Code',
  PLACEHOLDER_PROFILE: 'Search for profiles here',
  BUSINESSTYPES_LABEL: 'Select your type of business',
  BUSINESSTYPES_NAME: 'businessType',
  PAN_NUMBER_LABEL: 'PAN Number',
  PAN_NUMBER_PROP_LABEL: 'PAN Number (of any Promoter)',
  PAN_NUMBER_NAME: 'panNumber',
  PAN_PROP_NUMBER_NAME: 'promoterPanNumber',
  PAN_FOR_PROPRIETOR: 'This program is only for sole proprietors',
  GST_LABEL: 'Are you a GST registered user?',
  GST_NAME: 'gst',
  BUSINESS_NAME_LABLE: 'Business Name',
  BUSINESS_NAME_NAME: 'businessName',
  GST_NUMBER_LABEL: 'GST Number',
  GST_NUMBER_NAME: 'gstNumber',
  GENDER_LABEL: 'Gender',
  GENDER_NAME: 'gender',
  FIRST_NAME_LABEL: 'First Name',
  FIRST_NAME_NAME: 'firstName',
  MIDDLE_NAME_LABEL: 'Middle Name (Optional)',
  MIDDLE_NAME_NAME: 'middleName',
  LAST_NAME_LABEL: 'Last Name',
  LAST_NAME_NAME: 'lastName',
  FATHER_NAME_LABEL: 'Father’s Name',
  FATHER_NAME_NAME: 'fatherName',
  EMAIL_ID_LABEL: 'Email ID',
  EMAIL_ID_NAME: 'email',
  MARITIAL_STATUS_LABEL: 'Maritial Status',
  MARITAL_STATUS_NAME: 'maritialStatus',
  FIRST_NAME_PLACEHOLDER: 'First name as per PAN',
  MIDDLE_NAME_PLACEHOLDER: 'Middle name if any',
  LAST_NAME_PLACEHOLDER: 'Surname as per PAN',
  EMAIL_PLACEHOLDER: 'Enter email',
  BUSINESS_NAME_PLACEHOLDER: 'Name of your business',
  FATHER_NAME_PLACEHOLDER: 'Father’s name as per PAN',
  ADDRESS_LINE_ONE_LABEL: 'Address Line 1',
  ADDRESS_LINE_ONE_PLACEHOLDER: 'Enter address line 1',
  BUSINESS_ADDRESS_LINE_ONE_NAME: 'addressLineOne',
  CURRENT_ADDRESS_LINE_ONE_NAME: 'addressLineOne',
  ADDRESS_LINE_TWO_LABEL: 'Address Line 2',
  ADDRESS_LINE_TWO_PLACEHOLDER: 'Enter address line 2',
  BUSINESS_ADDRESS_LINE_TWO_NAME: 'addressLineTwo',
  CURRENT_ADDRESS_LINE_TWO_NAME: 'addressLineTwo',
  STATE_LABLE: 'State',
  STATE_PLACEHOLDER: 'Select State',
  BUSINESS_STATE_NAME: 'state',
  CURRENT_STATE_NAME: 'state',
  PINCODE_LABEL: 'Pin Code',
  PINCODE_PLACEHOLDER: 'Enter pincode',
  BUSINESS_PINCODE_NAME: 'pincode',
  CURRENT_PINCODE_NAME: 'pincode',
  COUNTRY_LABEL: 'Country',
  COUNTRY_PLACEHOLDER: 'India',
  BUSINESS_COUNTRY_NAME: 'country',
  CURRENT_COUNTRY_NAME: 'country',
  CITY_LABEL: 'Area',
  CITY_PLACEHOLDER: 'Select Area',
  BUSINESS_CITY_NAME: 'city',
  CURRENT_CITY_NAME: 'city',
  SELECTED_DOC_LABEL: 'Select document to upload',
  SELECTED_DOC_NAME_IDENTITY: 'identitySelectedDocName',
  SELECTED_DOC_NAME_BUSINESS_FOR_ADDRESS: 'businessSelectedForAddressDocName',
  SELECTED_DOC_NAME_BUSINESS_FOR_COMPANY: 'businessSelectedForCompanyDocName',
  SELECTED_DOC_YEAR_FOR_ITR_ONE: 'itrDocOne',
  SELECTED_DOC_YEAR_FOR_ITR_TWO: 'itrDocTwo',
  ACCOUNT_HOLDER_NAME_LABEL: 'Account Holder’s Name',
  ACCOUNT_HOLDER_NAME_NAME: 'accountHolderName',
  ACCOUNT_HOLDER_NAME_PLACEHOLDER: 'Enter account holder name',
  ACCOUNT_BANK_NAME_LABEL: 'Bank Name',
  ACCOUNT_BANK_NAME_NAME: 'bankName',
  ACCOUNT_BANK_NAME_PLACEHOLDER: 'Select bank name',
  ACCOUNT_TYPE_LABEL: 'Account Type',
  ACCOUNT_TYPE_NAME: 'accountType',
  ACCOUNT_TYPE_PLACEHOLDER: 'Select account type',
  ACCOUNT_NUMBER_LABEL: 'Account Number',
  ACCOUNT_NUMBER_NAME: 'accountNumber',
  ACCOUNT_NUMBER_PLACEHOLDER: 'Enter account number',
  ACCOUNT_IFSC_CODE_LABEL: 'IFSC Code',
  ACCOUNT_IFSC_CODE_NAME: 'IFSCCode',
  ACCOUNT_IFSC_CODE_PLACEHOLDER: 'Enter IFSC code',
  SELECT_BANK_PLACEHOLDER: 'Select Bank ',
  BANK_SEARCH_PLACEHOLDER: 'Search for your bank',
  REFERENCE_LABEL: 'Enter code provided by your relationship manager',
  REFERENCE_NAME: 'refValue',
  PROMOTER_PAN_NUMBER: "Promoter's PAN Number",
  NAME_LABEL: 'Name',
  NAME_LABEL_NAME: 'name',
  DESIGNATION_LABEL: 'Designations',
  DESIGNATION_NAME: 'Designations',
  DOJ_LABEL: 'Date of Joining',
  DOJ_NAME: 'DOJ',
  SALARY_PER_MONTH_LABEL: 'Salary per month',
  SALARY_PER_MONTH_NAME: 'salaryPerMonth',
  PROOF_OF_ADDRESS_LABEL: 'Proof of Address',
  PROOF_OF_ADDRESS_NAME: 'proofOfAddress',
};

const PROGRESS_BAR_CONSTANT = {
  WELCOME_SCREEN: 5,
  PAN_SCREEN: 10,
  LET_GET_STARTED: 20,
  GATING_CRITERIA: 30,
  BASIC_INFO: 40,
  INDIFI_KYC: 40,
  BA: 50,
  KYC_DOCS: 60,
  SANCTION_BEFORE_PD: 70,
  SANCTION_AFTER_PD: 80,
  SELECT_BANK_ACCOUNT: 90,
  VIDEO_KYC: 90,
  FINAL_CONG: 100,
};

const DOC_CATEGRIES_LIST = {
  pan: 'PAN Card',
  aadhaar: 'Aadhar Card',
  addressProof: 'Address Proof',
  companyRegistrationDocuments: 'Company Registration Documents',
  bankStatement: 'Bank Statement',
  GSTR: 'GSTR',
  ITRAuditedFinancials: 'ITR Audited Financials',
  LOAN_STATEMENTS: 'Loan Statements',
  SANCTION_LETTER: 'Sanction Letters',
};

const NOTES = {
  ESIGN_SKIP_MODAL: 'Your loan application will be delayed by 24-48 hours',
  ADD_BACK_ACCOUNT_NOTE: 'Please add bank account where you receive your business proceeds ',
};

const GATTING_CRITERIA = [
  {
    lable: 'Date of Birth',
    value: 'DOB',
  },
  {
    lable: 'Age of business',
    value: 'ageOfBusiness',
  },
  {
    lable: 'Turnover Range (Monthly Sales)',
    value: 'turnoverMonthlySales',
  },
  {
    lable: 'Monthly Sales',
    value: 'turnoverValueSales',
  },
  {
    lable: 'Nature of business',
    value: 'natureOfBusiness',
  },
  {
    lable: 'Profile of business',
    value: 'profileOfBusiness',
  },
  {
    lable: 'Residence Ownership',
    value: 'residenceOwnership',
  },
  {
    lable: 'Business Ownership',
    value: 'businessOwnership',
  },
  {
    lable: 'Residence Pin Code',
    value: 'residencePinCode',
  },
  {
    lable: 'Residence Area',
    value: 'residenceCity',
  },
  {
    lable: 'Business Pin Code',
    value: 'businessPinCode',
  },
  {
    lable: 'Business Area',
    value: 'businessCity',
  }
];

const SOMETHING_WENT_WRONG = 'Something went wrong. Please try after some time.';

const CLASSES = {
  FW_600: 'fw-600',
  ERROR: 'error',
  FS_14_12: 'fs-14 fs-sm-12 lh-120',
  ACTIVE: 'active',
  TA_CENTER: 'ta-center',
  FF_INDIVISIBLE_L: 'ff-indivisible-l',
  COL_TEXT_PRIMARY: 'col-text-primary',
  FS_38: 'fs-38',
  W_70: 'w-70',
};

const READ_MORE_EXPAND_TITLES = {
  more: 'Read More',
  less: 'Read Less',
};

// const ISAUTHORISED_CHECKBOXES_IDENTITY = [
//   {
//     name: 'isAuthorised',
//     label: 'I/You hereby consent to Pinelabs being appointed as my/your authorised representative to receive your Credit Information on an ongoing basis for the purpose of offering financial services  up to 6 months from the date the consent is collected, I also agree with Experian Terms and Conditions.',
//     value: 'isAuthorised',
//     alignStart: true,
//     readMore: true,
//     class: 'mt-20 mb-20 checkboxClasses',
//     limit: 93,
//   }
// ];

const ISAUTHORISED_CHECKBOXES_IDENTITY = [
  {
    name: 'isAuthorised',
    label: (
      <Typography variant="caption" className="fs-sm-12 fs-14 col-text-primary-op5">
        I hereby give consent and authorize Pine labs to use my credit information for
        the purpose of financial offering. I also agree with the &nbsp;<ExperianTAndC />
      </Typography>
    ),
    value: 'isAuthorised',
    alignStart: true,
  }
];
const IS_TREM_CHECKBOXES = [
  {
    name: 'IS_TREM_CHECKBOXES',
    value: 'IS_TREM_CHECKBOXES',
    label: (
      <Typography variant="caption" className="fs-sm-12 fs-14 col-text-primary-op5 ff-indivisible-b mt-10">
        I agree to the &nbsp;
        <Typography
          color="primary"
          variant="caption"
          // href="/terms"
          onClick={(e) => {
            e.preventDefault();
            openLinkInWindow(external.TeamAndCondition);
          }}
          className="fs-sm-12 fs-14 ff-indivisible-b"
        >
          Terms & Privacy policy
        </Typography>
      </Typography>
    ),
    alignStart: true,
    class: 'mt-20 mb-10',
  }
];

const IS_TREM_CHECKBOXES_FOR_INDIFI = [
  {
    name: 'IS_TREM_CHECKBOXES',
    value: 'IS_TREM_CHECKBOXES',
    label: (
      <Typography variant="caption" className="fs-sm-12 fs-14 col-text-primary-op5 ff-indivisible-b mt-05">
        Indifi & lenders need your permission. If you continue, you agree to &nbsp;
        <Typography
          color="primary"
          variant="caption"
          // href="/terms"
          onClick={(e) => {
            e.preventDefault();
            openLinkInWindow(external.INDIFI_PRIVACY_POLICY);
          }}
          className="fs-sm-12 fs-14 ff-indivisible-b"
        >
          Privacy Policy &nbsp;
        </Typography>
        and &nbsp;
        <Typography
          color="primary"
          variant="caption"
          // href="/terms"
          onClick={(e) => {
            e.preventDefault();
            openLinkInWindow(external.INDIFI_TREM_AND_CONDITION);
          }}
          className="fs-sm-12 fs-14 ff-indivisible-b"
        >
          Terms of Use. &nbsp;
        </Typography>
        <Typography
          color="primary"
          variant="caption"
          // href="/terms"
          onClick={(e) => {
            e.preventDefault();
            openLinkInWindow(external.INDIFI_BEURO_POLICY);
          }}
          className="fs-sm-12 fs-14 ff-indivisible-b"
        >
          Bureau Terms &nbsp;
        </Typography>
        for reviewing your credit reports WhatsApp Updates: For updates, loan details, reminders etc.
      </Typography>
    ),
    alignStart: true,
    class: 'mt-20 mb-10',
  }
];

const GENRAL_TERM_AND_CONDI = [
  {
    name: 'IS_GERNAL_TREM_CHECKBOXES',
    value: 'IS_GERNAL_TREM_CHECKBOXES',
    label: (
      <Typography variant="caption" className="fs-sm-12 fs-14 col-text-primary-op5 ff-indivisible-b">
        I acknowledge that I have read and agree to the Most Important Terms and Conditions (MITC) and the  &nbsp;
        <Typography
          color="primary"
          variant="caption"
          // href="/terms"
          onClick={(e) => {
            e.preventDefault();
            openLinkInWindow(external.GenralTermAndCondtion);
          }}
          className="fs-sm-12 fs-14 ff-indivisible-b"
        >
          General Terms and Conditions (GTC)
        </Typography>
      </Typography>
    ),
    alignStart: true,
    class: 'mt-20 mb-10',
  }
];

const ISCONDITION_CHECKBOXES_IDENTITY = [
  {
    name: 'ISGENRALANDTERMANDCONDITION',
    value: 'ISGENRALANDTERMANDCONDITION',
    label: (
      <Typography variant="caption" className="fs-sm-12 fs-14 col-text-primary-op5">
        I acknowledge that I have read and agree to the Most Important Terms and Conditions (MITC) and the
        &nbsp;
        <Typography
          color="primary"
          variant="caption"
          // href="/terms"
          onClick={(e) => {
            e.preventDefault();
            // window.open(common.Privacy);
          }}
          className="fs-sm-12 fs-14"
        >
          General Terms and Conditions (GTC)
        </Typography>
      </Typography>
    ),
    alignStart: true,
    class: 'mt-10 mb-10',
  }
];

const BENEFITS = [
  {
    id: '1',
    image: IMAGE_URLS.INTRO_SLIDER.SLIDE_2,
    benefit: 'Business loans up to ₹1 Crore',
  },
  {
    id: '2',
    image: IMAGE_URLS.INTRO_SLIDER.SLIDE_1,
    benefit: 'Interest rate as low as 0.7% per month ',
    margin: '-20px auto',
  },
  {
    id: '3',
    image: IMAGE_URLS.INTRO_SLIDER.SLIDE_4,
    benefit: 'Money in your bank in 48 hours',
    margin: '-20px auto',
  }
];

const LOGIN_PRODUCT_ITEMS = [
  {
    id: '1',
    primaryImage: '',
    primaryTitle: 'Introducing Term Loans',
    primarySubTitle: 'Term loans for you in just a few minutes',
    secondaryImage: IMAGE_URLS.INTRO_SLIDER.SLIDE_1,
  },
  {
    id: '2',
    primaryImage: IMAGE_URLS.INTRO_SLIDER.SLIDE_2,
    secondaryImage: '',
    secondaryTitle: 'Business loan up to ₹1 Crore',
    secondarySubTitle:
      'Focus on the growth of your business. Not the hassles of funding',
  },
  {
    id: '3',
    primaryImage: IMAGE_URLS.INTRO_SLIDER.SLIDE_3,
    secondaryImage: '',
    secondaryTitle: 'Interest rate as low as 0.7% per month',
    secondarySubTitle: 'Escape high interest rates on Term Loans from Pine Labs',
  },
  {
    id: '4',
    primaryImage: IMAGE_URLS.INTRO_SLIDER.SLIDE_4,
    secondaryImage: '',
    secondaryTitle: 'Money in your bank in 48 hours',
    secondarySubTitle: 'Disbursements directly in your bank account',
    margin: '-20px auto',
  }
];

const ProcessingRequest = [
  {
    content: 'Credit / disbursement of the loan amount is subject to Tele - Verification or further due diligence if any undertaken by the lending partner. ',
  },
  {
    content: 'We urge you to attend & co-operate with our executives for smoother & faster processing of your loan application. ',
  },
  {
    content: 'The inability to co-operate with the executives OR unsuccessful verification can terminate your loan application. ',
  }
];

// const getBankStatementUploadDates = () => {
//   let startDate = '';
//   let endDate = '';
//   if (moment().date() >= 20) {
//     startDate = moment().subtract(6, 'month').startOf('month').format('Do MMMM YYYY');
//     endDate = moment()
//       .subtract(1, 'month')
//       .endOf('month')
//       .format('Do MMMM YYYY');
//   }
//   if (moment().date() < 20) {
//     startDate = moment().subtract(6, 'month').startOf('month').format('Do MMMM YYYY');
//     endDate = moment()
//       .subtract(1, 'month')
//       .endOf('month')
//       .format('Do MMMM YYYY');
//   }
//   // const startDate = moment().subtract(1, 'year').startOf('month').format('Do MMMM YYYY');
//   return {
//     startDate,
//     endDate,
//   };
// };

const getBankStatementUploadDates = () => {
  const startDate = moment().subtract(1, 'year').startOf('month').format('Do MMMM YYYY');
  const endDate = moment()
    .subtract(1, 'month')
    .endOf('month')
    .format('Do MMMM YYYY');
  return {
    startDate,
    endDate,
  };
};

const BankStatementUploadNote = [
  {
    content:
      '1. Please share statement of the bank account where you receive your business proceeds.',
  },
  {
    content: (
      <>
        2. The date range of the Bank statements should be from&nbsp;
        <strong>
          {getBankStatementUploadDates().startDate}
          &nbsp;to&nbsp;
          {getBankStatementUploadDates().endDate}
        </strong>
      </>
    ),
  }
];

const LENDINGKARTNAMENote = (mobile, lenderName) => [
  {
    content: <>
      In the next page you will be landing on
      <span style={{ fontWeight: 600 }}>{' '}{lenderName}{' '}</span>
      platform. You will be asked to enter your mobile number to login and complete your loan application
    </>,
  },
  {
    content: <>
      Please make sure you use the same number i.e
      <span style={{ fontWeight: 600, color: '#333333' }}>{' '}{mobile}{' '}</span>
      via which you had started the application.
    </>,
  }
];

const LENDERNAMEINDIFINote = (lenderName) => [
  {
    content: <>
      In the next page you will be landing on
      <span style={{ fontWeight: 600, color: '#333333' }}>{' '}{lenderName}{' '}</span>
      platform.
    </>,
  },
  {
    content: <>
      Please complete your loan application for a faster disbursal.
    </>,
  }
];

const ITRRETURNUploadNote = [
  {
    content: 'Please share ITR of the latest 2 years',
  }
];
const SanctionLetterUploadNote = [
  {
    content:
      '1. Please share sanction letters of all the existing loans you have',
  },
  {
    content: (
      <>
        2. You can add multiple sanction letters if you have multiple existing loans with same bank by clicking&nbsp;
        <span
          style={{
            color: '#3AC838', fontSize: 12, fontFamily: 'Indivisible', fontWeight: '500', wordWrap: 'break-word',
          }}
        >
          “Add another Sanction Letter”
        </span>
      </>
    ),
  }
];

const AMBER_ERROR_BANK_MASSEGE = (
  <>
    The Bank statements should be from&nbsp;
    <strong>
      {getBankStatementUploadDates().startDate}
      &nbsp;to&nbsp;
      {getBankStatementUploadDates().endDate}
    </strong>
  </>
);

const TURNOVERMONTHLYSALES = ['Less than 1 Lac', '1 - 2 Lacs', '2 - 4 Lacs', '4 - 10 Lacs', 'Greater than 10 Lacs'];
const TURNOVERMONTHLYSALESPRE = ['Less than 1,00,000', '1,00,000 - 2,00,000', '2,00,001 - 4,00,000', '4,00,001 - 10,00,000', 'Greater than 10,00,000'];

const getStepsTL = () => {
  const TLSteps = [
    { label: 'KYC Done', nonApprove: 'You will be required to upload KYC Documents', content: 'Your KYC was successfully completed' },
    { label: 'Banking Approval', nonApprove: 'You will be required to upload your 1 Year Bank Statements', content: 'Your Bank Statements were approved' },
    { label: 'Final Sanction', nonApprove: 'Your Loan will be sanctioned by Flexi Loans Credit Team', content: 'Your Personal discussion was successfully completed' },
    { label: 'Agreement Sign', nonApprove: 'You will be required to digitally sign your agreement', content: 'The Agreement signing is complete' },
    { label: 'NACH Registration', nonApprove: 'You will be required to set up your NACH mandate', content: 'Your NACH setup is successful' },
    { label: 'Loan Disbursement', nonApprove: 'The Loan will be disbursed to your registered bank account', content: 'Your loan amount is successfully disbursed' }
  ];
  return TLSteps;
};

const REDIRECT_LIST_DATA = [
  {
    img: IMAGE_URLS.ICONS.LIST_ICON,
    label: `In the next page you will be landing on our Lending Partner's platform. You will be asked to enter your mobile number to login and complete your loan application.`,
  },
  {
    img: IMAGE_URLS.ICONS.LIST_ICON,
    label: `Please make sure you use the same number i.e `,
    seccondryLabel: 'via which you had started the application',
  }
];

const selectLenderCard = [
  {
    id: 1,
    logo: 'assets/icons/lendingCart.svg',
    bgContainer: 'assets/images/kyc/select-lender-cont.svg',
    lenderContBG: 'assets/images/kyc/select-lender-bg.svg',
    persentage: 'assets/icons/Percent.svg',
    curency: 'assets/icons/Cash.svg',
    loanTitel: 'Loan amount',
    ROITitel: 'Rate of Interest',
    loanAmount: '₹10000-₹3500000',
    ROI: '18-42%',
    btn: true,
    lenderName: 'LK',
  },
  {
    id: 2,
    logo: 'assets/icons/flexiLoan.svg',
    bgContainer: 'assets/images/kyc/select-lender-cont.svg',
    lenderContBG: 'assets/images/kyc/select-lender-bg.svg',
    persentage: 'assets/icons/Percent.svg',
    curency: 'assets/icons/Cash.svg',
    loanTitel: 'Loan amount',
    ROITitel: 'Rate of Interest',
    loanAmount: '₹10000-₹2500000',
    ROI: '17-27%',
    btn: true,
    lenderName: 'FL',
  },
  {
    id: 3,
    logo: 'assets/icons/indifi.svg',
    bgContainer: 'assets/images/kyc/select-lender-cont.svg',
    lenderContBG: 'assets/images/kyc/select-lender-bg.svg',
    persentage: 'assets/icons/Percent.svg',
    curency: 'assets/icons/Cash.svg',
    loanTitel: 'Loan amount',
    ROITitel: 'Rate of Interest',
    loanAmount: '₹10000-₹10000000',
    ROI: '16-28%',
    btn: true,
    lenderName: 'INDIFI',
  }
];
const TAB_CONTENT = ['Overview', 'Reservations', 'Expense'];
const TOTAL_REVENU = ['Today', 'Current Month', 'Current Year', 'Custom'];
const TOTAL_Detail = ['Monthly', 'Quaterly', 'Yearly'];
// const TOTAL_Breakup = ['Today', 'Current Month', 'Current Year', 'Custom'];

export {
  HEADER_TITLE,
  CONSTANTS,
  CTA_LABELS,
  ERRORS,
  CLASSES,
  ALT_CONSTANTS,
  INPUT_CONSTANTS,
  GATTING_CRITERIA,
  PROGRESS_BAR_CONSTANT,
  READ_MORE_EXPAND_TITLES,
  ISAUTHORISED_CHECKBOXES_IDENTITY,
  ISCONDITION_CHECKBOXES_IDENTITY,
  NOTES,
  LOCAL_STORAGE_HOTEL,
  LOCAL_STORAGE_HOTEL_ON_UNLOAD,
  SOMETHING_WENT_WRONG,
  BENEFITS,
  LOGIN_PRODUCT_ITEMS,
  ProcessingRequest,
  BankStatementUploadNote,
  IS_TREM_CHECKBOXES,
  IS_TREM_CHECKBOXES_FOR_INDIFI,
  GENRAL_TERM_AND_CONDI,
  AMBER_ERROR_BANK_MASSEGE,
  getStepsTL,
  REDIRECT_LIST_DATA,
  TURNOVERMONTHLYSALES,
  TURNOVERMONTHLYSALESPRE,
  FIRST_LOGIN_NUMBER,
  LOGGED_IN_FROM,
  DOC_CATEGRIES_LIST,
  SanctionLetterUploadNote,
  ITRRETURNUploadNote,
  LENDINGKARTNAMENote,
  LENDERNAMEINDIFINote,
  selectLenderCard,
  TAB_CONTENT,
  TOTAL_REVENU,
  TOTAL_Detail,
};
