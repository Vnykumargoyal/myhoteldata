/* eslint-disable consistent-return */
/* eslint-disable no-unneeded-ternary */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import MaterialButton from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { getPageID } from '../../helpers/functions';
import color from '../../constants/colors';

const useStyles = makeStyles(() => ({
  button: {
    textTransform: 'none',
    marginTop: '10px',
    borderRadius: '10px',
    cursor: 'pointer',
    backgroundColor: color.primary,
    color: color.white
  },
}));
const Button = ({
  // prettier-ignore
  onClick,
  disabled,
  className,
  label,
  fullWidth = true,
  variant = 'contained',
  size = 'large',
  height,
  hasLoading,
  pageId,
  idInfo,
}) => {
  const classes = useStyles();
  const pageID = useMemo(() => getPageID(pageId), [pageId]);
  return (
    <MaterialButton
      variant={variant}
      color="primary"
      id={idInfo ? idInfo : `${pageID}_btn`}
      disabled={disabled}
      fullWidth={fullWidth}
      disableElevation
      size={size}
      className={clsx(classes.button, className)}
      onClick={() => {
        if (hasLoading) {
          return false;
        }
        onClick();
      }}
      style={{ height }}
    >
      {label}
    </MaterialButton>
  );
};

Button.defaultProps = {
  disabled: false,
  onClick: () => {},
  className: 'fs-14 fw-bold letter-space-1',
  label: '',
  fullWidth: true,
  variant: 'contained',
  size: 'large',
  height: 'auto',
  hasLoading: false,
  pageId: '',
  idInfo: '',
};

Button.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  variant: PropTypes.string,
  label: PropTypes.string,
  size: PropTypes.string,
  height: PropTypes.string,
  fullWidth: PropTypes.bool,
  hasLoading: PropTypes.bool,
  pageId: PropTypes.string,
  idInfo: PropTypes.string,
};

export default Button;
