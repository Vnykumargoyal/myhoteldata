import { makeStyles } from '@material-ui/core';

import color from '../../../constants/colors';

const useStyles = makeStyles((theme) => ({
  panel: {
    background: color.themeColor,
  },
  container: {
    marginTop: theme.spacing(4),
  },
  buttonStyle: {
    backgroundColor: color.primary,
  }, 
  buttonStyleOtp: {
    color: color.primary,
  },
  buttonStyleCreate: {
    backgroundColor: color.primary,
  },
  setBottomCreate: {
    position: 'absolute',
    left: '0',
    bottom: '180px',
    margin: 'auto',
    width: '100%'
  },
  helperContainer: {
    '& > h6': {
      // marginBottom: theme.spacing(2.25),
    },
    '& > div': {
      fontSize: '0.875rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.75rem',
      },
      '& > span': {
        fontWeight: 500,
        fontFamily: 'Indivisible-Bold',
        fontSize: '0.875rem',
        [theme.breakpoints.down('sm')]: {
          fontSize: '0.75rem',
        },
      },
    },
  },
  mobileInput: {
    display: 'flex',
    margin: '15px 0 10px 0',
    alignItems: 'center',
    '& > span': {
      fontSize: '18px',
      fontWeight: 'bold',
      [theme.breakpoints.down('sm')]: {
        fontSize: '18px',
      },
    },
  },
  input: {
    fontSize: '18px',
    fontFamily: 'Indivisible',
    lineHeight: '120%',
    width: '100%',
    outline: 'none',
    fontWeight: 600,
    borderColor: 'transparent',
    paddingTop: 0,
    paddingLeft: '10px',
    background: 'transparent',
    color: color.secondary,
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
    },
  },
  otpInput: {
    paddingLeft: 0,
    letterSpacing: '1.5rem',
  },
  inputError: {
    marginTop: '10px !important',
    fontSize: '0.875rem',
    fontWeight: 500,
    fontFamily: 'Indivisible',
    lineHeight: '140%',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.75rem',
    },
  },
  editButton: {
    marginLeft: '5px',
    cursor: 'pointer',
    fontWeight: 600,
    color: color.primary,
    '&:hover': {
      cursor: 'pointer',
    },
  },
  resendWrapper: {
    '& > span': {
      fontSize: '0.875rem',
      fontFamily: 'Indivisible-Light',
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.75rem',
      },
    },
  },
  needHelp: {
    fontSize: '0.875rem',
    fontWeight: 600,
    margin: '0.75rem 0',
    color: theme.palette.primary.main,
    // opacity: 0.7,
    marginTop: '10px',
    marginBottom: '10px',
    textAlign: 'center',
  },
  mobileNumberData: {
    display: 'flex',
    alignItems: 'center',
  },
  addNumber: {
    marginLeft: '8px',
    color: theme.palette.secondary.main,
    fontWeight: 600,
  },
  mobileData: {
    fontWeight: 800,
    fontFamily: 'Indivisible-Light',
  },
  setBottom: {
    position: 'absolute',
    left: '0',
    bottom: '25px',
    margin: 'auto',
  },
  buttonStyletext:{
    fontSize: '18px',
    fontFamily: 'Indivisible-Light',
    color: color.secondary4
  }
}));

export default useStyles;
