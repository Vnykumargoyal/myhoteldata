import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  textStyle: {
    color: theme.palette.secondary.main5,
    fontSize: '12px',
    marginTop: '3px',
    textAlign: 'left',
    fontFamily: 'Indivisible',
    fontWeight: '400',
    lineHeight: '14px',
  },
  inputStyle: {
    color: theme.palette.secondary.main,
    fontSize: '15px',
    textAlign: 'left',
    fontFamily: 'Indivisible-Light',
    fontWeight: '500',
    lineHeight: '17px',
    width: '92%',
    margin: '15px 0px',
    paddingBottom: '15px',
    backgroundColor: theme.palette.text.white,
  },
  iconStyle: {
    marginRight: '10px',
  },
}));

export default useStyles;
