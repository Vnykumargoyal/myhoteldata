/* eslint-disable no-unneeded-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { Box, Container, IconButton, Typography } from '@material-ui/core';
import queryString from 'query-string';
import { get } from 'lodash';
import { useHistory } from 'react-router-dom';
import useStyles from './style';
import Wrapper from '../../../wiredComponents/Wrapper';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import { CONSTANTS, CTA_LABELS, INPUT_CONSTANTS } from '../../../constants';
import { routes } from '../../../routes/constant';
import CustomInput from '../../../components/CustomInput';
import EmailField from '../../../components/EmailField';
import { validateEmail } from '../../../helpers/functions';
import OTPInput from './component/OTPInput';
import ResendOTP from '../Authentication/components/ResendOTP';
import useHotelContext from '../../../hooks/useHotelContext';
import { API_URL } from '../../../api/webServiceUrl';
import useCRUD from '../../../hooks/useCRUD';
import AuthHandler from '../../../utils/AuthHandler';
import { AUTH_HOTEL_NAME } from '../../../config/auth';

export default () => {
  const classes = useStyles();
  const router = useHistory();
  const [allowedToResend, setAllowedToResend] = useState(false);
  const { signIn } = AuthHandler;
  const { data, updateContext } = useHotelContext();
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [allowedToContinue, setAllowedToContinue] = useState(false);
  const [allowToResentOtp, setAllowToResentOtp] = useState(false);
  const [validateOTP, validateOTPResponse, validateOTPLoading, validateOTPErr] = useCRUD({
    type: 'create',
    url: API_URL.validateOTP,
  });

  const [resendMobile, resendMobileResponse,resendMobileLoading, resendMobileErr] = useCRUD({
    type: 'create',
    url: API_URL.resendSMS,
  });


  const handleContinue = () => {
    updateContext({
      ...otp.join(''),
      otp: otp.join(''),
    });
    if (!validateOTPLoading) {
      validateOTP({
        data: {
          email: data?.email,
          otp: otp.join(''),
          email_verification_otp: true
        },
      });
    }
   
    // router.replace(routes.auth.hotelLocation);
  };

  useEffect(() => {
    const allFilled = otp.every((char) => char !== "");
    if(allFilled) {
      setAllowedToContinue(true);
    } else {
      setAllowedToContinue(false);
    }
  }, [otp]);

  useEffect(() => {
    if (validateOTPResponse) {
      // setLoading(!mobileVerifyLoading);
      debugger;
      if (validateOTPResponse?.success) {
        updateContext({
          ...validateOTPResponse.data,
          msgSnackbar: `
          You have created account with us, Now you are just few steps away to track your business`
        });
        signIn(AUTH_HOTEL_NAME, validateOTPResponse.data);
        router.replace(routes.auth.hotelLocation);
      }
    }
  }, [validateOTPResponse]);

  const handleBack = () => {
    router.replace(routes.auth.login);
  };

  useEffect(() => {
    if (resendMobileResponse) {
      // setLoading(!mobileVerifyLoading);
      debugger;
      if (resendMobileResponse?.success) {
        updateContext({
          ...resendMobileResponse.data,
        });
        // router.replace(routes.auth.hotelLocation);
      }
    }
  }, [resendMobileResponse]);

  const handleResendOtpContinue = () => {
    if (!resendMobileLoading) {
      resendMobile({
        data: {
          email: data?.email,
          resend_flag: true
        },
      });
    }
  }

  useEffect(() => {
    if (validateOTPErr || resendMobileErr) {
      updateContext({
        msgSnackbar: validateOTPErr || resendMobileErr,
      });
    }
  }, [validateOTPErr || resendMobileErr]);

  console.log('otp', otp);
  return (
    <Wrapper
      showContinue
      disableBack
      allowedToContinue={allowedToContinue}
      panelClass={classes.panel}
      onContinue={handleContinue}
      bottomButtonLabel={CTA_LABELS.VALIDATE_OTP}
      loading={validateOTPLoading || resendMobileLoading}
    >
      <Container className={classes.cont}>
        <Header disableTitle handleClick={handleBack}/>
        <Box mt={4}>
          <Typography component="p" className={classes.heading}>
            {CONSTANTS.VERIFY_EMAIL}
          </Typography>
          <Typography component="p" className={classes.headingSub}>
            {CONSTANTS.OTP_SENT}
          </Typography>
        </Box>
        <Box mt={2} mb={2} align="center">
          <OTPInput 
            otp={otp}
            setOtp={setOtp}
          />
        </Box>
        <Box mt={1.25} className={classes.resendWrapper}>
          <ResendOTP
            // timer={new Date(otpTimer).getTime() - Date.now()}
            timer={120000}
            // timer={5000}
            otpEnterIn
            allowedToResend={allowedToResend}
            setAllowedToResend={setAllowedToResend}
            setAllowToResentOtp={setAllowToResentOtp}
            handleResendOtpContinue={handleResendOtpContinue}
            classOTP={classes.classOTP}
          />
        </Box>
      </Container>
    </Wrapper>
  );
};
