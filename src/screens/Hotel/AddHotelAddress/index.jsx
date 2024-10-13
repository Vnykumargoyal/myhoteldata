/* eslint-disable no-unneeded-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { Box, Container, IconButton, Typography } from '@material-ui/core';
import queryString from 'query-string';
import { get, method } from 'lodash';
import { useHistory } from 'react-router-dom';
import useStyles from './style';
import Wrapper from '../../../wiredComponents/Wrapper';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import { CONSTANTS, CTA_LABELS, INPUT_CONSTANTS } from '../../../constants';
import { routes } from '../../../routes/constant';
import CustomInput from '../../../components/CustomInput';
import EmailField from '../../../components/EmailField';
import { isAddress, isAlphabet, isAlphaNumeric, isNumber, toTitleCase, validateEmail } from '../../../helpers/functions';
import useHotelContext from '../../../hooks/useHotelContext';
import { API_URL } from '../../../api/webServiceUrl';
import useCRUD from '../../../hooks/useCRUD';
import AuthHandler from '../../../utils/AuthHandler';

export default () => {
  const classes = useStyles();
  const router = useHistory();
  const [allowedToContinue, setAllowedToContinue] = useState(false);
  const { data, updateContext } = useHotelContext();
  // const pincode = data?.hotelLocation?.match(/\b\d\b/);
  const [values, setValues] = useState({
    hotelName: data?.hotelName || '',
    hotelAddress: data?.hotelLocation || '',
    pincode: '',
    city: '',
    state: ''
  });
  
  const [hotelDetail, hotelDetailResponse, hotelDetailLoading, hotelDetailErr] = useCRUD({
    type: 'create',
    url: API_URL.hotelDetail,
  });
  // const [pincode, pincodeResponse, pincodeLoading, pincodeErr] = useCRUD({
  //   type: 'create',
  //   url: `${API_URL.pincode}/${values.pincode}`,
  // });

  // console.log(data, pincode);
  
  const [errors, setErrors] = useState({
    hotelName: '',
    hotelAddress: '',
    pincode: '',
    city: '',
    state: ''
  });

  const fetchAddress = () => {
    // Combine the name and country in the 'q' parameter
    // const query = `${name} Hotel India`;
    const getToken = () => AuthHandler.authCheck()?.access_token || data.access_token;
    console.log('@@##', getToken(), data.email);
    fetch(`http://localhost:8087/hotel/v1/pincode/110017`, 
      {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`,  // Replace with actual token if needed
        'Content-Type': 'application/json',
        'email': data.email,  // Example of another custom header
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('@@@', data);
      })
      .catch((error) => {
        updateContext({
          msgSnackbar: `Error: ${error.message}`,
        });
      });
  };
  const handleContinue = () => {
    // updateContext({
    //   ...values,
    //   msgSnackbar: 'Your hotel added successfully.'
    // })
    // router.replace(routes.hotel.addDetails);
    if (!hotelDetailLoading) {
      hotelDetail({
        data: {
          pincode: values.pincode,
          city: values.city,
          state: values.state,
          hotel_name: values.hotelName,
          landmark: values.hotelAddress
        },
        headers: {
          email: data.email,
        }
      })
    }
  };
  const handleBack = () => {
    router.replace(routes.auth.hotelLocation);
  };

  // useEffect(() => {
  //   if (pincodeResponse) {
  //     // setLoading(!mobileVerifyLoading);
  //     debugger;
  //     if (pincodeResponse?.success) {
  //       updateContext({
  //         ...pincodeResponse.data,
  //         // msgSnackbar: ' successfully.'
  //       });
  //       setValues((prev) => ({ 
  //         ...prev, 
  //         city: '',
  //         state: '',
  //       }));
  //       // router.replace(routes.auth.otp);
  //     }
  //   }
  // }, [pincodeResponse]);

  useEffect(() => {
    if (hotelDetailResponse) {
      // setLoading(!mobileVerifyLoading);
      debugger;
      if (hotelDetailResponse?.success) {
        updateContext({
          ...hotelDetailResponse.data,
           msgSnackbar: 'Your hotel added successfully.'
        });
        router.replace(routes.hotel.addDetails);
        // router.replace(routes.auth.otp);
      }
    }
  }, [hotelDetailResponse]);

  const handleInputChange = (e, val, error) => {
    const {
      // prettier-ignore
      name,
      value,
      checked,
      type,
    } = e.target;
    // const newVal = type === 'checkbox' ? checked : value;
    if (name === 'hotelName') {
      if (value === '' || isAlphabet(value)) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
        setValues((prev) => ({ ...prev, [name]: value }));
      }
    } else if (name === 'hotelAddress') {
      if (value === '' || isAddress(value)) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
        setValues((prev) => ({ ...prev, [name]: value }));
      }
    } else if (name === 'pincode') {
      if (value === '' || isNumber(value)) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
        setValues((prev) => ({ ...prev, [name]: value }));
      }
    } else if (name === 'city') {
      if (value === '' || isAlphabet(value)) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
        setValues((prev) => ({ ...prev, [name]: value }));
      }
    } else if (name === 'state') {
      if (value === '' || isAlphabet(value)) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
        setValues((prev) => ({ ...prev, [name]: value }));
      }
    }
  };

  useEffect(() => {
    if (data?.hotelName) {
      setValues((prev) => ({ ...prev, hotelName: toTitleCase(data?.hotelName) }));
    }
    if (data?.hotelLocation) {
      setValues((prev) => ({ ...prev, hotelAddress: data?.hotelLocation }));
    }
  }, [data]);

  const handleBlur = (e, error) => {
    const {
      // prettier-ignore
      name,
      value,
      checked,
      type,
    } = e.target;
    // const newVal = type === 'checkbox' ? checked : value;
    if (name === 'hotelAddress' && !value.length) {
      setErrors((prev) => ({ ...prev, hotelAddress: 'Enter hotel address' }));
    } else if (name === 'hotelName' && !value.length) {
      setErrors((prev) => ({ ...prev, hotelName: 'Enter hotel name' }));
    } else if (name === 'pincode' && !value.length) {
      setErrors((prev) => ({ ...prev, pincode: 'Enter valid pincode' }));
    } else if (name === 'city' && !value.length) {
      setErrors((prev) => ({ ...prev, city: 'Enter city' }));
    } else if (name === 'state' && !value.length) {
      setErrors((prev) => ({ ...prev, state: 'Enter state' }));
    }
    if (values.pincode.length === 6) {
      // pincode({
      //   data: {
      //     email: data.email,
      //     otp: data.otp,
      //   },
      //   headers: {
      //     email: data.email,
      //   }
      // });
      fetchAddress();
    }
  };

  useEffect(() => {
    if(values.hotelAddress
      && values.hotelName
      && values.city
      && values.pincode
      && values.state
      && !errors.hotelAddress
      && !errors.hotelName
      && !errors.city
      && !errors.pincode
      && !errors.state
    ) {
      setAllowedToContinue(true);
    } else {
      setAllowedToContinue(false);
    }
  }, [values, errors]);

  return (
    <Wrapper
      showContinue
      disableBack
      allowedToContinue={allowedToContinue}
      panelClass={classes.panel}
      onContinue={handleContinue}
      bottomButtonLabel={CTA_LABELS.SAVE_PROCEED}
      loading={hotelDetailLoading}
    >
      <Container className={classes.cont}>
        <Header disableTitle handleClick={handleBack} />
        <Box mt={2}>
          <Typography component="p" className={classes.heading}>
            {CONSTANTS.ENTER_HOTEL_ADDRESS}
          </Typography>
          <Typography component="p" className={classes.headingSub}>
            {CONSTANTS.SHARE_ADDRESS}
          </Typography>
        </Box>
        <Box>
          <CustomInput 
            label={INPUT_CONSTANTS.ENTER_HOTEL_NAME_LABEL}
            value={values.hotelName}
            maxLength="50"
            error={errors.hotelName}
            name={INPUT_CONSTANTS.ENTER_HOTEL_NAME}
            handleBlur={handleBlur}
            handleChange={handleInputChange}
          />
          <CustomInput 
            label={INPUT_CONSTANTS.HOTEL_ADDRESS_LABEL}
            value={values.hotelAddress}
            maxLength="80"
            error={errors.hotelAddress}
            name={INPUT_CONSTANTS.HOTEL_ADDRESS_NAME}
            handleBlur={handleBlur}
            handleChange={handleInputChange}
          />
          <CustomInput 
            label={INPUT_CONSTANTS.PINCODE_LABEL}
            value={values.pincode}
            maxLength="6"
            error={errors.pincode}
            name={INPUT_CONSTANTS.BUSINESS_PINCODE_NAME}
            handleBlur={handleBlur}
            handleChange={handleInputChange}
          />
          <CustomInput 
            label={INPUT_CONSTANTS.CITY_LABEL}
            value={values.city}
            maxLength="20"
            error={errors.city}
            name={INPUT_CONSTANTS.BUSINESS_CITY_NAME}
            handleBlur={handleBlur}
            handleChange={handleInputChange}
          />
          <CustomInput 
            label={INPUT_CONSTANTS.STATE_LABLE}
            value={values.state}
            maxLength="10"
            error={errors.state}
            name={INPUT_CONSTANTS.BUSINESS_STATE_NAME}
            handleBlur={handleBlur}
            handleChange={handleInputChange}
          />
        </Box>
        
      </Container>
    </Wrapper>
  );
};
