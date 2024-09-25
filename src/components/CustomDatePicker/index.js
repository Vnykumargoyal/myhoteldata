/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { Icon } from '@material-ui/core';
import clsx from 'clsx';

// import './date-picker.css';
import useBreakpoints from '../../hooks/useBreakpoints';
import CustomInput from '../CustomInput';
import IMAGE_URLS from '../../constants/images';
import { INPUT_CONSTANTS } from '../../constants';

const styleClass = 'ff-indivisible fs-16 fw-600 fw-sm-600 fs-sm-14 pan-datePicker col-text-primary w-100 borderStyle p-5';

const CustomDatePicker = ({
  label,
  labelMargin,
  name,
  value,
  error,
  onChange,
  onBlur,
  isDOBField,
  placeholder,
  openTo,
  format,
  minDate,
  maxDate,
  views,
}) => {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const { downSm } = useBreakpoints();

  const handleClose = () => {
    setCalendarOpen(false);
  };

  const handleChange = (date) => {
    let dateToBeSet = '';
    let dobError = '';
    if (date) {
      dateToBeSet = date.format('YYYY-MM-DD');
      if (moment(dateToBeSet).isValid()) {
        const age = moment().diff(dateToBeSet, 'years');
        if (age < 18) {
          dobError = 'Only valid for people aged 18 years and above';
        }
        if (age > 65) {
          dobError = 'Max Age Allowed is 65';
        }
      }
    }
    onChange(dateToBeSet, dobError);
  };

  const handleBlur = () => {
    let dobError = '';
    if (!value || value === 'Invalid date') {
      dobError = 'Enter valid Date of Birth';
    } else if (error) {
      dobError = error;
    } else {
      dobError = '';
    }
    onBlur(dobError);
  };

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <CustomInput
        label={label}
        labelMargin={labelMargin}
        error={error}
        value={value}
        name={name}
        downScreen={downSm}
      >
        <KeyboardDatePicker
          disableFuture={true}
          // disableFuture
          label={label}
          placeholder={placeholder}
          openTo={openTo}
          fullWidth
          variant="filled"
          name={name}
          format={format}
          hiddenLabel
          error={error}
          minDate={minDate}
          maxDate={maxDate}
          onAccept={handleClose}
          onClose={handleClose}
          autoComplete="off"
          open={calendarOpen}
          views={views}
          value={value}
          onChange={handleChange}
          maskChar=" "
          onBlur={handleBlur}
          InputProps={{
            autoComplete: 'off',
            className: clsx(styleClass, error && 'Mui-error fs-14 fw-600'),
            readOnly: false,
          }}
          className={clsx('pan-date-picker')}
          keyboardIcon={(
            <Icon onClick={() => setCalendarOpen(true)} color="primary" className="demo">
              <img src={IMAGE_URLS.ICONS.CALENDAR} alt="icon" className="mb-20" />
            </Icon>
          )}
          KeyboardButtonProps={{
            className: clsx('calendarIcon'),
            disableRipple: true,
          }}
          okLabel="OK"
          cancelLabel="CANCEL"
          aria-errormessage=""
          invalidDateMessage=""
          minDateMessage=""
          maxDateMessage=""
        />
      </CustomInput>
    </MuiPickersUtilsProvider>
  );
};

CustomDatePicker.propTypes = {
  label: PropTypes.string,
  labelMargin: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  isDOBField: PropTypes.bool,
  placeholder: PropTypes.string,
  openTo: PropTypes.string,
  format: PropTypes.string,
  minDate: PropTypes.string,
  maxDate: PropTypes.object,
  views: PropTypes.arrayOf(PropTypes.string),
};

CustomDatePicker.defaultProps = {
  label: INPUT_CONSTANTS.DOB,
  labelMargin: '30px',
  isDOBField: true,
  placeholder: 'DD/MM/YYYY',
  openTo: 'year',
  name: 'DOB',
  format: 'DD/MM/YYYY',
  // minDate: moment().subtract(67, 'years').add(1, 'day'),
  maxDate: moment().subtract(18, 'years'),
  views: ['year', 'month', 'date'],
  onBlur: () => {},
  value: '',
};

export default CustomDatePicker;
