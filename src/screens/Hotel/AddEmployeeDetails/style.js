import { makeStyles } from '@material-ui/core';

import color from '../../../constants/colors';

const useStyles = makeStyles((theme) => ({
  panel: {
    background: color.themeColor,
    // justifyContent: 'space-between'
  },
  cont: {
    // justifyContent: 'space-between'
  },
  container: {
    marginTop: theme.spacing(4),
  },
  buttonStyle: {
    backgroundColor: color.greenBtn,
    color: color.black
  },
  buttonStyle1: {
    backgroundColor: color.white,
    color: color.black
  }, 
  buttonStyleOtp: {
    color: color.primary,
  },
  buttonStyleCreate: {
    backgroundColor: color.primary,
  },
  heading: {
    fontFamily: 'Indivisible-Light',
    fontSize: '12px',
    fontWeight: 600,
    lineHeight: '18px',
    color: color.secondary,
  },
  headingSub: {
    fontFamily: 'Indivisible',
    fontSize: '10px',
    fontWeight: 400,
    lineHeight: '18px',
    color: color.secondary,
  },
  haveAccount: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontFamily: 'Indivisible',
    fontSize: '12px',
    fontWeight: 400,
    color: color.secondary5,
  },
  haveAccountCont: {
    fontFamily: 'Indivisible',
    color: color.secondary,
    fontSize: '15px',
    fontWeight: 600,
    lineHeight: '18px',
    padding: '0px 5px',
  },
  roomType: {
    fontFamily: 'Indivisible-Light',
    color: color.secondary5,
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '18px',
    // padding: '0px 5px',
  },
  customInput: {
    padding: '5px',
    border: '1px solid #ced4da',
    borderRadius: '4px',
    transition: 'border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    fontFamily: 'Indivisible',
    color: color.secondary,
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '18px',
    width: '90%',
    '&:hover':  {
      borderColor: '#80bdff',
      // boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
      outline: 'none',
    }
    // padding: '0px 5px',
  },
  contOfList: {
    margin: '0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomText: {
    fontFamily: 'Indivisible',
    color: color.secondary5,
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '18px',
    // padding: '0px 5px',
  }
  
}));

export default useStyles;
