import { makeStyles } from '@material-ui/core';

import color from '../../constants/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0 0',
    textAlign: 'center',
  },
  validate_request: {
    marginTop: '35px',
    position: 'relative',
    zIndex: '2',
    '& img': {
      width: 'auto',
      maxWidth: '370px',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
    },
  },
  heading: {
    fontWeight: 700,
    color: theme.palette.primary.main,
    fontFamily: 'Indivisible-Bold',
    fontSize: '1.5rem',
    lineHeight: '1.8125rem',
    maxWidth: '315px',
    margin: 'auto',
  },
  headingRoot: {
    fontWeight: 700,
    color: color.white,
    fontFamily: 'Indivisible',
    fontSize: '16px',
    lineHeight: '19px',
    maxWidth: '315px',
    margin: 'auto auto 5px',
    [theme.breakpoints.up('md')]: {
      marginTop: '40px',
    },
  },
  bottomContainer: {
    position: 'absolute',
    bottom: '0',
    width: '96%',
    display: 'flex',
    zIndex: '1',
  },
}));

export default useStyles;
