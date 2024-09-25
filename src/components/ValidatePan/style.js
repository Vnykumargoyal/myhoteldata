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
    width: '135px',
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
    margin: ({ data }) => !data.leadBoolean && '30px auto 20px !important',
  },
}));

export default useStyles;
