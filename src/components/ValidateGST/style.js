/* eslint-disable no-confusing-arrow */
import { makeStyles } from '@material-ui/core';

import color from '../../constants/colors';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    maxWidth: '300px',
    // maxWidth: '325px',
    paddingBottom: '15px',
    padding: '0px',
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
    width: '100%',
    maxWidth: '240px',
  },
  btnStyle: {
    minWidth: '130px',
    [theme.breakpoints.down('sm')]: {
      margin: 'auto',
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: '216px',
      margin: 'auto',
    },
  },
  textStyle: {
    fontSize: '12px',
    lineHeight: '14px',
    textAlign: 'center',
    fontWeight: 500,
    fontFamily: 'Indivisible',
    color: theme.palette.secondary.mainOP5,
  },
  dailogClass: {
    padding: '0px !important',
  },
  contentClass: {
    padding: '0px',

  },
  styleClass: {
    color: theme.palette.secondary.contrastText,
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '17px',
    fontFamily: 'Indivisible-light',
    textAlign: 'center',
    cursor: 'disable',
    paddingBottom: '14px',
  },
  marginStyle: {
    color: theme.palette.secondary.main5,
    margin: '20px auto 20px',
    fontSize: '12px',
    lineHeight: '17px',
    fontFamily: 'Indivisible-Light',
    width: '80%',
  },
  button: {
    textTransform: 'none',
    marginTop: '20px',
    borderRadius: '68px',
    cursor: 'pointer',
    height: '40px',
    color: color.dahliaYellow,
    borderColor: color.dahliaYellow,
    fontSize: '14px',
    width: '130px',
  },
  panNumber: {
    // fs-20 fs-sm-18 lh-25 col-text-secondary fw-600 ff-indivisible-l w-85-auto'
    fontSize: '18px',
    fontWeight: 600,
    color: theme.palette.secondary.main,
    width: '85%',
    margin: 'auto',
    lineHeight: '25px',
  },
}));

export default useStyles;
