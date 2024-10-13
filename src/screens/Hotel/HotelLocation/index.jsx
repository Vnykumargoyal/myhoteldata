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
import { isAlphabet, isAlphaNumeric, validateEmail } from '../../../helpers/functions';
import { API_URL } from '../../../api/webServiceUrl';
import useCRUD from '../../../hooks/useCRUD';
import useHotelContext from '../../../hooks/useHotelContext';

export default () => {
  const classes = useStyles();
  const router = useHistory();
  const [allowedToContinue, setAllowedToContinue] = useState(false);
  const { data, updateContext } = useHotelContext();
  const [values, setValues] = useState({
    hotelName: data?.hotelName ||  '',
    hotelLocation: data?.hotelLocation || ''
  });
  const [errors, setErrors] = useState({
    hotelName: '',
    hotelLocation: ''
  });
  const [debouncedHotelName, setDebouncedHotelName] = useState(values.hotelName);
  
  // useEffect(() => {
  //   // handleContinue();
  //   if (values?.hotelName) {
  //     gatAddress();
  //   }
  // }, [values]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedHotelName(values.hotelName);
    }, 500); // Wait 500ms after user stops typing

    return () => {
      clearTimeout(handler); // Clear the timeout if hotelName changes within the debounce delay
    };
  }, [values.hotelName]);  // Only re-run the effect if hotelName changes

  // Effect to fetch the address when the debounced hotel name changes
  useEffect(() => {
    if (debouncedHotelName) {
      fetchAddress(debouncedHotelName);
    }
  }, [debouncedHotelName]);

  let country = "India";
  // const name = "Hilton"; 
  const fetchAddress = (name) => {
    // Combine the name and country in the 'q' parameter
    const query = `${name} Hotel India`;
  
    fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          console.log(data[0].display_name);  // Get the address of the first result
          setValues((prev) => ({ ...prev, 'hotelLocation': data[0].display_name }));
          console.log(`Latitude: ${data[0].lat}, Longitude: ${data[0].lon}`);
        } else {
          updateContext({
            msgSnackbar: 'No data found',
          });
        }
      })
      .catch((error) => {
        updateContext({
          msgSnackbar: `Error: ${error.message}`,
        });
      });
  };


  const handleContinue = () => {
    router.replace(routes.auth.hotelAddress);
    updateContext({
      ...values,
    })
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

    
  
    if (name === 'hotelName') {
      if (value === '' || isAlphabet(value)) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
        setValues((prev) => ({ ...prev, [name]: value }));
      }
    } else if (name === 'hotelLocation') {
      if (value === '' || isAlphaNumeric(value)) {
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
    if (name === 'hotelLocation' && !value.length) {
      setErrors((prev) => ({ ...prev, hotelLocation: 'Enter hotel address' }));
    } else if (name === 'hotelName' && !value.length) {
      setErrors((prev) => ({ ...prev, hotelName: 'Enter hotel name' }));
    }
  };

  useEffect(() => {
    if(values.hotelLocation
      && values.hotelName
      && !errors.hotelLocation
      && !errors.hotelName
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
      bottomButtonLabel={CTA_LABELS.CONFIRM_LOCATION}
    >
      <Container className={classes.cont}>
        {/* <Header disableTitle /> */}
        <Box mt={4}>
          <Typography component="p" className={classes.heading}>
            {CONSTANTS.HOTELDETAIL}
          </Typography>
          <Typography component="p" className={classes.headingSub}>
            {CONSTANTS.SHARE_ADDRESS}
          </Typography>
        </Box>
        <Box>
          <CustomInput 
            label={INPUT_CONSTANTS.ENTER_HOTEL_NAME_LABEL}
            value={values.hotelName}
            maxLength="10"
            error={errors.hotelName}
            name={INPUT_CONSTANTS.ENTER_HOTEL_NAME}
            handleBlur={handleBlur}
            handleChange={handleInputChange}
            lowerStyle={false}
          />
          <CustomInput 
            label={INPUT_CONSTANTS.SEARCH_HOTEL_LOCATION_LABEL}
            value={values.hotelLocation}
            maxLength="10"
            // error={errors.hotelLocation}
            name={INPUT_CONSTANTS.HOTEL_LOCATION_NAME}
            // handleBlur={handleBlur}
            handleChange={handleInputChange}
            disabled
          />
        </Box>
        
      </Container>
    </Wrapper>
  );
};
