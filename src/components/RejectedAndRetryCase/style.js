import { makeStyles } from '@material-ui/core';

import color from '../../constants/colors';
import IMAGE_URLS from '../../constants/images';

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
    fontSize: '16px',
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
  oops: {
    fontFamily: 'Indivisible-Light',
    fontWeight: 700,
    fontSize: '24px',
    lineHeight: '24px',
    color: theme.palette.primary.main,
  },
  dontWarry: {
    fontFamily: 'Indivisible',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '16px',
    color: theme.palette.secondary.main5,
  },
  buttonClass: {
    color: theme.palette.secondary.main,
    fontSize: '14px',
    fontWeight: 500,
    fontFamily: 'Indivisible-Light',
    // borderColor: theme.palette.secondary.main,
    // borderWidth: '1px',
    border: '1px solid #333333 !important',
  },
  bottomText: {
    backgroundImage: `url(${IMAGE_URLS.ERRORS.REJECT_CELENDER})`,
    height: '60px',
    backgroundRepeat: 'no-repeat !important',
    backgroundSize: 'contain !important',
    // width: '55%',
    backgroundPosition: 'center',
    position: 'relative',
  },
  bottomText1: {
    color: theme.palette.primary.main,
    fontSize: '20px',
    fontWeight: 700,
    fontFamily: 'Indivisible',
    position: 'absolute',
    top: '60%',
    left: '50%',
    transform: 'translate(-40%, -50%)',
    marginLeft: '15px',
  },
}));

export default useStyles;
