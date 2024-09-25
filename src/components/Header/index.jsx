/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Hidden, Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import BackButton from '../../wiredComponents/BackButton';
import useStyles from './style';
import { HEADER_TITLE } from '../../constants';
import useHotelContext from '../../hooks/useHotelContext';
import ConditionalRender from '../ConditionalRender';
import WebViewCloseButton from '../WebviewCloseButton';

const Header = ({
  // prettier-ignore
  style,
  title,
  titleClass,
  disableTitle,
  disableBack,
  handleClick,
  hideWebviewClose,
  ...props
}) => {
  const classes = useStyles();
  const { data } = useHotelContext();
  const { stage } = data;

  return (
    <Box className={classes.root} {...props} style={style}>
      <Hidden mdUp>
        <Box className="left-section">
          <BackButton
            disableBack={disableBack}
            previousWorkflowState={stage?.previousStageId}
            // handleClick={handleClick}
          />
        </Box>
      </Hidden>
      <ConditionalRender
        condition={!disableTitle}
        truthyComponent={(
          <Box className={clsx('center-section', titleClass)}>{title}</Box>
        )}
      />
      <div className="right-section">
        <ConditionalRender
          condition={!hideWebviewClose}
          truthyComponent={<WebViewCloseButton />}
        />
      </div>
    </Box>
  );
};

Header.defaultProps = {
  onClick: () => {},
  style: {},
  title: HEADER_TITLE,
  titleClass: '',
  disableTitle: false,
  disableBack: false,
  handleClick: () => {},
  hideWebviewClose: false,
};
Header.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  titleClass: PropTypes.string,
  disableTitle: PropTypes.bool,
  disableBack: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.string),
  handleClick: PropTypes.func,
  hideWebviewClose: PropTypes.bool,
};
export default Header;
