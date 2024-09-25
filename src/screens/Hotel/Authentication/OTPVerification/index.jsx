/* eslint-disable camelcase, max-len, react-hooks/exhaustive-deps */
import React, {
  useRef,
  useState,
  useEffect,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Container
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';

import {
  CTA_LABELS,
  CLEVERTAP_EVENTS,
  FIRST_LOGIN_NUMBER
} from '../../../../constants';
import {
  AUTH_HOTEL_NAME,
  clearCreditStorage
} from '../../../../config/auth';
import {
  customerID,
  convertToBoolean,
  pushClevertapEvent,
  pushLoginSuccessfullEvent
} from '../../../../helpers/functions';
import {
  EVENTS,
  generateFetchCJPPayload,
  generateCreateCJPPayload,
  generateConfigMasterPayload,
  generateFetchEligibilityPayload,
  generateFetchCJPListPayload
} from '../utils/helpers';
import {
  handleFetchCJPResponse,
  handleCreateCJPResponse,
  handleFetchCJPListResponse,
  handleFetchEligibilityResponse
} from '../utils/apiHandlers';
import useStyles from '../styles';
import OTPInput from '../components/OTPInput';
import ResendOTP from '../components/ResendOTP';
import useCRUD from '../../../../hooks/useCRUD';
import Button from '../../../../components/Button';
import { routes } from '../../../../routes/constant';
import { API_URL } from '../../../../api/webServiceUrl';
import AuthHandler from '../../../../utils/AuthHandler';
import { isInvalidOTP } from '../../../../helpers/utils';
import { isOTP } from '../../../../helpers/regex-validators';
import hideErrorPopup from '../../../../helpers/hideErrorPopup';
import OTPErrorModal from '../../../../components/OTPErrorModal';
import OTPVerificationHelper from '../components/OTPVerificationHelper';
import useHotelContext from '../../../../hooks/useHotelContext';
import SomethingWentWrong from '../../../../components/SomethingWentWrong';

const OTPVerification = ({
  setShowOTP,
  setAllowToResentOtp,
  allowedToResend,
  setAllowedToResend,
  error,
  setError,
  setLoading,
}) => {
  const classes = useStyles();
  const router = useHistory();
  const { signIn } = AuthHandler;
  const custID = useRef(null);
  const customEligibilityRef = useRef(false);
  const [otp, setOTP] = useState('');
  const [custId, setCustId] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [isOfferValid, setIsOfferValid] = useState(null);
  const [OTPLimitExeed, setOTPLimitExeed] = useState(false);
  const LOS_SERVICE = process.env.REACT_APP_LOS_SERVICE_API;
  const UTMs = queryString.parse(router.location.search);
  const {
    data: {
      stage,
      externalID,
      mobileNumber,
      referralCodeValue,
    },
    data,
    clearContext,
    updateContext,
  } = useHotelContext();

  const [verifyOTP, otpResponse, otpLoading, verifyOTPError] = useCRUD({
    type: 'create',
    url: API_URL.validateOTP,
  });

  const [resendOtp, resendOtpResponse, resendOtpLoading, resendOtpErr] = useCRUD({
    type: 'create',
    url: API_URL.sendSMS,
  });

  const [getConfigMaster, masterResponse, , masterError] = useCRUD({
    type: 'create',
    url: API_URL.getConfigMaster,
  });

  const [fetchCJPList, fetchCJPListResponse, , fetchCJPListErr] = useCRUD({
    type: 'create',
    url: API_URL.fetchActive,
  });

  const [fetchCJP, fetchCJPResponse, , fetchCJPErr] = useCRUD({
    type: 'create',
    url: `${LOS_SERVICE}${custID.current}/fetchcjp`,
  });

  const [fetchEligibility, eligibilityResponse, , eligibilityErr] = useCRUD({
    type: 'read',
    url: API_URL.fetchEligibilityForTermLoan,
  });

  const [createCJP, createCJPResponse, creatingCJP, createCJPError] = useCRUD({
    type: 'create',
    url: API_URL.customerJourney,
  });

  const [saveEvent, eventResponse] = useCRUD({ type: 'create', url: API_URL.saveEvent });

  useEffect(() => {
    if (eventResponse) hideErrorPopup(updateContext);
  }, [eventResponse]);

  useEffect(() => {
    if (data.msgSnackbar) setLoading(false);
  }, [data.msgSnackbar]);

  const callCreateCJPAPI = useCallback((updatedData) => {
    if (!creatingCJP) createCJP({ data: generateCreateCJPPayload({ ...data, ...updatedData }, UTMs) });
  }, [creatingCJP, createCJP, data]);

  const onSuccessfulLogin = useCallback(() => {
    const firstLoginNumber = convertToBoolean(sessionStorage.getItem(FIRST_LOGIN_NUMBER));
    if (firstLoginNumber) {
      saveEvent({ data: { event: EVENTS.LOGGEDIN, mobileNumber, productType: 'hotel' } });
    }
    sessionStorage.removeItem(FIRST_LOGIN_NUMBER);
    pushLoginSuccessfullEvent();
  }, [saveEvent, mobileNumber]);

  const showError = () => {
    hideErrorPopup(updateContext);
    clearCreditStorage();
    const { mobileNumber: mobile } = data;
    clearContext();
    updateContext({ mobileNumber: mobile });
    setShowWarning(true);
  };

  const handleLogout = useCallback(() => {
    setShowWarning(false);
    router.replace(routes.auth.logout);
  }, [setShowWarning]);

  const updateDataAndStage = useCallback((updatedData = {}) => {
    updateContext({
      ...updatedData,
      stage: { ...stage, previousStageId: -1 },
    });
  }, [stage]);

  const onEligible = useCallback((updatedData) => {
    onSuccessfulLogin();
    callCreateCJPAPI(updatedData);
  }, [onSuccessfulLogin, callCreateCJPAPI]);

  const routeUserTo = useCallback((path) => router.replace(path), []);

  const onJourneyFound = useCallback((customerJourneyId, isValidOffer) => {
    setIsOfferValid(isValidOffer);
    setCustId(customerJourneyId);
    updateContext({ customerJourneyId, isOfferValid, stage: { ...stage, previousStageId: -1 } });
    custID.current = customerJourneyId;
  }, [stage]);

  const callFetchCJPAPI = useCallback(() => {
    const id = customerID();
    if (id && custID?.current) {
      fetchCJP(generateFetchCJPPayload(isOfferValid, referralCodeValue));
    }
  }, [isOfferValid, referralCodeValue]);

  useEffect(() => {
    callFetchCJPAPI();
  }, [custId, isOfferValid]);

  const callFetcEligibilityAPI = useCallback(() => {
    fetchEligibility(generateFetchEligibilityPayload(externalID, mobileNumber));
  }, [fetchEligibility, externalID, mobileNumber]);

  const handleContinue = () => {
    if (isOTP(otp) && !otpLoading) {
      pushClevertapEvent(CLEVERTAP_EVENTS.CTA_CLICKS.OTP_CTA, { page_name: 'enter_otp' });
      verifyOTP({ data: { mobileNumber, otp } });
    }
    setLoading(true);
  };

  const handleResendOtpContinue = () => {
    if (!resendOtpLoading) {
      setLoading(true);
      resendOtp({ data: { mobileNumber, resendFlag: true } });
    }
  };

  useEffect(() => {
    if (resendOtpResponse) {
      setLoading(false);
      if (resendOtpResponse?.success && resendOtpResponse.data) {
        updateContext({
          ...resendOtpResponse.data,
        });
        // setOtpTimer(resendOtpResponse.data.otp_expiry_time);
        setAllowedToResend(false);
        if (resendOtpResponse?.data?.otp_resend_attempts_left >= 0) {
          setShowOTP(true);
        }
      } else {
        setShowOTP(false);
        setError(resendOtpResponse?.response?.data?.error.message);
      }
    }
  }, [resendOtpResponse]);

  useEffect(() => {
    if (
      otpResponse
      && otpResponse.data
      && otpResponse.success
    ) {
      if (otpResponse.data?.is_otp_valid) {
        updateContext({
          ...otpResponse.data,
          access_token: otpResponse.data?.access_token,
        });
        signIn(AUTH_HOTEL_NAME, otpResponse.data);
        getConfigMaster(generateConfigMasterPayload());
      } else {
        // eslint-disable-next-line no-lonely-if
        if (otpResponse.data.message.toLowerCase().includes('otp max retry count exhausted')) {
          updateContext({
            msgSnackbar: otpResponse.data.message,
          });
          setError(otpResponse.data.message);
          setShowOTP(false);
          setLoading(false);
          hideErrorPopup(updateContext);
        } else {
          updateContext({
            msgSnackbar: otpResponse.data.message,
          });
          setError(otpResponse.data.message);
          setLoading(false);
          hideErrorPopup(updateContext);
        }
      }
    } else {
      setLoading(false);
    }
  }, [otpResponse]);

  useEffect(() => {
    if (masterResponse) {
      updateContext({ masterConfigData: masterResponse });
      customEligibilityRef.current = true;
    }
  }, [masterResponse]);

  useEffect(() => {
    handleFetchCJPListResponse(
      fetchCJPListResponse,
      onJourneyFound,
      callFetcEligibilityAPI,
      showError
    );
  }, [fetchCJPListResponse]);

  useEffect(() => {
    handleFetchCJPResponse(
      fetchCJPResponse,
      updateContext,
      router,
      onSuccessfulLogin,
      setLoading
    );
  }, [fetchCJPResponse, onSuccessfulLogin, setLoading]);

  useEffect(() => {
    handleFetchEligibilityResponse(
      eligibilityResponse,
      updateDataAndStage,
      onEligible,
      routeUserTo,
      showError
    );
  }, [eligibilityResponse, onEligible, routeUserTo]);

  useEffect(() => {
    // prettier-ignore
    if (data.access_token && customEligibilityRef.current) {
      fetchCJPList(generateFetchCJPListPayload(UTMs));
      setLoading(true);
      customEligibilityRef.current = false;
    }
  }, [data, setLoading, fetchCJPList]);

  useEffect(() => {
    handleCreateCJPResponse(
      createCJPResponse,
      updateDataAndStage,
      routeUserTo,
      showError,
      setLoading
    );
  }, [createCJPResponse, routeUserTo, setLoading]);

  const handleOTPLogout = () => {
    setOTPLimitExeed(false);
    router.replace(routes.auth.logout);
  };

  useEffect(() => {
    if (verifyOTPError || fetchCJPListErr || resendOtpErr || masterError || eligibilityErr || fetchCJPErr || createCJPError || data?.msgSnackbar?.length > 0) {
      if (data?.msgSnackbar?.length > 0 && data.msgSnackbar.toLowerCase() === 'otp is wrong') {
        setLoading(false);
        setShowWarning(false);
      } else if (data?.msgSnackbar?.length > 0
        && (data.msgSnackbar?.includes('Max Resend attempts of OTP exceeded')
        || data.msgSnackbar?.includes('Max OTP request attempts were exhausted')
        || data.msgSnackbar?.includes('OTP max retry count exhausted'))) {
        setOTPLimitExeed(true);
        updateContext({
          ...data,
          msgSnackbar: '',
        });
        setLoading(false);
        setShowWarning(false);
        setShowWarning(false);
      } else if (data?.mobileError?.length > 0
        && (data?.mobileError?.includes('Max Resend attempts of OTP exceeded')
        || data?.mobileError?.includes('Max OTP request attempts were exhausted')
        || data?.mobileError?.includes('OTP max retry count exhausted'))) {
        setOTPLimitExeed(true);
        updateContext({
          ...data,
          msgSnackbar: '',
        });
        setLoading(false);
        setShowWarning(false);
        setShowWarning(false);
      } else {
        setLoading(false);
        setOTPLimitExeed(true);
      }
    }
  }, [
    verifyOTPError,
    fetchCJPListErr,
    resendOtpErr,
    masterError,
    eligibilityErr,
    data,
    fetchCJPErr
  ]);

  if (showWarning) {
    return (
      <SomethingWentWrong
        buttonLabel={CTA_LABELS.GOT_IT}
        open={showWarning}
        setOpen={handleLogout}
      />
    );
  }

  if (OTPLimitExeed) {
    return (
      <OTPErrorModal
        buttonLabel={CTA_LABELS.GOT_IT}
        open={OTPLimitExeed}
        setOpen={handleOTPLogout}
      />
    );
  }
  return (
    <>
      <Container className={classes.container}>
        <OTPVerificationHelper onEdit={() => setShowOTP(false)} />
        <OTPInput
          value={otp}
          setValue={setOTP}
          onSubmit={handleContinue}
          errorFromApi={error}
          setErrorFromApi={setError}
          minLength="6"
          maxLength="6"
        />
        <Box mt={1.25} className={classes.resendWrapper}>
          <ResendOTP
            // timer={new Date(otpTimer).getTime() - Date.now()}
            timer={120000}
            allowedToResend={allowedToResend}
            setAllowedToResend={setAllowedToResend}
            setAllowToResentOtp={setAllowToResentOtp}
            handleResendOtpContinue={handleResendOtpContinue}
          />
        </Box>
        {/* <Typography
          variant="caption"
          component="p"
          color="textSecondary"
          className={clsx(classes.needHelp, 'fs-14 fs-sm-12 fw-600 mt-0')}
          onClick={() => setreferralCodeAdded(true)}
        >
          I have a referral code?
        </Typography> */}
      </Container>
      <Box my={3}>
        <Container className={classes.setBottom}>
          <Button
            onClick={handleContinue}
            label={CTA_LABELS.SUBMIT}
            className={classes.buttonStyleOtp}
            disabled={Boolean(isInvalidOTP(otp) || error)}
          />
        </Container>
      </Box>
      {/* {referralCodeAdded && (
        <ReferralCodeModal
          open={referralCodeAdded}
          onClose={handlereferralCodeClose}
        />
      )} */}
    </>
  );
};

OTPVerification.propTypes = {
  setShowOTP: PropTypes.func.isRequired,
  setAllowToResentOtp: PropTypes.func.isRequired,
  allowedToResend: PropTypes.bool.isRequired,
  setAllowedToResend: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  setError: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default OTPVerification;
