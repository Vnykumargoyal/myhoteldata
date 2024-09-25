import { makeStyles } from '@material-ui/core';
import color from '../../constants/colors';

const useStyles = makeStyles((theme) => ({
  container: {
    // marginTop: theme.spacing(4),
    width: '100%',
  },
  label: {
    fontFamily: 'Indivisible-Light',
    fontSize: '0.75rem',
    lineHeight: '0.875rem',
    opacity: 0.5,
    marginBottom: theme.spacing(2),
  },
  tenureWrapper: {
    display: 'flex',
    // flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tenure: {
    background: color.grey,
    border: '1px solid',
    borderColor: color.grey,
    borderRadius: '8px',
    width: '102px',
    height: '35px',
    marginRight: '6px',
    marginBottom: '6px',
    textAlign: 'center',
    cursor: 'pointer',
    '& > span': {
      margin: 'auto',
      fontSize: '12px',
      lineHeight: '35px',
      fontWeight: 500,
      fontFamily: 'Indivisible-Light',
    },
    '&.active': {
      borderColor: color.grey,
      background: color.primary,
      '& > span': {
        color: color.white,
      },
    },
  },
}));

export default useStyles;
