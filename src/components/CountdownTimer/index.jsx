/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import PropTypes from 'prop-types';
import Timer from 'react-compound-timer';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';

import { CLASSES } from '../../constants';
import ConditionalRender from '../ConditionalRender';

const CountdownTimer = ({
  // prettier-ignore
  className,
  initialTime,
  direction,
  onTimerEnds,
}) => (
  <Typography display="inline" className={clsx(CLASSES.FS_14_12, CLASSES.FS_600, className)} color="primary">
    <Timer
      formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
      initialTime={initialTime}
      direction={direction}
      checkpoints={[
        {
          time: 0,
          callback: () => onTimerEnds(true),
        }
      ]}
    >
      {() => (
        <>
          <ConditionalRender
            condition={initialTime >= 3600000}
            truthyComponent={(
              <>
                <Timer.Hours />
                :
                <Timer.Minutes />
                :
                <Timer.Seconds />
              </>
            )}
            falsyComponent={(
              <>
                <Timer.Minutes />
                :
                <Timer.Seconds />
              </>
            )}
          />
        </>
      )}
    </Timer>
  </Typography>
);

CountdownTimer.propTypes = {
  className: PropTypes.string,
  initialTime: PropTypes.number.isRequired,
  direction: PropTypes.string,
  onTimerEnds: PropTypes.func,
};

CountdownTimer.defaultProps = {
  className: '',
  direction: 'backward',
  onTimerEnds: () => {},
};

export default CountdownTimer;
