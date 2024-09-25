/* eslint-disable no-confusing-arrow */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import {
  Box,
  Container
} from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import useStyles from './style';
import Button from '../Button';
import { CTA_LABELS, INPUT_CONSTANTS } from '../../constants';
import Header from './Header';
import ConditionalRender from '../ConditionalRender';
import RenderItems from './RenderItems';
import SearchBarBottomSheet from '../SearchBarBottomSheet';
import BottomSheetNoDataFound from '../BottomSheetNoDataFound';
import useBreakpoints from '../../hooks/useBreakpoints';

const BottomSheet = ({
  open,
  setOpen,
  data,
  name,
  value,
  onChange,
  title,
  searchBarShow = false,
  disableButton = false,
  children,
  containerScroll,
  placeholder,
  subTitel,
}) => {
  const { downSm } = useBreakpoints();
  const classes = useStyles({
    open,
    downSm,
    searchBarShow,
    containerScroll,
  });
  const [searchValue, setSearchValue] = useState('');
  const [scrollTo, setScrollTo] = useState(0);
  const handleChange = (valuedata) => {
    setSearchValue(valuedata);
    // const index = data?.findIndex((ele) => ele.label.toLowerCase().startsWith(valuedata.toLowerCase()));
    // if (index > 0) {
    //   setScrollTo(index * 100);
    // } else {
    //   setScrollTo(0);
    // }
  };
  const dataSet = data.filter(
    (item) => item?.label?.toLowerCase()?.startsWith(searchValue?.toLowerCase())
  );
  const handleClose = () => { setOpen(false); setSearchValue(''); };
  const stopPropagation = (e) => e.stopPropagation();
  return (
    <div className={clsx('modal', classes.modal)} onClick={handleClose}>
      <div className={classes.bottomSheetContainer} onClick={stopPropagation} id={name}>
        <Header title={title} subTitel={subTitel} />
        <Container className={classes.containerWrapper}>
          <Box>
            <ConditionalRender
              condition={searchBarShow}
              truthyComponent={(
                <SearchBarBottomSheet
                  placeholder={placeholder}
                  handleChange={handleChange}
                  searchValue={searchValue}
                />
              )}
            />
            {/* className={classes.height} */}
            {children || (
              <div className={classes.height}>
                <ConditionalRender
                  condition={(title?.toLowerCase()?.includes('pin code'))}
                  truthyComponent={(
                    <div className={classes.containerSpacing}>
                      <RenderItems
                        data={dataSet}
                        name={name}
                        value={value}
                        onChange={onChange}
                        setOpen={setOpen}
                        handleClose={handleClose}
                        setSearchValue={setSearchValue}
                        // scrollTo={scrollTo}
                      />
                      <BottomSheetNoDataFound data={dataSet} />
                    </div>
                  )}
                  falsyComponent={(
                    <RenderItems
                      data={dataSet}
                      name={name}
                      value={value}
                      onChange={onChange}
                      handleClose={handleClose}
                      setOpen={setOpen}
                      setSearchValue={setSearchValue}
                      // scrollTo={scrollTo}
                    />
                  )}
                />
              </div>
            )}
          </Box>
          <ConditionalRender
            condition={!disableButton}
            truthyComponent={(
              <Button
                disabled={!Boolean(value[name])}
                fullWidth
                height="40px"
                onClick={handleClose}
                label={CTA_LABELS.CONFIRM}
                className={classes.btnClass}
              />
            )}
          />
        </Container>
      </div>
    </div>
  );
};

BottomSheet.defaultProps = {
  name: '',
  searchBarShow: false,
  value: [],
  onChange: () => {},
  data: [],
  disableButton: false,
  children: '',
  containerScroll: false,
  placeholder: '',
  subTitel: '',
};
BottomSheet.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  name: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.array),
  title: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  searchBarShow: PropTypes.bool,
  disableButton: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  containerScroll: PropTypes.bool,
  placeholder: PropTypes.string,
  subTitel: PropTypes.string,
};

export default BottomSheet;
