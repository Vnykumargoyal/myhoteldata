import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '380px',
  },
  notFound: {
    fontWeight: 500,
    fontFamily: 'Indivisible-Light',
    fontSize: '16px',
    lineHeight: '22px',
    textAlign: 'center',
    width: '90%',
    marginTop: '20px',
  },
}));

export default useStyles;
