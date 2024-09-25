import { makeStyles } from '@material-ui/core';

import color from '../../constants/colors';

const useStyles = makeStyles((theme) => ({
  cont: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    border: '1px solid rgba(241, 240, 240, 1)',
    borderRadius: '10px',
  },
  sectionFirst: {
    display: 'flex',
    flexDirection: 'column',
  },
  sectionSecond: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  docTitle: {
    fontFamily: 'Indivisible-Light',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '17px',
    color: theme.palette.secondary.main,
  },
  docSubTitle: {
    fontFamily: 'Indivisible',
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '17px',
    color: theme.palette.secondary.main5,
  },
  docPend: {
    padding: '6px',
    backgroundColor: color.dahliaYellowLight,
    marginRight: '6px',
    borderRadius: '5px',
  },
  docPendText: {
    fontFamily: 'Indivisible',
    fontSize: '10px',
    fontWeight: 500,
    lineHeight: '12px',
    color: color.dahliaYellow,
  },
  docuplod: {
    padding: '6px',
    backgroundColor: color.lightGreen5,
    marginRight: '6px',
    borderRadius: '5px',
  },
  docuplodText: {
    fontFamily: 'Indivisible',
    fontSize: '10px',
    fontWeight: 500,
    lineHeight: '12px',
    color: color.lightGreen,
  },
  mainCard: {
    display: 'flex !important',
    alignItems: 'center !important',
  },
  docRejected: {
    padding: '6px',
    backgroundColor: 'rgba(209, 58, 58, 0.2)',
    marginRight: '6px',
    borderRadius: '5px',
  },
  docRejectedText: {
    fontFamily: 'Indivisible',
    fontSize: '10px',
    fontWeight: 500,
    lineHeight: '12px',
    color: color.error,
    textAlign: 'center',
  },
}));

export default useStyles;
