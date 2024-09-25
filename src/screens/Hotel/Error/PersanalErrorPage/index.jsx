/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import CommonErrorPage from '../../../../components/CommonErrorPage';
import {
  CLASSES,
  CLEVERTAP_EVENTS,
  CONSTANTS,
  CTA_LABELS
} from '../../../../constants';
import { pushClevertapEvent } from '../../../../helpers/functions';
import { routes } from '../../../../routes/constant';
import Wrapper from '../../../../wiredComponents/Wrapper';
import useStyles from './style';

const PersanalErrorPage = () => {
  const router = useHistory();
  const classes = useStyles();
  useEffect(() => {
    pushClevertapEvent(CLEVERTAP_EVENTS.PAGE_LOADS.PERSONAL_INFO_ERROR_PAGE);
  }, []);
  return (
    <Wrapper
      disableBack
      disableGutters
      bottomButtonLabel={CTA_LABELS.LOGOUT}
      onContinue={() => {
        router.replace(routes.auth.logout);
        pushClevertapEvent(CLEVERTAP_EVENTS.CTA_CLICKS.PERSONAL_INFO_ERROR_CTA, {
          page_name: 'personal_info_page', journey: 'rejected',
        });
      }}
    >
      <CommonErrorPage
        titelImg={false}
        heading={CONSTANTS.PERSONALBOTTOMHEADING}
        headingClass={classes.headingClass}
        // bottomHeading={CONSTANTS.CHECK_IN_AGAIN}
      />
    </Wrapper>
  );
};

export default PersanalErrorPage;
