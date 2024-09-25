import { makeStyles } from '@material-ui/core';

import color from '../../constants/colors';

const useStyles = makeStyles((theme) => ({
  warning_section: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    // padding: '13px 0px 10px',
    maxWidth: '280px',
    '& img': {
      height: '130px',
      width: '156px',
    },
  },
  warning_title: {
    // col-text-primary fs-sm-12 fs-14 lh-sm-14 lh-17
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '17px',
    marginTop: '20px',
    marginBottom: '20px',
    fontFamily: 'Indivisible',
    maxWidth: '250px',
    color: theme.palette.secondary.main,
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  header: {
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '20px',
    fontFamily: 'Indivisible-Light',
    color: theme.palette.secondary.main,
    mmarginTop: '20px',
    marginBottom: '20px',
  },
  warning_desc: {
    marginTop: '10px',
    marginBottom: '30px',
    fontSize: '0.875rem',
    lineHeight: '14px',
    fontFamily: 'Indivisible',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.75rem',
    },
  },
  powered_by: {
    fontSize: '14px',
    // textAlign: 'center',
    fontWeight: 500,
    margin: '10px auto 0',
    fontFamily: 'Indivisible-Light',
    color: theme.palette.secondary.main,
    backgroundColor: color.lemon,
    padding: '10px 15px',
    borderRadius: '8px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
      fontWeight: 500,
    },
  },
}));

export default useStyles;
