/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

import color from '../../constants/colors';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    margin: '10px auto 5px',
    width: '100%',
    flexWrap: 'wrap',
  },
  emailBox: {
    margin: '0 13px 10px 0',
    background: color.lightRedes,
    color: color.suvaGray,
    padding: '7px 9px',
    boxSizing: 'border-box',
    borderRadius: '4px',
    fontWeight: '500',
    fontSize: '0.75rem',
    lineHeight: '0.875rem',
    cursor: 'pointer',
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.75rem',
      lineHeight: '0.75rem',
    },
  },
  selected: {
    background: 'rgba(204, 247, 230, 0.5)',
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
  },
}));

const EmailsList = ({
  // prettier-ignore
  className,
  list,
  selected,
  onEmailSelect,
}) => {
  const classes = useStyles();

  return list && list.length > 0 ? (
    <div className={clsx(classes.container, className)}>
      {list.map((item, index) => (
        <div
          key={`${item}-${index}`}
          onClick={() => onEmailSelect(item, index)}
          className={clsx(
            classes.emailBox,
            (index === selected || item === selected) && classes.selected
          )}
        >
          {item?.trim()}
        </div>
      ))}
    </div>
  ) : null;
};

EmailsList.propTypes = {
  className: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.bool,
  onEmailSelect: PropTypes.func.isRequired,
};

EmailsList.defaultProps = {
  className: '',
  selected: -1,
};

export default EmailsList;
