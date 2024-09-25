/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import {
  // prettier-ignore
  Box,
  Typography,
  Container
} from '@material-ui/core';
import clsx from 'clsx';

import useStyles from './style';
import Modal from '../Modal';
import { CONSTANTS } from '../../constants';
import CountdownTimer from '../CountdownTimer';
import Button from '../Button';
import IMAGE_URLS from '../../constants/images';

const OTPErrorModal = ({
  open,
  setOpen,
  data,
  buttonLabel,
}) => {
  const classes = useStyles();
  return (
    <Modal open={open} disableOutsideClose>
      <Container className={classes.container}>
        <Box mt={2}>
          <img
            className={classes.image}
            src={IMAGE_URLS.ERRORS.OTP_LIMIT_EXCEED}
            width="auto"
            height={120}
            alt={CONSTANTS.SOMETHING_WENT_WRONG}
          />
        </Box>
        <Box mb={2} mt={1}>
          <Typography
            component="p"
            align="center"
            className={clsx(classes.something)}
          >
            {CONSTANTS.PLEASE_WAITAND_RETRY}
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography
            align="center"
            component="p"
            className={clsx(classes.data)}
          >
            {CONSTANTS.OTP_LIMIT_EXEAD}
          </Typography>
        </Box>
        <Box mb={2}>
          <CountdownTimer initialTime={900000} onTimerEnds={setOpen} className={classes.timer} />
        </Box>
        <div className={classes.btnStyle}>
          <Button
            label={buttonLabel}
            allowedToContinue
            hideHelp
            height="40px"
            onClick={() => setOpen()}
          />
        </div>
      </Container>
    </Modal>
  );
};
OTPErrorModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  buttonLabel: PropTypes.string,
};

OTPErrorModal.defaultProps = {
  data: '',
  buttonLabel: '',
};

export default OTPErrorModal;
