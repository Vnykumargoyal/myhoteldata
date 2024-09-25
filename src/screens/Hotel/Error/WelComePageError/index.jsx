/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import CommonErrorPage from '../../../../components/CommonErrorPage';
import { CLEVERTAP_EVENTS, CONSTANTS, CTA_LABELS } from '../../../../constants';
import { pushClevertapEvent } from '../../../../helpers/functions';
import { routes } from '../../../../routes/constant';
import Wrapper from '../../../../wiredComponents/Wrapper';

const WelComePageError = () => {
  const router = useHistory();
  useEffect(() => {
    pushClevertapEvent(CLEVERTAP_EVENTS.PAGE_LOADS.NWL_PAGE);
  }, []);
  return (
    <Wrapper
      disableBack
      disableGutters
      bottomButtonLabel={CTA_LABELS.LOGOUT}
      onContinue={() => {
        router.replace(routes.auth.logout);
        pushClevertapEvent(CLEVERTAP_EVENTS.CTA_CLICKS.NWL_CTA, {
          page_name: 'non_whitelist_page', journey: 'rejected_non_whitelisted',
        });
      }}
    >
      <CommonErrorPage
        titelImg
        heading={CONSTANTS.OFFER_NOT_HAVE}
        bottomHeading={CONSTANTS.CHECK_IN_AGAIN}
      />
    </Wrapper>
  );
};

export default WelComePageError;
