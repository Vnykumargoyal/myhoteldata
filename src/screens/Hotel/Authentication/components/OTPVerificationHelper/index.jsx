/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';

import useStyles from '../../styles';
import { CONSTANTS, CTA_LABELS } from '../../../../../constants';
import useHotelContext from '../../../../../hooks/useHotelContext';

const OTPVerificationHelper = ({
  onEdit,
}) => {
  const classes = useStyles();
  const { data } = useHotelContext();

  return (
    <Box className={classes.helperContainer}>
      <Typography variant="h6">{CONSTANTS.ENTER_OTP}</Typography>
      <Typography component="div" variant="caption" className="flex">
        {CONSTANTS.SENT_TO}&nbsp;
        <Typography component="span" variant="caption">
          {data.mobileNumber || data.primaryMobileNumber}
        </Typography>
        <div type="button" className={classes.editButton} onClick={onEdit}>
          {CTA_LABELS.EDIT}
        </div>
      </Typography>
    </Box>
  );
};

OTPVerificationHelper.propTypes = {
  onEdit: PropTypes.func.isRequired,
};

export default OTPVerificationHelper;
