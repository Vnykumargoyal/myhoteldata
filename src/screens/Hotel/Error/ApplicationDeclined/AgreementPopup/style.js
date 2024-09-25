import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  dialog: {
    paddingBottom: 0,
    '& > p': { marginBottom: 0 },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    maxWidth: 300,
  },
  heading: {
    maxWidth: 175,
    fontSize: '1.125rem',
    fontWeight: 700,
    marginTop: 20,
    marginBottom: 10,
  },
  subHeading: {
    maxWidth: 245,
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: '142%',
    '& > strong': {
      font: 'inherit',
      fontWeight: 600,
    },
  },
  checkBoxes: {
    textAlign: 'left',
  },
}));

export default useStyles;
