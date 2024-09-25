/* eslint-disable import/prefer-default-export, import/no-cycle */
import { LOGIN_FROM } from '../config/auth';
import { LOGGED_IN_FROM } from '../constants/eng';

const handleWebViewClose = () => {
  try {
    if (window && window.flutter_inappwebview && window.flutter_inappwebview.callHandler) {
      sessionStorage.removeItem(LOGGED_IN_FROM);
      window.flutter_inappwebview.callHandler('closeFullWebview');
    }
  } catch (e) {
    // Do Nothing
  }
};

const redirectToWebBrowser = (url, data = {}) => {
  try {
    if (window && window.flutter_inappwebview && window.flutter_inappwebview.callHandler && url) {
      const eventData = { url, ...data };
      window.flutter_inappwebview.callHandler('redirectToBrowser', eventData);
    }
  } catch (e) {
    // Do Nothing
  }
};

const downloadPDF = (base64, filename) => {
  try {
    if (window
      && window.flutter_inappwebview
      && window.flutter_inappwebview.callHandler
      && base64
    ) {
      const eventData = { base64, filename };
      window.flutter_inappwebview.callHandler('downloadPdf', eventData);
    }
  } catch (e) {
    // Do Nothing
  }
};

const openLinkInWindow = (url, target = '_blank') => {
  const isAppLogin = sessionStorage.getItem(LOGGED_IN_FROM) === LOGIN_FROM.APP;
  if (isAppLogin) {
    redirectToWebBrowser(url);
  } else window.open(url, target);
};

export {
  handleWebViewClose,
  redirectToWebBrowser,
  downloadPDF,
  openLinkInWindow
};
