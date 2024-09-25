/* eslint-disable import/no-cycle */
import { useCallback, useMemo } from 'react';

import { LOGIN_FROM } from '../config/auth';
import useHotelContext from './useHotelContext';
import { handleWebViewClose, redirectToWebBrowser } from '../helpers/appHandlers';

export default function useAppLogin() {
  const { loggedFrom } = useHotelContext();

  const isAppLogin = useMemo(() => loggedFrom === LOGIN_FROM.APP, [loggedFrom]);

  const openLinkInWindow = useCallback((url, target = '_blank', closeWebview = false) => {
    if (isAppLogin) {
      redirectToWebBrowser(url);
      if (closeWebview) {
        setTimeout(() => handleWebViewClose(), 1000);
      }
    } else window.open(url, target);
  }, [isAppLogin]);
  return { isAppLogin, openLinkInWindow };
}
