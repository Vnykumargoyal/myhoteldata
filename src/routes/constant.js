const external = {
  TeamAndCondition: 'https://flexiloans.com/regulatory',
  GenralTermAndCondtion: 'https://flexiloans.com/regulatory#ui-id-3',
  callbackUrlForDigiLocker: 'https://credituat.pinelabs.com/tl/check-initiate-status',
  // protiumFlow: 'https://platform.protium.co.in/?platformCode=PLAT1115',
  protiumFlow: 'https://dbl.protium.co.in/?utm_source=pinelabs&utm_medium=blsls&utm_campaign=27042023',
  kartFlow: process.env.REACT_APP_LENDING_KART_URL,
  flexiLoan: process.env.REACT_APP_FLEXI_LOAN_URL,
  INDIFI_PRIVACY_POLICY: 'https://www.indifi.com/privacy-policy',
  INDIFI_TREM_AND_CONDITION: 'https://app.indifi.com/terms-and-conditions',
  INDIFI_BEURO_POLICY: 'https://www.indifi.com/bureau-tnc',
};

const routes = {
  redirect: '/redirecting',
  auth: {
    statApp: '/',
    login: '/login',
    registration: '/registration',
    logout: '/logout',
    otp: '/otp',
    appRedirection: '/resolved',
    hotelLocation: '/location',
    hotelAddress: '/add-address',
  },
  hotel: {
    addDetails: '/add-details-screen',
    addRoom: '/add-room',
    addFood: '/add-food',
    addEmployee: '/add-employee',
    businessDetails: '/business-details',
    totalRevenue: '/total-revenue',
    totalExpense: '/total-expense',
    totalProfit: '/total-profit',
  },
  error: {
    criteriaErrorPage: '/criteria-error-page',
    welComePageError: '/welcome-page-error',
    panInvalidErrorPage: '/pan-invalid-screen',
    panPageError: '/pan-error-screen',
    gstPageError: '/gst-error-screen',
    personalErrorPage: '/personal-error-page',
    eligibilityCheckErrorPage: '/eligibility-error-page',
    kycOfferReject: '/offer-error-screen',
    lendingKartReject: '/lendingKart-reject',
    pdReject: '/pd-error-screen',
    loanApplicationDeclined: '/application-declined',
  },
};

export { external, routes };
