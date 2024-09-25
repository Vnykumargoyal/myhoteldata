import { makeStyles } from '@material-ui/core';
import color from '../../../../../constants/colors';

const useStyles = makeStyles((theme) => ({
  resend: {
    fontSize: '10px',
    lineHeight: '120%',
    display: 'block',
    textAlign: 'left',
    padding: '5px 0',
    fontWeight: 400,
    color: color.primary,
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  },
}));

export default useStyles;
