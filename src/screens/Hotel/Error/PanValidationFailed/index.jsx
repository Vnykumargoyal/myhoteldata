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
import useHotelContext from '../../../../hooks/useHotelContext';

const PanValidationFailed = () => {
  const router = useHistory();
  const classes = useStyles();
  const { data } = useHotelContext();
  useEffect(() => {
    pushClevertapEvent(CLEVERTAP_EVENTS.PAGE_LOADS.PAN_VALIDATION_FAILED);
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
        heading={CONSTANTS.INVALID_INFORMATION}
        headingClass={classes.invalid}
        bottomHeading={data?.coolingTime ? CONSTANTS.TRY_AFTER_FOUR_HOURS : CONSTANTS.GETTINGcRI}
        bottomClass={classes.bottomClass}
        timer
      />
    </Wrapper>
  );
};

export default PanValidationFailed;
