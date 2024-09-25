/* eslint-disable no-unneeded-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, IconButton, Tooltip, Typography } from '@material-ui/core';
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
import { Add, InfoOutlined, RemoveCircle } from '@material-ui/icons';

export default () => {
  const classes = useStyles();
  const router = useHistory();
  const [allowedToContinue, setAllowedToContinue] = useState(false);
  const { data, updateContext } = useHotelContext();
  const [foods, setFoods] = useState([
    { foodItems: '', unitPrice: '', },
  ]);

  // Function to handle adding a new room
  const handleAddRoom = () => {
    const newFood = { foodItems: '', unitPrice: '', }; // Default values for new room
    setFoods([...foods, newFood]);
  };

  // Function to handle input changes (for controlled components)
  const handleRoomChange = (index, field, value) => {
    const updatedFoods = foods.map((food, i) => {
      if (i === index) {
        if (field === 'unitPrice') {
          if (value === '' || isNumber(value)) {
            return { ...food, [field]: value };
          }
        } else if (field === 'foodItems') {
          if (value === '' || isAlphabet(value)) {
            return { ...food, [field]: value };
          }
        }
      }
      return food;
    });
  
    setFoods(updatedFoods);
  };

  const removeRoom = (index) => {
    setFoods(prevFoods => prevFoods.filter((_, i) => i !== index));
  };


  // Function to check if all rooms have all values filled
  const checkIfAllRoomsFilled = () => {
    return foods.every(food => food.unitPrice && food.foodItems);
  };

  // Update `allowedToContinue` based on room validation
  useEffect(() => {
    setAllowedToContinue(checkIfAllRoomsFilled());
  }, [foods]); // Run this effect whenever `rooms` changes

  const handleContinue = () => {
    updateContext({
      msgSnackbar: 'Food details added successfully.'
    })
    router.replace(routes.hotel.addDetails);
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
            {CONSTANTS.ADD_FOOD_DETAILS}
          </Typography>
          <Typography component="p" className={classes.headingSub}>
            {CONSTANTS.ADD_FOOD_SUBDETAILS}
          </Typography>
        </Box>
        <Box mt={2} >
          <div>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={7}>
                <Typography variant="subtitle1" className={classes.roomType}>Food Items</Typography>
              </Grid>
              <Grid item xs={5} style={{ paddingLeft: '6px' }}>
                <Typography variant="subtitle1" className={classes.roomType} >Unit Price</Typography>
              </Grid>
              {/* <Grid item xs={3.5}>
                <Typography variant="subtitle1" className={classes.roomType}>Room Price</Typography>
              </Grid> */}
              {/* <Grid item xs={1}></Grid> */}
            </Grid>
            {foods.map((food, index) => (
              <div key={index} className={classes.contOfList}>
                <Grid item xs={7}>
                  <input
                    type="text"
                    value={food.foodItems}
                    className={classes.customInput}
                    style={{ width: '75%' }}
                    // className="custom-input"
                    onChange={(e) => handleRoomChange(index, 'foodItems', e.target.value)}
                    maxLength={50}
                  />
                </Grid>
                <Grid item xs={3}>
                  <input
                    type="text"
                    value={food.unitPrice}
                    // className="custom-input"
                    className={classes.customInput}
                    onChange={(e) => handleRoomChange(index, 'unitPrice', e.target.value)}
                    maxLength={5}
                  />
                </Grid>
                <Grid item xs={2}>
                  {index < foods.length - 1 && (
                    <Tooltip title="Edit">
                      <IconButton onClick={() => removeRoom(index)}>
                        <RemoveCircle />
                      </IconButton>
                    </Tooltip>
                  )}
                  {/* Show "Add Option" button for the last item */}
                  {index === foods.length - 1 && (
                    <Tooltip title="Add Room">
                      <IconButton onClick={handleAddRoom}>
                        <Add />
                      </IconButton>
                    </Tooltip>
                  )}

                </Grid>
              </div>
            ))}

            {/* <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Tooltip title="Add Room">
                <IconButton onClick={handleAddRoom}>
                  <Add />
                </IconButton>
              </Tooltip>
            </Grid> */}

            <Grid item xs={12} style={{ textAlign: 'left', marginTop: '10px' }}>
              {/* <InfoIcon style={{ verticalAlign: 'middle', marginRight: '5px' }} /> */}
              <InfoOutlined style={{ verticalAlign: 'middle', marginRight: '5px', height: '20px', }} />
              <Typography variant="body2" className={classes.bottomText} style={{ display: 'inline' }}>
                You can edit and modify these detail later also
              </Typography>
            </Grid>
          </div>
        </Box>
      </Container>
    </Wrapper>
  );
};
