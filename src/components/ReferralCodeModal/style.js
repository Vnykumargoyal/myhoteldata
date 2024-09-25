import { makeStyles } from '@material-ui/core';

import color from '../../constants/colors';

const useStyles = makeStyles((theme) => ({
  modalClass: {
    position: 'fixed !important',
  },
  info_modal: {
    textAlign: 'center',
    // width: '400px',
    [theme.breakpoints.down('sm')]: {
    //   width: '90%',
      margin: '0 auto 10px auto',
    },
  },
  desc: {
    fontWeight: 600,
    fontSize: '16px',
    padding: '0 10px',
    color: theme.palette.secondary.main,
    maxWidth: '300px',
    overflowWrap: 'break-word',
    margin: '10px auto 20px',
    [theme.breakpoints.down('sm')]: {
      margin: '30px auto 10px',
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
  dividerHeader: {
    width: '35%',
    position: 'relative',
    top: '5px',
    margin: 'auto !important',
    height: '3px !important',
    borderRadius: '44px',
    backgroundColor: color.gray85,
  },
}));

export default useStyles;
