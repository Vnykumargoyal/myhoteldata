import React from 'react';
import { Box, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import ConditionalRender from '../../../../../../components/ConditionalRender';
import Image from '../../../../../../components/Image';
import useStyles from './style';

const CarouselItem = ({ item }) => {
  const classes = useStyles({ primaryImageMargin: item.margin });

  return (
    <div className={classes.carouselItem}>
      <ConditionalRender
        condition={Boolean(item.primaryTitle)}
        truthyComponent={(
          <Typography align="center" className={classes.primaryTitle}>
            {item.primaryTitle}
          </Typography>
        )}
      />
      <ConditionalRender
        condition={Boolean(item.primarySubTitle)}
        truthyComponent={(
          <Typography align="center" className={classes.primarySubTitle}>
            {item.primarySubTitle}
          </Typography>
        )}
      />
      <ConditionalRender
        condition={Boolean(item.secondaryImage)}
        truthyComponent={(
          <Typography align="center" className={classes.secondaryImage}>
            <Image source={item.secondaryImage} draggable={false} />
          </Typography>
        )}
      />
      <ConditionalRender
        condition={Boolean(item.primaryImage)}
        truthyComponent={(
          <Typography align="center" className={classes.primaryImage}>
            <Image source={item.primaryImage} draggable={false} />
          </Typography>
        )}
      />
      <Box className={classes.description}>
        <ConditionalRender
          condition={Boolean(item.secondaryTitle)}
          truthyComponent={(
            <Typography align="left" className={classes.secondaryTitle}>
              {item.secondaryTitle}
            </Typography>
          )}
        />
        <ConditionalRender
          condition={Boolean(item.secondarySubTitle)}
          truthyComponent={(
            <Typography align="left" className={classes.secondarySubTitle}>
              {item.secondarySubTitle}
            </Typography>
          )}
        />
      </Box>
    </div>
  );
};

CarouselItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default CarouselItem;
