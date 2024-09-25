/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Container, Typography } from '@material-ui/core';

import { CLASSES, CONSTANTS } from '../../constants';
import useHotelContext from '../../hooks/useHotelContext';
import useStyles from './style';
import { TAB_CONTENT } from '../../constants/eng';

const TabView = ({
  tenures,
  onChange,
  containerClass,
  emiTenure,
}) => {
  const classes = useStyles();
  const { data } = useHotelContext;
  const handleTenureChange = (tenure) => {
    onChange(tenure);
  };

  return (
    <Typography className={clsx(classes.container, containerClass)}>
      <Typography color="secondary" className={classes.label}>
        {CONSTANTS.PICK_EMI_TENURE}
      </Typography>
      <Box className={classes.tenureWrapper}>
        {tenures.map((tenure) => (
          <Box
            key={tenure}
            className={clsx(classes.tenure, tenure === emiTenure && CLASSES.ACTIVE)}
            onClick={() => handleTenureChange(tenure)}
          >
            <Typography variant="caption">
              {tenure}
              {' '}
              {CONSTANTS.MONTH}
            </Typography>
          </Box>
        ))}
      </Box>
    </Typography>
  );
};

TabView.propTypes = {
  tenures: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  containerClass: PropTypes.string,
  emiTenure: PropTypes.string,
};

TabView.defaultProps = {
  tenures: [],
  onChange: () => { },
  containerClass: '',
  emiTenure: '',
};

export default TabView;
