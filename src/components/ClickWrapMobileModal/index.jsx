/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Typography, Box, Container } from '@material-ui/core';

import Modal from '../Modal';
import useStyles from './style';
import { CONSTANTS, CTA_LABELS, NOTES } from '../../constants';
import Button from '../Button';
import IMAGE_URLS from '../../constants/images';
import useHotelContext from '../../hooks/useHotelContext';
import OTPInput from '../../screens/Hotel/Authentication/components/OTPInput';
import ResendOTP from '../../screens/Hotel/Authentication/components/ResendOTP';

const ClickWrapMobileModal = ({
  open,
  cancel,
  proceedEsignSkip,
  showOTP,
  otp,
  setOtp,
  handleOtpSend,
  error,
  setError,
  setAllowToResentOtp,
  allowToResentOtp,
  setAllowedToResend,
  allowedToResend
}) => {
  const classes = useStyles();
  const { data, updateContext } = useHotelContext();
  return (
    <Modal
      open={open}
      disableOutsideClose
      onClose={cancel}
    >
      <div className={classes.warning_section}>
        <Box mt={2} />
        <img
          style={{ height: '40px', width: '40px', marginBottom: '20px' }}
          src={IMAGE_URLS.ICONS.MOBILE}
          // height={30}            
          // width={30}
          alt={CONSTANTS.SEND_OTP}
        />
        {!showOTP ? (
          <>
            <Typography component="h4" className={clsx(classes.header)}>
              {CONSTANTS.MOBILE_VERIFY} 
              {' '}
              <strong>{data.primaryMobileNumber}</strong>
              {' '}
              {CONSTANTS.PROCIDE_WITH}
            </Typography>
          </>
        ) : (
          <>
            <Typography component="h4" align="left" className={clsx(classes.otp)}>
              {CONSTANTS.ENTER_OTP}
            </Typography>
            <Typography component="h4" align="left" className={clsx(classes.sendTo)}>
              {CONSTANTS.SENT_TO}
              {' '}
              {data.primaryMobileNumber}
            </Typography>
            <Container className={classes.container}>
              {/* <OTPVerificationHelper onEdit={() => setShowOTP(false)} /> */}
              <OTPInput
                value={otp}
                setValue={setOtp}
                onSubmit={handleOtpSend}
                errorFromApi={error}
                setErrorFromApi={setError}
                minLength="4"
                maxLength="4"
              />
              <Box mt={1.25} className={classes.resendWrapper}>
                <ResendOTP
                  // timer={new Date(otpTimer).getTime() - Date.now()}
                  timer={60000}
                  allowedToResend={allowedToResend}
                  setAllowedToResend={setAllowedToResend}
                  setAllowToResentOtp={setAllowToResentOtp}
                  handleResendOtpContinue={proceedEsignSkip}
                  classname={classes.classname}
                  classOTP={classes.classOTP}
                />
              </Box>
            </Container>
          </>
        )}
        
        <Button
          onClick={showOTP ? handleOtpSend : proceedEsignSkip}
          label={showOTP ? CTA_LABELS.VERIFY_OTP : CTA_LABELS.GET_OTP}
          disabled={showOTP ? otp?.length < 4 : false}
        />
        {/* <Button
          variant="text"
          onClick={cancel}
          label={CTA_LABELS.GO_BACK}
        /> */}
      </div>
    </Modal>
  );
};

ClickWrapMobileModal.propTypes = {
  open: PropTypes.bool.isRequired,
  cancel: PropTypes.func.isRequired,
  proceedEsignSkip: PropTypes.func.isRequired,
};

export default ClickWrapMobileModal;
