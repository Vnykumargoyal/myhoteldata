import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Container
} from '@material-ui/core';
import clsx from 'clsx';

import Modal from '../Modal';
import Button from '../Button';
import useStyles from './style';
import IMAGE_URLS from '../../constants/images';
import { CTA_LABELS } from '../../constants';

const FileSizeExceed = ({
  open,
  sizeLimit,
  onRetry,
}) => {
  const classes = useStyles();
  return (
    <Modal contentClass={classes.modal} open={open} disableOutsideClose>
      <Container className={classes.container}>
        <Box mt={1}>
          <img
            className={classes.image}
            src={IMAGE_URLS.KYC_SCREEN.LARGE_SIZE_IMAGE}
            width="auto"
            alt="PNACH Intent"
          />
        </Box>
        <Box mb={1} mt={3}>
          <Typography
            component="p"
            align="center"
            className={clsx(classes.desc, 'fs-14 fw-600 ff-indivisible-l lh-17')}
          >
            {`Total Upload File Size Limit is ${sizeLimit}`}
          </Typography>
        </Box>
      </Container>
      <div className={classes.btnStyle}>
        <Button
          label={CTA_LABELS.RETRY}
          height="40px"
          onClick={onRetry}
        />
        {/* <Typography
          color="primary"
          align="center"
          className={clsx(classes.cancelButton, 'fs-14 fw-600')}
        >
          Cancel
        </Typography> */}
      </div>
    </Modal>
  );
};
FileSizeExceed.propTypes = {
  open: PropTypes.bool.isRequired,
  sizeLimit: PropTypes.string,
  onRetry: PropTypes.func.isRequired,
};

FileSizeExceed.defaultProps = {
  sizeLimit: '25 MB',
};

export default FileSizeExceed;
