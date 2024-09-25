import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

import useStyles from './style';

const PageSubHeading = ({
  title,
}) => {
  const classes = useStyles();
  return (
    <Typography
      variant="h6"
      className={classes.PageSubHeading}
    >
      {title}
    </Typography>
  );
};

PageSubHeading.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageSubHeading;
