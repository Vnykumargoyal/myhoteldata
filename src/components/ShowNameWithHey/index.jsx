/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

import useStyles from './style';
import useHotelContext from '../../hooks/useHotelContext';
import { CONSTANTS } from '../../constants';
import ConditionalRender from '../ConditionalRender';

const ShowNameWithHey = ({ titel, containerClass }) => {
  const classes = useStyles();
  const { data } = useHotelContext();

  return (
    <div className={containerClass}>
      <Typography
        className={classes.nameContainer}
        variant="caption"
        component="div"
      >
        <ConditionalRender
          condition={titel}
          truthyComponent={titel}
          falsyComponent={CONSTANTS.HEY}
        />
        {/* {CONSTANTS.HEY} */}
        <span className={classes.legalName}>
          {' '}
          {data?.firstName ? data?.firstName?.charAt(0)?.toUpperCase() + data?.firstName.slice(1) : CONSTANTS.BUDDY}
          👋
        </span>
      </Typography>
    </div>
  );
};

ShowNameWithHey.propTypes = {
  containerClass: PropTypes.string,
  titel: PropTypes.string,
};

ShowNameWithHey.defaultProps = {
  containerClass: '',
  titel: '',
};

export default ShowNameWithHey;
