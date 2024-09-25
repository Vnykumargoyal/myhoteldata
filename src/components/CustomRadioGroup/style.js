import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  inputError: {
    fontWeight: 600,
    fontFamily: 'Indivisible',
    fontSize: '12px',
    textAlign: 'center',
  },
  inputStyleSelected: {
    color: theme.palette.secondary.main,
    fontSize: '14px',
    textAlign: 'left',
    fontFamily: 'Indivisible-Light',
    fontWeight: '500',
    lineHeight: '17px',
  },
  inputStyle: {
    color: theme.palette.secondary.main5,
    fontSize: '14px',
    textAlign: 'left',
    fontFamily: 'Indivisible-Light',
    fontWeight: '500',
    lineHeight: '17px',
  },
  labelContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  active: {
    color: theme.palette.secondary.main,
  },
}));

export default useStyles;
