/* eslint-disable no-confusing-arrow */
/* eslint-disable no-unused-vars */
import { makeStyles } from '@material-ui/core/styles';

import color from '../../constants/colors';

const getStyles = (path) => ({
  minHeight: path ? window.innerHeight - 53 : 'inherit',
  background: path ? color.contrastText : 'inherit',
  borderRadius: path ? '0px 0px 8px 8px' : 'inherit',
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  brand: {
    fontSize: '1.125rem',
    lineHeight: '21.6px',
  },

  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '80%',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      // hits small device set width to 100
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      // hits small device set width to 100
      width: '85%',
    },
    '& .loader': {
      zIndex: 1301,
      background: 'rgba(0, 0, 0, 0.2)',
      position: 'fixed',
      top: 0,
      bottom: 0,
      height: '100%',
      width: '100%',
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
  },
  paper: {
    // padding: '0px 8px',
    textAlign: 'left',
    color: theme.palette.text.secondary,
    flex: '1 0 auto',
    marginTop: theme.spacing(4),
    borderRadius: '8px 8px 0 0',
    height: 'calc(100% - 3.1rem)',
    // background: `${color.whiteSmoke}`,
    [theme.breakpoints.down('sm')]: {
      margin: 'auto',
    },
  },
  brandImg: {
    maxWidth: '125px',
    verticalAlign: 'middle',
    userSelect: 'none',
    height: '34px',
    margin: '0 10px 0 20px',
  },
  right: {
    textAlign: 'right',
  },
  shadow: {
    boxShadow: `0px 4px 20px 0px ${color.blackRussion}`,
    // minHeight: 'calc(100vh - 52px)',
    // minHeight: `${window.innerHeight - 52}px`,
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      // minHeight: 'calc(100vh - 16px)',
      minHeight: window.innerHeight,
    },
  },

  spacing: {
    padding: 0,
    maxWidth: '100%',
    [theme.breakpoints.up('md')]: {
      maxWidth: '450px',
    },
  },
  marginTop: {
    marginTop: '3rem',
  },

  subtitle: {
    color: color.silver,
    marginTop: '1rem',
    fontSize: '0.75rem',
  },
  howItWorks: {
    marginTop: '0.75rem',
    fontWeight: 600,
    fontSize: '0.75rem',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  needHelp: {
    fontSize: '0.875rem',
    fontWeight: 600,
    margin: '0.75rem 0',
    color: `${theme.palette.primary.main} !important`,
    opacity: 0.7,
  },
  noGutters: {
    padding: '0',
  },
  mH_100: {
    // minHeight: '100vh',
    // minHeight: '-webkit-fill-available',
    minHeight: window.innerHeight - 32,
    // [theme.breakpoints.up('md')]: {
    //   borderRadius: 'inherit',
    // },
  },
  mH_Inherit: {
    // minHeight: window.innerHeight - 32,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      minHeight: window.innerHeight,
    },
    // [theme.breakpoints.up('sm')]: {
    //   minHeight: window.innerHeight,
    // },
    [theme.breakpoints.up('md')]: {
      // ({ props }) => getStyles(props?.path),
      minHeight: ({ props }) => props?.path ? window.innerHeight - 53 : '95vh',
      background: ({ props }) => props?.path ? color.contrastText : 'inherit',
      borderRadius: ({ props }) => props?.path ? '0px 0px 8px 8px' : 'inherit',
    },
  },
  pL_10px: {
    marginLeft: '20px',
  },
  logout: {
    padding: '7px',
    borderRadius: '50%',
    backgroundColor: 'rgba(149, 149, 149,.11)',
    height: '32px',
    width: '32px',
    marginTop: '-6px',
  },
}));

export default useStyles;
