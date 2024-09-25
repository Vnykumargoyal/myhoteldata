/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import CommonErrorPage from '../../../../components/CommonErrorPage';
import { CLEVERTAP_EVENTS, CONSTANTS, CTA_LABELS } from '../../../../constants';
import IMAGE_URLS from '../../../../constants/images';
import { pushClevertapEvent } from '../../../../helpers/functions';
import { routes } from '../../../../routes/constant';
import Wrapper from '../../../../wiredComponents/Wrapper';
import useStyles from './style';

const PanErrorPage = () => {
  const router = useHistory();
  const classes = useStyles();
  useEffect(() => {
    pushClevertapEvent(CLEVERTAP_EVENTS.PAGE_LOADS.PAN_ERROR_PAGE);
  }, []);
  return (
    <Wrapper
      disableBack
      disableGutters
      bottomButtonLabel={CTA_LABELS.LOGOUT}
      onContinue={() => {
        router.replace(routes.auth.logout);
        pushClevertapEvent(CLEVERTAP_EVENTS.CTA_CLICKS.PAN_ERROR_CTA, {
          page_name: 'PAN_ERROR_PAGE', journey: 'rejected',
        });
      }}
    >
      <CommonErrorPage
        title={CONSTANTS.ENTER_NON_PROPRITETOR_PAN}
        titleClass="oops"
        titelImg={false}
        headingClass={classes.error_msg}
        bottomClass={classes.error_msg}
        img={IMAGE_URLS.PAN_SCREEN.OFFER_EXPIRED}
        heading={CONSTANTS.OFFER_NOT_FOR_P_SUBHEADING}
        bottomHeading={CONSTANTS.OFFER_NOT_FOR_P_BOTTOMHEADING}
      />
    </Wrapper>
  );
};

export default PanErrorPage;
