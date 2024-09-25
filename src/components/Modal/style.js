import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  howToAccessWrapper: {
    margin: '20px 0',
  },
  wrapper: {
    position: 'relative',
    borderRadius: '14px',
    '& .close_modal': {
      position: 'absolute',
      right: '14px ',
      top: '14px',
      cursor: 'pointer',
      zIndex: '1',
    },
  },
  howToAccess: {
    color: 'inherit',
    textDecoration: 'none',
    fontSize: '1rem',
  },
  NotEligible: {
    fontSize: '1rem',
    fontWeight: 300,
    lineHeight: '0.90rem',
  },
  bold: {
    fontWeight: 600,
  },
  dialogRoot: {
    borderRadius: '10px',
  },
}));

export default useStyles;
