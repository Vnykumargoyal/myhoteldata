/* eslint-disable no-unused-vars */
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
import IMAGE_URLS from '../../constants/images';
import { CONSTANTS, ERRORS } from '../../constants';

const SomethingWentWrong = ({
  open,
  setOpen,
  data,
  buttonLabel,
}) => {
  const classes = useStyles();
  return (
    <Modal open={open} disableOutsideClose>
      <Container className={classes.container}>
        <Box mt={2}>
          <img
            className={classes.image}
            src={IMAGE_URLS.ERRORS.ERROR_500}
            width="auto"
            alt={CONSTANTS.SOMETHING_WENT_WRONG}
          />
        </Box>
        <Box mb={2} mt={1}>
          <Typography
            component="p"
            align="center"
            className="fs-14 fw-600 ff-indivisible-l lh-17"
          >
            {CONSTANTS.SOMETHING_WENT_WRONG}
          </Typography>
        </Box>
        <Typography
          align="center"
          component="p"
          className={clsx(classes.data, 'fs-14 fs-sm-12 lh-17 lh-sm-14 col-text-primary-op5 ff-indivisible mb-20')}
        >
          {ERRORS.ERROR_500_UNEXPECTED}
          <br />
          {ERRORS.ERROR_500_FIXING}
          <br />
          {ERRORS.ERROR_500_TRYING}
        </Typography>
        <div className={classes.btnStyle}>
          <Button
            label={buttonLabel}
            allowedToContinue
            hideHelp
            height="40px"
            onClick={() => setOpen()}
          />
        </div>
      </Container>
    </Modal>
  );
};
SomethingWentWrong.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  buttonLabel: PropTypes.string,
};

SomethingWentWrong.defaultProps = {
  data: '',
  buttonLabel: '',
};

export default SomethingWentWrong;
