/* eslint-disable no-unneeded-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { Box, Container, IconButton, Typography } from '@material-ui/core';
import queryString from 'query-string';
import { Chart } from "react-google-charts";
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
import { ADD_HOTEL_DETAIL, Expense_DETAIL, OVERVIEW_DETAIL, Reservations_DETAIL } from '../../../config';
import TabView from '../../../components/TabView';
import color from '../../../constants/colors';
import { TAB_CONTENT } from '../../../constants/eng';

export default () => {
  const classes = useStyles();
  const router = useHistory();
  const [allowedToContinue, setAllowedToContinue] = useState(true);
  const { data, updateContext } = useHotelContext();
  const [tabValue, setTabValue] = useState('Overview');

  const handleContinue = () => {
    updateContext({
      msgSnackbar: 'Hotel details added successfully.'
    })
    router.replace(routes.hotel.businessDetails);
  };
  const dataVal = [
    ["Task", "Hours per Day"],
    ["Revenue", 50],
    ["Expense", 30],
    ["Profit & Loss", 20],
  ];
  const options = {
    title: "",
    // backgroundColor: "#f5f5f5", // Custom background color
    pieHole: 0, // 0 means a full pie (circle), increasing value makes it a donut chart
    pieSliceText: "percentage", // Display percentage inside slices
    backgroundColor: "#ffffff", // Set a custom background color
    pieSliceTextStyle: {
      color: color.secondary
    },
    slices: {
      0: { color: color.primary },
      1: { color: "#cfe4ff" },
      2: { color: color.grey },
    },
    legend: {
      position: "bottom",
      display: 'none',
      textStyle: { color: "#000000", fontSize: 14 }, // Legend style
    },
    titleTextStyle: {
      color: "#333333", // Title font color
      fontSize: 15,
      bold: true,
    },
    chartArea: { width: "90%", height: "90%" }, // Maximize the chart area
  };

  const onChageData = (val) => {
    setTabValue(val)
  };

  const handleRedirect = (val) => {
    if (val === 'Revenue') {
      router.replace(routes.hotel.totalRevenue);
    } else if (val === 'Expense') {
      router.replace(routes.hotel.totalExpense);
    } else if (val === 'Profit & Loss') {
      router.replace(routes.hotel.totalProfit);
    }
  };

  return (
    <Wrapper
      showContinue
      disabledBottomSection
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
            {CONSTANTS.MY_BUSINESS_HEADING}
          </Typography>
          <Typography component="p" className={classes.headingSub}>
            {CONSTANTS.MY_BUSINESS_SUBHEADING}
          </Typography>
        </Box>
        <Box mt={2}>
          <TabView onChange={onChageData} emiTenure={tabValue}  tenures={TAB_CONTENT}/>
        </Box>
      {tabValue === 'Overview' && (
        <>
          <Box mt={1}>
            <Chart
              chartType="PieChart"
              data={dataVal}
              options={options}
              width={"100%"}
              height={"300px"}
            />
          </Box>
          <Box mt={1} >
            {OVERVIEW_DETAIL.map((item) => {
              return (
                <CustomCardDetails 
                  title={item.titel} 
                  describe={item.describe} 
                  handleChange={() => handleRedirect(item.titel)} />
              );
            })}
          </Box>
          <Box mt={3}>
            <Typography component="p" className={classes.today}>Today's Booking</Typography>
            <Box mt={2} mb={2} className={classes.book}>
              <div className={classes.bookCont}>
                <div className={classes.bookText}>Check In Rooms</div>
                <div className={classes.bookText}>4</div>
              </div>
              <div className={classes.bookCont}>
                <div className={classes.bookText}>Check Out Rooms</div>
                <div className={classes.bookText}>2</div>
              </div>
            </Box>
          </Box>
        </>
      )}
      {tabValue === 'Reservations' && (
        <Box mt={1} >
          {Reservations_DETAIL.map((item) => {
            return (
              <CustomCardDetails 
                title={item.titel} 
                describe={item.describe} 
                handleChange={() => handleRedirect(item.titel)} />
            );
          })}
        </Box>
      )}
      {tabValue === 'Expense' && (
        <Box mt={1} >
          {Expense_DETAIL.map((item) => {
            return (
              <CustomCardDetails 
                title={item.titel} 
                describe={item.describe} 
                handleChange={() => handleRedirect(item.titel)} />
            );
          })}
        </Box>
      )}
        
      </Container>
    </Wrapper>
  );
};
