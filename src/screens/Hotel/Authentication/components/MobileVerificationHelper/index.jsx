import React from 'react';
import { Box, Typography } from '@material-ui/core';

import useStyles from '../../styles';
import { CONSTANTS } from '../../../../../constants';

const MobileVerificationHelper = () => {
  const classes = useStyles();

  return (
    <Box className={classes.helperContainer}>
      <Typography variant="h6">{CONSTANTS.ENTER_MOBILE}</Typography>
    </Box>
  );
};

export default MobileVerificationHelper;
