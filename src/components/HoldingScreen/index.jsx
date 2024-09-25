/* eslint-disable operator-linebreak */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import {
  // prettier-ignore
  Container,
  Typography
} from '@material-ui/core';
import clsx from 'clsx';

import useStyles from './style';
import Header from '../Header';
import IMAGE_URLS from '../../constants/images';

const HoldingScreen = () => {
  const classes = useStyles();
  return (
    <div>
      <Header disableTitle disableBack webviewCloseTheme="dark" />
      <Container className={clsx(classes.root)}>
        <Typography component="h6" className={classes.headingRoot}>
          Please be patient...
        </Typography>
        <Typography component="h6" className={classes.heading}>
          We are processing your request
        </Typography>
        <Typography component="div" className={clsx(classes.validate_request)}>
          <img
            src={IMAGE_URLS.WAIT.GIF}
            alt="Validate Request"
          />
        </Typography>
        <div style={{ marginTop: '100px' }}>
          <img src={IMAGE_URLS.WAIT.BOTTOM_DOTTED} alt="holding bottom" className={classes.bottomContainer} />
        </div>
      </Container>
    </div>
  );
};

export default HoldingScreen;
