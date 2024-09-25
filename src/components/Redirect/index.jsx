/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Typography, Box } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';

// import { Modal } from '../../../../../components/Modal';
import Modal from '../Modal';
import IMAGE_URLS from '../../constants/images';
import color from '../../constants/colors';

const useStyles = makeStyles(() => ({
  image: {
    background: `url(${IMAGE_URLS.REDIRECT.REDIRECT_BG})`,
    backgroundPositionX: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundPositionY: '20px',
  },
  redirectingText: {
    margin: 'auto',
    marginBottom: '10px',
    width: '80%',
    lineHeight: '17px',
  },
  modalArea: {
    width: '250px',
    margin: '0 auto',
    padding: '20px 10px',
    borderRadius: '5px',
  },
  dialogClass: {
    margin: 0,
    backgroundColor: color.lightGreen1,
    minWidth: '280px',
  },
}));

const Redirecting = ({ open, setOpen, message }) => {
  const classes = useStyles();

  return (
    <Modal
      open={open}
      disableOutsideClose
      onClose={setOpen}
      className={classes.modalArea}
      dialogClass={classes.dialogClass}
    >
      <Typography
        variant="caption"
        className={clsx('fs-14 fw-600', 'ff-indivisible')}
        style={{ lineHeight: '17px' }}
      >
        Just a moment
      </Typography>
      <Box mt={0} className={classes.image}>
        <img
          src={IMAGE_URLS.REDIRECT.REDIRECT_IMG}
          alt="Redirecting"
          style={{ padding: '10px 0px' }}
        />
      </Box>

      <Typography
        variant="caption"
        component="p"
        className={clsx('fs-14', classes.redirectingText)}
      >
        {message}
      </Typography>
    </Modal>
  );
};
Redirecting.defaultProps = {
  open: false,
  message: 'We\'re redirecting you to the bank\'s website',
};
Redirecting.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func.isRequired,
  message: PropTypes.string,
};
export default Redirecting;
