import React, { useCallback, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import useStyles from './style';
import Modal from '../../../../../components/Modal';
import Image from '../../../../../components/Image';
import IMAGE_URLS from '../../../../../constants/images';
import { CONSTANTS, CTA_LABELS } from '../../../../../constants';
import { getCheckBoxes } from '../../../PersonalDetails/utils/default';
import BottomSection from '../../../../../wiredComponents/BottomSection';
import { getLenderName, renderParsedHTML } from '../../../../../helpers/functions';

const AgreementPopup = ({
  open,
  onAgree,
  lender,
}) => {
  const classes = useStyles();
  const [values, setValues] = useState({ IS_TREM_CHECKBOXES: false });

  const handleChange = useCallback((e) => {
    const { name, checked } = e.target;
    setValues((prev) => ({ ...prev, [name]: checked }));
  }, [setValues]);

  const handleAgree = useCallback(() => {
    if (values.IS_TREM_CHECKBOXES) onAgree();
  }, [onAgree, values]);

  return (
    <Modal contentClass={classes.dialog} open={open} disableOutsideClose>
      <Box className={classes.container} mt={1.25}>
        <Image source={IMAGE_URLS.ICONS.DOCUMENT} />
        <Typography className={classes.heading}>
          {CONSTANTS.TERMS_AND_CONDITIONS_AGREEMENT}
        </Typography>
        <Typography className={classes.subHeading}>
          {renderParsedHTML(CONSTANTS.AGREE_TO_T_AND_C(getLenderName(lender)))}
        </Typography>
        <BottomSection
          fullWidth
          values={values}
          onContinue={handleAgree}
          label={CTA_LABELS.I_AGREE}
          handleChange={handleChange}
          checkBoxClassRoot={classes.checkBoxes}
          checkBoxes={getCheckBoxes(lender)}
          allowedToContinue={values.IS_TREM_CHECKBOXES}
        />
      </Box>
    </Modal>
  );
};

AgreementPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onAgree: PropTypes.func.isRequired,
  lender: PropTypes.string.isRequired,
};

export default AgreementPopup;
