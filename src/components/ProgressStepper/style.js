/* eslint-disable quotes */
import { makeStyles } from '@material-ui/core';

import color from '../../constants/colors';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: 'auto',
    width: '100%',
    [theme.breakpoints.down('md')]: {
      margin: '0px auto 15px',
    },
    [theme.breakpoints.up('md')]: {
      margin: '0px auto 20px',
    },
  },
  track: {
    background: color.lightGreen1,
    borderRadius: '26px',
    height: '11px',
    padding: '2px 3px',
    boxSizing: 'border-box',
    width: '90%',
    margin: 'auto',
  },
  progress: {
    background:
      `radial-gradient(107.89% 7154.08% at 103.51% 57.14%, #BDF7A8 0%, #A5FF85 14.96%, #0AD77F 39.96%, #50D387 100%);`,
    borderRadius: '26px',
    height: '7px',
    width: ({ progress }) => `${progress}%`,
  },
  helperTextContainer: {
    width: '90%',
    margin: '2px auto',
    padding: '0 3px',
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'space-between',
  },
  helperText: {
    fontFamily: 'Indivisible',
    fontStyle: 'normal',
    fontSize: '0.75rem',
    fontWeight: 500,
    lineHeight: '12px',
    color: theme.palette.secondary.main,
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.625rem',
    },
    '& > strong': {
      fontFamily: 'Indivisible-Bold',
      fontWeight: '700 !important',
    },
  },
}));

export default useStyles;
