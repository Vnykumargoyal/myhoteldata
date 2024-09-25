import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import clsx from 'clsx';

import ConditionalRender from '../ConditionalRender';
import useStyles from './style';

const SingleLineNote = ({
  title,
}) => {
  const classes = useStyles();

  return (
    <ConditionalRender
      condition={Boolean(title)}
      truthyComponent={(
        <Typography variant="caption" className={clsx(classes.containerPro)}>
          <Typography variant="caption" className={classes.proTextStyle}>
            <span className={classes.proTextStyleBold}>Note:{' '}</span>
            {title}
          </Typography>
        </Typography>
      )}
    />
  );
};

SingleLineNote.propTypes = {
  title: PropTypes.string,
};

SingleLineNote.defaultProps = {
  title: '',
};

export default SingleLineNote;
