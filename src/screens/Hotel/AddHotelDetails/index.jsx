/* eslint-disable no-unneeded-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { Box, Container, IconButton, Typography } from '@material-ui/core';
import queryString from 'query-string';
import { get } from 'lodash';
import { useHistory } from 'react-router-dom';
import useStyles from './style';
import Wrapper from '../../../wiredComponents/Wrapper';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import { CONSTANTS, CTA_LABELS, INPUT_CONSTANTS } from '../../../constants';
import { routes } from '../../../routes/constant';
import CustomInput from '../../../components/CustomInput';
import EmailField from '../../../components/EmailField';
import { isAddress, isAlphabet, isAlphaNumeric, isNumber, validateEmail } from '../../../helpers/functions';
import useHotelContext from '../../../hooks/useHotelContext';
import CustomCardDetails from '../../../components/CustomCardDetails';
import { ADD_HOTEL_DETAIL } from '../../../config';

export default () => {
  const classes = useStyles();
  const router = useHistory();
  const [allowedToContinue, setAllowedToContinue] = useState(true);
  const { data, updateContext } = useHotelContext();

  const handleContinue = () => {
    updateContext({
      msgSnackbar: 'Hotel details added successfully.'
    })
    router.replace(routes.hotel.businessDetails);
  };

  const handleRedirect = (val) => {
    if (val === 'Room Detail') {
      router.replace(routes.hotel.addRoom);
    } else if (val === 'Food Menu') {
      router.replace(routes.hotel.addFood);
    } else if (val === 'Employee Detail') {
      router.replace(routes.hotel.addEmployee);
    }
  };

  return (
    <Wrapper
      showContinue
      disableBack
      allowedToContinue={allowedToContinue}
      panelClass={classes.panel}
      onContinue={handleContinue}
      bottomButtonLabel={CTA_LABELS.SAVE_PROCEED}
    >
      <Container className={classes.cont}>
        {/* <Header disableTitle /> */}
        <Box mt={4}>
          <Typography component="p" className={classes.heading}>
            {CONSTANTS.ADD_HOTEL_DETAIL}
          </Typography>
          <Typography component="p" className={classes.headingSub}>
            {CONSTANTS.ADD_HOTEL_SUBHEADING}
          </Typography>
        </Box>
        <Box mt={1} >
          {ADD_HOTEL_DETAIL.map((item) => {
            return (
              <CustomCardDetails 
                title={item.titel} 
                describe={item.describe} 
                handleChange={() => handleRedirect(item.titel)} />
            );
          })}
        </Box>
        
      </Container>
    </Wrapper>
  );
};
