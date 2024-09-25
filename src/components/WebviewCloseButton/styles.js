/* eslint-disable no-confusing-arrow */
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  close: {
    padding: 0,
    marginRight: 10,
    borderRadius: '50%',
    backgroundColor: 'rgba(149,149,149,0.11)',
    '& span.MuiIconButton-label': {
      borderRadius: '50%',
      backgroundColor: 'rgba(0,0,0,0)',
    },
    '& img': {
      height: 30,
      width: 30,
    },
  },
});

export default useStyles;
