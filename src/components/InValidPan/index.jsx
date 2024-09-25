/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {
  // prettier-ignore
  Box,
  Typography,
  Container
} from '@material-ui/core';
import clsx from 'clsx';

import Button from '../Button';
import Modal from '../Modal';
import useStyles from './style';
import Image from '../Image';
import { ALT_CONSTANTS, CONSTANTS, CTA_LABELS } from '../../constants';
import IMAGE_URLS from '../../constants/images';

const InValidPan = ({
  open,
  setOpen,
  businessName,
  // handleContinue,
  data,
}) => {
  const classes = useStyles({ data });
  return (
    <Modal open={open} disableOutsideClose dialogClass={classes.dailogClass} style={{ padding: '0px' }} contentClass={classes.contentClass}>
      <Container className={classes.container}>
        <div>
          <div className="w-85">
            <Box mt={1} mb={1}>
              <Image
                source={IMAGE_URLS.PAN_SCREEN.CARD_IMAGE}
                alt={ALT_CONSTANTS.PAN}
              />
            </Box>
          </div>
          <Typography
            align="center"
            component="p"
            className={clsx(classes.marginStyle)}
          >
            {CONSTANTS.INVALID_PAN}
          </Typography>
          <Typography
            align="center"
            component="p"
            className={clsx(classes.subTitle)}
          >
            {CONSTANTS.INVALID_BUSINESS_NAME}
            <br />
            <span className={classes.subTitleColor}>{businessName}</span>
          </Typography>
        </div>
        <div className="flex">
          <div className={clsx(classes.btnStyle, 'mt-30')}>
            <Button
              label={CTA_LABELS.RETRY}
              allowedToContinue
              hideHelp
              height="40px"
              onClick={setOpen}
            />
          </div>
        </div>
      </Container>
    </Modal>
  );
};
InValidPan.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  // handleContinue: PropTypes.func.isRequired,
  businessName: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default InValidPan;
