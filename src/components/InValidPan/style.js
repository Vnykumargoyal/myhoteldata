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
    minWidth: '90%',
    // marginTop: '30px',
    [theme.breakpoints.down('sm')]: {
      margin: '30px auto auto',
    },
    [theme.breakpoints.up('sm')]: {
    //   maxWidth: '216px',
      margin: '30px auto auto',
    },
  },
  textStyle: {
    color: theme.palette.secondary.main5,
    fontSize: '12px',
    lineHeight: '14px',
    textAlign: 'center',
    fontWeight: 500,
    fontFamily: 'Indivisible-Light',
  },
  dailogClass: {
    padding: '0px !important',
  },
  contentClass: {
    padding: '0px',

  },
  styleClass: {
    color: ({ data }) => data.leadBoolean
      ? theme.palette.secondary.contrastText : theme.palette.primary.main,
    fontSize: '14px',
    fontWeight: 'bold',
    lineHeight: '17px',
    fontFamily: 'Indivisible-light',
    textAlign: 'center',
    cursor: 'disable',
    paddingBottom: '15px',
    textTransform: 'uppercase',
  },
  marginStyle: {
    color: theme.palette.secondary.main,
    fontSize: '14px',
    lineHeight: '17px',
    fontWeight: 700,
    fontFamily: 'Indivisible-Light',
    // width: '80%',
    textAlign: 'center',
    marginBottom: '10px',
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
    // width: '135px',
  },
  rejections: {
    fontSize: '12px',
    lineHeight: '17px',
    color: theme.palette.text.orange,
    fontFamily: 'Indivisible',
    width: '90%',
    margin: 'auto',
  },
  subTitle: {
    fontSize: '12px',
    lineHeight: '18px',
    fontWeight: 500,
    color: theme.palette.secondary.main5,
    fontFamily: 'Indivisible',
    width: '77%',
    textAlign: 'center',
    margin: 'auto',
  },
  subTitleColor: {
    color: theme.palette.primary.main,
    fontWeight: 700,
    fontFamily: 'Indivisible',
  },
}));

export default useStyles;
