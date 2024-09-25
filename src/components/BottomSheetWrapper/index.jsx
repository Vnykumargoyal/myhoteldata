import React from 'react';
import clsx from 'clsx';
import { IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import { CloseRounded } from '@material-ui/icons';

import useBreakpoints from '../../hooks/useBreakpoints';
import useStyles from './style';

const BottomSheetWrapper = ({
  // prettier-ignore
  open,
  setOpen,
  animation,
  children,
  alignBottom,
  disableClose,
  position,
  page,
  modalClass,
}) => {
  const classes = useStyles({ animation });
  const { isLg } = useBreakpoints();

  const handleClose = () => {
    setOpen(false);
  };
  const stopPropagation = (e) => e.stopPropagation();
  return (
    <div
      className={clsx('modal', modalClass)}
      style={{
        display: open ? 'block' : 'none',
        height: page === 'withdrawCradit' ? '130%' : '100%',
        // background: 'url(assets/icons/layers/shadowModal.svg)'
      }}
      onClick={handleClose}
      aria-hidden="true"
    >
      <div
        className={clsx(
          classes.BottomSheetContainer,
          // prettier-ignore
          (alignBottom && classes.bottom)
          || (isLg ? classes.center : classes.bottom),
          position
        )}
        // style={{ height }}
        onClick={stopPropagation}
        aria-hidden="true"
      >
        {!disableClose && isLg && (
          <IconButton
            className={clsx(classes.closeIcon)}
            size="small"
            onClick={handleClose}
          >
            <CloseRounded />
          </IconButton>
        )}
        {children}
      </div>
    </div>
  );
};

BottomSheetWrapper.defaultProps = {
  open: 'none',
  children: '',
  alignBottom: false,
  animation: 'slides-up',
  position: 'p-absolute',
  disableClose: false,
  page: '',
  modalClass: '',
};

BottomSheetWrapper.propTypes = {
  open: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  children: PropTypes.element,
  setOpen: PropTypes.func.isRequired,
  animation: PropTypes.string,
  alignBottom: PropTypes.bool,
  disableClose: PropTypes.bool,
  position: PropTypes.string,
  page: PropTypes.string,
  modalClass: PropTypes.string,
};
export default BottomSheetWrapper;
