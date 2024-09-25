/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Typography, makeStyles } from '@material-ui/core';

import Modal from '../Modal';
import useStyles from './style';
import { CONSTANTS, CTA_LABELS, NOTES } from '../../constants';
import Button from '../Button';
import IMAGE_URLS from '../../constants/images';

const EsignSkipModal = ({
  open,
  cancel,
  proceedEsignSkip,
}) => {
  const classes = useStyles();
  return (
    <Modal
      open={open}
      disableOutsideClose
      onClose={cancel}
    >
      <div className={classes.warning_section}>
        <Typography component="h4" className={clsx(classes.header)}>
          {CONSTANTS.ESIGN_SKIP_TITEL}
        </Typography>
        <img src={IMAGE_URLS.PD_WAIT.SETUP_COMPLETE} alt="Esign Skip Modal" />
        <Typography component="b" className={clsx(classes.warning_title)}>
          {CONSTANTS.ESIGN_SKIP_SUBTITEL}
        </Typography>
        <Typography
          component="div"
          className={clsx(classes.powered_by, 'mb-20')}
        >
          {NOTES.ESIGN_SKIP_MODAL}
        </Typography>
        {/* <Button label="Ok, Proceed" onClick={onRetry} /> */}
        <Button
          onClick={proceedEsignSkip}
          label={CTA_LABELS.OK_PROCEED}
        />
        <Button
          variant="text"
          onClick={cancel}
          label={CTA_LABELS.GO_BACK}
        />
      </div>
    </Modal>
  );
};

EsignSkipModal.propTypes = {
  open: PropTypes.bool.isRequired,
  cancel: PropTypes.func.isRequired,
  proceedEsignSkip: PropTypes.func.isRequired,
};

export default EsignSkipModal;
