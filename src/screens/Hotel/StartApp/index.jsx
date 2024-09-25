/* eslint-disable no-unneeded-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { Box, Container } from '@material-ui/core';
import queryString from 'query-string';
import { get } from 'lodash';
import { useHistory } from 'react-router-dom';
import useStyles from './style';
import Wrapper from '../../../wiredComponents/Wrapper';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import { CONSTANTS, CTA_LABELS } from '../../../constants';
import { routes } from '../../../routes/constant';

export default () => {
  const classes = useStyles();
  const router = useHistory();

  const handleLogin = () => {
    router.replace(routes.auth.login);
  };
  const handleRegistration = () => {
    router.replace(routes.auth.registration);
  };

  return (
    <Wrapper
      disabledBottomSection
      disableBack
      panelClass={classes.panel}
      referralCode
    >
      <Box className={classes.cont}>
        <Button
          onClick={handleLogin}
          className={classes.buttonStyle}
          label={CTA_LABELS.LOGIN}
          fullWidth
          variant='contained'
          height="40px"
        />
        <Button
           onClick={handleRegistration}
           className={classes.buttonStyle1}
           label={CTA_LABELS.NEW_REGISTRATION}
           fullWidth
           variant='contained'
           height="40px"
        />
      </Box>
    </Wrapper>
  );
};
