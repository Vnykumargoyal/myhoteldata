import React, { useRef } from 'react';
import { Box, Typography } from '@material-ui/core';
import CarouselContainer from 'react-elastic-carousel';

import useStyles from './style';
import Header from '../../../../../components/Header';
import CarouselItem from './CarouselItem';
import { LOGIN_CAROUSEL_SLIDE_TIMEOUT } from '../../../../../config';
import useBreakpoints from '../../../../../hooks/useBreakpoints';
import { LOGIN_PRODUCT_ITEMS } from '../../../../../constants';

let resetTimeout;

const ProductCarousel = () => {
  const classes = useStyles();
  const carouselRef = useRef(null);
  const { isLg, isMd, downSm } = useBreakpoints();

  const getItemsToShow = () => {
    if (downSm) return 1;
    if (isMd) return 2;
    if (isLg) return 1;
    return 1;
  };

  const getItemsToScroll = () => {
    if (downSm) return 1;
    if (isMd) return 2;
    if (isLg) return 1;
    return 1;
  };

  const handleCarouselEnding = ({ index }) => {
    clearTimeout(resetTimeout);
    if (index + getItemsToShow() === LOGIN_PRODUCT_ITEMS.length) {
      if (carouselRef?.current?.goTo) {
        resetTimeout = setTimeout(() => {
          if (carouselRef?.current?.goTo) {
            carouselRef.current.goTo(0);
          }
        }, LOGIN_CAROUSEL_SLIDE_TIMEOUT);
      }
    }
  };

  return (
    <Box>
      <Header disableBack />
      <Typography component="div" className={classes.carouselContainer}>
        <CarouselContainer
          enableAutoPlay
          ref={carouselRef}
          autoPlaySpeed={5000}
          itemsToScroll={getItemsToScroll()}
          itemsToShow={getItemsToShow()}
          pagination
          autoplayHoverPause
          showArrows={false}
          onNextEnd={handleCarouselEnding}
        >
          {LOGIN_PRODUCT_ITEMS.map((item) => (
            <CarouselItem key={item.id} item={item} />
          ))}
        </CarouselContainer>
      </Typography>
    </Box>
  );
};

export default ProductCarousel;
