import React, { useCallback, useState } from 'react';
import clsx from 'clsx';
import { Typography } from '@material-ui/core';

import useErrorStyles from './styles';
import Wrapper from '../../../wiredComponents/Wrapper';
import Image from '../../../components/Image';
import IMAGE_URLS from '../../../constants/images';
import { CLASSES, CONSTANTS, CTA_LABELS } from '../../../constants';
import EmptyBlock from '../../../components/EmptyBlock';

const NoInternet = () => {
  const classes = useErrorStyles();
  const [click, setClick] = useState(0);

  const onGoBack = useCallback(() => {
    setClick((prev) => prev + 1);
    if (click >= 2) {
      window.location.reload();
    }
  }, [click]);

  return (
    <Wrapper onContinue={onGoBack} bottomButtonLabel={CTA_LABELS.RE_LOAD}>
      <EmptyBlock />
      <Typography component="div" className={classes.error}>
        <Typography component="div" className="oops">{CONSTANTS.OFFLINE}</Typography>
        <Typography component="div" className={classes.error_sub_title}>
          {CONSTANTS.CONNECTION_LOST}
        </Typography>
        <Image
          className={classes.error_img}
          source={IMAGE_URLS.ERRORS.NO_INTERNET}
          alt={CONSTANTS.NO_INTERNET}
        />
      </Typography>
      <Typography component="div" align="center" className={clsx(classes.m_0_auto, CLASSES.W_70)}>
        <Typography component="div" className={clsx(classes.desc, CLASSES.FW_600)}>
          {CONSTANTS.CHECK_INTERNET}
        </Typography>
      </Typography>
    </Wrapper>
  );
};

export default NoInternet;
