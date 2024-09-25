import { makeStyles } from '@material-ui/core';
import color from '../../constants/colors';

const useStyles = makeStyles((theme) => ({
  modalClass: {
    position: 'fixed !important',
  },
  info_modal: {
    textAlign: 'center',
    width: '400px',
    backgroundColor: color.grey,
    [theme.breakpoints.down('sm')]: {
      // width: '100%',
      margin: '0px auto 0px auto',
    },
  },
  desc: {
    fontWeight: 600,
    fontSize: '16px',
    padding: '0 10px',
    color: color.secondary,
    maxWidth: '300px',
    overflowWrap: 'break-word',
    margin: '10px auto 20px',
    [theme.breakpoints.down('sm')]: {
      // margin: '30px auto 10px',
      padding: '25px 0px 0px',
    },
    [theme.breakpoints.up('sm')]: {
      margin: '10px auto 10px',
    },
  },
  gotIt: {
    marginBottom: '10px',
    fontWeight: '600px',
    fontSize: '14px',
    maxWidth: '300px',
  },
}));

export default useStyles;
