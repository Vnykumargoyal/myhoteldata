/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import React, { useRef } from 'react';
import { makeStyles, Typography } from '@material-ui/core';

// import { Modal } from '../Modal';
// import experianHtml from '../../static/html/experianT&C.html';
import Modal from '../Modal';
import color from '../../constants/colors';

const useStyle = makeStyles((theme) => ({
  content: {
    paddingTop: 0,
  },
  modalClass: {
    maxWidth: '350px',
    [theme.breakpoints.up('md')]: {
      maxWidth: '450px',
    },
  },
  modalHeightStyle: { padding: '0 0 115px 0' },
  header: {
    padding: '20px 0',
    background: color.white,
    position: 'sticky',
    top: '0',
    fontSize: '1rem',
  },
  customFade: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    display: 'flex',
    alignItems: 'flex-end',
    height: '4rem',
    width: '96%',
    marginTop: '10px',
    padding: '0 20px 10px',
    boxSizing: 'border-box',
    background:
      'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 57.37%)',
  },
}));

const TermsAndConditionsModal = (props) => {
  const pdfRef = useRef();
  const classes = useStyle();

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Modal
      open={props.open}
      contentClass={classes.content}
      dialogClass={classes.modalClass}
      showCloseIcon
      onClose={props.setOpen}
    >
      <div className={classes.modalHeightStyle}>
        <Typography className={classes.header}>Experian Terms & Conditions</Typography>
        <div
          ref={pdfRef}
          dangerouslySetInnerHTML={{ __html: '' }}
          style={{ all: 'initial' }}
        />
      </div>
      <div className={classes.customFade} />
    </Modal>
  );
};

TermsAndConditionsModal.defaultProps = {
  html: 'Ooops! we couln"t find anything to fetch here....',
};
export default TermsAndConditionsModal;
