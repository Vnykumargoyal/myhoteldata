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
import { validateEmail } from '../../../helpers/functions';
import useHotelContext from '../../../hooks/useHotelContext';

export default () => {
  const classes = useStyles();
  const router = useHistory();
  const { data, updateContext } = useHotelContext();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [allowedToContinue, setAllowedToContinue] = useState(false)

  const handleLogin = () => {
    updateContext({
      ...values,
    })
    router.replace(routes.auth.otp);
  };
  const handleRegistration = () => {
    router.replace(routes.auth.registration);
  };

  const handleInputChange = (e, val, error) => {
    const {
      // prettier-ignore
      name,
      value,
      checked,
      type,
    } = e.target;
    // const newVal = type === 'checkbox' ? checked : value;

    
    if (name === 'email') {
      // setValues({
      //   ...values,
      //   [name]: value,
      // });
      setErrors((prev) => ({ ...prev, [name]: error }));
      setValues((prev) => ({ ...prev, [name]: val }));
    } else if (name === 'password') {
      setErrors((prev) => ({ ...prev, [name]: '' }));
      setValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleBlur = (e, error) => {
    const {
      // prettier-ignore
      name,
      value,
      checked,
      type,
    } = e.target;
    const newVal = type === 'checkbox' ? checked : value;
    if (name === 'password' && !value.length) {
      setErrors((prev) => ({ ...prev, password: 'Enter correct password' }));
    } else if (name === 'email') {
      if (!error) setValues((prev) => ({ ...prev, email: value }));
      setErrors((prev) => ({ ...prev, email: error }));
    }
  };

  const handleEmailClear = (setValues, setErrors) => {
    setValues((prev) => ({
      ...prev,
      email: '',
    }));
    setErrors((prev) => ({
      ...prev,
      email: '',
    }));
  };
  
  const handleEmailSelect = (item, setValues) => {
    setValues((prev) => ({
      ...prev,
      email: validateEmail(item) ? item : null,
    }));
    /* commenting as now we will call EmailValidationAPI on selecting email - LEN-2287
    setErrors((prev) => ({
      ...prev,
      email: '',
    })); */
  };
  useEffect(() => {
    if(values.email
      && !errors.email
    ) {
      setAllowedToContinue(true);
    } else {
      setAllowedToContinue(false);
    }

  }, [values, errors]);

  return (
    <Wrapper
      showContinue
      onContinue={handleLogin}
      allowedToContinue={allowedToContinue}
      bottomButtonLabel={CTA_LABELS.LOGIN}
      disableBack
      panelClass={classes.panel}
      bottomText={(
        <Box mt={2} mb={2}>
          <Typography component="p" className={classes.haveAccount}>
            {CONSTANTS.HAVEACCOUCT}
            <IconButton className={classes.haveAccountCont} onClick={handleRegistration}>
              {CTA_LABELS.NEW_REGISTRATION}
            </IconButton>
          </Typography>
        </Box>
      )}
    >
      <Box className={classes.cont}>
        <Header disableBack disableTitle />
        <Box ml={2}>
          <Typography component="p" className={classes.heading}>
            {CONSTANTS.LOGIN}
          </Typography>
          <Typography component="p" className={classes.headingSub}>
            {CONSTANTS.SIGNIN}
          </Typography>
        </Box>
        <Box>
          <EmailField
            value={values.email}
            error={errors.email}
            name={INPUT_CONSTANTS.EMAIL_ID_NAME}
            handleChange={handleInputChange}
            handleBlur={handleBlur}
            onEmailClear={() => handleEmailClear(setValues, setErrors)}
            onEmailSelect={(item) => handleEmailSelect(item, setValues, setErrors)}
            emailsList={values.emailsList}
          
          />
          {/* <CustomInput 
            label={INPUT_CONSTANTS.PASSWORD_LABEL}
            value={values.password}
            type='password'
            error={errors.password}
            name={INPUT_CONSTANTS.PASSWORD_NAME}
            handleBlur={handleBlur}
            handleChange={handleInputChange}
          /> */}
        </Box>
        {/* <Button
          onClick={handleLogin}
          disabled={!allowedToContinue}
          className={classes.buttonStyle}
          label={CTA_LABELS.LOGIN}
          fullWidth
          variant='contained'
          height="40px"
        /> */}
        {/* <Box mt={2} mb={2}>
          <Typography component="p" className={classes.haveAccount}>
            {CONSTANTS.HAVEACCOUCT}
            <IconButton className={classes.haveAccountCont} onClick={handleRegistration}>
              {CTA_LABELS.NEW_REGISTRATION}
            </IconButton>
        </Typography>
        </Box> */}
      </Box>
    </Wrapper>
  );
};
