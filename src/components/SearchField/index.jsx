import React from 'react';
import PropTypes from 'prop-types';
import { Box, Input } from '@material-ui/core';

// import useStyles from '../styles';
import { isFullName } from '../../helpers/functions';
import useStyles from './style';
import IMAGE_URLS from '../../constants/images';
// import { isFullName } from '../../../../../../util';

const SearchField = ({
  searchValue,
  onChange,
}) => {
  const classes = useStyles();

  const handleChange = (e) => {
    const { value } = e.target;
    if (isFullName(value) || !value.length) {
      onChange(value);
    }
  };

  return (
    <Box className={classes.searchField}>
      <Input
        startAdornment={(
          <img src={IMAGE_URLS.ICONS.SEARCH} alt="" />
        )}
        value={searchValue}
        onChange={handleChange}
        disableUnderline
        placeholder="Search for your bank"
        fullWidth
        inputProps={{
          className: classes.searchInput,
          maxLength: 15,
        }}
      />
    </Box>
  );
};

SearchField.propTypes = {
  searchValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchField;
