import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    paddingBottom: '20px',
  },
  container: {
    width: '100%',
    maxWidth: '325px',
    padding: '0 31px 5px',
  },
  image: {
    width: 'auto',
    maxWidth: '170px',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  desc: {
    width: '100%',
    maxWidth: '140px',
    margin: 'auto',
  },
  btnStyle: {
    maxWidth: '216px',
    [theme.breakpoints.down('sm')]: {
      margin: 'auto',
    },
    [theme.breakpoints.up('sm')]: {
      margin: 'auto',
    },
  },
  cancelButton: {
    display: 'inline-block',
    margin: '15px auto 5px',
    cursor: 'pointer',
    padding: '5px 10px',
    boxSizing: 'border-box',
  },
}));

export default useStyles;
