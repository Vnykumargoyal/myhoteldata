import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

import useStyles from './style';
import ConditionalRender from '../ConditionalRender';

const BasicError = ({
  error,
}) => {
  const classes = useStyles();

  return (
    <ConditionalRender
      condition={Boolean(error)}
      truthyComponent={(
        <Typography color="error" className={classes.inputError}>
          {error}
        </Typography>
      )}
    />
  );
};

BasicError.propTypes = {
  error: PropTypes.string,
};

BasicError.defaultProps = {
  error: '',
};

export default BasicError;
