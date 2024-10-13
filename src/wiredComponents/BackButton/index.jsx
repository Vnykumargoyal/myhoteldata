/* eslint-disable arrow-body-style */
import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import Image from '../../components/Image';
import ConditionalRender from '../../components/ConditionalRender';
import IMAGE_URLS from '../../constants/images';
import { WORKFLOW } from '../../routes/workflowstates';

const BackButton = ({ disableBack, handleClick }) => {
  const router = useHistory();
  // const handleClick = () => {

  // };
  return (
    <ConditionalRender
      condition={!disableBack}
      truthyComponent={(
        <IconButton
          aria-label="delete"
          size="small"
          variant="contained"
          color="secondary"
          className="arrowBackButton"
          onClick={handleClick}
        >
          <Image source={IMAGE_URLS.ICONS.BACK_BUTTON} />
        </IconButton>
      )}
    />
  );
};

BackButton.propTypes = {
  disableBack: PropTypes.bool,
  previousWorkflowState: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

BackButton.defaultProps = {
  disableBack: false,
  previousWorkflowState: '',
};

export default BackButton;
