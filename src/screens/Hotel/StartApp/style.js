import { makeStyles } from '@material-ui/core';

import color from '../../../constants/colors';

const useStyles = makeStyles((theme) => ({
  panel: {
    background: color.themeColor,
  },
  cont: {
    bottom: '50px',
    position: 'absolute',
    width: '95%',
    left: '0',
    padding: '10px',
  },
  container: {
    marginTop: theme.spacing(4),
  },
  buttonStyle: {
    backgroundColor: color.grey,
    color: color.black
  },
  buttonStyle1: {
    backgroundColor: color.grey,
    color: color.black
  }, 
  buttonStyleOtp: {
    color: color.primary,
  },
  buttonStyleCreate: {
    backgroundColor: color.primary,
  },
}));

export default useStyles;
