import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  message: {
    display: 'flex',
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.primary.main,
    padding: theme.spacing(4),
    boxSizing: 'border-box',
    textAlign: 'center',
  },
}));

export default useStyles;
