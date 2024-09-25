import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  legalName: {
    color: theme.palette.secondary.main,
    fontWeight: 600,
    fontFamily: 'Indivisible',
  },
  nameContainer: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '19px',
    color: theme.palette.secondary.main,
    fontFamily: 'Indivisible',
  },
}));

export default useStyles;
