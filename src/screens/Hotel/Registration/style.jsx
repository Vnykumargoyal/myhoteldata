import { makeStyles } from '@material-ui/core';

import color from '../../../constants/colors';

const useStyles = makeStyles((theme) => ({
  panel: {
    background: color.themeColor,
  },
  cont: {
    // bottom: '0',
    // position: 'absolute',
    // width: '95%',
    // left: '0',
    padding: '10px',
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
    color: color.primary,
    fontSize: '15px',
    fontWeight: 600,
    lineHeight: '18px',
    padding: '0px 5px',
  }
}));

export default useStyles;
