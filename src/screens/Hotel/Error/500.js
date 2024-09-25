import React from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';

import useErrorStyles from './styles';
import Wrapper from '../../../wiredComponents/Wrapper';
import { ALT_CONSTANTS, CTA_LABELS, ERRORS } from '../../../constants';
import IMAGE_URLS from '../../../constants/images';

const Error500 = () => {
  const classes = useErrorStyles();
  const router = useHistory();
  const onGoBack = () => router.goBack();
  return (
    <Wrapper
      onContinue={onGoBack}
      bottomButtonLabel={CTA_LABELS.GO_BACK}
      needHelp={false}
      disableBack
      disableGutters
    >
      <div />
      <div className={classes.error}>
        <div className="oops">{ERRORS.ERROR_500_HEADING}</div>
        <div className={clsx(classes.error_sub_title, 'col-text-primary ff-indivisible fw-600')}>
          {ERRORS.ERROR_500_UNEXPECTED}
        </div>
      </div>
      <img
        className={classes.error_img}
        src={IMAGE_URLS.ERRORS.ERROR_500}
        alt={ALT_CONSTANTS.ERROR_500}
      />
      <div className={clsx(classes.error_msg, 'col-text-primary fs-14')}>
        {ERRORS.ERROR_500_FIXING}
        <br />
        {ERRORS.ERROR_500_TRYING}
      </div>
    </Wrapper>
  );
};

export default Error500;
