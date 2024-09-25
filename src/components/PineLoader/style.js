import { makeStyles } from '@material-ui/core';

import IMAGE_URLS from '../../constants/images';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100%',
    width: '100%',
    zIndex: 9999,
  },
  loader: {
    height: '50px',
    width: '50px',
    backgroundImage: `url(${IMAGE_URLS.LOGOS.PINELABS_MINI})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    '-webkit-animation': 'fade-in-out 1s infinite',
    animation: 'fade-in-out 1s infinite',
  },
}));

export default useStyles;
