/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Typography } from '@material-ui/core';

import MobileVerificationHelper from '../components/MobileVerificationHelper';
import MobileInput from '../components/MobileInput';
import Button from '../../../../components/Button';
import { ALT_CONSTANTS, CONSTANTS, CTA_LABELS } from '../../../../constants';
import { isInvalidMobileNumber } from '../../../../helpers/utils';
import useHotelContext from '../../../../hooks/useHotelContext';
import useStyles from '../styles';
import Image from '../../../../components/Image';
import IMAGE_URLS from '../../../../constants/images';
// import { pushClevertapEvent } from '../../../../helpers/functions';

const MobileVerification = ({
  setError,
  heandleSendOtp,
  error,
}) => {
  const classes = useStyles();
  const { data: { mobileNumber = '' }, updateContext } = useHotelContext();
  const [mobile, setMobile] = useState(mobileNumber);

  const handleSendOTP = () => {
    updateContext({ mobileNumber: mobile });
    heandleSendOtp(mobile);
  };

  useEffect(() => {
    if (mobileNumber) setMobile(mobileNumber);
  }, [mobileNumber]);

  return (
    <>
      {/* <Container className={classes.container}>
        <MobileVerificationHelper />
        <MobileInput
          value={mobile}
          setValue={setMobile}
          onSubmit={handleSendOTP}
          errorFromApi={error}
          setErrorFromApi={setError}
        />
      </Container>
      <Box className={classes.setBottomCreate}>
        <Container>
          <Typography variant="h6" className={classes.buttonStyletext}>{CONSTANTS.NEW_TO}</Typography>
          <Button
            // onClick={handleSendOTP}
            className={classes.buttonStyleCreate}
            label={CTA_LABELS.CREATE_YOUR_ACCOUNT}
            // disabled={Boolean(isInvalidMobileNumber(mobile)) || Boolean(error)}
          />
        </Container>
      </Box>
      <Box my={3}>
        <Container className={classes.setBottom}>
          <Button
            onClick={handleSendOTP}
            className={classes.buttonStyle}
            label={CTA_LABELS.CONTINUE}
            disabled={Boolean(isInvalidMobileNumber(mobile)) || Boolean(error)}
          />
        </Container>
      </Box> */}
      
    </>
  );
};

MobileVerification.propTypes = {
  setError: PropTypes.func.isRequired,
  heandleSendOtp: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

export default MobileVerification;
