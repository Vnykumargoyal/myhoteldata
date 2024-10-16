const IMAGE_URLS = {
  ICONS: {
    BACK_BUTTON: 'assets/icons/back-icon.svg',
    EDIT: 'assets/icons/edit.svg',
    LEFT_ARROWS: 'assets/icons/right-arrows.svg',
    RIGHT_ARROWS: 'assets/icons/left-arrows.svg',
    DOWN: 'assets/icons/down.svg',
    DOCUMENT: 'assets/icons/document.svg',
    NO_DATA_FOUND_BOTTOM_SHEET: 'assets/icons/warning.svg',
    CALENDAR: 'assets/icons/calendar.svg',
    SEARCH: 'assets/icons/search.svg',
    CHECK: 'assets/icons/check.svg',
    UPLOAD: 'assets/icons/upload-icon.svg',
    PREVIEW: 'assets/icons/preview.svg',
    CROSS: 'assets/icons/cross.svg',
    CLOSE: 'assets/icons/close.svg',
    ADD: 'assets/icons/add.svg',
    NOTE_LIST: 'assets/icons/note-list.svg',
    SELECT_ARROW: 'assets/icons/select-arrow.svg',
    SELECT_MUILT_ARROW: 'assets/icons/select-multi-line.svg',
    BANK: 'assets/icons/bank.svg',
    LOADER: 'assets/icons/loader.svg',
    DOWN_ARROW: 'assets/icons/down-arrow.svg',
    DELETE: 'assets/icons/delete-file.svg',
    MOBILE: 'assets/icons/mobile-icon.svg',
    CORSS_RED: 'assets/icons/crossRed.svg',
    WATCH: 'assets/icons/watch.svg',
    CHECk_GRAY: 'assets/icons/check-gray.svg',
    PHONE: 'assets/icons/phone.svg',
    CIRCLE: 'assets/icons/circle.svg',
    CIRCLE_CHECK: 'assets/icons/check-circle.svg',
    SMS: 'assets/icons/sms.svg',
    CLOSE_MODAL: 'assets/icons/close_Modal.svg',
    LIST_ICON: 'assets/icons/list_Icon.svg',
    RIGHT_ARROW: 'assets/icons/right-arrow.svg',
    LIMIT_ICON: 'assets/icons/limit-icon.svg',
    DEL: 'assets/icons/del.svg',
    WAR_ACTIVE: 'assets/icons/wan-active.svg',
    CIRCLE_IMAGE: 'assets/icons/circleImgWarning.svg',
    CIRCLE_IMAGE_SIMPLE: 'assets/icons/circleImg.svg',
  },
  LOGOS: {
    PINELABS_LOGO: 'assets/logos/pinelabs-logo.svg',
    PINELABS_MINI: 'assets/logos/pinelabs-mini.png',
  },
  ERRORS: {
    NO_INTERNET: 'assets/images/error/no-internet.svg',
    LOST: 'assets/images/error/lost.svg',
    ERROR_500: 'assets/images/error/error-500.svg',
    COMMON_ERROR: 'assets/images/error/common-error.svg',
    OTP_LIMIT_EXCEED: 'assets/icons/otpLimit.svg',
    REJECT_CASE: 'assets/images/error/manRejectCase.svg',
    REJECT_CELENDER: 'assets/images/error/celenderData.svg',
    APPLICATION_DECLINED: 'assets/images/error/application-declined.svg',
    OLD_AND_NEW_JOURANY: 'assets/images/error/imgoldAndNew.svg',
    UNABLE_TO_CONT: 'assets/images/error/UNABLE_TO_CON.svg',
  },
  PAN_SCREEN: {
    BACKGOUND: 'assets/images/pan/bg.svg',
    MAN: 'assets/images/pan/man.svg',
    PAN_WITH_P: 'assets/images/pan/pan-with-p.svg',
    PAN_WITH_C: 'assets/images/pan/pan-with-c.svg',
    PAN_WITH_F: 'assets/images/pan/pan-with-f.svg',
    OFFER_EXPIRED: 'assets/images/pan/offer-expired.svg',
    GST_CHECK_NO: 'assets/images/pan/gst-check-no.svg',
    CARD_IMAGE: 'assets/images/pan/card.svg',
  },
  KYC_SCREEN: {
    KYC_FAILED: 'assets/images/kyc/kyc-failed.svg',
    LARGE_SIZE_IMAGE: 'assets/images/kyc/size-large.svg',
    VALIDATE_REQUEST: 'assets/images/kyc/validate-request.svg',
    KYC_REJECT: 'assets/images/kyc/kyc-reject.svg',
    KYC_DONE_BACKGROUND: 'assets/images/kyc/backgroud.svg',
    KYC_DONE_LOCK: 'assets/images/kyc/lock.svg',
    KYC_DONE_FRAME: 'assets/images/kyc/kyc-frame.svg',
    KYC_BOTTOM_SECTION_BACKGROUND: 'assets/images/kyc/bottom-background.svg',
    KYC_BLUR: 'assets/images/kyc/blurred.svg',
    KYC_FRAME_BG: 'assets/images/kyc/bg-upload.svg',
    TWO_PIZZA_SLICE: 'assets/images/kyc/two-pizza-slices.svg',
    SUBMITED_DOC: 'assets/images/kyc/submited_doc.svg',
    CONG_IMG: 'assets/images/offer/cong-img.svg',
    DISBURSAL_IMG: 'assets/images/offer/disbursed.svg',
  },
  PD_WAIT: {
    PD_PROGRESS: 'assets/images/pd/pd-wait.svg',
    FLOW: 'assets/images/pd/flow.svg',
    SETUP_COMPLETE: 'assets/images/pd/setup-complete.svg',
  },
  INTRO_SLIDER: {
    SLIDE_1: 'assets/images/intro-slider/slide-1.svg',
    SLIDE_2: 'assets/images/intro-slider/slide-2.svg',
    SLIDE_3: 'assets/images/intro-slider/slide-3.svg',
    SLIDE_4: 'assets/images/intro-slider/slide-4.svg',
  },
  HEADER: {
    HEADER_BACKGROUND: 'assets/header/header-back.svg',
  },
  BANK: {
    ADD_ACCOUNT_SUCCESS: 'assets/images/bank/accound-added.svg',
    UPLOAD: 'assets/images/bank/upload-indifi.svg',
  },
  BANK_ICON_LIST: {
    ALLAHABAD: 'assets/bank-icon/allahabad.svg',
    ANDRA: 'assets/bank-icon/andra.svg',
    AU: 'assets/bank-icon/au.svg',
    AXIS: 'assets/bank-icon/axis.svg',
    FEDERAL: 'assets/bank-icon/federal.svg',
    HDFC: 'assets/bank-icon/HDFC.svg',
    ICICI: 'assets/bank-icon/ICICI.svg',
  },
  WAIT: {
    BOTTOM_DOTTED: 'assets/bottomDotted/bottomDotted.svg',
    GIF: 'assets/gif/pinelabs-loader.gif',
  },
  REDIRECT: {
    REDIRECT_IMG: 'assets/images/redirect/redirecting.svg',
    REDIRECT_BG: 'assets/images/redirect/redirectingBg.svg',
    REDIRECT_LOADER: 'assets/images/redirect/redirectloader.svg',
    REDIRECTION_IMG: 'assets/images/redirect/redirect-img.svg',
    REDIRCTION_STATEMENT: 'assets/images/redirect/redirect-statement.svg',
    TITLE_REDIRECT_IMG: 'assets/images/redirect/redrectPageImag.svg',
    REDIRECTION_INDIFI_IMG: 'assets/images/redirect/indifiRedirection.svg',
  },
  OFFER: {
    OFFER_NOT_AVAL: 'assets/images/offer/offer-not-aval.svg',
  },
  NACH: {
    NACH_IMG: 'assets/images/nach/nach.svg',
  },
  WEBHOOK: {
    CHECK: 'assets/images/webhook/check-main.svg',
  },
};

export default IMAGE_URLS;
