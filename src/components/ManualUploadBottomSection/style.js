import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  fileSizeHelper: {
    fontFamily: 'Indivisible-Light',
    fontSize: '12px',
    lineHeight: '15px',
    fontWeight: 500,
    textAlign: 'center',
    marginTop: theme.spacing(2),
    color: theme.palette.secondary.mainOP5,
  },
  addOrEditBank: {
    display: 'contents',
    fontFamily: 'Indivisible-Light',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '14px',
    cursor: 'pointer',
    padding: '5px 10px 5px 0',
    color: theme.palette.primary.main,
  },
}));

export default useStyles;
