import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  pageHeadingClass: {
    fontSize: '18px',
    fontFamily: 'Indivisible-Light',
    color: theme.palette.secondary.main,
    fontWeight: 700,
    lineHeight: '22px',
  },
}));

export default useStyles;
