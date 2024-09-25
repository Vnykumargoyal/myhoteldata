import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

import useStyles from './style';

const PageHeading = ({
  title,
}) => {
  const classes = useStyles();
  return (
    <Typography
      variant="h6"
      className={classes.pageHeadingClass}
    >
      {title}
    </Typography>
  );
};

PageHeading.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageHeading;
