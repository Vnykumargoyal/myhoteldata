import React from 'react';
import PropTypes from 'prop-types';

import IMAGE_URLS from '../../constants/images';

const Loader = (props) => (
  <div className={`loader ${props.pdfScreen ? props.classStyle : ''}`}>
    <img src={IMAGE_URLS.ICONS.LOADER} alt="loading" />
  </div>
);

Loader.propTypes = {
  pdfScreen: PropTypes.bool,
  classStyle: PropTypes.string,
};

Loader.defaultProps = {
  pdfScreen: false,
  classStyle: '',
};

export default Loader;
