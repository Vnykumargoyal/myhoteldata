/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Divider } from '@material-ui/core';

import useStyles from './style';
import Modal from '../Modal';
import Button from '../Button';
import useBreakpoints from '../../hooks/useBreakpoints';
import {
  CONSTANTS,
  CTA_LABELS,
  INPUT_CONSTANTS,
  SOMETHING_WENT_WRONG
} from '../../constants';
import BottomSheetWrapper from '../BottomSheetWrapper';
import CustomInput from '../CustomInput';
import PageHeading from '../PageHeading';
import { isAlphaNumeric } from '../../helpers/functions';
import useHotelContext from '../../hooks/useHotelContext';

const Error = ({
  message,
  onDone,
}) => {
  const classes = useStyles();
  const { data } = useHotelContext();
  const [refValue, setRefValue] = useState(data?.referralCodeValue || data.referenceCode || '');
  const { downSm } = useBreakpoints();
  const [refError, setRefError] = useState('');
  const [allowedToContinue, setAllowedToContinue] = useState(false);
  useEffect(() => {
    if (refValue
      && refValue.length >= 3
      && !data.referralCodeValue
      // && !refValue.length > 12
      && !refError) {
      setAllowedToContinue(true);
    } else {
      setAllowedToContinue(false);
    }
  }, [refValue, refError, data]);
  const handleInputChange = (e) => {
    const {
      // prettier-ignore
      value,
    } = e.target;
    // const newVal = type === 'checkbox' ? checked : value;

    if (isAlphaNumeric(value) || !value.length) {
      setRefValue(value);
      setRefError('');
    } else {
      setRefError('Please enter a valid code');
    }
  };

  const handleBlur = (e) => {
    if (refValue?.length < 3) {
      setRefError('Referral code minimum length 3');
    }
    if (refValue?.length > 12) {
      setRefError('Referral code minimum length 12');
    }
  };

  return (
    <div className={classes.info_modal}>
      <Box mt={2} mb={2}>
        <CustomInput
          label={INPUT_CONSTANTS.REFERENCE_LABEL}
          value={refValue}
          error={refError}
          name={INPUT_CONSTANTS.REFERENCE_NAME}
          handleChange={handleInputChange}
          handleBlur={handleBlur}
          autoComplete="off"
          downScreen={downSm}
          placeholder={INPUT_CONSTANTS.REFERENCE_LABEL_PLACEHOLDER}
          maxLength="10"
          minLength="6"
        />
      </Box>
      <Button
        label={CTA_LABELS.CONFIRM}
        className={classes.gotIt}
        onClick={
          () => onDone(refValue)
        }
        disabled={!allowedToContinue}
      />
    </div>
  );
};

const ReferralCodeModal = ({ open, message, onClose }) => {
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
        <Container>
          <Divider className={classes.dividerHeader} />
          <Box mt={3}>
            <PageHeading title={CONSTANTS.REFERENCE_TITEL} />
          </Box>
          <Error message={message} onDone={onClose} />
        </Container>
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

ReferralCodeModal.propTypes = {
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

ReferralCodeModal.defaultProps = {
  message: SOMETHING_WENT_WRONG,
};

export default ReferralCodeModal;
