import React from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';

import useErrorStyles from './styles';
import Wrapper from '../../../wiredComponents/Wrapper';
import IMAGE_URLS from '../../../constants/images';
import { ALT_CONSTANTS, CTA_LABELS, ERRORS } from '../../../constants';

const Error404 = () => {
  const classes = useErrorStyles();
  const router = useHistory();
  const onGoBack = () => router.goBack();
  if (
    sessionStorage.getItem('fromOP')
    && window.location.pathname.includes('add-pay-method')
  ) {
    window.location.pathname = '/payout/add-pay-method';
    return null;
  }
  return (
    <Wrapper
      disableBack
      disableGutters
      onContinue={onGoBack}
      bottomButtonLabel={CTA_LABELS.GO_BACK}
      needHelp={false}
    >
      <div />
      <div className={classes.error}>
        <div className="oops">{ERRORS.ERROR_404_LOST}</div>
        <div className={classes.error_sub_title}>{ERRORS.ERROR_404_NOT_FOUND}</div>
      </div>
      <div className={clsx(classes.m_0_auto, 'ta-center h-300')}>
        <img
          className={classes.error_img}
          src={IMAGE_URLS.ERRORS.LOST}
          alt={ALT_CONSTANTS.ERROR_404}
        />
        <div className={clsx(classes.desc, 'fw-600')}>
          {ERRORS.ERROR_404_BOTTOM}
        </div>
      </div>
      <div />
    </Wrapper>
  );
};

export default Error404;
