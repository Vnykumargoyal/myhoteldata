import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '20px 0',
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    position: 'relative',
    '& .left-section': {
      position: 'absolute',
      left: '15px',
    },
    '& .center-section': {
      position: 'absolute',
      fontSize: '0.875rem',
      lineHeight: '1.0625rem',
      fontWeight: 600,
      left: '0',
      right: '0',
      pointerEvents: 'none',
      // background: theme.palette.text.primaryGradient,
      background: theme.palette.secondary.main,
      '-webkit-background-clip': 'text',
      // '-webkit-text-fill-color': 'transparent',
    },
    '& .right-section': {
      position: 'absolute',
      right: '10px',
    },
    textAlign: 'center',
  },
}));

export default useStyles;
