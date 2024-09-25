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
  today: {
    fontFamily: 'Indivisible-Light',
    fontSize: '13px',
    fontWeight: 600,
    lineHeight: '18px',
    color: color.secondary,
  },
  book: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  bookCont: {
    border: `1px solid ${color.grey}`,
    // height: '50px',
    width: '130px',
    borderRadius: '10px', 
    padding: '10px 13px',
  },
  bookText: {
    fontFamily: 'Indivisible',
    fontSize: '13px',
    fontWeight: 500,
    lineHeight: '18px',
    color: color.secondary,
    textAlign: 'center'
  }
}));

export default useStyles;
