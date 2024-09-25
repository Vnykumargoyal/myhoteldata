/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography
} from '@material-ui/core';

import useStyles from './style';
import Image from '../Image';
import { CONSTANTS, CTA_LABELS } from '../../constants';
import { formatPrice } from '../../helpers/functions';
import Button from '../Button';
import useAppLogin from '../../hooks/useAppLogin';

const EsignAndClickWrapCommon = ({
  values,
  titel,
  image,
  buttonDisabled,
}) => {
  const classes = useStyles();
  const { openLinkInWindow } = useAppLogin();
  const handleClose = () => {
    // window.open()
    openLinkInWindow(buttonDisabled, '_self');
  };
  return (
    <Box>
      <Typography align="center" className={classes.name}>
        {CONSTANTS.HEY}
        {' '}
        <span className={classes.nameShow}>{values?.name}</span>
      </Typography>
      <Typography align="center" className={classes.heading}>
        {titel}
      </Typography>
      <Box mt={2} mb={2} align="center">
        <Image source={image} height={190} />
      </Box>
      <Box mt={4} mb={0}>
        <Typography component="div" align="center" className={classes.amountContainMain}>
          <Typography component="div" align="center" className={classes.subContainer}>
            {values.amount && (
              <Typography className={classes.renised}>
                {CONSTANTS.LINE_AMOUNT}
              </Typography>
            )}
            <Typography className={classes.amount}>
              {formatPrice(values.amount)}
            </Typography>
            <div className={classes.linearSeparator} />
            {values.ROI && values.tenor && (
              <Typography className={classes.tenorContainer}>
                <Typography align="left" className={classes.rate}>
                  {CONSTANTS.OFFER_BY}
                  <br />
                  <span className={classes.rateAmount}>{values.lenderName}</span>
                </Typography>
                <Typography align="left" className={classes.rate}>
                  {CONSTANTS.TENOR}
                  <br />
                  <span className={classes.rateAmount}>{values.tenor} Month</span>
                </Typography>
                <Typography align="right" className={classes.rate}>
                  {CONSTANTS.ROI_DATA}
                  <br />
                  <span className={classes.rateAmount}>{values.ROI}%</span>
                </Typography>
              </Typography>
            )}
            <Box className={classes.btnContainer}>
              <Button
                height="40px"
                variant="link"
                onClick={handleClose}
                label={CTA_LABELS.VIEW_AGGREMENT}
                className={classes.btnClass}
                disabled={!buttonDisabled}
              />
            </Box>
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};
EsignAndClickWrapCommon.propTypes = {
  values: PropTypes.arrayOf(PropTypes.object).isRequired,
  titel: PropTypes.string,
  image: PropTypes.string,
  buttonDisabled: PropTypes.bool,
};

EsignAndClickWrapCommon.defaultProps = {
  image: '',
  titel: '',
  buttonDisabled: false,
};

export default EsignAndClickWrapCommon;
