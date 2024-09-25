import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';

import IMAGE_URLS from '../../constants/images';

const useStyles = makeStyles((theme) => ({
  loaderImage: {
    height: '50px',
    width: '50px',
    backgroundImage: `url(${IMAGE_URLS.LOGOS.PINELABS_MINI})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  },
  textClass: {
    fontSize: '14px',
    marginTop: '10px',
    lineHeight: '20px',
    textAlign: 'center',
    color: theme.palette.secondary.main,
  },
}));

const CenterLoader = ({ showLoadingText, text }) => {
  const classes = useStyles();

  return (
    <div className="page-loader">
      <div className={clsx(classes.loaderImage, 'image')} />
      {showLoadingText && (
        <Typography className={classes.textClass} variant="body1">
          {text}
        </Typography>
      )}
    </div>
  );
};

CenterLoader.propTypes = {
  showLoadingText: PropTypes.bool,
  text: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

CenterLoader.defaultProps = {
  showLoadingText: false,
  text: (
    <>
      Please wait...
      <br />
      We are fetching your details...
    </>
  ),
};

export default CenterLoader;
