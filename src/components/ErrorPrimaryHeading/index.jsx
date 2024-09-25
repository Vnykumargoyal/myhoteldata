import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: '1.5rem',
    lineHeight: '1.8125rem',
    textAlign: 'center',
    color: theme.palette.primary.main,
    margin: '30px auto 13px',
    fontWeight: 700,
    fontFamily: 'Indivisible-Bold',
  },
}));

const ErrorPrimaryHeading = ({ message, className }) => {
  const classes = useStyles();

  return (
    <Typography className={clsx(classes.heading, className)}>
      {message}
    </Typography>
  );
};

ErrorPrimaryHeading.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
};

ErrorPrimaryHeading.defaultProps = {
  message: 'Something went wrong!',
  className: '',
};

export default ErrorPrimaryHeading;
