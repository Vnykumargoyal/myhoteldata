/* eslint-disable jsx-a11y/no-autofocus */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const BasicInput = forwardRef(({
  className,
  type,
  onChange,
  maxLength,
  minLength,
  value,
  disabled,
  placeholder,
  autoFocus,
  inputMode,
  onFocus,
  onBlur,
}, ref) => (
  <input
    className={className}
    type={type}
    onChange={onChange}
    maxLength={maxLength}
    minLength={minLength}
    value={value}
    disabled={disabled}
    placeholder={placeholder}
    autoFocus={autoFocus}
    inputMode={inputMode}
    ref={ref}
    onFocus={onFocus}
    onBlur={onBlur}
  />
));

BasicInput.defaultProps = {
  className: '',
  type: 'text',
  onChange: () => {},
  maxLength: '30',
  minLength: '30',
  value: '',
  disabled: false,
  placeholder: '',
  autoFocus: false,
  inputMode: 'text',
  onFocus: () => {},
  onBlur: () => {},
};

BasicInput.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  maxLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minLength: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
  inputMode: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default BasicInput;
