/* eslint-disable max-len */
/* eslint-disable import/no-cycle */
/* eslint-disable quotes */
import React from 'react';
import { Typography } from '@material-ui/core';
import moment from 'moment';

import IMAGE_URLS from '../images';
import { external } from '../../routes/constant';
import { openLinkInWindow } from '../../helpers/appHandlers';

const HEADER_TITLE = 'सावधि ऋण';
const LOCAL_STORAGE_HOTEL = 'tremloan';
const LOCAL_STORAGE_HOTEL_ON_UNLOAD = 'tremloan_storage';

const CONSTANTS = {
  NO_INTERNET: 'इंटरनेट नहीं है',
  OFFLINE: 'ऑफ़लाइन!',
  CONNECTION_LOST: 'इंटरनेट कनेक्शन टूट गया',
  CHECK_INTERNET: 'कृपया अपने इंटरनेट कनेक्शन की जाँच करें और पृष्ठ को पुनः लोड करें',
  ENTER_MOBILE: 'मोबाइल नंबर दर्ज करें',
  ENTER_REGISTERED_MOBILE: 'अपना पाइन लैब्स पंजीकृत मोबाइल नंबर दर्ज करें',
  COUNTRY_CODE: '+91',
  ENTER_OTP: 'ओटीपी दर्ज करें',
  SENT_TO: 'भेजा',
  NOT_GET_OTP: 'ओटीपी नहीं मिला? ',
  RESEND_OTP_IN: 'में ओटीपी फिर से भेजें',
  BENEFITS: 'सावधि ऋण के लाभ',
  SELECT_AMOUNT: 'संसाधित की जाने वाली राशि का चयन करें/दर्ज करें',
  PICK_EMI_TENURE: 'अपनी ईएमआई अवधि चुनें',
  A_FEW_STEP: 'कुछ ही चरणों में',
  UNLOCK_TEXT: 'अपने बैंक खाते में धनराशि निकालने के लिए अनलॉक करें और साइन अप करें।',
  UNLOCK: 'खोल देना',
  BASIS_INFO_TITLE: 'आइए कुछ विवरणों की पुष्टि करें',
  PINCODE_NOT_FOUND: 'पिन कोड नहीं मिला, ऐसा लगता है कि हम अभी तक इस पिन कोड की सेवा नहीं देते हैं',
  PROVIDED_INFO: 'कृपया सुनिश्चित करें कि आपके द्वारा प्रदान की गई जानकारी सही है',
  PROVIDED_INFP_LEAD_REJECT: 'गलत जानकारी दर्ज करने से अस्वीकृति हो जाएगी',
  CONFIRM_DETAILS: 'विवरण की पुष्टि करें',
  MERCHANTSCOUNT: '12k',
  PAN_TITLE: 'आइए आपको शुरू करते हैं',
  PAN_EDUCATION: 'कृपया सभी चरणों को पूरा करें ताकि हम इसे पूरा कर सकें',
  PREFILLED_PAN_TITLE: 'आइए आपके पैन को मान्य करते हैं',
  PAN_BUTTON_LABEL: 'पैन मान्य करें',
  PAN_WITH_P_TITLE: 'कृपया सुनिश्चित करें कि आपने एक मालिक पैन (बिजनेस पैन) दर्ज किया है',
  PAN_WITH_P_SUBTITLE: 'ऊपर की छवि के अनुसार, एक प्रोप्राइटर पैन में हमेशा चौथा अक्षर P होगा',
  PAN_WITH_P_LEAD: 'गलत पैन दर्ज करने से अस्वीकृति हो जाएगी',
  PAN_WITH_F_TITLE: 'दर्ज किया गया पैन पार्टनरशिप पैन नहीं है। या तो अपना व्यवसाय प्रकार बदलें या एक सही साझेदारी पैन दर्ज करें',
  PAN_WITH_F_SUBTITLE: 'उपरोक्त छवि के अनुसार, एक कंपनी पैन में हमेशा चौथा अक्षर F होगा',
  PAN_WITH_C_TITLE: 'दर्ज किया गया पैन कंपनी पैन नहीं है। या तो अपना व्यवसाय प्रकार बदलें या एक सही कंपनी पैन दर्ज करें',
  PAN_WITH_C_SUBTITLE: 'उपरोक्त छवि के अनुसार, एक कंपनी पैन में हमेशा चौथा अक्षर C होगा',
  PAN_WITH_P_LABEL: 'पैन नंबर डाला',
  OFFER_NOT_FOR_C_HEADING: 'आपकी जानकारी साझा करने के लिए धन्यवाद',
  OFFER_NOT_FOR_WRONG_PAN_HEADING: 'ऐसा लगता है कि आपने गलत पैन दर्ज किया है',
  ENTER_NON_PROPRITETOR_PAN: 'ऐसा लगता है कि आपने एक गैर-स्वामित्व पैन दर्ज किया है',
  OFFER_NOT_FOR_P_SUBHEADING: 'इसलिए, हम आपको यात्रा में आगे नहीं बढ़ा पाएंगे।',
  OFFER_NOT_FOR_C_BOTTOMHEADING: 'आगे की प्रक्रिया के लिए हमारी टीम आपसे संपर्क करेगी।',
  OFFER_NOT_FOR_P_BOTTOMHEADING: 'बने रहें, हमने आपकी जानकारी संग्रहीत कर ली है और अन्य प्रस्तावों के साथ आपके पास वापस आएंगे',
  GST_CHECKED_YES: 'अपना जीएसटी नंबर दें',
  GST_CHECK_NO_TITLE: 'कोई चिंता नहीं, हम आपके पास हैं।',
  GST_CHECK_NO_SUBTITLE: 'कृपया अपना ऋण आवेदन पूरा करना जारी रखें।',
  GST_VALIDATE_LABEL: 'जीएसटी नंबर दर्ज किया',
  GST_VALIDATE_HEADING: 'आपके द्वारा दर्ज किए गए जीएसटी नंबर के आधार पर, यह आपका पैन है',
  GST_VALIDATE_SUBHEADING: 'सुनिश्चित करें कि यह पैन एक प्रोप्राइटर पैन है एक प्रोप्राइटर पैन में हमेशा चौथा अक्षर P होगा',
  PERSONAL_INFO_HEADING: 'हमें कुछ बुनियादी जानकारी की आवश्यकता होगी',
  ADDRESS_INFO_HEADING: 'व्यवसाय और वर्तमान पता चुनें',
  OM_ADDRESS_INFO_HEADING: 'व्यवसाय और वर्तमान पता दर्ज करें',
  ADDRESS_INFO_BUSINESS_TITEL: 'आपका व्यावसायिक पता',
  ADDRESS_INFO_CURRENT_SUBTITEL: 'आपका वर्त्तमान पता',
  KYC_FAILED_HEADING: 'केवाईसी सत्यापन प्रक्रिया',
  KYC_FAILED_SUBHEADING: 'हमें अपनी यात्रा जारी रखने के लिए आपको अपना केवाईसी पूरा करने की आवश्यकता होगी',
  KYC_FAILED_BOTTOMHEADING: 'अगले चरण में आपको एक पृष्ठ पर पुनर्निर्देशित किया जाएगा जहां आपको डिजिलॉकर के माध्यम से अपना केवाईसी साझा करने की आवश्यकता होगी।',
  IDENTITY_PROOF_HEADING: 'पहचान का सबूत',
  BUSINESS_KYC_HEADING: 'व्यवसाय केवाईसी सत्यापन',
  ANY_ONE_OF_BELOW: 'निम्न में से कोई एक',
  PAN_CARD_LABEL: 'पैन कार्ड',
  PAN_FILE_NAME: 'panFiles',
  IDENTITY_PROOF_FILE_NAME: 'identityFiles',
  BUSINESS_KYC_FILE_NAME: 'businessFiles',
  VALIDATE_REQUEST_HEADING: 'अनुरोध मान्य किया जा रहा है...',
  VALIDATE_REQUEST_TITEL: 'हम आपके आवेदन पर कार्रवाई कर रहे हैं',
  VALIDATE_REQUEST_SUBTITEL: 'आपकी पात्रता का पता लगाने में आमतौर पर 6 से 12 घंटे तक का समय लगता है।',
  VALIDATE_REQUEST_BOTTOM_TITEL: 'वापस बैठो और आराम करो।',
  VALIDATE_REQUEST_BOTTOM_SUBTITEL: 'हम आपको अपडेट के साथ सूचित करेंगे।',
  KYC_REJECT_TITEL_UH: 'उह ओह!',
  KYC_REJECT_TITEL_REWORK: 'दोबारा काम करने की जरूरत है',
  KYC_REJECT_SUBTITEL: 'अपलोड किए गए दस्तावेज़ के नाम में कोई समस्या प्रतीत होती है, कृपया दस्तावेज़ को पुनः अपलोड करें।',
  KYC_RETRY_TEST: 'There seems to be an issue with the ',
  UPLOADED: ' uploaded',
  PLEASE_REUPLOAD: 'Please re-upload ',
  ADD_NEW_ADDRESS: 'नया पता जोड़ें',
  KYC_DONE_TITEL: 'बहुत बढ़िया!',
  KYC_DONE_SUBTITEL: 'आपकी क्रेडिट सीमा अब अनलॉक हो गई है',
  KYC_DONE_TITEL_INCRESE_YI: 'हाँ!',
  KYC_DONE_TITEL_INCRESE_HIGHER: 'हमने आपको एक उच्च प्रस्ताव दिया है',
  KYC_DONE_TITEL_DECRESE_LOWER: 'आपका प्रस्ताव संशोधित किया गया है',
  KYC_DONE_TITEL_DECRESE_LOWER_BOTTOM: 'इस सीमा को टेली-सत्यापन के आधार पर संशोधित किया गया है',
  REVISE_OFFER: 'पूनरीक्षित ऑफ़र',
  LINE_AMOUNT: 'रेखा राशि',
  ROI: 'ब्याज की दर',
  TENOR: 'तत्त्व',
  UPLOADED_BANK_STATEMENT_KYC: 'अपने बैंक विवरण साझा करने के लिए धन्यवाद',
  ORIGINAL_AMOUNT_KYC: 'मूल प्रस्ताव',
  PD_PROGRESS_HEADING: 'सत्यापन प्रगति पर है',
  PD_PROGRESS_TITEL: 'तब तक, वापस बैठो और आराम करो।',
  ESIGN_FLOW_HEADING: 'आपके हस्ताक्षर करने के लिए ऋण समझौता तैयार है',
  CLICK_WRAP_HEADING: 'आपके हस्ताक्षर करने के लिए ऋण समझौता तैयार है',
  HEY: 'अरे',
  OFFER_BY: 'के द्वारा दिया गया',
  ROI_DATA: 'लागत पर लाभ',
  ESIGN_NOTE: 'कृपया सुनिश्चित करें कि ई-हस्ताक्षर शुरू करने से पहले आपका मोबाइल नंबर आपके आधार कार्ड से जुड़ा हुआ है।',
  CLICK_WRAP_NOTE: 'संवितरण ऋण दस्तावेजों के सत्यापन और निष्पादन के अधीन है',
  NOT_LINKED_MOBILE_NUMBER: 'मोबाइल नंबर आधार से लिंक नहीं?',
  ESIGN_SKIP_TITEL: 'आपका ऋण अनुबंध ऑफ़लाइन सत्यापित किया जाएगा',
  ESIGN_SKIP_SUBTITEL: 'समझौते पर व्यक्तिगत रूप से हस्ताक्षर करने के लिए एक कार्यकारी आपके पास आएगा।',
  SELECT_BANK_HEADING: 'बैंक खाते का चयन करें',
  ADD_BANK_HEADING: 'व्यवसाय बैंक खाता विवरण जोड़ें',
  SELECT_BANK_COMMON_HEADING: 'अपने बैंक में फंड ट्रांसफर करें',
  SELECT_BANK_COMMON_SUBHEADING: 'चुकौती - आपके ऋण की चुकौती के लिए किश्तों के संग्रह के लिए',
  SELECT_BANK_COMMON_TITEL: 'हमें आपके बैंक विवरण की आवश्यकता है:',
  SELECT_BANK_COMMON_NOTE: 'संवितरण ऋण दस्तावेजों के सत्यापन और निष्पादन के अधीन है',
  SELECT_BANK_SUBHEADING: 'बैंक खाते का चयन करें',
  SOMETHING_WENT_WRONG: 'कुछ गलत हो गया।',
  MONTH: 'महीने',
  COMMONERRORTITEL: 'अरे, ऐसा लगता है कि हमारे पास इस समय आपके लिए कोई पेशकश नहीं है',
  COMMONHEADINGTITEL: 'उह ओह! ',
  COMMONBOTTOMHEADING: 'आपको चिंता करने की आवश्यकता नहीं है, हमने आपका विवरण सुरक्षित कर लिया है। हम जल्द ही आपके लिए एक प्रस्ताव लेकर वापस आएंगे।',
  OFFER_NOT_HAVE: 'हम इस समय आपके लिए कोई प्रस्ताव नहीं ला सके',
  CHECK_IN_AGAIN: '',
  PERSONALBOTTOMHEADING: 'हम आपको ऋण की पेशकश नहीं कर सकते क्योंकि यह बैंकिंग भागीदार मानदंडों को पूरा नहीं करता है',
  MIN: 100000,
  MAX: 10000000,
  STEP: 25000,
  DEFAULT_AMOUNT: 750000,
  EMI_TENURE: 36,
  HEADER_TITLE: 'बैंक विवरण जोड़ें',
  NOTE: 'ध्यान दें',
  ADDRESS_NOT_FOUND: 'हम कोई पता प्राप्त नहीं कर सके, ऊपर से एक पता जोड़ने का प्रयास करें',
  REDIRECT_TO_DIGILOCKER: 'आइए डिजिलॉकर को पुनर्निर्देशित करें',
  ADD_EDIT: 'बैंक जोड़ें या संपादित करें',
  DOC_UPLOAD: 'दस्तावेज़ अपलोड किए गए',
  ADD_BANK: 'बैंक जोड़ें',
  EACH_FILE: 'प्रत्येक फ़ाइल का कुल अपलोड आकार 10 एमबी होना चाहिए',
  TOTAL_SIZE: 'कुल अपलोड फ़ाइल आकार सीमा है',
  AMBER_WAIT_HEADER: 'अपना बैंक स्टेटमेंट सबमिट करने के लिए धन्यवाद',
  AMBER_VALIDATE_REQUEST_SUBTITEL: 'आपकी पात्रता का पता लगाने में आमतौर पर 8 से 10 घंटे तक का समय लगता है। ',
  AMBER_REJECT: 'हमने आपके बैंक स्टेटमेंट की समीक्षा की है',
  AMBER_REJECT_BOTTOM: 'उधार देने वाले भागीदार की सत्यापन प्रक्रिया प्रगति पर है। हम आपको जल्द ही ऑफ़र विवरण के साथ सूचित करेंगे।',
  OFFER_EXPIRED: 'प्रस्ताव समाप्त हो गया',
  OFFER_NO_LONGER: 'यह ऑफर अब उपलब्ध नहीं है',
  OFFER_NOT_UPDATED: 'चिंता न करें, यह ऑफ़र आपके लिए फिर से उपलब्ध कराए जाने के बाद हम आपको अपडेट करेंगे',
  HEY: 'हे',
  BUDDY: 'यार',
  SUB_TITEL_FOR_ADDRESS: 'ऋणदाता भागीदार आपसे इस पते पर मिल सकता है',
  TITEL_FOR_ADDRESS: 'पता संपादित करें',
  AMBER_ERROR_MESSAGE: 'ऐसा लगता है कि बैंक विवरण में कोई समस्या है, कृपया बैंक विवरण पुनः अपलोड करें',
  NACH_TITEL: 'आइए अपना एनएसीएच सेट करें',
  DISBURSAL_TITEL: 'किए गए!',
  DISBURSAL_SUB_TITEL: `ऋण देने वाले भागीदार द्वारा किए गए 'और उचित परिश्रम यदि कोई हो' के अधीन 48-72 घंटों के भीतर आपके बैंक खाते में ऋण राशि वितरित कर दी जाएगी। `,
  DISBURSAL_AMOUNT_TITEL: 'राशि का भुगतान किया जाना है',
  DISBURSED_AMOUNT_TITEL: 'वितरित राशि',
  PROCESSING_FEE: 'प्रक्रमण संसाधन शुल्क',
  LOAN_AMOUNT: 'उधार की राशि ',
  GST_TEXT: 'जीएसटी',
  DISBURSED_TITEL: 'बधाई हो!',
  DISBURSED_SUB_TITEL: 'आपकी ऋण राशि का भुगतान कर दिया गया है।',
  MOBILE_VERIFY: 'कृपया अपना मोबाइल नंबर सत्यापित करें',
  PROCIDE_WITH: 'आगे बढ़ने के लिए',
  ESIGN_HEADING: 'आवेदन करने के लिए धन्यवाद!',
  ESIGN_BOTTOM_HEADING: 'आगे की प्रक्रिया के लिए हमारा उधार देने वाला साथी आपसे संपर्क करेगा। कृपया अपनी ऋण राशि के सुचारू प्रसंस्करण और तेजी से संवितरण के लिए अधिकारियों के साथ सहयोग करें।',
  Charges: 'शुल्क',
  COMPLETED: 'पुरा होना',
  SUCCESSFULLDIS: 'आपका ऋण सफलतापूर्वक वितरित किया गया है',
  GOTYOURDETAILD: 'धन्यवाद, हमें आपका विवरण मिल गया है!',
  FORNALITIES: 'शेष औपचारिकताओं को पूरा करने के लिए हमारे उधार देने वाले पार्टनर फ्लेक्सी लोन आपके पास पहुंचेंगे!',
  EXECUTIVE: 'एक फ्लेक्सी लोन एक्जीक्यूटिव आपको कॉल करेगा',
  CALLERID: 'कॉलर आईडी:',
  SENDERID: 'एसएमएस प्रेषक आईडी:',
  TRACKSTATUS: 'अपनी स्थिति ट्रैक करें',
  KEYSTEPS: 'आगे फ्लेक्सी लोन टीम द्वारा उठाए जाने वाले प्रमुख कदमों की सूची नीचे दी गई है। आप हमेशा Pinelabs साइट पर लॉग इन करके अपने ऋण आवेदन की स्थिति की जांच कर सकते हैं।',
  INVALID_PAN: 'यह एक अमान्य पैन जैसा दिखता है',
  INVALID_BUSINESS_NAME: 'कृपया हमें वह पैन दें जो आपके व्यवसाय के नाम से जुड़ा है',
};

const CTA_LABELS = {
  SEND_OTP: 'ओटीपी भेजें',
  SUBMIT: 'प्रस्तुत करना',
  EDIT: 'संपादन करना',
  RESEND_OTP: 'ओटीपी पुनः भेजें',
  UNLOCK: 'अनलॉक करना जारी रखें',
  CONFIRM: 'पुष्टि करें',
  CONTINUE: 'जारी रखना',
  EDIT_DETAILS: 'विवरण संपादित करें',
  EDIT_PAN: 'पान संपादित करें',
  CHANGE_PAN_NUMBER: 'पैन नंबर बदलें',
  SWITCH_BUSINESS_TYPE: 'व्यवसाय प्रकार स्विच करें',
  LOGOUT: 'लॉग आउट',
  EDIT_GST: 'जीएसटी संपादित करें',
  UPLOAD: 'तस्विर अपलोड करना!!',
  VALIDATE_REQUEST: 'अनुरोध मान्य करें!!',
  OFFER_WITH_THIS: 'मूल प्रस्ताव के साथ जारी रखें',
  OFFER_WITH_HIGHER_AMOUNT: 'इस ऑफर को जारी रखें',
  I_AGREE: 'मैं सहमत हूं',
  VIEW_AGGREMENT: 'समझौता देखें',
  CLICK_HERE: 'यहां क्लिक करें',
  GO_BACK: 'वापस जाओ',
  OK_PROCEED: 'ठीक है चालू रखो',
  ADD_NEW_BANK_ACCOUNT: 'नया बैंक खाता जोड़ें',
  DONE: 'किया हुआ',
  RE_LOAD: 'पुनः लोड करें',
  GOT_IT: 'समझ गया',
  RE_UPLOAD: 'फिर से अपलोड करें',
  SAVE_PROCEED: 'Save & Proceed',
  RETRY: 'पुन: प्रयास करें',
  NACH_START: 'एनएसीएच शुरू करें',
  GET_OTP: 'ओटीपी प्राप्त करें',
  VERIFY_OTP: 'ओटीपी सत्यापित करें',
  ADD: 'जोड़ना',
  // UPLOAD: 'डालना'
};

const ERRORS = {
  NO_ERROR: '',
  INVALID_MOBILE: 'एक मान्य 10-अंकीय मोबाइल नंबर दर्ज करें',
  ENTER_VALID_OTP: 'कृपया छह अंकों का वैध ओटीपी दर्ज करें',
  SELECTED_AMOUNT_INVALID: 'राशि 1L से अधिक या उसके बराबर होनी चाहिए',
  SELECTED_AMOUNT_MAX_INVALID: 'राशि 1CR से कम या उसके बराबर होनी चाहिए',
  ENTER_AMOUNT: '50,000 के गुणकों में राशि दर्ज करें',
  ERROR_404_BOTTOM: 'आप जो खोज रहे हैं वह हमें नहीं मिल रहा है',
  ERROR_404_LOST: 'खोया?',
  ERROR_404_NOT_FOUND: 'पृष्ठ नहीं मिला',
  ERROR_500_HEADING: 'कुछ छूट रहा है',
  ERROR_500_UNEXPECTED: 'आपको एक अनपेक्षित त्रुटि मिली है',
  ERROR_500_FIXING: 'हमारी टीम पहले से ही इसे ठीक कर रही है।',
  ERROR_500_TRYING: 'आप कुछ देर में फिर से कोशिश कर सकते हैं',
  ENTER_VALID_EMAIL: 'वैध ईमेल आईडी दर्ज करें',
};

const ALT_CONSTANTS = {
  EDIT: 'संपादित करें बटन',
  LEFT_ARROWS: 'बायाँ तीर',
  RIGHT_ARROWS: 'दायाँ तीर',
  DOWN: 'डाउन बटन',
  PINCODE_NOT_FOUND: 'पिनकोड नहीं मिला',
  CHECK: 'चिह्न जांचें',
  PAN: 'पैन नमूना !!',
  GST_CHECK_NO: 'जीएसटी चेक नहीं !!',
  KYC_FAILED: 'केवाईसी फेल !!',
  ADD_ICON: 'चिह्न जोड़ें',
  ERROR_404: 'त्रुटि 404',
  ERROR_500: 'त्रुटि 500',
  ADDRESS_NOT_FOUND: 'पता नहीं पाया गया',
  REDIRECT_TO_DIGILOCKER: 'आइए डिजिलॉकर को पुनर्निर्देशित करें',
  REDIRECT_LOADER: 'लोडर',
  WATCH: 'शो आइकन देखें',
  CLOSE_MODAL: 'पॉपअप बंद करें !!'
};

const INPUT_CONSTANTS = {
  DOB: 'जन्म की तारीख',
  ageOfBusiness: 'व्यवसाय की आयु',
  turnoverMonthlySales: 'कारोबार (मासिक बिक्री)',
  natureOfBusiness: 'व्यवसाय की प्रकृति',
  profileOfBusiness: 'व्यवसाय की रूपरेखा',
  AGE_OF_BUSINESS_NAME: 'ageOfBusiness',
  TURNOVER_MONTHLY_SALES_NAME: 'turnoverMonthlySales',
  NATURE_OF_BUSINESS_NAME: 'natureOfBusiness',
  PROFILE_OF_BUSINESS_NAME: 'profileOfBusiness',
  residenceOwnership: 'निवास का स्वामित्व',
  RESIDENCE_OWNERSHIP_NAME: 'residenceOwnership',
  businessOwnership: 'व्यवसाय। का स्वामित्व',
  BUSINESS_OWNERSHIP_NAME: 'businessOwnership',
  residencePinCode: 'निवास पिन कोड/शहर',
  residenceCity: 'निवास पिन कोड/शहर',
  RESIDENCE_PINECODE_NAME: 'residencePinCode',
  businessPinCode: 'व्यापार पिन कोड/शहर',
  businessCity: 'व्यापार पिन कोड/शहर',
  BUSINESS_PINECODE_NAME: 'businessPinCode',
  PLACEHOLDER_PINCODE: 'अपना पिन कोड टाइप करना प्रारंभ करें',
  PLACEHOLDER_PROFILE: 'यहां प्रोफाइल खोजें',
  BUSINESSTYPES_LABEL: 'अपने व्यवसाय का प्रकार चुनें',
  BUSINESSTYPES_NAME: 'businessType',
  PAN_NUMBER_LABEL: 'व्यवसाय पैन संख्या',
  PAN_NUMBER_NAME: 'panNumber',
  PAN_FOR_PROPRIETOR: 'यह कार्यक्रम केवल एकमात्र मालिक के लिए है',
  GST_LABEL: 'क्या आप जीएसटी पंजीकृत उपयोगकर्ता हैं?',
  GST_NAME: 'gst',
  BUSINESS_NAME_LABLE: 'व्यवास्यक नाम',
  BUSINESS_NAME_NAME: 'businessName',
  GST_NUMBER_LABEL: 'जीएसटी संख्या',
  GST_NUMBER_NAME: 'gstNumber',
  GENDER_LABEL: 'लिंग',
  GENDER_NAME: 'gender',
  FIRST_NAME_LABEL: 'पहला नाम',
  FIRST_NAME_NAME: 'firstName',
  MIDDLE_NAME_LABEL: 'बीच का नाम (स्वैच्छिक)',
  MIDDLE_NAME_NAME: 'middleName',
  LAST_NAME_LABEL: 'अंतिम नाम',
  LAST_NAME_NAME: 'lastName',
  FATHER_NAME_LABEL: 'पिता का नाम',
  FATHER_NAME_NAME: 'fatherName',
  EMAIL_ID_LABEL: 'ईमेल आईडी',
  EMAIL_ID_NAME: 'email',
  MARITIAL_STATUS_LABEL: 'वैवाहिक स्थिति',
  MARITAL_STATUS_NAME: 'maritialStatus',
  FIRST_NAME_PLACEHOLDER: 'पैन के अनुसार पहला नाम',
  MIDDLE_NAME_PLACEHOLDER: 'मध्य नाम यदि कोई हो',
  LAST_NAME_PLACEHOLDER: 'पैन के अनुसार उपनाम',
  EMAIL_PLACEHOLDER: 'ईमेल दर्ज करें',
  BUSINESS_NAME_PLACEHOLDER: 'आपके व्यवसाय का नाम',
  FATHER_NAME_PLACEHOLDER: 'पिता का नाम पैन के अनुसार',
  ADDRESS_LINE_ONE_LABEL: 'पता पंक्ति 1',
  ADDRESS_LINE_ONE_PLACEHOLDER: 'पता पंक्ति 1 दर्ज करें',
  BUSINESS_ADDRESS_LINE_ONE_NAME: 'addressLineOne',
  CURRENT_ADDRESS_LINE_ONE_NAME: 'addressLineOne',
  ADDRESS_LINE_TWO_LABEL: 'पता पंक्ति नं। 2',
  ADDRESS_LINE_TWO_PLACEHOLDER: 'पता पंक्ति 2 दर्ज करें',
  BUSINESS_ADDRESS_LINE_TWO_NAME: 'addressLineTwo',
  CURRENT_ADDRESS_LINE_TWO_NAME: 'addressLineTwo',
  STATE_LABLE: 'राज्य',
  STATE_PLACEHOLDER: 'राज्य चुनें',
  BUSINESS_STATE_NAME: 'state',
  CURRENT_STATE_NAME: 'state',
  PINCODE_LABEL: 'पिन कोड',
  PINCODE_PLACEHOLDER: 'पिनकोड दर्ज करें',
  BUSINESS_PINCODE_NAME: 'pincode',
  CURRENT_PINCODE_NAME: 'pincode',
  COUNTRY_LABEL: 'देश',
  COUNTRY_PLACEHOLDER: 'India',
  BUSINESS_COUNTRY_NAME: 'country',
  CURRENT_COUNTRY_NAME: 'country',
  CITY_LABEL: 'शहर',
  CITY_PLACEHOLDER: 'शहर चुनें',
  BUSINESS_CITY_NAME: 'city',
  CURRENT_CITY_NAME: 'city',
  SELECTED_DOC_LABEL: 'अपलोड करने के लिए दस्तावेज़ का चयन करें',
  SELECTED_DOC_NAME_IDENTITY: 'identitySelectedDocName',
  SELECTED_DOC_NAME_BUSINESS: 'businessSelectedDocName',
  ACCOUNT_HOLDER_NAME_LABEL: 'खाता धारक का नाम',
  ACCOUNT_HOLDER_NAME_NAME: 'accountHolderName',
  ACCOUNT_HOLDER_NAME_PLACEHOLDER: 'खाताधारक का नाम दर्ज करें',
  ACCOUNT_BANK_NAME_LABEL: 'बैंक का नाम',
  ACCOUNT_BANK_NAME_NAME: 'bankName',
  ACCOUNT_BANK_NAME_PLACEHOLDER: 'बैंक का नाम चुनें',
  ACCOUNT_TYPE_LABEL: 'खाते का प्रकार',
  ACCOUNT_TYPE_NAME: 'accountType',
  ACCOUNT_TYPE_PLACEHOLDER: 'खाता प्रकार चुनें',
  ACCOUNT_NUMBER_LABEL: 'खाता संख्या',
  ACCOUNT_NUMBER_NAME: 'accountNumber',
  ACCOUNT_NUMBER_PLACEHOLDER: 'खाता संख्या दर्ज करें',
  ACCOUNT_IFSC_CODE_LABEL: 'आईएफएससी कोड',
  ACCOUNT_IFSC_CODE_NAME: 'IFSCCode',
  ACCOUNT_IFSC_CODE_PLACEHOLDER: 'आईएफएससी कोड दर्ज करें',
  SELECT_BANK_PLACEHOLDER: 'बैंक का चयन करें ',
  BANK_SEARCH_PLACEHOLDER: 'अपना बैंक खोजें',
};

const PROGRESS_BAR_CONSTANT = {
  GATING_CRITERIA: 10,
  LET_GET_STARTED: 20,
  PAN_SCREEN: 30,
  BASIC_INFO: 40,
  BA: 50,
  KYC_DOCS: 60,
  SANCTION_BEFORE_PD: 70,
  SANCTION_AFTER_PD: 80,
  SELECT_BANK_ACCOUNT: 90,
  VIDEO_KYC: 90,
  FINAL_CONG: 100,
};

const NOTES = {
  ESIGN_SKIP_MODAL: 'आपके ऋण आवेदन में 24-48 घंटे की देरी होगी',
  ADD_BACK_ACCOUNT_NOTE: 'कृपया वह बैंक खाता जोड़ें जहां आप अपनी व्यवसाय आय प्राप्त करते हैं',
};

const GATTING_CRITERIA = [
  {
    lable: 'जन्म की तारीख',
    value: 'DOB',
  },
  {
    lable: 'व्यवसाय की आयु',
    value: 'ageOfBusiness',
  },
  {
    lable: 'कारोबार (मासिक बिक्री)',
    value: 'turnoverMonthlySales',
  },
  {
    lable: 'व्यवसाय की प्रकृति',
    value: 'natureOfBusiness',
  },
  {
    lable: 'व्यवसाय की रूपरेखा',
    value: 'profileOfBusiness',
  },
  {
    lable: 'निवास का स्वामित्व',
    value: 'residenceOwnership',
  },
  {
    lable: 'व्यवसाय। का स्वामित्व',
    value: 'businessOwnership',
  },
  {
    lable: 'निवास पिन कोड/शहर',
    value: 'residencePinCode',
  },
  {
    lable: 'निवास शहर',
    value: 'residenceCity',
  },
  {
    lable: 'व्यापार पिन कोड/शहर',
    value: 'businessPinCode',
  },
  {
    lable: 'व्यापार शहर',
    value: 'businessCity',
  }
];

const SOMETHING_WENT_WRONG = 'कुछ गलत हो गया। कृपया कुछ देर बाद प्रयास करें।';

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
  more: 'और पढ़ें',
  less: 'कम पढ़ें',
};

const ISAUTHORISED_CHECKBOXES_IDENTITY = [
  {
    name: 'isAuthorised',
    label: 'मैं यहाँ सहमति देता हूँ और Pine labs को मेरी क्रेडिट जानकारी का वित्तीय प्रस्ताव के उद्देश्यों के लिए उपयोग करने की अधिकृति देता हूँ। मैं एक्सपेरियन के नियम और शर्तों से सहमत भी हूँ।',
    value: 'isAuthorised',
    alignStart: true,
    readMore: true,
    class: 'mt-20 mb-20 checkboxClasses',
    limit: 93,
  }
];

const IS_TREM_CHECKBOXES = () => {
  return [
    {
      name: 'IS_TREM_CHECKBOXES',
      value: 'IS_TREM_CHECKBOXES',
      label: (
        <Typography variant="caption" className="fs-sm-12 fs-14 col-text-primary-op5 ff-indivisible-b mt-10">
          मैं करने के लिए सहमत हूं &nbsp;
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
            शर्तें और गोपनीयता नीति
          </Typography>
        </Typography>
      ),
      alignStart: true,
      class: 'mt-20 mb-10',
    }
  ];
};

const GENRAL_TERM_AND_CONDI = () => {
  return [
    {
      name: 'IS_GERNAL_TREM_CHECKBOXES',
      value: 'IS_GERNAL_TREM_CHECKBOXES',
      label: (
        <Typography variant="caption" className="fs-sm-12 fs-14 col-text-primary-op5 ff-indivisible-b mt-10">
          मैं स्वीकार करता हूं कि मैंने सबसे महत्वपूर्ण नियमों और शर्तों (एमआईटीसी) को पढ़ लिया है और मैं उनसे सहमत हूं  &nbsp;
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
            सामान्य नियम और शर्तें (जीटीसी)
          </Typography>
        </Typography>
      ),
      alignStart: true,
      class: 'mt-20 mb-10',
    }
  ];
};

const ISCONDITION_CHECKBOXES_IDENTITY = [
  {
    name: 'ISGENRALANDTERMANDCONDITION',
    value: 'ISGENRALANDTERMANDCONDITION',
    label: (
      <Typography variant="caption" className="fs-sm-12 fs-14 col-text-primary-op5">
        मैं स्वीकार करता हूं कि मैंने सबसे महत्वपूर्ण नियमों और शर्तों (एमआईटीसी) को पढ़ लिया है और मैं उनसे सहमत हूं
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
          सामान्य नियम और शर्तें (जीटीसी)
        </Typography>
      </Typography>
    ),
    alignStart: true,
    class: 'mt-10 mb-10',
  }
];

const LOGIN_PRODUCT_ITEMS = [
  {
    id: '1',
    primaryImage: '',
    primaryTitle: 'पेश है सावधि ऋण',
    primarySubTitle: 'कुछ ही मिनटों में मालिकों के लिए सावधि ऋण',
    secondaryImage: IMAGE_URLS.INTRO_SLIDER.SLIDE_1,
  },
  {
    id: '2',
    primaryImage: IMAGE_URLS.INTRO_SLIDER.SLIDE_2,
    secondaryImage: '',
    secondaryTitle: '₹2 करोड़ तक का बिज़नेस लोन',
    secondarySubTitle:
      'अपने व्यवसाय की वृद्धि पर ध्यान दें। फंडिंग का झंझट नहीं',
  },
  {
    id: '3',
    primaryImage: IMAGE_URLS.INTRO_SLIDER.SLIDE_3,
    secondaryImage: '',
    secondaryTitle: 'ब्याज दर 1% से कम',
    secondarySubTitle: 'पाइन लैब्स से सावधि ऋण पर उच्च ब्याज दरों से बचें',
  },
  {
    id: '4',
    primaryImage: IMAGE_URLS.INTRO_SLIDER.SLIDE_4,
    secondaryImage: '',
    secondaryTitle: '48 घंटे में आपके बैंक में पैसा',
    secondarySubTitle: 'भुगतान सीधे आपके बैंक खाते में कुछ ही मिनटों में',
    margin: '-20px auto',
  }
];

const BENEFITS = [
  {
    id: '1',
    image: IMAGE_URLS.INTRO_SLIDER.SLIDE_2,
    benefit: '₹50 लाख तक का बिज़नेस लोन ',
  },
  {
    id: '2',
    image: IMAGE_URLS.INTRO_SLIDER.SLIDE_1,
    benefit: 'ब्याज दर कम से कम 0.7% प्रति माह ',
    margin: '-20px auto',
  },
  {
    id: '3',
    image: IMAGE_URLS.INTRO_SLIDER.SLIDE_4,
    benefit: '48 घंटे में आपके बैंक में पैसा',
    margin: '-20px auto',
  }
];

const ProcessingRequest = [
  {
    content: 'ऋण राशि का क्रेडिट/संवितरण टेली-सत्यापन या ऋण देने वाले भागीदार द्वारा किए गए आगे के उचित परिश्रम के अधीन है। ',
  },
  {
    content: 'हम आपसे आग्रह करते हैं कि आप अपने ऋण आवेदन के सुचारू और तेज़ प्रसंस्करण के लिए हमारे अधिकारियों के साथ उपस्थित हों और सहयोग करें। ',
  },
  {
    content: 'अधिकारियों के साथ सहयोग करने में असमर्थता या असफल सत्यापन आपके ऋण आवेदन को समाप्त कर सकता है। ',
  }
];

const getBankStatementUploadDates = () => {
  let startDate = '';
  let endDate = '';
  if (moment().date() >= 20) {
    startDate = moment().subtract(6, 'month').startOf('month').format('Do MMMM YYYY');
    endDate = moment()
      .subtract(1, 'month')
      .endOf('month')
      .format('Do MMMM YYYY');
  }
  if (moment().date() < 20) {
    startDate = moment().subtract(5, 'month').startOf('month').format('Do MMMM YYYY');
    endDate = moment()
      // .subtract(1, 'month')
      // .endOf('month')
      .format('Do MMMM YYYY');
  }
  // const startDate = moment().subtract(1, 'year').startOf('month').format('Do MMMM YYYY');
  return {
    startDate,
    endDate,
  };
};

// const BankStatementUploadNote = [
//   {
//     content: '1. कृपया उस बैंक खाते का विवरण साझा करें जहां आप अपनी व्यावसायिक आय प्राप्त करते हैं। ',
//   },
//   {
//     content: `2. बैंक स्टेटमेंट की तारीख की सीमा ${startDate} से ${endDate} तक होनी चाहिए। `,
//   }
// ];

const BankStatementUploadNote = [
  {
    content:
      '1. कृपया उस बैंक खाते का विवरण साझा करें जहां आप अपनी व्यावसायिक आय प्राप्त करते हैं।',
  },
  {
    content: (
      <>
        2. बैंक स्टेटमेंट की तिथि सीमा से होनी चाहिए&nbsp;
        <strong>
          {getBankStatementUploadDates().startDate}
          &nbsp;to&nbsp;
          {getBankStatementUploadDates().endDate}
        </strong>
      </>
    ),
  }
];

const AMBER_ERROR_BANK_MASSEGE = (
  <>
    बैंक विवरण से होना चाहिए&nbsp;
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
    { label: 'केवाईसी हो गया', nonApprove: 'आपको केवाईसी दस्तावेज अपलोड करने होंगे', content: 'आपका केवाईसी सफलतापूर्वक पूरा हो गया था' },
    { label: 'बैंकिंग स्वीकृति', nonApprove: 'आपको अपने 6 महीने के बैंक स्टेटमेंट अपलोड करने होंगे', content: 'आपके बैंक विवरण स्वीकृत किए गए' },
    { label: 'अंतिम स्वीकृति', nonApprove: 'आपका लोन फ्लेक्सी लोन क्रेडिट टीम द्वारा मंज़ूर किया जाएगा', content: 'आपकी व्यक्तिगत चर्चा सफलतापूर्वक पूरी हुई' },
    { label: 'समझौते का चिह्न', nonApprove: 'आपको अपने समझौते पर डिजिटल रूप से हस्ताक्षर करने होंगे', content: 'समझौते पर हस्ताक्षर पूरा हो गया है' },
    { label: 'एनएसीएच पंजीकरण', nonApprove: 'आपको अपना एनएसीएच मैंडेट सेट करना होगा', content: 'आपका एनएसीएच सेटअप सफल है' },
    { label: 'ऋण भुगतान', nonApprove: 'ऋण आपके पंजीकृत बैंक खाते में वितरित किया जाएगा', content: 'आपकी ऋण राशि सफलतापूर्वक वितरित कर दी गई है' }
  ];
  return TLSteps;
};

const REDIRECT_LIST_DATA = [
  {
    img: IMAGE_URLS.ICONS.LIST_ICON,
    label: `अगले पेज में आप हमारे लेंडिंग पार्टनर के प्लेटफॉर्म पर उतरेंगे। आपको लॉगिन करने और अपना ऋण आवेदन पूरा करने के लिए अपना मोबाइल नंबर दर्ज करने के लिए कहा जाएगा।`,
  },
  {
    img: IMAGE_URLS.ICONS.LIST_ICON,
    label: `कृपया सुनिश्चित करें कि आप एक ही नंबर का उपयोग करते हैं अर्थात`,
    seccondryLabel: 'जिसके माध्यम से आपने आवेदन शुरू किया था'
  },
];

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
  LOGIN_PRODUCT_ITEMS,
  BENEFITS,
  ProcessingRequest,
  BankStatementUploadNote,
  IS_TREM_CHECKBOXES,
  GENRAL_TERM_AND_CONDI,
  AMBER_ERROR_BANK_MASSEGE,
  getStepsTL,
  REDIRECT_LIST_DATA,
  TURNOVERMONTHLYSALES,
  TURNOVERMONTHLYSALESPRE,
};
