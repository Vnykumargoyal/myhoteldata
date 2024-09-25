import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

import useStyles from './style';
import useHotelContext from '../../hooks/useHotelContext';
import { CONSTANTS } from '../../constants';

const ShowUser = ({ containerClass }) => {
  const classes = useStyles();
  const { data } = useHotelContext();

  return (
    <div className={containerClass}>
      <Typography
        className={classes.nameContainer}
        variant="caption"
        component="div"
      >
        {CONSTANTS.HEY}
        <span className={classes.legalName}>
          {' '}
          {data?.firstName ? data?.firstName : CONSTANTS.BUDDY}
        </span>
      </Typography>
    </div>
  );
};

ShowUser.propTypes = {
  containerClass: PropTypes.string,
};

ShowUser.defaultProps = {
  containerClass: '',
};

export default ShowUser;
