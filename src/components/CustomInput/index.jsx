/* eslint-disable no-unused-vars */
import React from 'react';
import {
  FormHelperText,
  FormControl,
  Input,
  InputAdornment,
  Icon,
  Box,
  TextField,
  Typography
} from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import BasicError from '../BasicError';
import useStyles from './style';
// import Image from '../Image';
import IMAGE_URLS from '../../constants/images';
// import { ALT_CONSTANTS } from '../../constants';
import { getID } from '../../helpers/functions';
import ConditionalRender from '../ConditionalRender';
import { CTA_LABELS } from '../../constants';
import { ALT_CONSTANTS } from '../../constants/eng';
import Image from '../Image';
// prettier-ignore

const EndAdornment = ({ isVerified, endAdornment }) => (
  <ConditionalRender
    condition={isVerified}
    truthyComponent={(
      <InputAdornment position="end">
        <Icon>
          <Image source={IMAGE_URLS.ICONS.VERIFIED} />
        </Icon>
      </InputAdornment>
    )}
    falsyComponent={endAdornment}
  />
);

const CustomInput = ({
  handleChange,
  handleBlur,
  error,
  value,
  label,
  placeholder,
  margin,
  disabled,
  name,
  maxLength,
  autoFocus,
  children,
  endAdornment,
  startAdornment,
  classname,
  disableEndAdornment,
  lowerStyle,
  autoComplete,
  readOnlyValue,
  type,
  hideError,
  focuse
}) => {
  const isError = Boolean(error);
  const classes = useStyles({ lowerStyle, isError });

  return (
    <FormControl style={{ marginTop: margin }} className={classes.cont}>

      {children || (
        <TextField
          type={type}
          label={label}
          id={`${name}_field`}
          onChange={handleChange}
          autoComplete={autoComplete}
          error={isError}
          placeholder={placeholder}
          disabled={disabled}
          onBlur={handleBlur}
          name={name}
          autoFocus={autoFocus}
          variant="filled"
          value={value}
          fullWidth="true"
          InputProps={{
            startAdornment: startAdornment && (
              <InputAdornment position="start" className={classes.iconStartCont}>
                {startAdornment}
              </InputAdornment>
            ),
            endAdornment: endAdornment && !disableEndAdornment ? (
              <InputAdornment position="end">
                <div className={classes.iconContainer}>
                  <Image
                    source={IMAGE_URLS.ICONS.DOWN_ICON}
                    alt={ALT_CONSTANTS.I_ICON}
                    name={name}
                    onClick={(e) => handleChange(e, label, name)}
                    height={15}
                    width={15}
                  />
                </div>
              </InputAdornment>
            ) : (
              <InputAdornment position="end">
                {endAdornment}
              </InputAdornment>
            ),
            readOnly: readOnlyValue,
            className: clsx(classes.inputStyle,classes.customFilledInput, classname, disabled && classes.disabledClass),
            maxLength,
          }}
        />
      )}

      {error && (
        <Box mt={1}>
          <BasicError hideError={hideError} error={error} />
        </Box>
      )}
    </FormControl>
  );
};


CustomInput.propTypes = {
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  error: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  margin: PropTypes.string,
  inputMargin: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  downScreen: PropTypes.bool,
  classname: PropTypes.string,
  maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  endAdornment: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  startAdornment: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  disableEndAdornment: PropTypes.bool,
  lowerStyle: PropTypes.bool,
  autoComplete: PropTypes.string,
  readOnlyValue: PropTypes.bool,
  isVerified: PropTypes.bool,
  type: PropTypes.string,
  hideError: PropTypes.bool,
  focuse: PropTypes.bool,
};

EndAdornment.propTypes = {
  isVerified: PropTypes.bool,
  endAdornment: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

EndAdornment.defaultProps = {
  isVerified: false,
  endAdornment: null,
};

CustomInput.defaultProps = {
  disabled: false,
  autoFocus: false,
  placeholder: '',
  margin: '10px',
  inputMargin: '0px',
  children: '',
  error: '',
  value: '',
  maxLength: '',
  handleChange: () => { },
  handleBlur: () => { },
  downScreen: false,
  endAdornment: null,
  startAdornment: null,
  name: '',
  classname: '',
  disableEndAdornment: false,
  lowerStyle: false,
  autoComplete: 'off',
  readOnlyValue: false,
  isVerified: false,
  type: 'text',
  hideError: false,
  focuse: false,
};

export default CustomInput;
