import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  containerPro: {
    background: theme.palette.text.lightOrange,
    borderRadius: '8px',
    position: 'relative',
    top: '20px',
    padding: '15px 10px',
    display: 'flex',
  },
  proTextStyle: {
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '17px',
    color: theme.palette.secondary.main5,
    fontFamily: 'Indivisible-Light',
  },
  proTextStyleBold: {
    fontWeight: 700,
    color: theme.palette.secondary.main5,
    fontFamily: 'Indivisible-Light',
  },
}));

export default useStyles;
