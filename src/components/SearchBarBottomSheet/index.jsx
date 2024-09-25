/* eslint-disable react/forbid-prop-types */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@material-ui/core';

import useStyles from './style';
import Image from '../Image';
import IMAGE_URLS from '../../constants/images';
import { ALT_CONSTANTS } from '../../constants';

const SearchBarBottomSheet = ({
  placeholder,
  handleChange,
  searchValue,
}) => {
  const classes = useStyles();
  const handleInputChange = (e) => {
    const { value } = e.target;
    handleChange(value);
  };

  return (
    <Input
      placeholder={placeholder}
      className={classes.inputStyle}
      value={searchValue}
      onChange={handleInputChange}
      color="secondary"
      autoComplete="off"
      startAdornment={(
        <div className={classes.iconStyle}>
          <Image
            source={IMAGE_URLS.ICONS.SEARCH}
            alt={ALT_CONSTANTS.DOWN}
            height={10}
            width={10}
          />
        </div>
      )}
    />
  );
};

SearchBarBottomSheet.propTypes = {
  placeholder: PropTypes.string.isRequired,
  searchValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SearchBarBottomSheet;
