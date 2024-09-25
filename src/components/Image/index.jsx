/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

const Image = ({
  source,
  alt,
  ...props
}) => (
  <img {...props} alt={alt} src={source} />
);

Image.propTypes = {
  source: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

Image.defaultProps = {
  alt: '',
};

export default Image;
