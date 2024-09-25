/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import useStyles from './style';
import Modal from '../Modal';
import Button from '../Button';
import useBreakpoints from '../../hooks/useBreakpoints';
import { SOMETHING_WENT_WRONG } from '../../constants';
import BottomSheetWrapper from '../BottomSheetWrapper';

const Error = ({
  message,
  onDone,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.info_modal}>
      <Typography component="div" className={classes.desc}>
        {message}
      </Typography>
      <Button label="Done" className={classes.gotIt} onClick={onDone} />
    </div>
  );
};

const GenericErrorModal = ({ open, message, onClose }) => {
  const { downSm } = useBreakpoints();
  const classes = useStyles();
  return (
    downSm ? (
      <BottomSheetWrapper
        animation="slides-to-height"
        setOpen={onClose}
        open={open}
        alignBottom
        position="p-fixed"
        modalClass={classes.modalClass}
      >
        <Error message={message} onDone={onClose} />
      </BottomSheetWrapper>
    ) : (
      <Modal open={open} onClose={onClose}>
        <Error message={message} onDone={onClose} />
      </Modal>
    )
  );
};

Error.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  onDone: PropTypes.func.isRequired,
};

GenericErrorModal.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

GenericErrorModal.defaultProps = {
  message: SOMETHING_WENT_WRONG,
};

export default GenericErrorModal;
