/* eslint-disable import/order */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Box, Typography } from '@material-ui/core';

import useHotelContext from '../../hooks/useHotelContext';
import Button from '../Button';
import Modal from '../Modal';
import ShowNameWithHey from '../ShowNameWithHey';

const useStyles = makeStyles((theme) => ({
  modalContainer: {
    width: '100%',
  },
  modal: {
    padding: '30px 24px 10px !important',
    [theme.breakpoints.up('md')]: {
      paddingBottom: '20px',
    },
  },
  warning_section: {
    maxWidth: '260px',
    '& > p': {
      margin: '16px auto 20px',
      fontFamily: 'Indivisible-Light',
    },
  },
  primaryAccount: {
    fontSize: '0.75rem',
    lineHeight: '1.0625rem',
    fontWeight: 500,
    '& > p': {
      color: theme.palette.primary.main,
      fontSize: '0.875rem',
      fontFamily: 'Indivisible-Light',
    },
  },
}));

const UploadInstructionsModal = ({ open, setOpen }) => {
  const classes = useStyles();
  const { data } = useHotelContext();

  return (
    <Modal
      contentClass={classes.modal}
      className={classes.modalContainer}
      open={open}
      onClose={setOpen}
    >
      <Box align="left" className={classes.warning_section}>
        <ShowNameWithHey />
        <Typography align="left" className="fw-500 fs-12 lh-20 mt-16">
          As a next step our lending partner will require bank statements of
          your primary business account to get you a loan offer.
        </Typography>
        <Typography className={classes.primaryAccount}>
          Your Primary Business account
          <br />
          {data?.businessInfo?.length > 0 && (
            <Typography>{data?.businessInfo[0]?.legalName}</Typography>
          )}
        </Typography>
        <Box px={2}>
          <Button label="Got It!" onClick={setOpen} />
        </Box>
      </Box>
    </Modal>
  );
};

UploadInstructionsModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
export default UploadInstructionsModal;
