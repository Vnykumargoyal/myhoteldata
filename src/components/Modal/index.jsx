/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { Dialog, DialogContent, DialogContentText } from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import useStyles from './style';
import IMAGE_URLS from '../../constants/images';

const Modal = ({
  open,
  onClose,
  showCloseIcon = false,
  disableOutsideClose = false,
  children,
  className,
  contentClass,
  dialogClass,
  closeIconSource,
}) => {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={() => !disableOutsideClose && onClose(false)}
      className={`${classes.wrapper} ${className}`}
      classes={{ paperScrollPaper: clsx(classes.dialogRoot, dialogClass) }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {showCloseIcon && (
        <img
          className="close_modal"
          src={closeIconSource}
          alt="Close Modal"
          onClick={() => onClose(false)}
        />
      )}
      <DialogContent className={contentClass}>
        <DialogContentText id="alert-dialog-description" align="center">
          {children}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

Modal.defaultProps = {
  open: false,
  onClose: () => {},
  children: <div>No Content</div>,
  className: '',
  contentClass: '',
  dialogClass: '',
  showCloseIcon: false,
  disableOutsideClose: false,
  closeIconSource: IMAGE_URLS.ICONS.CROSS,
};

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  className: PropTypes.string,
  contentClass: PropTypes.string,
  dialogClass: PropTypes.string,
  showCloseIcon: PropTypes.bool,
  disableOutsideClose: PropTypes.bool,
  closeIconSource: PropTypes.string,
};

export default Modal;
