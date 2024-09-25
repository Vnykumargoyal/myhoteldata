/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import useStyles from './style';
import Image from '../Image';
import IMAGE_URLS from '../../constants/images';
import { ALT_CONSTANTS, CONSTANTS } from '../../constants';
import ConditionalRender from '../ConditionalRender';

const BottomSheetNoDataFound = ({
  data,
}) => {
  const classes = useStyles();
  return (
    <ConditionalRender
      condition={Boolean(data?.length < 1)}
      truthyComponent={(
        <div className={classes.container}>
          <Image
            source={IMAGE_URLS.ICONS.NO_DATA_FOUND_BOTTOM_SHEET}
            height={60}
            width={60}
            alt={ALT_CONSTANTS.PINCODE_NOT_FOUND}
          />
          <Typography className={classes.notFound}>
            {CONSTANTS.PINCODE_NOT_FOUND}
          </Typography>
        </div>
      )}
    />
  );
};

BottomSheetNoDataFound.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BottomSheetNoDataFound;
