/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Link, Typography } from '@material-ui/core';

import ConditionalRender from '../../../../../components/ConditionalRender';
import useStyles from './style';
import { CONSTANTS, CTA_LABELS } from '../../../../../constants';
import CountdownTimer from '../../../../../components/CountdownTimer';

const ResendOTP = ({
  timer,
  allowedToResend,
  // resendBlocked,
  setAllowToResentOtp,
  setAllowedToResend,
  handleResendOtpContinue,
  classname,
  classOTP,
}) => {
  const classes = useStyles();

  return (
    <ConditionalRender
      condition={allowedToResend}
      truthyComponent={(
        <Link
          className={classes.resend}
          // onClick={() => setAllowToResentOtp(true)}
          onClick={() => handleResendOtpContinue()}
        >
          {CTA_LABELS.RESEND_OTP}
        </Link>
      )}
      falsyComponent={(
        <>
          <Typography component="span" className={classname}>
            {CONSTANTS.NOT_GET_OTP}
          </Typography>
          <Typography component="span" className={classOTP}>{CONSTANTS.RESEND_OTP_IN}</Typography>
          <CountdownTimer initialTime={timer} onTimerEnds={setAllowedToResend} />
        </>
      )}
    />
  );
};

ResendOTP.propTypes = {
  timer: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  allowedToResend: PropTypes.bool.isRequired,
  // resendBlocked: PropTypes.bool,
  setAllowToResentOtp: PropTypes.func.isRequired,
  setAllowedToResend: PropTypes.func,
  handleResendOtpContinue: PropTypes.func,
  classname: PropTypes.string,
  classOTP: PropTypes.string,
};

ResendOTP.defaultProps = {
  // resendBlocked: false,
  setAllowedToResend: () => {},
  handleResendOtpContinue: () => {},
  classname: 'fw-700',
  classOTP: '',
};

export default ResendOTP;
