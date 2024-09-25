/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/order */
/* eslint-disable arrow-body-style */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  makeStyles
} from '@material-ui/core';
import clsx from 'clsx';

import Modal from '../Modal';
import useHotelContext from '../../hooks/useHotelContext';
import ShowNameWithHey from '../ShowNameWithHey';
import Button from '../Button';
import { ALT_CONSTANTS, CTA_LABELS, REDIRECT_LIST_DATA } from '../../constants';
import IMAGE_URLS from '../../constants/images';
import ConditionalRender from '../ConditionalRender';
import color from '../../constants/colors';

const useStyles = makeStyles((theme) => ({
  modalContainer: {
    width: '100%',
  },
  modal: {
    padding: '15px 20px 0px !important',
    [theme.breakpoints.up('md')]: {
      paddingBottom: '20px',
    },
  },
  warning_section: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '280px',
    marginTop: '20px',
    '& img': {
      height: 'auto',
      width: '200px',
    },
  },
  warning_title: {
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '17px',
    color: theme.palette.secondary.main,
    fontFamily: 'Indivisible',
    marginBottom: '20px',
  },
  warning_desc: {
    marginTop: '10px',
    marginBottom: '20px',
    fontSize: '0.875rem',
    lineHeight: '17px',
    width: '70%',
    fontFamily: 'Indivisible-Light',
    color: theme.palette.secondary.mainOP5,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.75rem',
      width: '80%',
      lineHeight: '14px',
    },
  },
  phoneStyle: {
    color: theme.palette.primary.main,
  },
  radioBoxStyle: {
    fontWeight: '500 !important',
    fontFamily: 'Indivisible',
    fontSize: '14px !important',
  },
  radioLabelStyle: {
    color: theme.palette.secondary.main,
    fontSize: '12px',
    fontFamily: 'Indivisible',
    fontWeight: '700 !important',
    lineHeight: '17px !important',
    display: 'flex',
    textAlign: 'left',
    [theme.breakpoints.up('sm')]: {
      fontSize: '14px',
    },
  },
  closeIcon: {
    height: '12px',
    display: 'flex',
    justifyContent: 'flex-end',
    color: theme.palette.secondary.main,
    opacity: 0.7,
    '& > img': {
      cursor: 'pointer',
    },
  },
  nameContainer: {
    background: color.lightOrange,
    border: `1px solid ${color.whiteSmoke}`,
    flexDirection: 'column',
    maxWidth: '280px',
    marginTop: '11px',
    borderRadius: '8px',
    width: '100%',
    marginBottom: '20px',
    padding: '10px',
    boxSizing: 'border-box',
  },
  paddingName: {
    padding: '0 0 0 10px',
  },
  phoneNumberStyle: {
    color: theme.palette.primary.main,
    fontWeight: '600',
  },
  paddingContainer: {
    padding: '5px 5px !important',
    '& > img': {
      marginTop: '4px',
    },
  },
  dotedBorder: {
    borderTop: `1px dashed ${color.wishper}`,
    marginBottom: '20px',
    marginTop: '20px',
    background: 'transparent',
    width: 'calc(100% + 40px)',
    marginLeft: '-20px',
  },
  btnContainer: {
    width: '75%',
    margin: '0px auto 10px',
  },
  mobileInput: {
    margin: '20px 0 10px 0',
    fontSize: '24px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  },
  alternateHelper: {
    fontSize: '0.75rem',
    lineHeight: '0.875rem',
    opacity: 0.5,
    marginBottom: '15px',
    fontFamily: 'Indivisible-Light',
    fontWeight: 500,
  },
  input: {
    fontSize: '14px',
    fontFamily: 'Indivisible',
    width: '100%',
    outline: 'none',
    fontWeight: 600,
    borderColor: 'transparent',
    background: 'transparent',
    color: theme.palette.text.dark,
    '& > input': {
      padding: '6px',
    },
  },
  alignText: {
    textAlign: 'left',
  },
  listCont: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
}));

const RedirectEduPopup = ({ open, setOpen, handleContinue }) => {
  const classes = useStyles();
  const { data } = useHotelContext();
  // const [oldNumber, setOldNumber] = useState('no');

  return (
    <Modal
      contentClass={classes.modal}
      className={classes.modalContainer}
      open={open}
      onClose={setOpen}
    >
      <>
        <div className={classes.closeIcon}>
          <img
            src={IMAGE_URLS.ICONS.CLOSE_MODAL}
            alt={ALT_CONSTANTS.CLOSE_MODAL}
            onClick={() => setOpen(false)}
          />
        </div>
        <div className={classes.nameContainer}>
          <div className={clsx(classes.paddingContainer, classes.alignText)}>
            {/* <HeyUser /> */}
            <ShowNameWithHey />
          </div>
          {REDIRECT_LIST_DATA.map((item) => {
            return (
              <div className={clsx(classes.paddingContainer, classes.listCont)} key={item.label}>
                <img src={item.img} alt="note Icon" className="justify-content-flex-start mt-08" />
                <ConditionalRender
                  condition={item.seccondryLabel}
                  truthyComponent={(
                    <Typography
                      component="div"
                      align="left"
                      className={clsx(classes.paddingName, 'fs-12 fw-400 lh-17 col-333333 ff-indivisible')}
                    >
                      {item.label}
                      <span className={classes.phoneNumberStyle}>
                        {' '}
                        {data?.primaryMobileNumber || data?.mobileNumber}
                      </span>
                      {' '}
                      {item.seccondryLabel}
                      .
                    </Typography>
                  )}
                  falsyComponent={(
                    <Typography
                      component="div"
                      align="left"
                      className={clsx(classes.paddingName, 'fs-12 fw-400 lh-17 col-333333 ff-indivisible')}
                    >
                      {item.label}.
                    </Typography>
                  )}
                />
              </div>
            );
          })}
        </div>
        {/* <Divider className={classes.dotedBorder} /> */}
        <div className={classes.warning_section}>
          <div className={classes.btnContainer}>
            <Button
              height="auto"
              fullWidth
              label={CTA_LABELS.CONTINUE}
              onClick={() => handleContinue()}
              // disabled={!allowedToContinue}
            />
          </div>
        </div>
      </>
    </Modal>
  );
};

RedirectEduPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  handleContinue: PropTypes.func.isRequired,
};
export default RedirectEduPopup;
