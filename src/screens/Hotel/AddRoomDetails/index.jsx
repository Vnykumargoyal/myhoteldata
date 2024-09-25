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
import { Add, ArrowForwardIosSharp, EditRounded, InfoOutlined, InfoRounded, RemoveCircle } from '@material-ui/icons';
import './style';
export default () => {
  const classes = useStyles();
  const router = useHistory();
  const [allowedToContinue, setAllowedToContinue] = useState(false);
  const { data, updateContext } = useHotelContext();
  const [rooms, setRooms] = useState([
    { type: 'Standard', number: '101', price: '2000' },
  ]);

  // Function to handle adding a new room
  const handleAddRoom = () => {
    const newRoom = { type: 'Standard', number: '', price: '' }; // Default values for new room
    setRooms([...rooms, newRoom]);
  };

  // Function to handle input changes (for controlled components)
  const handleRoomChange = (index, field, value) => {
    const updatedRooms = rooms.map((room, i) => {
      if (i === index) {
        if (field === 'number' || field === 'price') {
          if (value === '' || isNumber(value)) {
            return { ...room, [field]: value };
          }
        } else {
          return { ...room, [field]: value };
        }
      }
      return room;
    });
  
    setRooms(updatedRooms);
  };

  const removeRoom = (index) => {
    setRooms(prevRooms => prevRooms.filter((_, i) => i !== index));
  };


  // Function to check if all rooms have all values filled
  const checkIfAllRoomsFilled = () => {
    return rooms.every(room => room.type && room.number && room.price);
  };

  // Update `allowedToContinue` based on room validation
  useEffect(() => {
    setAllowedToContinue(checkIfAllRoomsFilled());
  }, [rooms]); // Run this effect whenever `rooms` changes

  const handleContinue = () => {
    updateContext({
      msgSnackbar: 'Room details added successfully.'
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
      bottomButtonLabel={CTA_LABELS.SAVE_AND_CONTINUE}
    >
      <Container className={classes.cont}>
        {/* <Header disableTitle /> */}
        <Box mt={4}>
          <Typography component="p" className={classes.heading}>
            {CONSTANTS.ADD_ROOM_HEADING}
          </Typography>
          <Typography component="p" className={classes.headingSub}>
            {CONSTANTS.ADD_ROOM_SUBHEADING}
          </Typography>
        </Box>
        <Box mt={2} >
          <div>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={4}>
                <Typography variant="subtitle1" className={classes.roomType}>Room Type</Typography>
              </Grid>
              <Grid item xs={3.5} style={{paddingLeft: '6px'}}>
                <Typography variant="subtitle1" className={classes.roomType} >Room Number</Typography>
              </Grid>
              <Grid item xs={3.5}>
                <Typography variant="subtitle1" className={classes.roomType}>Room Price</Typography>
              </Grid>
              {/* <Grid item xs={1}></Grid> */}
            </Grid>
            {rooms.map((room, index) => (
              <div key={index} className={classes.contOfList}>
                <Grid item xs={4} >
                  <select
                    value={room.type}
                    // className="custom-select"
                    className={classes.customInput}
                    onChange={(e) => handleRoomChange(index, 'type', e.target.value)}
                  >
                    {/* <option className="custom-select" value="Select" autoS>Select</option> */}
                    <option className="custom-select" value="Standard">Standard</option>
                    <option className="custom-select"value="Classic">Classic</option>
                    <option className="custom-select" value="Premium">Premium</option>
                  </select>
                </Grid>
                <Grid item xs={3}>
                  <input
                    type="text"
                    value={room.number}
                    className={classes.customInput}
                    style={{width: '75%'}}
                    // className="custom-input"
                    onChange={(e) => handleRoomChange(index, 'number', e.target.value)}
                    maxLength={5}
                  />
                </Grid>
                <Grid item xs={3}>
                  <input
                    type="text"
                    value={room.price}
                    // className="custom-input"
                    className={classes.customInput}
                    onChange={(e) => handleRoomChange(index, 'price', e.target.value)}
                    maxLength={6}
                  />
                </Grid>
                <Grid item xs={2}>
                  {/* {rooms?.length > 1 ? (
                    <Tooltip title="Edit">
                      <IconButton>
                        <RemoveCircle />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Add Room">
                    <IconButton onClick={handleAddRoom}>
                      <Add />
                    </IconButton>
                  </Tooltip>
                  )} */}
                  {index < rooms.length - 1 && (
                    <Tooltip title="Edit">
                      <IconButton onClick={() => removeRoom(index)}>
                        <RemoveCircle />
                      </IconButton>
                    </Tooltip>
                  )}
                  {/* Show "Add Option" button for the last item */}
                  {index === rooms.length - 1 && (
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
                You can edit and modify these details later also
              </Typography>
            </Grid>
          </div>
        </Box>
      </Container>
    </Wrapper>
  );
};
