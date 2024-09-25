/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-template */
/* eslint-disable max-len */
/* eslint-disable quotes */
import { Box, Container, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';

import useStyles from './style';
import useHotelContext from '../../hooks/useHotelContext';
import { pushClevertapEvent } from '../../helpers/functions';
import {
  ALT_CONSTANTS,
  CLEVERTAP_EVENTS,
  CONSTANTS,
  CTA_LABELS
} from '../../constants';
import Wrapper from '../../wiredComponents/Wrapper';
import Image from '../Image';
import IMAGE_URLS from '../../constants/images';
import { routes } from '../../routes/constant';
import ConditionalRender from '../ConditionalRender';

const RejectedAndRetryCase = () => {
  const classes = useStyles();
  const router = useHistory();
  const { data } = useHotelContext();
  const [allowedToContinue, setAllowedToContinue] = useState(true);

  useEffect(() => {
    pushClevertapEvent(CLEVERTAP_EVENTS.PAGE_LOADS.REJECTED_PAGE_LOAD);
  }, []);

  // const momentObj = moment();
  const minus45Days = moment(new Date(data?.lastUpdatedOn)).add(46, "days");
  const exectDate = minus45Days.diff(moment(), 'days');

  return (
    <Wrapper
      disableBack
      disableGutters
      panelClass={classes.panel}
      allowedToContinue={allowedToContinue}
      bottomButtonLabel={CTA_LABELS.LOGOUT}
      continueButtonVariant="text"
      buttonClass={classes.buttonClass}
      onContinue={() => {
        router.replace(routes.auth.logout);
        pushClevertapEvent(CLEVERTAP_EVENTS.CTA_CLICKS.REJECTED_CTA, {
          page_name: 'rejected_page_load', lenderName: data.lenderName, remainDays: moment(new Date('12/10/2023')).diff(moment(), 'days'),
        });
      }}
    >
      <Box>
        <Container className={classes.container}>
          <Box mt={8} className={clsx(classes.oops)} align="center">
            {CONSTANTS.COMMONHEADINGTITEL}
          </Box>
          <Box mt={5} mb={2} align="center">
            <Image source={IMAGE_URLS.ERRORS.REJECT_CASE} alt={ALT_CONSTANTS.ADD_ICON} height={250} />
          </Box>
          <ConditionalRender
            condition={exectDate > 0}
            truthyComponent={(
              <Box mt={3} className={clsx(classes.dontWarry)} align="center">
                {/* {CONSTANTS.DONT_WORRY_DAYS} */}
                Don’t worry, you can
                <br />
                try again after {exectDate} days
              </Box>
            )}
            falsyComponent={(
              <Box mt={3} className={clsx(classes.dontWarry)} align="center">
                {/* {CONSTANTS.DONT_WORRY_DAYS} */}
                Don’t worry, you can
                <br />
                try again after 0 days
              </Box>
            )}
          />
          <ConditionalRender
            condition={exectDate > 0}
            truthyComponent={(
              <Box mt={4} align="center">
                <div className={classes.bottomText}>
                  <Typography className={classes.bottomText1}>
                    {exectDate}
                    {' '}
                    Days
                  </Typography>
                </div>
              </Box>
            )}
            falsyComponent={(
              <Box mt={4} align="center">
                <div className={classes.bottomText}>
                  <Typography className={classes.bottomText1}>
                    {0}
                    {' '}
                    Days
                  </Typography>
                </div>
              </Box>
            )}
          />
        </Container>
      </Box>
    </Wrapper>
  );
};

export default RejectedAndRetryCase;
