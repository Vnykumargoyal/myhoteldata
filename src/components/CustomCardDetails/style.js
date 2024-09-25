/* eslint-disable no-confusing-arrow */
import { makeStyles } from '@material-ui/core';
import color from '../../constants/colors';
import { BorderBottom } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontFamily: 'Indivisible-Light',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '18px',
    color: color.secondary,
  },
  headingSub: {
    fontFamily: 'Indivisible',
    fontSize: '11px',
    fontWeight: 400,
    lineHeight: '16px',
    color: color.secondary5,
  },
}));

export default useStyles;
