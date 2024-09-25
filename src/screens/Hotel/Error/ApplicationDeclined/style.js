import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: theme.spacing(5),
  },
  exclamation: {
    color: theme.palette.primary.main,
    fontSize: '1.5rem',
    fontWeight: 700,
    marginBottom: 10,
  },
  heading: {
    fontSize: '1.125rem',
    fontWeight: 700,
    marginBottom: 20,
  },
  subHeading: {
    fontSize: '1rem',
    fontWeight: 400,
    marginBottom: 30,
    lineHeight: '155%',
    maxWidth: 300,
    '& > strong': {
      font: 'inherit',
      fontWeight: 600,
      color: theme.palette.primary.main,
    },
  },
  description: {
    maxWidth: 315,
    fontSize: '0.875rem',
    fontWeight: 500,
    marginTop: 30,
    marginBottom: 10,
    lineHeight: '142%',
    fontFamily: 'Indivisible-Light',
    '& > p': {
      display: 'inline',
      font: 'inherit',
      lineHeight: 'inherit',
    },
    '& > p > strong': {
      color: theme.palette.primary.main,
      font: 'inherit',
      lineHeight: 'inherit',
      fontWeight: 700,
    },
  },
}));

export default useStyles;
