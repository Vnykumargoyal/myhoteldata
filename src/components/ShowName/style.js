import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  legalName: {
    color: '#3AC838 !important',
  },
  nameContainer: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '19px',
    color: theme.palette.grey.main,
    fontFamily: 'Indivisible',
  },
}));

export default useStyles;
