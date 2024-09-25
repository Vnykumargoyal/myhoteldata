/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import CommonErrorPage from '../../../../components/CommonErrorPage';
import { CLEVERTAP_EVENTS, CONSTANTS, CTA_LABELS } from '../../../../constants';
import { pushClevertapEvent } from '../../../../helpers/functions';
import { routes } from '../../../../routes/constant';
import Wrapper from '../../../../wiredComponents/Wrapper';
import useStyles from './style';

const CriteriaErrorPage = () => {
  const router = useHistory();
  const classes = useStyles();
  useEffect(() => {
    pushClevertapEvent(CLEVERTAP_EVENTS.PAGE_LOADS.BASIC_INFO_ERROR_PAGE);
  }, []);
  return (
    <Wrapper
      disableBack
      disableGutters
      bottomButtonLabel={CTA_LABELS.LOGOUT}
      onContinue={() => {
        router.replace(routes.auth.logout);
        pushClevertapEvent(CLEVERTAP_EVENTS.CTA_CLICKS.BASIC_INFO_ERROR_CTA, {
          page_name: 'basic_info_page', journey: 'rejected',
        });
      }}
    >
      <CommonErrorPage
        heading={CONSTANTS.PERSONALBOTTOMHEADING}
        headingClass={classes.invalid}
        // bottomHeading={CONSTANTS.GETTINGcRI}
        bottomClass={classes.bottomClass}
      />
    </Wrapper>
  );
};

export default CriteriaErrorPage;
