import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    maxWidth: '325px',
    paddingBottom: '15px',
  },
  image: {
    width: 'auto',
    maxWidth: '187px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      maxWidth: '167px',
    },
  },
  data: {
    // width: '85%',
    maxWidth: '240px',
    fontFamily: 'Indivisible',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 500,
    color: theme.palette.secondary.main,
    textAlign: 'center',
    margin: 'auto',
  },
  something: {
    fontFamily: 'Indivisible-Light',
    fontSize: '16px',
    lineHeight: '20px',
    fontWeight: 500,
    color: theme.palette.secondary.main,
    textAlign: 'center',
    margin: 'auto',
  },
  btnStyle: {
    [theme.breakpoints.down('sm')]: {
      margin: 'auto',
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: '216px',
      margin: 'auto',
    },
  },
  timer: {
    fontSize: '20px !important',
    fontWeight: 500,
    fontFamily: 'Indivisible',
    lineHeight: '16px !important',
  },
}));

export default useStyles;
