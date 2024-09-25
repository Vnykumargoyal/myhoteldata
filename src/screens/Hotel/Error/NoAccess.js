import React from 'react';
import { useHistory } from 'react-router-dom';

import useErrorStyles from './styles';
import Wrapper from '../../../wiredComponents/Wrapper';
import { CTA_LABELS } from '../../../constants';

const ErrorNoAccess = () => {
  const router = useHistory();
  const classes = useErrorStyles();
  const onGoBack = () => router.push(router.location.state?.redirectTo || '/');
  return (
    <Wrapper onContinue={onGoBack} bottomButtonLabel={CTA_LABELS.DONE} needHelp={false}>
      <div />
      <div className={classes.error}>
        <div className="oops">Sorry!</div>
        <div className={classes.error_sub_title}>No Access</div>
      </div>
      <img
        className={classes.error_img}
        src="assets/img/error/NoAccess.svg"
        alt="no service"
      />
      <div>
        <div className={`${classes.desc} fw-b`}>
          You are not eligible for FlexiCredit as yet
        </div>
        <div className={classes.desc}>Please retry after few days</div>
      </div>
    </Wrapper>
  );
};

export default ErrorNoAccess;
