import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';

import useStyles from './style';

const PineLoader = ({ showLoadingText, text }) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box mb={1.25} className={classes.loader} />
      {showLoadingText && <Typography align="center">{text}</Typography>}
    </Box>
  );
};

PineLoader.propTypes = {
  showLoadingText: PropTypes.bool,
  text: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

PineLoader.defaultProps = {
  showLoadingText: false,
  text: (
    <>
      Please wait...
      <br />
      We are fetching your details...
    </>
  ),
};

export default PineLoader;
