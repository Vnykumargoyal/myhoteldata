/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Container, Box } from '@material-ui/core';
import {
  useHistory
} from 'react-router-dom';

import useStyles from './style';
import Image from '../Image';
import { CONSTANTS } from '../../constants';
import Header from '../Header';
import IMAGE_URLS from '../../constants/images';
import CountdownTimer from '../CountdownTimer';
import useHotelContext from '../../hooks/useHotelContext';
import { routes } from '../../routes/constant';

const CommonErrorPage = ({
  title,
  titleClass,
  titelImg,
  heading,
  headingClass,
  bottomHeading,
  bottomClass,
  img,
  timer,
}) => {
  const classes = useStyles();
  const router = useHistory();
  const { data } = useHotelContext();
  return (
    <Box>
      <Header disableBack />
      <Container className={classes.container}>
        <div className={classes.error}>
          <div className={clsx('oops', titleClass)}>
            {title}
            <br />
            {titelImg && (
              <Box mt={1}>
                😞
              </Box>
            )}
          </div>
          <div className={clsx(classes.error_msg, headingClass, 'mt-10')}>
            {heading}
          </div>
          <Image
            className={classes.error_img}
            source={img}
            alt="Offer Expired"
          />
          <div className={clsx(classes.error_msg, bottomClass)}>
            {bottomHeading}
          </div>
          {data.coolingTime && timer && (
            <Box>
              <CountdownTimer
                initialTime={new Date(data.coolingTime) - Date.now()}
                onTimerEnds={() => router.replace(routes.auth.logout)}
              />
            </Box>
          )}
        </div>
      </Container>
    </Box>
  );
};

CommonErrorPage.propTypes = {
  title: PropTypes.string,
  heading: PropTypes.string,
  bottomHeading: PropTypes.string,
  titelImg: PropTypes.bool,
  img: PropTypes.string,
  titleClass: PropTypes.string,
  headingClass: PropTypes.string,
  bottomClass: PropTypes.string,
  timer: PropTypes.bool,
};

CommonErrorPage.defaultProps = {
  title: CONSTANTS.COMMONHEADINGTITEL,
  heading: CONSTANTS.COMMONERRORTITEL,
  bottomHeading: CONSTANTS.COMMONBOTTOMHEADING,
  titelImg: false,
  img: IMAGE_URLS.ERRORS.COMMON_ERROR,
  titleClass: '',
  headingClass: '',
  bottomClass: '',
  timer: false,
};

export default CommonErrorPage;
