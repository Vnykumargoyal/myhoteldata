import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';

import useStyles from './style';
import { CONSTANTS } from '../../constants';
// import useHotelContext from '../../hooks/useHotelContext';

const ProgressStepper = ({
  // prettier-ignore
  className,
  trackClass,
  progressClass,
  progress,
  helperTextClass,
}) => {
  const classes = useStyles({ progress });
  // const { data } = useHotelContext();

  return (
    <Typography component="div" className={clsx(classes.container, className)}>
      <Typography component="div" className={clsx(classes.track, trackClass)}>
        <Typography
          component="div"
          className={clsx(classes.progress, progressClass)}
        />
      </Typography>
      <Typography component="div" className={classes.helperTextContainer}>
        <Typography component="div" className={clsx(classes.helperText, helperTextClass)}>
          {/* <strong>
            {data?.totalActiveApplications
              ? data?.totalActiveApplications
              : CONSTANTS.MERCHANTSCOUNT}
          </strong>
          &nbsp;merchants already applied */}
        </Typography>
        <Typography component="div" className={clsx(classes.helperText, helperTextClass)}>
          <strong>{`${progress}% `}</strong>
          {CONSTANTS.COMPLETED}
        </Typography>
      </Typography>
    </Typography>
  );
};

ProgressStepper.propTypes = {
  className: PropTypes.string,
  trackClass: PropTypes.string,
  progressClass: PropTypes.string,
  progress: PropTypes.number,
  helperTextClass: PropTypes.string,
};

ProgressStepper.defaultProps = {
  className: '',
  trackClass: '',
  progressClass: '',
  progress: 20,
  helperTextClass: '',
};

export default ProgressStepper;
