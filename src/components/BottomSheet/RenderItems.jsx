/* eslint-disable no-confusing-arrow */
/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable  max-len */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable */
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  Divider,
  Typography,
  Box,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import useStyles from './style';
// import ViewportList from "react-viewport-list";
import { Virtuoso } from 'react-virtuoso';
import BasicRadioButton from '../BasicRadioButton';
// import { FixedSizeList as List } from "react-window";
// import AutoSizer from "react-virtualized-auto-sizer";

const Row = ({ data, index, style, active }) => {
  const classes = useStyles();
  return (
    // <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
    //   Row {index}
    // </div>
    <div key={data[index].label}>
      <div className={classes.item}>
        <BasicRadioButton checked={active} size="small" />
        <div className={clsx(classes.label, active && 'col-text-primary')}>
          {data[index]?.label}
        </div>
      </div>
      <Divider className={classes.divider} />
    </div>
  );
};
const RenderItems = ({
  data,
  name,
  value,
  onChange,
  setOpen,
  setSearchValue,
  scrollTo,
  handleClose,
}) => {
  const classes = useStyles();
  const ref = useRef(null);
  // const [itemsFromServer, setItemsFromServer] = useState(data);
  // const loadMore = useCallback(() => {
  //   return setTimeout(() => {
  //     setItemsFromServer((users) => [...users, data.splice(100, data.length)])
  //   }, 200)
  // }, [setItemsFromServer])
  // const [dataSet, setDataSet] = useState(data.splice(100));
  // let dataSet = data.length > 150 ? data.splice(150) : data;
  // useEffect(() => {
  //   const timeout = loadMore()
  //   return () => clearTimeout(timeout)
  // }, [])
  // if (!itemsFromServer) {
  //   return "Loading...";
  // }
  const Footer = () => {
    return (
      <div
        style={{
          padding: '2rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        Loading...
      </div>
    );
  };
  return (
    <Box mb={1} className={classes.overflowBox}>
      <Typography className={classes.listContainer} component="div">
        <div className="list" ref={ref}>
          {/* <ViewportList
            viewportRef={ref}
            items={dataSet}
            itemMinSize={42}
            margin={16}
          >
            {(item, index) => (
              <div key={item.label}>
                <div className={classes.item} onClick={() => {
                    setSearchValue('');
                    onChange(item.value, name, item.city);
                    setOpen(true);
                  }}
                >
                  <BasicRadioButton checked={value[name] === item.value} size="small" />
                  <div className={clsx(classes.label, value[name] === item.value && 'col-text-primary')}>
                    {item?.label}
                  </div>
                </div>
                <Divider className={classes.divider} />
              </div>
            )}
          </ViewportList> */}
          {/* <VirtualizedList data={data} onScroll={handleScroll} /> */}
          <Virtuoso
            style={{ height: data?.length && '55vh', top: data?.length && '10px' }}
            data={data}
            itemContent={(index, style) => (
              <div 
                key={data[index]?.label} 
                onClick={() => {
                  setSearchValue('');
                  onChange(data[index]?.value, name, data[index]?.city);
                  setOpen(true);
                  handleClose();
                }}
              >
                <p className={classes.item}>
                  <BasicRadioButton checked={value[name] === data[index].value} size="small" />
                  <p className={clsx(classes.label, value[name] === data[index].value && 'col-text-primary')}>
                    {data[index].label}
                  </p>
                </p>
                <Divider className={classes.divider} />
              </div>
            )}
          />
        </div>
      </Typography>
    </Box>
  );
};

// Item.propTypes = {
//   hideDivider: PropTypes.bool,
//   name: PropTypes.string.isRequired,
//   onSelectBank: PropTypes.func.isRequired,
//   active: PropTypes.bool.isRequired,
//   style: PropTypes.number,
// };

// Item.defaultProps = {
//   hideDivider: false,
//   style: 0,
// };

RenderItems.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(PropTypes.array).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RenderItems;
