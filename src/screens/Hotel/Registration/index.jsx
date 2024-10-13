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
import { isAlphabet, isAlphaNumeric, isNumber, validateEmail } from '../../../helpers/functions';
import useHotelContext from '../../../hooks/useHotelContext';
import useCRUD from '../../../hooks/useCRUD';
import { API_URL } from '../../../api/webServiceUrl';

export default () => {
  const classes = useStyles();
  const router = useHistory();
  const { data, updateContext } = useHotelContext();
  const [values, setValues] = useState({
    email: '',
    mobileNumber: '',
    ownerName: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    mobileNumber: '',
    ownerName: '',
  });
  const [allowedToContinue, setAllowedToContinue] = useState(false);
  const [registration, registrationResponse,registrationLoading, registrationErr] = useCRUD({
    type: 'create',
    url: API_URL.registrationUser,
  });

  const handleLogin = () => {
    router.replace(routes.auth.login);
  };

  const handleSendOtp = () => {
    updateContext({
      ...values,
      // msgSnackbar: 'Registered successfully.'
    });
    if (!registrationLoading) {
      registration({
        data: {
          mobile_number: values.mobileNumber,
          email: values.email,
          user_name: values.ownerName,
        },
      });
    }
    // router.replace(routes.auth.login);
  };

  useEffect(() => {
    if (registrationResponse) {
      // setLoading(!mobileVerifyLoading);
      debugger;
      if (registrationResponse?.success) {
        updateContext({
          ...registrationResponse.data,
          msgSnackbar: 'Registered successfully.'
        });
        router.replace(routes.auth.otp);
      }
    }
  }, [registrationResponse]);

  useEffect(() => {
    if (registrationErr) {
      updateContext({
        msgSnackbar: registrationErr,
      });
    }
  }, [registrationErr]);

  const validateMobileNumber = (number) => {
    if (number === '') return true; // Allow empty input (when user clears)
    const mobileNumberRegex = /^[6-9]\d{0,9}$/; // Validates partial matches
    return mobileNumberRegex.test(number);
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
    } else if (name === 'mobileNumber') {
      if (value === '' || (isNumber(value) && validateMobileNumber(value))) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
        setValues((prev) => ({ ...prev, [name]: value }));
      }
    } else if (name === 'ownerName') {
      if (value === '' || isAlphabet(value)) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
        setValues((prev) => ({ ...prev, [name]: value }));
      }
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
    // const newVal = type === 'checkbox' ? checked : value;
    if (name === 'ownerName' && !value.length) {
      setErrors((prev) => ({ ...prev, [name]: 'Enter owner name' }));
    } else if (name === 'mobileNumber' && !value.length) {
      setErrors((prev) => ({ ...prev, [name]: 'Enter valid mobile number start with 6 to 9' }));
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
      && values.mobileNumber
      && values.ownerName
      && !errors.email
      && !errors.ownerName
      && !errors.mobileNumber
    ) {
      setAllowedToContinue(true);
    } else {
      setAllowedToContinue(false);
    }

  }, [values, errors]);
  const handleBack = () => {
    router.replace(routes.auth.statApp);
  };
  return (
    <Wrapper
      onContinue={handleSendOtp}
      allowedToContinue={allowedToContinue}
      bottomButtonLabel={CTA_LABELS.REGISTER}
      disableBack
      panelClass={classes.panel}
      loading={registrationLoading}
      bottomText={(
        <Box mt={2} mb={2}>
          <Typography component="p" className={classes.haveAccount}>
            {CONSTANTS.ALREADY_ACCOUNT}
            <IconButton className={classes.haveAccountCont} onClick={handleLogin}>
              {CTA_LABELS.LOGIN}
            </IconButton>
          </Typography>
        </Box>
      )}
    >
      <Box className={classes.cont}>
        <Header disableTitle handleClick={handleBack}/>
        <Box ml={2}>
          <Typography component="p" className={classes.heading}>
            {CONSTANTS.REGISTRATION}
          </Typography>
          <Typography component="p" className={classes.headingSub}>
            {CONSTANTS.ADD_DETAILS}
          </Typography>
        </Box>
        <Box>
          <CustomInput 
            label={INPUT_CONSTANTS.OWNER_LABLE}
            value={values.ownerName}
            maxLength="10"
            error={errors.ownerName}
            name={INPUT_CONSTANTS.OWNER_NAME}
            handleBlur={handleBlur}
            handleChange={handleInputChange}
          />
          <CustomInput 
            label={INPUT_CONSTANTS.MOBILE_NUMBER_LABEL}
            value={values.mobileNumber}
            error={errors.mobileNumber}
            name={INPUT_CONSTANTS.MOBILE_NUMBER_NAME}
            handleBlur={handleBlur}
            handleChange={handleInputChange}
          />
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
        </Box>
{/* Same as */}
{/* <ToastContainer /> */}
        {/* <Button
          onClick={handleSendOtp}
          disabled={!allowedToContinue}
          className={classes.buttonStyle}
          label={CTA_LABELS.REGISTER}
          fullWidth
          variant='contained'
          height="40px"
        /> */}
        {/* <Box mt={2} mb={2}>
          <Typography component="p" className={classes.haveAccount}>
            {CONSTANTS.ALREADY_ACCOUNT}
            <IconButton className={classes.haveAccountCont} onClick={handleLogin}>
              {CTA_LABELS.LOGIN}
            </IconButton>
        </Typography>
        </Box> */}
      </Box>
    </Wrapper>
  );
};
