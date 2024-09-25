import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    maxWidth: '325px',
    paddingBottom: '15px',
  },
  image: {
    width: 'auto',
    maxWidth: '187px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      maxWidth: '167px',
    },
  },
  data: {
    width: '100%',
    maxWidth: '240px',
  },
  btnStyle: {
    [theme.breakpoints.down('sm')]: {
      margin: 'auto',
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: '216px',
      margin: 'auto',
    },
  },
}));

export default useStyles;
