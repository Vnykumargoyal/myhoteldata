/* eslint-disable no-confusing-arrow */
/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import {
  Divider,
  List,
  ListItem,
  Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';

import useStyles from './style';

const Header = ({
  title,
  subTitel,
}) => {
  const classes = useStyles();
  return (
    <List className={classes.header}>
      <Divider className={classes.dividerHeader} />
      <ListItem className={classes.listItem}>
        <Typography className={classes.title}>{title}</Typography>
        {subTitel && (
          <>
            <Typography className={classes.subTitel}>{subTitel}</Typography>
          </>
        )}
      </ListItem>
    </List>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subTitel: PropTypes.string,
};

Header.defaultProps = {
  subTitel: '',
};

export default Header;
