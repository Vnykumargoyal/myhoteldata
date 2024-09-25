/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';

import Button from '../Button';
import Modal from '../Modal';
import IMAGE_URLS from '../../constants/images';
import { routes } from '../../routes/constant';

const useStyles = makeStyles((theme) => ({
  modal: {
    padding: '40px 20px 20px',
    maxWidth: '220px',
  },
  dialog: {
    borderRadius: '20px',
    '& .close_modal': {
      top: '10px',
      right: '10px',
    },
  },
  popupContainer: {
    padding: '0 5px',
  },
  description: {
    padding: '0 10px',
    color: theme.palette.secondary.main,
    fontWeight: 600,
  },
  descLog: {
    padding: '0 10px',
    color: theme.palette.secondary.main,
    margin: '0px auto 15px',
    fontWeight: 600,
  },
  button: {
    width: '100%',
    height: '45px',
    fontSize: '14px',
    fontWeight: '600',
    fontFamily: 'Indivisible',
    margin: '20px 0 0',
  },
  exit: {
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
    '&:hover': {
      borderColor: theme.palette.error.main,
      backgroundColor: 'rgba(209, 58, 58, 0.04)',
    },
  },
}));

const ClosePopup = ({ open, setOpen }) => {
  const classes = useStyles();
  const router = useHistory();

  return (
    <Modal
      dialogClass={classes.dialog}
      open={open}
      onClose={setOpen}
      showCloseIcon
      contentClass={classes.modal}
      closeIconSource={IMAGE_URLS.ICONS.CLOSE}
    >
      <div>
        <Typography className={classes.popupContainer}>
          <Typography
            component="div"
            className={clsx(classes.description, 'fs-16 fs-sm-14')}
          >
            Are you sure you want to move out?
          </Typography>
        </Typography>
        <Button
          label="Yes, exit now"
          className={clsx(classes.button, classes.exit)}
          variant="outlined"
          color="error"
          onClick={() => router.replace(routes.auth.logout)}
        />
        <Button
          className={classes.button}
          variant="contained"
          onClick={() => setOpen(false)}
          label="No, keep me here"
        />
      </div>
    </Modal>
  );
};

ClosePopup.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default ClosePopup;
