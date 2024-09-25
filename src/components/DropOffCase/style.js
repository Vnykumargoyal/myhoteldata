import { makeStyles } from '@material-ui/core';

import color from '../../constants/colors';

const useStyles = makeStyles((theme) => ({
  panel: {
    background: theme.palette.text.white,
  },
  container: {
    height: '55vh',
  },
  titelData: {
    fontFamily: 'Indivisible',
    // fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px !important',
    lineHeight: '24px',
    color: theme.palette.secondary.main,
  },
  aboutContainerMain: {
    padding: '10px 0px !important',
    background: `${color.lemon} !important`,
    borderRadius: '8px !important',
    marginTop: '20px',
    fontFamily: 'Indivisible',
    fontWeight: 500,
  },
}));

export default useStyles;
