import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';

import useStyles from './styles';
import ClosePopup from './ClosePopup';
import ConditionalRender from '../ConditionalRender';
import useAppLogin from '../../hooks/useAppLogin';

const WebViewCloseButton = () => {
  const classes = useStyles();
  const [showPopup, setShowPopup] = useState(false);
  const { isAppLogin } = useAppLogin();

  const handleOpen = () => setShowPopup(true);

  return (
    <ConditionalRender
      condition={Boolean(isAppLogin)}
      truthyComponent={(
        <>
          <IconButton
            size="small"
            color="secondary"
            className={classes.close}
            onClick={handleOpen}
          >
            <img src="assets/icons/close.svg" width="100%" alt="x" />
          </IconButton>
          <ClosePopup open={showPopup} setOpen={setShowPopup} />
        </>
      )}
    />
  );
};

WebViewCloseButton.propTypes = {};

WebViewCloseButton.defaultProps = {};

export default WebViewCloseButton;
