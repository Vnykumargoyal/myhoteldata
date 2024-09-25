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
import { Add, ArrowForwardIosSharp, EditOutlined, EditRounded, InfoOutlined, InfoRounded, RemoveCircle } from '@material-ui/icons';
import './style';
import ConditionalRender from '../../../components/ConditionalRender';
import CustomDatePicker from '../../../components/CustomDatePicker';
import moment from 'moment';
export default () => {
  const classes = useStyles();
  const router = useHistory();
  const [allowedToContinue, setAllowedToContinue] = useState(false);
  const { data, updateContext } = useHotelContext();
  const [addNewEmployee, setAddNewEmployee] = useState(false);
  const [currentEmployeeIndex, setCurrentEmployeeIndex] = useState(null);
  const [employees, setEmployees] = useState([
    { name: 'Vinay', designations: 'Manager', DOJ: '25/03/2024', salaryPerMonth: '40000', proofOfAddress: 'Delhi'},
    { name: 'Vinay', designations: 'Manager', DOJ: '25/03/2024', salaryPerMonth: '40000', proofOfAddress: 'Delhi'},
  ]);

  // Function to handle adding a new room
  const handleAddRoom = () => {
    const newEmployees = { name: '', designations: '', DOJ: '', salaryPerMonth: '', proofOfAddress: '' }; // Default values for new room
    setEmployees([...employees, newEmployees]);
    AddEmployeeToggle();
  };

  const [errors, setErrors] = useState({
    name: '', 
    designations: '', 
    DOJ: '', 
    salaryPerMonth: '', 
    proofOfAddress: '',
  });

  // Function to handle input changes (for controlled components)
  const handleRoomChange = (index, field, value) => {
    const updatedEmployees = employees.map((employee, i) => {
      if (i === index) {
        if (field === 'salaryPerMonth') {
          if (value === '' || isNumber(value)) {
            return { ...employee, [field]: value };
          }
        } else if (field === 'name' || field === 'proofOfAddress' || field === 'designations'){
          if (value === '' || isAlphabet(value)) {
            return { ...employee, [field]: value };
          }
        }
        else {
          return { ...employee, [field]: value };
        }
      }
      return employee;
    });

    setEmployees(updatedEmployees);
  };

  const removeRoom = (index) => {
    setEmployees(prevRooms => prevRooms.filter((_, i) => i !== index));
  };


  // Function to check if all rooms have all values filled
  const checkIfAllRoomsFilled = () => {
    return employees.every(emp => emp.name && emp.designations && emp.DOJ && emp.proofOfAddress && emp.salaryPerMonth);
  };

  // Update `allowedToContinue` based on room validation
  useEffect(() => {
    setAllowedToContinue(checkIfAllRoomsFilled());
  }, [employees]); // Run this effect whenever `rooms` changes

  const handleContinue = () => {
    updateContext({
      msgSnackbar: 'Employee details added successfully.'
    })
    router.replace(routes.hotel.addDetails);
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
    if (name === 'name' && !value.length) {
      setErrors((prev) => ({ ...prev, [name]: 'Enter name' }));
    } else if (name === 'designations' && !value.length) {
      setErrors((prev) => ({ ...prev, [name]: 'Enter designations' }));
    } else if (name === 'DOJ' && !value.length) {
      setErrors((prev) => ({ ...prev, [name]: 'Enter your date of joining' }));
    } else if (name === 'salaryPerMonth' && !value.length) {
      setErrors((prev) => ({ ...prev, [name]: 'Enter salary per month' }));
    } else if (name === 'proofOfAddress' && !value.length) {
      setErrors((prev) => ({ ...prev, [name]: 'Enter proof of address' }));
    }
  };

  const convertToISOFormat = (dateString) => {
    if (!dateString) return ""; // Handle undefined or empty date string
  
    // Check if the format is already yyyy-MM-dd
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return dateString;
    }
  
    // Split by '/', expecting dd/MM/yyyy format
    const [day, month, year] = dateString.split('/');
    
    // Ensure the date components exist
    if (!day || !month || !year) {
      console.error("Invalid date format:", dateString);
      return ""; // Return empty string if date is invalid
    }
  
    return `${year}-${month}-${day}`; // Return in yyyy-MM-dd format
  };
  const addEmpAccordingToIndex = (index) => {
    let val  = index ? index : employees.length -1;
    const getData = employees.filter((item, i) => i === val);
    console.log('getData', getData);
    const currentIndex = employees.findIndex((item) => item.name === getData?.[0].name);
    return (
      getData?.map((item) => {
        return (
          <Box mt={2} mb={2}>
            <CustomInput 
              label={INPUT_CONSTANTS.NAME_LABEL}
              value={item.name}
              maxLength="50"
              error={errors.name}
              name={INPUT_CONSTANTS.NAME_LABEL_NAME}
              handleBlur={handleBlur}
              handleChange={(e) => handleRoomChange(currentIndex, 'name', e.target.value)}
            />
            <CustomInput 
              label={INPUT_CONSTANTS.DESIGNATION_LABEL}
              value={item.designations}
              maxLength="50"
              error={errors.designations}
              name={INPUT_CONSTANTS.DESIGNATION_NAME}
              handleBlur={handleBlur}
              handleChange={(e) => handleRoomChange(currentIndex, 'designations', e.target.value)}
            />
            <CustomInput 
              label={INPUT_CONSTANTS.DOJ_LABEL}
              value={convertToISOFormat(item.DOJ)}  // Convert the date to yyyy-MM-dd format
              maxLength="20"
              error={errors.DOJ}
              name={INPUT_CONSTANTS.DOJ_NAME}
              type="date"
              handleBlur={handleBlur}
              disableEndAdornment
              handleChange={(e) => handleRoomChange(currentIndex, 'DOJ', e.target.value)}
            />
            {/* <CustomDatePicker
              value={item.DOJ}
              // onChange={handleDOBChange}
              error={errors.DOJ}
              onChange={(e) => handleRoomChange(currentIndex, 'DOJ', e.target.value)}
              onBlur={handleBlur}
            /> */}
            <CustomInput 
              label={INPUT_CONSTANTS.SALARY_PER_MONTH_LABEL}
              value={item.salaryPerMonth}
              maxLength="10"
              error={errors.salaryPerMonth}
              name={INPUT_CONSTANTS.SALARY_PER_MONTH_NAME}
              handleBlur={handleBlur}
              handleChange={(e) => handleRoomChange(currentIndex, 'salaryPerMonth', e.target.value)}
            />
            <CustomInput 
              label={INPUT_CONSTANTS.PROOF_OF_ADDRESS_LABEL}
              value={item.proofOfAddress}
              maxLength="40"
              error={errors.proofOfAddress}
              name={INPUT_CONSTANTS.PROOF_OF_ADDRESS_NAME}
              handleBlur={handleBlur}
              handleChange={(e) => handleRoomChange(currentIndex, 'proofOfAddress', e.target.value)}
            />
          </Box>
        );
      })
    );
  }

  const showListOfEmployee = () => {
    return (
      <Box mt={2} >
        <div>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={4}>
              <Typography variant="subtitle1" className={classes.roomType}>Name</Typography>
            </Grid>
            <Grid item xs={3.5} style={{ paddingLeft: '6px' }}>
              <Typography variant="subtitle1" className={classes.roomType} >Designation</Typography>
            </Grid>
            <Grid item xs={3.5}>
              <Typography variant="subtitle1" className={classes.roomType}>Salary</Typography>
            </Grid>
            {/* <Grid item xs={1}></Grid> */}
          </Grid>
          {employees.map((employee, index) => (
            <div key={index} className={classes.contOfList}>
              <Grid item xs={4} >
                <input
                  type="text"
                  value={employee.name}
                  className={classes.customInput}
                  style={{ width: '85%' }}
                  // className="custom-input"
                  onChange={(e) => handleRoomChange(index, 'name', e.target.value)}
                  maxLength={50}
                  disabled
                />
              </Grid>
              <Grid item xs={3}>
                <input
                  type="text"
                  value={employee.designations}
                  className={classes.customInput}
                  style={{ width: '80%' }}
                  // className="custom-input"
                  onChange={(e) => handleRoomChange(index, 'designations', e.target.value)}
                  maxLength={50}
                  disabled
                />
              </Grid>
              <Grid item xs={3}>
                <input
                  type="text"
                  value={employee.salaryPerMonth}
                  // className="custom-input"
                  style={{ width: '80%' }}
                  className={classes.customInput}
                  onChange={(e) => handleRoomChange(index, 'price', e.target.value)}
                  maxLength={8}
                  disabled
                />
              </Grid>
              <Grid item xs={2}>
                <Tooltip title="Edit">
                  <IconButton onClick={() => {
                    addEmpAccordingToIndex(index);
                    AddEmployeeToggle();
                  }}>
                    <EditOutlined />
                  </IconButton>
                </Tooltip>
                {/* Show "Add Option" button for the last item */}
                {/* {index === employees.length - 1 && (
                  <Tooltip title="Add Room">
                    <IconButton onClick={handleAddRoom}>
                      <Add />
                    </IconButton>
                  </Tooltip>
                )} */}

              </Grid>
            </div>
          ))}
          <Box mt={2} mb={2}>
            <Grid item xs={12} align="center">
              <Tooltip title="Add Room">
                <IconButton onClick={handleAddRoom}>
                  <Add />
                </IconButton>
              </Tooltip>
            </Grid>
          </Box>
          <Grid item xs={12} style={{ textAlign: 'left', marginTop: '10px' }}>
            {/* <InfoIcon style={{ verticalAlign: 'middle', marginRight: '5px' }} /> */}
            <InfoOutlined style={{ verticalAlign: 'middle', marginRight: '5px', height: '20px', }} />
            <Typography variant="body2" className={classes.bottomText} style={{ display: 'inline' }}>
              You can edit and modify these details later also
            </Typography>
          </Grid>
        </div>
      </Box>
    );
  };

  const AddEmployeeToggle = () => {
    setAddNewEmployee(!addNewEmployee);
  };

  return (
    <Wrapper
      showContinue
      disableBack
      allowedToContinue={allowedToContinue}
      panelClass={classes.panel}
      onContinue={addNewEmployee ? AddEmployeeToggle : handleContinue}
      bottomButtonLabel={!addNewEmployee ? CTA_LABELS.CONTINUE : CTA_LABELS.SAVE_AND_CONTINUE}
    >
      <Container className={classes.cont}>
        {/* <Header disableTitle /> */}
        <Box mt={4}>
          <Typography component="p" className={classes.heading}>
            {CONSTANTS.ADD_EMPLOYEE_HEADING}
          </Typography>
          <Typography component="p" className={classes.headingSub}>
            {CONSTANTS.ADD_EMPLOYEE_SUBHEADING}
          </Typography>
        </Box>
        <ConditionalRender
          condition={addNewEmployee}
          truthyComponent={addEmpAccordingToIndex()}
          falsyComponent={showListOfEmployee()}
        />
       
      </Container>
    </Wrapper>
  );
};
