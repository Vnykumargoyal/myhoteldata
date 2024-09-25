/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-template */
/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable no-use-before-define */
import { Box, Container, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import useHotelContext from '../../hooks/useHotelContext';
import {
  ALT_CONSTANTS,
  BankStatementUploadNote,
  CLEVERTAP_EVENTS,
  CONSTANTS,
  CTA_LABELS,
  LENDERNAMEINDIFINote,
  LENDINGKARTNAMENote,
  PROGRESS_BAR_CONSTANT
} from '../../constants';
import Wrapper from '../../wiredComponents/Wrapper';
import Header from '../Header';
import ProgressStepper from '../ProgressStepper';
import useStyles from './style';
import ShowNameWithHey from '../ShowNameWithHey';
import Image from '../Image';
import IMAGE_URLS from '../../constants/images';
import NotesWithList from '../NoteWithList';
import { customerID, pushClevertapEvent } from '../../helpers/functions';
import { external } from '../../routes/constant';
import ConditionalRender from '../ConditionalRender';
import useCRUD from '../../hooks/useCRUD';
import useAppLogin from '../../hooks/useAppLogin';

const DropOffCases = () => {
  const classes = useStyles();
  const router = useHistory();
  const { openLinkInWindow } = useAppLogin();
  const { data, updateContext } = useHotelContext();
  const [allowedToContinue, setAllowedToContinue] = useState(true);
  const LOS_SERVICE = process.env.REACT_APP_LOS_SERVICE_API;
  const [url, setUrl] = useState(null);

  const [cusJourneyUpdate, custResponseUpdate, custLoadingUpdate, custErrorUpdate] = useCRUD({
    type: 'create',
    url: data?.customerJourneyId && LOS_SERVICE + data.customerJourneyId + '/update-customer-journey',
  });
  const [fetchUrl, fetchUrlEes, fetchUrlLoading, fetchUrlError] = useCRUD({
    type: 'create',
    // url: API_URL.fetchRedirectionUrl,
    url: data?.customerJourneyId && LOS_SERVICE + data.customerJourneyId + '/fetch-redirection-url',
    // url: 'http://localhost:5001/fetch_eligibility',
  });
  useEffect(() => {
    pushClevertapEvent(CLEVERTAP_EVENTS.PAGE_LOADS.REDIRECT_INDIFI_PAGE);
  }, []);

  useEffect(() => {
    if (url) {
      setAllowedToContinue(true);
      // handleButtonClick()
    } else {
      setAllowedToContinue(false);
    }
  }, [url]);

  const handleButtonClick = () => {
    pushClevertapEvent(CLEVERTAP_EVENTS.CTA_CLICKS.INDIFI_REDIRECT, {
      redirect: true,
      page_name: 'redirect_to_indifi_screen',
    });
    openLinkInWindow(url, '_self', true);
    // You can do additional actions with the new window if needed
  };

  useEffect(() => {
    if (fetchUrlEes) {
      if (fetchUrlEes.data) {
        updateContext({
          ...fetchUrlEes?.data,
        });
        if (fetchUrlEes?.data?.redirectionUrl) {
          setUrl(fetchUrlEes?.data?.redirectionUrl);
          handleContinue();
        }
      }
    }
  }, [fetchUrlEes]);

  useEffect(() => {
    if (custResponseUpdate) {
      if (custResponseUpdate.data) {
        updateContext({
          ...custResponseUpdate.data,
          stage: {
            ...data?.stage,
            previousStageId: -1,
          },
        });
        // router.replace(routes.redirect);
      }
    }
  }, [custResponseUpdate]);

  const handleContinue = () => {
    pushClevertapEvent(CLEVERTAP_EVENTS.CTA_CLICKS.INDIFI_REDIRECTION_UPDATED_API_CALLED, {
      stageId: data?.stage?.stageId || data?.stageId,
      page_name: 'TL_indifi_amount_rediect_update_api_called',
    });
    cusJourneyUpdate({
      data: {
        lendingProductName: 'TL' || data?.lendingProductName,
        stageId: data?.stage?.stageId || data?.stageId,
        data: {
          updateNextStage: true,
          isBankStatementRedirection: false,
        },
      },
    });
  };

  const handlefetchUrl = () => {
    if (!fetchUrlLoading) {
      fetchUrl({
        data: {
          lenderName: data?.lenderName,
          lendingProductName: 'TL' || data?.lendingProductName,
          cjpId: data?.customerJourneyId || customerID(),
          stageId: data?.stage?.stageId || data.stageId,
        },
      });
    }
  };

  useEffect(() => {
    handlefetchUrl();
  }, []);

  useEffect(() => {
    if (custErrorUpdate || fetchUrlError) {
      updateContext({
        msgSnackbar: custErrorUpdate || fetchUrlError,
      });
    }
  }, [custErrorUpdate, fetchUrlError]);

  return (
    <Wrapper
      disableBack
      disableGutters
      panelClass={classes.panel}
      allowedToContinue={allowedToContinue}
      onContinue={handleButtonClick}
      loading={custLoadingUpdate || fetchUrlLoading}
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
              condition={data.lenderName === 'INDIFI'}
              truthyComponent={(
                <div className={classes.aboutContainerMain}>
                  <NotesWithList
                    // title={CONSTANTS.NOTE}
                    listItems={LENDERNAMEINDIFINote(`Indifi`)}
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
