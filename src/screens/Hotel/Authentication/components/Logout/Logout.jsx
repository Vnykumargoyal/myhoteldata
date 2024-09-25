import React, { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import { routes } from '../../../../../routes/constant';
import AuthHandler from '../../../../../utils/AuthHandler';
import useAppLogin from '../../../../../hooks/useAppLogin';
import { handleWebViewClose } from '../../../../../helpers/appHandlers';
import useTermLoansContext from '../../../../../hooks/useTermLoansContext';
import { AUTH_TERMLOANS_SIGNOUT_REDIRECT_TO, clearCreditStorage } from '../../../../../config/auth';

const Logout = () => {
  const router = useHistory();
  const { authCheck } = AuthHandler;
  const { isAppLogin } = useAppLogin();
  const { clearContext } = useTermLoansContext();

  useEffect(() => {
    if (isAppLogin) {
      clearCreditStorage();
      handleWebViewClose();
    } else {
      // eslint-disable-next-line no-lonely-if
      if (authCheck()) {
        clearCreditStorage();
        clearContext({});
        router.replace(routes.auth.login);
      } else {
        clearCreditStorage();
        clearContext({});
        router.replace(routes.auth.login);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAppLogin]);

  return <Redirect to={AUTH_TERMLOANS_SIGNOUT_REDIRECT_TO} />;
};
export default Logout;
