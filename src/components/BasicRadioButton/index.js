import React from 'react';
import { Radio, withStyles } from '@material-ui/core';

import color from '../../constants/colors';

const BasicRadioButton = withStyles({
  root: {
    color: color.secondary5,
    '&$checked': {
      color: color.primary,
    },
  },
  checked: {},
  // eslint-disable-next-line react/jsx-props-no-spreading
})((props) => <Radio color="default" {...props} />);

export default BasicRadioButton;
