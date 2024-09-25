/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import CommonErrorPage from '../../../../components/CommonErrorPage';
import { CONSTANTS, CTA_LABELS } from '../../../../constants';
import { routes } from '../../../../routes/constant';
import Wrapper from '../../../../wiredComponents/Wrapper';

const PDErrorPage = () => {
  const router = useHistory();

  return (
    <Wrapper
      disableBack
      disableGutters
      bottomButtonLabel={CTA_LABELS.LOGOUT}
      onContinue={() => router.replace(routes.auth.logout)}
    >
      <CommonErrorPage
        titelImg
        heading={CONSTANTS.OFFER_NOT_HAVE}
        bottomHeading={CONSTANTS.CHECK_IN_AGAIN}
      />
    </Wrapper>
  );
};

export default PDErrorPage;
