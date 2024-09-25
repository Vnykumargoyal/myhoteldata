/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Typography } from '@material-ui/core';

import useStyles from './style';
import { CONSTANTS } from '../../constants';

const ManualUploadBottomSection = ({
  setOpenSheet,
  allowedToContinue,
  onSubmit,
  dataVal,
}) => {
  const classes = useStyles();

  return (
    <Container>
      <Box mt={2} mb={2}>
        <Typography
          className={classes.addOrEditBank}
          onClick={() => setOpenSheet(true)}
        >
          {dataVal === 'senction' ? CONSTANTS.ADD_ANOTHER_BANK : CONSTANTS.ADD_BANK}
        </Typography>
      </Box>
    </Container>
  );
};

ManualUploadBottomSection.propTypes = {
  setOpenSheet: PropTypes.func.isRequired,
  allowedToContinue: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  dataVal: PropTypes.string.isRequired,
};

export default ManualUploadBottomSection;
