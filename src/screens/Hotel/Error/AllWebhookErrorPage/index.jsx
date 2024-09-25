/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-template */
/* eslint-disable max-len */
import { Container } from '@material-ui/core';
import React, { useEffect, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { API_URL } from '../../../../api/webServiceUrl';
import Button from '../../../../components/Button';
import CommonErrorPage from '../../../../components/CommonErrorPage';
import { ACTIVE_LOAN_ID, clearCreditStorage, FIRST_TIME_LOGIN } from '../../../../config/auth';
import { CLEVERTAP_EVENTS, CONSTANTS, CTA_LABELS } from '../../../../constants';
import IMAGE_URLS from '../../../../constants/images';
import { customerID, pushClevertapEvent } from '../../../../helpers/functions';
import useCRUD from '../../../../hooks/useCRUD';
import useHotelContext from '../../../../hooks/useHotelContext';
import { routes } from '../../../../routes/constant';
import { updateLocalStorage } from '../../../../utils/localStorageFunctions';
import Wrapper from '../../../../wiredComponents/Wrapper';
import useStyles from './style';

const AllWebhookErrorPage = () => {
  const router = useHistory();
  const classes = useStyles();
  const { data, updateContext, clearContext } = useHotelContext();
  const LOS_SERVICE = process.env.REACT_APP_LOS_SERVICE_API;

  const [cusJourney, custResponse, custLoading, custError] = useCRUD({
    type: 'create',
    url: customerID() && LOS_SERVICE + customerID() + '/update-customer-journey',
  });

  const [fetchCJPList, fetchCJPListRes, fetchCJPListLoading, fetchCJPListErr] = useCRUD({
    // type: 'read',
    type: 'create',
    url: API_URL.fetchActive,
  });

  const [configMaster, masterResponse, masterLoading, masterError] = useCRUD({
    type: 'create',
    url: API_URL.getConfigMaster,
  });

  const [eligibility, eligibilityResponse, eligibilityLoading, eligibilityErr] = useCRUD({
    type: 'read',
    url: API_URL.fetchEligibilityForTermLoan,
    // url: 'http://localhost:5001/fetch_eligibility',
  });

  const [createCJP, createCJPResponse, creatingCJP, createCJPError] = useCRUD({
    type: 'create',
    url: API_URL.customerJourney,
  });

  useEffect(() => {
    pushClevertapEvent(CLEVERTAP_EVENTS.PAGE_LOADS.OFFLINE_WEBHOOK_ERROR_PAGE);
  }, []);

  useEffect(() => {
    if (masterResponse) {
      updateContext({
        masterConfigData: masterResponse,
      });
      // customEligibilityRef.current = true;
    }
  }, [masterResponse]);

  useEffect(() => {
    if (custError || fetchCJPListErr || masterError || eligibilityErr || createCJPError) {
      updateContext({
        msgSnackbar: custError || fetchCJPListErr || masterError || eligibilityErr || createCJPError,
      });
    }
  }, [custError, fetchCJPListErr, masterError, eligibilityErr, createCJPError]);

  useEffect(() => {
    if (custResponse) {
      if (custResponse.data) {
        updateContext({
          ...custResponse.data,
          stage: {
            ...data?.stage,
            previousStageId: -1,
          },
        });
        if (data?.access_token) {
          fetchCJPList({
            data: {
              select: {
                customer_journey: [
                  '_default'
                ],
              },
            },
          });
        }
      }
      // router.replace(routes.redirect);
    }
  }, [custResponse]);

  useEffect(() => {
    if (fetchCJPListRes) {
      if (fetchCJPListRes?.data) {
        if (fetchCJPListRes?.data?.length > 0) {
          updateLocalStorage(FIRST_TIME_LOGIN, true);
          updateLocalStorage(ACTIVE_LOAN_ID, fetchCJPListRes?.data[0]?.customerJourneyId);
          updateContext({
            customerJourneyId: fetchCJPListRes?.data[0]?.customerJourneyId,
            isOfferValid: fetchCJPListRes?.data[0]?.isOfferValid,
            stage: {
              ...data?.stage,
              previousStageId: -1,
            },
          });
          // setLoading(false);
          router.replace(routes.redirect);
        } else {
          const access = data.access_token;
          const refresh = data.refresh_token;
          const externalID = data?.externalID;
          const mobile = data?.mobileNumber;
          clearCreditStorage();
          clearContext({});
          updateLocalStorage(FIRST_TIME_LOGIN, true);
          updateContext({
            access_token: access,
            refresh_token: refresh,
            externalID,
            mobileNumber: mobile,
          });
          eligibility({
            data: {
              externalID,
              mobileNumber: mobile,
            },
          });
        }
      } else {
        // showError();
        // setLoading(false);
      }
    }
  }, [fetchCJPListRes]);

  const generateCreateCJPPayload = (dataVal) => {
    if (!dataVal) return {};
    // eslint-disable-next-line object-curly-newline, max-len
    const { rateOfInterest, segment, mobileNumber, merchantId, lenderName, externalId, businessName, validTill, isPanValidated, gstNumber, pincode, city, isProprietor, state, referralCodeValue, pan } = dataVal;
    return ({
      rateOfInterest,
      userSegment: segment,
      mobileNumber,
      merchantId,
      lenderName,
      lendingProductName: 'TL',
      externalId,
      businessName,
      validTill: validTill || null,
      isPanValidated: isPanValidated || null,
      gstNumber: gstNumber || null,
      pincode: pincode || null,
      city: city || null,
      isProprietor: isProprietor || null,
      state: state || null,
      referenceCode: referralCodeValue || null,
      panNumber: pan || null,
    });
  };

  const callCreateCJPAPI = useCallback((updatedData) => {
    if (!creatingCJP) createCJP({ data: generateCreateCJPPayload({ ...data, ...updatedData }) });
  }, [creatingCJP, createCJP, data]);

  useEffect(() => {
    if (eligibilityResponse) {
      // customConfigRef.current = true;
      // contomEligibilityRef.current = true;
      if (eligibilityResponse.data) {
        // setLoading(false);
        pushClevertapEvent(CLEVERTAP_EVENTS.CTA_CLICKS.OFFLINE_WEBHOOK_ERROR_CTA, {
          page_name: 'offline_webhook_page', journey: 'reset_journey',
        });
        const dataToBeUpdated = {
          ...eligibilityResponse.data,
          businessName: eligibilityResponse.data.tradeName || '',
        };
        updateContext({
          ...dataToBeUpdated,
          stage: { ...data?.stage, previousStageId: -1 },
        });
        configMaster({
          data: [
            'tenureMaster', 'ageOfBusiness', 'monthlyBusinessTurnOver', 'natureOfBusiness', 'typeOfBusiness', 'profileOfBusiness', 'pincodeCity', 'businessOwnership', 'residenceOwnership', 'states', 'gender', 'maritalStatus'
          ],
        });
        const segment = eligibilityResponse?.data?.segment?.toLowerCase();
        if (segment === 'pa' || segment === 'pq' || segment === 'npq' || segment === 'financial services - om') {
          // router.replace(routes.auth.welcomeOffer);
          callCreateCJPAPI(dataToBeUpdated);
        } else {
          router.replace(routes.error.welComePageError);
        }
      } else {
        // showError();
      }
    }
  }, [eligibilityResponse]);

  useEffect(() => {
    if (createCJPResponse) {
      // setLoading(false);
      if (createCJPResponse.data) {
        updateContext({
          ...createCJPResponse.data,
          stageId: '10',
          stage: { ...data.stage, previousStageId: -1 },
        });
        updateLocalStorage(ACTIVE_LOAN_ID, createCJPResponse.data.customerJourneyId);
        router.replace(routes.auth.welcomeOffer);
      } else {
        // showError();
      }
    }
  }, [createCJPResponse, data.stage]);

  const inActiveJoureny = () => {
    if (data?.customerJourneyId || !custLoading) {
      cusJourney({
        data: {
          lendingProductName: 'TL' || data?.lendingProductName,
          stageId: data.stage.stageId || data.stageId,
          data: {
            updateNextStage: false,
            markCjpInactive: true,
          },
        },
      });
    }
  };

  return (
    <Wrapper
      disableBack
      disableGutters
      disabledBottomSection
      loading={custLoading || fetchCJPListLoading || masterLoading || eligibilityLoading || creatingCJP}
      // buttonClass={classes.buttonClass}
      // fullWidth={true}
      // onContinue={() => router.replace(routes.auth.logout)}
    >
      <CommonErrorPage
        titelImg
        heading={CONSTANTS.OFFER_NOT_HAVE}
        bottomHeading={CONSTANTS.CHECK_IN_AGAIN}
      />
      <Container>
        <Button
          // disabled={!Boolean(value[name])}
          fullWidth
          height="40px"
          onClick={inActiveJoureny}
          label={CTA_LABELS.RETRY}
          className={classes.btnClass}
        />
        <Button
          // disabled={!Boolean(value[name])}
          fullWidth
          height="40px"
          variant="outlined"
          onClick={() => router.replace(routes.auth.logout)}
          label={CTA_LABELS.LOGOUT}
          className={classes.btnClassLogout}
        />
      </Container>
    </Wrapper>
  );
};

export default AllWebhookErrorPage;
