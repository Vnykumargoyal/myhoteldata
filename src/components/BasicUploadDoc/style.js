/* eslint-disable no-confusing-arrow */
/* eslint-disable max-len */
import { makeStyles } from '@material-ui/core';

import color from '../../constants/colors';

const useStyles = makeStyles((theme) => ({
  image_container: {
    position: 'relative',
  },
  deleteIconWithCross: {
    position: 'absolute',
    right: '-2px',
    top: '-9.5px',
  },
  uploadPreview: {
    padding: '4px 8px 0px',
    background: theme.palette.text.white,
    border: `1px solid ${color.triadic}`,
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.08)',
    borderRadius: '4px',
  },
  dropZone: {
    margin: '0 auto',
    textAlign: 'center',
    border: 'none',
    color: theme.palette.primary.main,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropZoneAdd: {
    margin: '0 auto',
    textAlign: 'center',
    border: 'none',
    color: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    backgroud: 'none',
  },
  statement: {
    marginBottom: '26px',
  },
  removeMarginBottom: {
    marginBottom: '0 !important',
  },
  drop_area: {
    backgroundColor: color.white,
    '& .browse': {
      borderColor: ({ label }) => label ? theme.palette.primary.main : theme.palette.secondary.main4,
      border: '2px solid',
      fontSize: '10px',
      fontWeight: '600',
      color: ({ label }) => label ? theme.palette.secondary.main : theme.palette.secondary.main5,
      lineHeight: '12px',
      borderRadius: '20px',
      padding: '9px 12px',
      margin: '0 auto',
      cursor: 'pointer',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '14px',
    },
  },
  drop_area1: {
    backgroundColor: color.white,
    width: '75px',
    '& .browse': {
      borderColor: ({ label }) => label ? theme.palette.primary.main : theme.palette.secondary.main4,
      border: '2px solid',
      fontSize: '10px',
      fontWeight: '600',
      color: ({ label }) => label ? theme.palette.secondary.main : theme.palette.secondary.main5,
      lineHeight: '12px',
      borderRadius: '20px',
      padding: '9px 12px',
      margin: '0 auto',
      cursor: 'pointer',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '14px',
    },
  },
  titel: {
    fontFamily: 'Indivisible-Light',
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: 500,
    color: theme.palette.secondary.main,
    marginBottom: '3px',
  },
  subTitel: {
    fontFamily: 'Indivisible-Light',
    fontSize: '12px',
    fontWeight: 400,
    color: theme.palette.secondary.main5,
  },
  rejectResion: {
    fontFamily: 'Indivisible-Light',
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '16px',
    color: '#ED2323',
  },
  del: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

export default useStyles;
