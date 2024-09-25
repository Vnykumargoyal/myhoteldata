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
import { TAB_CONTENT, TOTAL_Detail, TOTAL_REVENU } from '../../../constants/eng';

export default () => {
  const classes = useStyles();
  const router = useHistory();
  const [allowedToContinue, setAllowedToContinue] = useState(true);
  const { data, updateContext } = useHotelContext();
  const [tabValue, setTabValue] = useState('Current Month');
  const [revenueDetail, setRevenueDetail] = useState('Monthly');
  const [revenueBreakup, setRevenueBreakup] = useState('Quaterly');
  const [occupancyDetail, setOccupancyDetail] = useState('Yearly');

  const handleContinue = () => {
    updateContext({
      msgSnackbar: 'Hotel details added successfully.'
    })
    router.replace(routes.hotel.businessDetails);
  };
  const customChart = () => {
    if (tabValue === 'Today') {
      return [
        ["Sales", "Hours per Day"],
        ["Food", 70],
        ["Room", 30],
      ];
    } else if (tabValue === 'Current Month') {
      return [
        ["Sales", "Hours per Day"],
        ["Food", 40],
        ["Room", 60],
      ];
    } else if (tabValue === 'Current Year') {
      return [
        ["Sales", "Hours per Day"],
        ["Food", 50],
        ["Room", 50],
      ];
    } else if (tabValue === 'Custom') {
      return [
        ["Sales", "Hours per Day"],
        ["Food", 80],
        ["Room", 20],
      ];
    }
  };
  const customColumnChartMonthly = () => {
    return [
      ["Month", "Total Sales", "Total Expense", "Total Profit"],
      ["Jan 2024", 3500, 5000, 4500],
      ["Feb 2024", 3300, 4700, 3600],
      ["Mar 2024", 3200, 4800, 3000],
      ["Apr 2024", 3500, 5000, 2500],
      ["May 2024", 3300, 4700, 3000],
      ["Jun 2024", 3200, 4800, 3050],
      ["Jul 2024", 4500, 3000, 4500],
      ["Aug 2024", 6300, 5700, 6300],
      ["Sep 2024", 2200, 2800, 2200],
    ];
  };
  const customColumnChartQuaterly = () => {
    return [
      ["Quarter","Total Sales", "Total Expense", "Total Profit"],
      ["Q1 2024", 10000, 15000, 15000],
      ["Q2 2024", 12000, 17000, 10000],
      ["Q3 2024", 11000, 16000, 11000],
      ["Q4 2024", 7000, 12000, 7000],
    ];
  };
  const customColumnChartYearly = () => {
    return [
      ["Year", "Total Sales", "Total Expense", "Total Profit"],
      ["2024", 40000, 60000, 40000],
    ];
  };

  const optionsColumn = {
    chartArea: { width: "60%", height: "70%" },
    hAxis: {
      title: "",
      textStyle: { color: "#333", fontSize: 12 },
      titleTextStyle: { color: "#333", bold: true },
    },
    vAxis: {
      title: "",
      minValue: 0,
      textStyle: { color: "#333", fontSize: 12 },
      titleTextStyle: { color: "#333", bold: true },
    },
    colors: ["#cfe4ff", color.primary, color.grey, color.secondary], // Colors for Food and Room columns
    // backgroundColor: "#f5f5f5", 
    // Background color
    legend: { position: "bottom", textStyle: { fontSize: 14, color: "#333" } }, // Legend style
    bar: { groupWidth: "85%" }, // Bar width
  };
  // const dataVal = [
  //   ["Sales", "Hours per Day"],
  //   ["Food", 50],
  //   ["Room", 30],
  // ];
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
      disabledBottomSection
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
            {CONSTANTS.PROFIT_HEADING}
          </Typography>
        </Box>
        <Box mt={2}>
          <TabView onChange={setRevenueDetail} emiTenure={revenueDetail}  tenures={TOTAL_Detail} />
        </Box>
        <Box mt={2}>
          {revenueDetail === 'Monthly' && (
            <>
              <Box mt={1}>
                <Chart
                  chartType="ColumnChart"
                  data={customColumnChartMonthly()}
                  options={{ ...optionsColumn, title: revenueDetail }}
                  width={"100%"}
                  height={"300px"}
                />
              </Box>
            </>
          )}
          {revenueDetail === 'Quaterly' && (
            <Box mt={1} >
                <Chart
                  chartType="ColumnChart"
                  data={customColumnChartQuaterly()}
                  options={{ ...optionsColumn, title: revenueDetail }}
                  width={"100%"}
                  height={"300px"}
                />
            </Box>
          )}
          {revenueDetail === 'Yearly' && (
            <Box mt={1} >
                <Chart
                  chartType="ColumnChart"
                  data={customColumnChartYearly()}
                  options={{ ...optionsColumn, title: revenueDetail }}
                  width={"100%"}
                  height={"300px"}
                />
            </Box>
          )}
        </Box>
        <Box mt={3}>
          <Typography component="p" className={classes.heading}>
            {CONSTANTS.PROFIT_HEADING}
          </Typography>
        </Box>
        <Box mt={2}>
          <TabView onChange={setRevenueBreakup} emiTenure={revenueBreakup}  tenures={TOTAL_Detail} />
        </Box>
        <Box mt={2} mb={3}>
          {revenueBreakup === 'Monthly' && (
            <>
              <Box mt={1}>
              <Chart
                  chartType="ColumnChart"
                  data={customColumnChartMonthly()}
                  options={{ ...optionsColumn, title: revenueBreakup }}
                  width={"100%"}
                  height={"300px"}
                />
              </Box>
            </>
          )}
          {revenueBreakup === 'Quaterly' && (
            <Box mt={1} >
               <Chart
                  chartType="ColumnChart"
                  data={customColumnChartQuaterly()}
                  options={{ ...optionsColumn, title: revenueBreakup }}
                  width={"100%"}
                  height={"300px"}
                />
            </Box>
          )}
          {revenueBreakup === 'Yearly' && (
            <Box mt={1} >
               <Chart
                  chartType="ColumnChart"
                  data={customColumnChartYearly()}
                  options={{ ...optionsColumn, title: revenueBreakup }}
                  width={"100%"}
                  height={"300px"}
                />
            </Box>
          )}
        </Box>
        
      </Container>
    </Wrapper>
  );
};
