/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-template */
/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable */
import { Box, Container, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import useHotelContext from '../../hooks/useHotelContext';
import {
  ALT_CONSTANTS,
  CLEVERTAP_EVENTS,
  CONSTANTS,
  CTA_LABELS,
  LENDINGKARTNAMENote,
} from '../../constants';
import Wrapper from '../../wiredComponents/Wrapper';
import Header from '../Header';
import useStyles from './style';
import ShowNameWithHey from '../ShowNameWithHey';
import Image from '../Image';
import IMAGE_URLS from '../../constants/images';
import NotesWithList from '../NoteWithList';
import { pushClevertapEvent } from '../../helpers/functions';
import { external } from '../../routes/constant';
import ConditionalRender from '../ConditionalRender';
import useAppLogin from '../../hooks/useAppLogin';

const DropOffCases = () => {
  const classes = useStyles();
  const router = useHistory();
  const { openLinkInWindow } = useAppLogin();
  const { data, updateContext } = useHotelContext();

  const handleRedirectKart = () => {
    if (data?.lenderName?.toLowerCase() === 'fl') {
      pushClevertapEvent(CLEVERTAP_EVENTS.PAGE_LOADS.REDIRECT_PAGE);
      pushClevertapEvent(CLEVERTAP_EVENTS.CTA_CLICKS.REDIRECT_CTA, {
        page_name: 'redirect_to_flexi_loan',
      });
      setTimeout(() => {
        openLinkInWindow(external.flexiLoan, '_self', true);
      }, 500);
    } else if (data?.lenderName?.toLowerCase() === 'lk') {
      pushClevertapEvent(CLEVERTAP_EVENTS.PAGE_LOADS.REDIRECT_PAGE);
      pushClevertapEvent(CLEVERTAP_EVENTS.CTA_CLICKS.REDIRECT_CTA, {
        page_name: 'redirect_to_kart',
      });
      setTimeout(() => {
        openLinkInWindow(external.kartFlow, '_self', true);
      }, 500);
    }
  };

  useEffect(() => {
    pushClevertapEvent(CLEVERTAP_EVENTS.PAGE_LOADS.REDIRECT_PAGE);
  }, []);

  return (
    <Wrapper
      disableBack
      panelClass={classes.panel}
      isSpaceBetween
      // allowedToContinue={allowedToContinue}
      bottomButtonLabel={CTA_LABELS.CONTINUE}
      onContinue={handleRedirectKart}
      // loading={panLoading || masterLoading}
      // referralCode={!data?.referenceCode}
    >
      <Box>
        <Header disableBack />
        {/* <ProgressStepper progress={PROGRESS_BAR_CONSTANT.PAN_SCREEN} /> */}
        <Container className={classes.container}>
          <Box mt={2} mb={2}>
            <ShowNameWithHey titel={CONSTANTS.WELCOME_BACK} />
          </Box>
          <Box mt={2} mb={2}>
            <Typography component="p" className={classes.titelData}>
              {CONSTANTS.YOUR_LOAN_APPLICATION}
            </Typography>
          </Box>
          <Box mt={3} mb={2} align="center">
            <Image source={IMAGE_URLS.REDIRECT.TITLE_REDIRECT_IMG} alt={ALT_CONSTANTS.ADD_ICON} />
          </Box>
          <Box>
            <ConditionalRender
              condition={data.lenderName === 'FL'}
              truthyComponent={(
                <div className={classes.aboutContainerMain}>
                  <NotesWithList
                    // title={CONSTANTS.NOTE}
                    listItems={LENDINGKARTNAMENote(data?.mobileNumber, `Flexi Loan’s`)}
                  />
                </div>
              )}
            />
            <ConditionalRender
              condition={data.lenderName === 'LK'}
              truthyComponent={(
                <div className={classes.aboutContainerMain}>
                  <NotesWithList
                    // title={CONSTANTS.NOTE}
                    listItems={LENDINGKARTNAMENote(data?.mobileNumber, `Lending Kart's`)}
                  />
                </div>
              )}
            />
            
          </Box>
        </Container>
      </Box>
    </Wrapper>
  );
};

export default DropOffCases;
