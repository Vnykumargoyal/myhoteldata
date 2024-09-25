/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {
  // prettier-ignore
  Typography,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import useStyle from './style';
import IMAGE_URLS from '../../constants/images';

const NotesWithList = ({
  title,
  listItems,
  listIconImg,
  listIconImgDisable,
}) => {
  const classes = useStyle(listIconImgDisable);
  return (
    <div className={classes.aboutContainer}>
      <Typography component="div" className={clsx(classes.aboutPnach, classes.aboutBank, 'fw-700 ff-indivisible-b pl-05 mb-10')}>
        {title}
      </Typography>
      {listItems && listItems.map((item) => (
        <ListItem key={item.content} alignItems="flex-start" className={classes.aboutContainer}>
          {!listIconImgDisable && (
            <ListItemAvatar className={classes.imgSize}>
              <Avatar alt={item.content} src={listIconImg} className={classes.imgSize} />
            </ListItemAvatar>
          )}
          <ListItemText
            primaryTypographyProps={{
              className: classes.aboutPnach,
            }}
            primary={item?.content}
          />
        </ListItem>
      ))}
    </div>
  );
};

NotesWithList.defaultProps = {
  title: '',
  listIconImg: IMAGE_URLS.ICONS.NOTE_LIST,
  listItems: [],
  listIconImgDisable: false,
};

NotesWithList.propTypes = {
  title: PropTypes.string,
  listIconImg: PropTypes.string,
  listItems: PropTypes.arrayOf(PropTypes.object),
  listIconImgDisable: PropTypes.bool,
};

export default NotesWithList;
