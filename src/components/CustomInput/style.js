/* eslint-disable no-confusing-arrow */
import { makeStyles } from '@material-ui/core';
import color from '../../constants/colors';
import { BorderBottom } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  textStyle: {
    color: theme.palette.secondary.main,
    fontSize: '12px',
    marginTop: '3px',
    textAlign: 'left',
    fontFamily: 'Indivisible',
    fontWeight: '500',
    lineHeight: '14px',
  },
  inputStyle: {
    color: color.secondary,
    fontSize: '15px',
    textAlign: 'left',
    fontFamily: 'Indivisible-Light',
    fontWeight: '500',
    lineHeight: '17px',
    // marginBottom: '10px',
    textTransform: ({ lowerStyle }) => lowerStyle ? 'lowercase' : 'capitalize',
  },
  cont: {
    display: 'block !important',
    // border: '1px solid'
  },
  customFilledInput: {
    backgroundColor: `${color.themeColor} !important`, // Background color
    border: '1px solid #ccc', // Full border
    borderRadius: '4px', // Rounded corners
    transition: 'border-color 0.3s ease', // Smooth transition on focus
    '&:hover': {
      borderColor: '#888', // Border color on hover
    },
    '&.Mui-focused': {
      border: `2px solid ${color.primary}`, // Primary color on focus
      backgroundColor: color.themeColor,
      boxShadow: 'none', // Remove underline
    },
    '&.Mui-disabled': {
      backgroundColor: '#f0f0f0', // Background for disabled state
      borderColor: color.gray, // Border color for disabled state
    },
    // Additional styles for multiline and adornments if needed
    '&.MuiFilledInput-multiline': {
      padding: '27px 12px 10px',
    },
    '&.MuiFilledInput-multiline.MuiFilledInput-marginDense': {
      paddingTop: '23px',
      paddingBottom: '6px',
    },
    '&.MuiFilledInput-adornedStart': {
      paddingLeft: '12px',
    },
    '&.MuiFilledInput-adornedEnd': {
      paddingRight: '12px',
    },
    '&.MuiFilledInput-input': {
      padding: '27px 12px 10px',
    },
    '&.MuiFilledInput-inputMarginDense': {
      paddingTop: '23px',
      paddingBottom: '6px',
    },
    '&.MuiFilledInput-inputHiddenLabel': {
      paddingTop: '18px',
      paddingBottom: '19px',
    },
    '&.MuiFilledInput-inputHiddenLabel.MuiFilledInput-inputMarginDense': {
      paddingTop: '10px',
      paddingBottom: '11px',
    },
    '&.MuiFilledInput-inputMultiline': {
      padding: 0,
    },
    '&.MuiFilledInput-inputAdornedStart': {
      paddingLeft: 0,
    },
    '&.MuiFilledInput-inputAdornedEnd': {
      paddingRight: 0,
    },
    '&.MuiFilledInput-underline:before': {
      borderBottom: 'none !important'
    },
    '&.MuiFilledInput-underline:after': {
      borderBottom: 'none !important'
    }
  },
}));

export default useStyles;
