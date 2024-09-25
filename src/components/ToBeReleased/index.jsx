import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import parse from 'html-react-parser';

import useStyles from './style';
import Wrapper from '../../wiredComponents/Wrapper';

const ToBeReleased = ({ message }) => {
  const classes = useStyles();
  return (
    <Wrapper showContinue={true} allowedToContinue={true}>
      <Typography className={classes.message}>{parse(message)}</Typography>
    </Wrapper>
  );
};

ToBeReleased.propTypes = {
  message: PropTypes.string,
};

ToBeReleased.defaultProps = {
  message: 'Hotel to be released soon...',
};

export default ToBeReleased;
