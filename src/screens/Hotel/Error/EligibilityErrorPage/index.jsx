/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import CommonErrorPage from '../../../../components/CommonErrorPage';
import { CLEVERTAP_EVENTS, CTA_LABELS } from '../../../../constants';
import { pushClevertapEvent } from '../../../../helpers/functions';
import { routes } from '../../../../routes/constant';
import Wrapper from '../../../../wiredComponents/Wrapper';

const EligibilityErrorPage = () => {
  const router = useHistory();
  useEffect(() => {
    pushClevertapEvent(CLEVERTAP_EVENTS.PAGE_LOADS.ADDRESS_ERROR_PAGE);
  }, []);
  return (
    <Wrapper
      disableBack
      disableGutters
      bottomButtonLabel={CTA_LABELS.LOGOUT}
      onContinue={() => {
        router.replace(routes.auth.logout);
        pushClevertapEvent(CLEVERTAP_EVENTS.CTA_CLICKS.ADDRESS_ERROR_CTA, {
          page_name: 'address_error_page', journey: 'rejected',
        });
      }}
    >
      <CommonErrorPage />
    </Wrapper>
  );
};

export default EligibilityErrorPage;
