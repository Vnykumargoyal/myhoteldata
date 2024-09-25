/* eslint-disable no-unneeded-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import queryString from 'query-string';
import { get } from 'lodash';
import { useHistory } from 'react-router-dom';

import Wrapper from '../../../wiredComponents/Wrapper';
import MobileVerification from './MobileVerification';
import useStyles from './styles';
import OTPVerification from './OTPVerification';
import ConditionalRender from '../../../components/ConditionalRender';
import ProductCarousel from './components/ProductCarousel';
import useCRUD from '../../../hooks/useCRUD';
import useHotelContext from '../../../hooks/useHotelContext';
import { API_URL } from '../../../api/webServiceUrl';
import { ACTIVE_LOAN_ID, clearCreditStorage } from '../../../config/auth';
import { CLEVERTAP_EVENTS, FIRST_LOGIN_NUMBER } from '../../../constants';
import { convertToBoolean, pushClevertapEvent, pushClevertapUserLogin } from '../../../helpers/functions';
import hideErrorPopup from '../../../helpers/hideErrorPopup';
import { EVENTS, getUTMsForClevertap } from './utils/helpers';
import Header from '../../../components/Header';

export default () => {
  const classes = useStyles();
  const router = useHistory();
  const UTMs = queryString.parse(router.location.search);
  const [showOTP, setShowOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allowToResentOtp, setAllowToResentOtp] = useState(false);
  const [allowedToResend, setAllowedToResend] = useState(false);
  const { data, updateContext, clearContext } = useHotelContext();
  const [error, setError] = useState('');
  const [verifyMobile, mobileResponse, mobileVerifyLoading, verifyMobileErr] = useCRUD({
    type: 'create',
    url: API_URL.sendSMS,
  });

  const [saveEvent, eventResponse, saveloading] = useCRUD({
    type: 'create',
    url: API_URL.saveEvent,
  });

  useEffect(() => {
    localStorage.removeItem(ACTIVE_LOAN_ID);
    clearCreditStorage();
    clearContext({});
  }, []);

  useEffect(() => {
    if (data.msgSnackbar) {
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    if (UTMs.id) {
      saveEvent({ data: { event: EVENTS.LANDED, mobileNumber: UTMs.id, productType: 'TermLoan' } });
    } else {
      sessionStorage.removeItem(FIRST_LOGIN_NUMBER);
    }
  }, []);

  useEffect(() => {
    if (eventResponse) {
      hideErrorPopup(updateContext);
      const mobile = get(eventResponse, 'data.mobileNo', '');
      const isFirstLogin = convertToBoolean(get(eventResponse, 'data.isFirstLogin', true));
      if (isFirstLogin && mobile) {
        sessionStorage.setItem(FIRST_LOGIN_NUMBER, mobile);
      } else {
        sessionStorage.setItem(FIRST_LOGIN_NUMBER, false);
      }
      if (/^[6789]\d{9}$/.test(mobile)) {
        updateContext({ mobileNumber: mobile });
      }
    }
  }, [eventResponse]);

  useEffect(() => {
    const filteredUTMs = getUTMsForClevertap(UTMs);
    if (showOTP) {
      pushClevertapEvent(CLEVERTAP_EVENTS.PAGE_LOADS.OTP_PAGE, { ...filteredUTMs, whitelisted_status: true, page_name: 'enter_otp' });
    } else {
      pushClevertapEvent(CLEVERTAP_EVENTS.PAGE_LOADS.MOBILE_PAGE, { ...filteredUTMs, page_name: 'enter_mobile' });
    }
  }, [showOTP]);

  const heandleSendOtp = (mobile) => {
    const getMobile = get(eventResponse, 'data.mobileNo', '');
    if (getMobile !== mobile) sessionStorage.setItem(FIRST_LOGIN_NUMBER, mobile);
    if (!mobileVerifyLoading) {
      // pushClevertapUserLogin(mobile);
      // pushClevertapEvent(CLEVERTAP_EVENTS.CTA_CLICKS.MOBILE_CTA, { page_name: 'enter_mobile' });
      // verifyMobile({
      //   data: {
      //     mobileNumber: mobile || data?.mobileNumber,
      //     resendFlag: mobile ? false : true,
      //   },
      // });
      setShowOTP(true);
    }
    setLoading(true);
  };

  useEffect(() => {
    if (verifyMobileErr) {
      updateContext({
        mobileError: verifyMobileErr,
        msgSnackbar: verifyMobileErr,
      });
      // hideErrorPopup(updateContext);
    }
  }, [verifyMobileErr]);

  useEffect(() => {
    if (allowToResentOtp) {
      heandleSendOtp();
      setAllowToResentOtp(false);
      setAllowedToResend(!allowedToResend);
    }
  }, [allowToResentOtp]);

  useEffect(() => {
    if (mobileResponse) {
      setLoading(!mobileVerifyLoading);
      if (mobileResponse?.success && mobileResponse?.data) {
        updateContext({
          ...mobileResponse.data,
        });
        if (mobileResponse?.data?.otp_resend_attempts_left >= 0) {
          setShowOTP(true);
        } else {
          setShowOTP(false);
          setError(mobileResponse?.message);
        }
      } else {
        setError(mobileResponse?.response?.data?.error?.message);
      }
    }
  }, [mobileResponse]);
  return (
    <Wrapper
      disabledBottomSection
      disableBack
      panelClass={classes.panel}
      loading={loading || saveloading}
      pageId={showOTP ? 'login_enter_otp' : 'login_enter_mobile'}
      referralCode
    >
      <Box>
        <Header />
        {/* <ProductCarousel /> */}
        <ConditionalRender
          condition={showOTP}
          truthyComponent={(
            <OTPVerification
              setShowOTP={setShowOTP}
              setLoading={setLoading}
              setAllowToResentOtp={setAllowToResentOtp}
              setAllowedToResend={setAllowedToResend}
              allowedToResend={allowedToResend}
              setError={setError}
              error={error}
            />
          )}
          falsyComponent={(
            <MobileVerification
              setError={setError}
              heandleSendOtp={heandleSendOtp}
              error={error}
            />
          )}
        />
      </Box>
    </Wrapper>
  );
};
