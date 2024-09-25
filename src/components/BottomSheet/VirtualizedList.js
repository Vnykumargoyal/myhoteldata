/* eslint-disable react/prop-types */
import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const useStyles = makeStyles({
  scroll: {
    overflowY: 'scroll',
    height: ({ height }) => height,
    minHeight: ({ itemHeight }) => `${itemHeight * 4}px`,
  },
  inner: {
    position: 'relative',
    height: ({ innerHeight }) => `${innerHeight}px`,
    marginBottom: ({ marginBottom }) => marginBottom,
  },
});

const VirtualizedList = (props) => {
  const {
    numItems,
    itemHeight,
    height,
    renderItem,
    windowHeight,
    scrollTo,
    marginBottom,
    scrollClass,
  } = props;
  const [scrollTop, setScrollTop] = useState(0);
  const innerHeight = numItems * itemHeight;
  const classes = useStyles({
    height,
    innerHeight,
    marginBottom,
    itemHeight,
  });
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    numItems - 1, // don't render past the end of the list
    Math.floor((scrollTop + windowHeight) / itemHeight)
  );

  useEffect(() => {
    if (scrollTo > 0) {
      setScrollTop(scrollTo);
      document.querySelector('#scroll')?.scrollTo(0, scrollTo);
    } else {
      setScrollTop(0);
      document.querySelector('#scroll')?.scrollTo(0, scrollTo);
    }
  }, [scrollTo]);

  const items = [];
  for (let i = startIndex; i <= endIndex; i += 1) {
    items.push(
      renderItem({
        index: i,
        style: {
          position: 'absolute',
          top: `${i * itemHeight}px`,
          width: '100%',
        },
      })
    );
  }

  const onScroll = (e) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div id="scroll" className={clsx(classes.scroll, scrollClass)} onScroll={onScroll}>
      <div className={classes.inner}>
        {items}
      </div>
    </div>
  );
};

VirtualizedList.propTypes = {
  numItems: PropTypes.number.isRequired,
  itemHeight: PropTypes.number.isRequired,
  height: PropTypes.string,
  marginBottom: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  renderItem: PropTypes.any.isRequired,
  windowHeight: PropTypes.number.isRequired,
  scrollClass: PropTypes.string,
};

VirtualizedList.defaultProps = {
  height: '400px',
  marginBottom: '0',
  scrollClass: '',
};

export default VirtualizedList;
