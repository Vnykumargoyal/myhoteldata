import { withStyles, Slider } from '@material-ui/core';

import color from '../../constants/colors';

const PrettoSlider = withStyles((theme) => ({
  root: {
    height: 8,
    width: '90%',
    padding: '8px 0',
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: theme.palette.primary.main,
    boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.2)',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
    background: theme.palette.primary.gradient,
    boxShadow:
      ' 0px 1px 0px rgba(255, 255, 255, 0.3), inset 0px 1px 5px rgba(0, 0, 0, 0.4)',
  },
  rail: {
    height: 8,
    borderRadius: 4,
    background: color.white,
    boxShadow: '0px 1px 0px rgba(255, 255, 255, 0.3), inset 0px 1px 5px rgba(0, 0, 0, 0.4)',
  },
}))(Slider);

export default PrettoSlider;
