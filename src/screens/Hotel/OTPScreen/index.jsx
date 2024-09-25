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

export default () => {
  const classes = useStyles();
  const router = useHistory();
  const [allowedToResend, setAllowedToResend] = useState(false);
  const { data, updateContext } = useHotelContext();
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [allowedToContinue, setAllowedToContinue] = useState(false);

  const handleContinue = () => {
    updateContext({
      ...otp,
      msgSnackbar: `
          You have created account with us, Now you are just few steps away to track your business`
    })
    router.replace(routes.auth.hotelLocation);
  };

  useEffect(() => {
    const allFilled = otp.every((char) => char !== "");
    if(allFilled) {
      setAllowedToContinue(true);
    } else {
      setAllowedToContinue(false);
    }

  }, [otp]);
  console.log('otp', otp);
  return (
    <Wrapper
      showContinue
      disableBack
      allowedToContinue={allowedToContinue}
      panelClass={classes.panel}
      onContinue={handleContinue}
      bottomButtonLabel={CTA_LABELS.VALIDATE_OTP}
    >
      <Container className={classes.cont}>
        {/* <Header disableTitle /> */}
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
            // setAllowToResentOtp={setAllowToResentOtp}
            // handleResendOtpContinue={handleResendOtpContinue}
            classOTP={classes.classOTP}
          />
        </Box>
      </Container>
    </Wrapper>
  );
};
