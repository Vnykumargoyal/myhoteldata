import { makeStyles } from '@material-ui/core';

import color from '../../constants/colors';

const useStyles = makeStyles({
  BottomSheetContainer: {
    background: color.white,
    width: '100%',
    borderRadius: '10px 10px 0 0',
    transition: 'all 1s ease',
    animationName: ({ animation }) => animation,
    animationDuration: '0.5s',
    animationTimingFunction: 'ease-in-out',
  },
  center: {
    top: '50%',
    transform: 'translateY(-50%)',
  },
  bottom: {
    bottom: 0,
    position: 'absolute',
  },
  closeIcon: {
    position: 'absolute',
    right: '20px',
    marginTop: '10px',
    color: color.black,
    background: '#00000020',
  },
});

export default useStyles;
