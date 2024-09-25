/* eslint-disable no-confusing-arrow */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-extra-boolean-cast */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  FormControlLabel,
  RadioGroup,
  Typography
} from '@material-ui/core';
import clsx from 'clsx';

import useStyles from './style';
import CustomInput from '../CustomInput';
import BasicRadioButton from '../BasicRadioButton';
import ConditionalRender from '../ConditionalRender';
// import useBreakpoints from '../../hooks/useBreakpoints';

const CustomRadioGroup = ({
  options,
  lable,
  name,
  handleChange,
  value,
  inputMargin,
  disabled = false,
  className,
}) => {
  const classes = useStyles();
  // const { downSm } = useBreakpoints();
  return (
    <ConditionalRender
      condition={Boolean(options?.length)}
      truthyComponent={(
        <Box mt={3}>
          <CustomInput label={lable} margin={inputMargin}>
            <RadioGroup
              row
              name={name}
              onChange={(e) => handleChange(e.target.value, e.target.name)}
              className={clsx(classes.inputStyle)}
              value={value}
            >
              <div className={className}>
                {options?.map((item) => (
                  <FormControlLabel
                    key={item}
                    value={item}
                    control={<BasicRadioButton size="small" />}
                    label={(
                      <div className={
                        clsx(classes.labelContainer, item === value && classes.active)
                        }
                      >
                        <Typography
                          variant="caption"
                          className={clsx(classes.inputStyle, item === value && classes.active)}
                        >
                          {item}
                        </Typography>
                      </div>
                    )}
                    labelPlacement="end"
                    disabled={disabled}
                  />
                ))}
              </div>
            </RadioGroup>
          </CustomInput>
        </Box>
      )}
    />
  );
};

CustomRadioGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  lable: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  inputMargin: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.bool,
};

CustomRadioGroup.defaultProps = {
  inputMargin: '',
  disabled: false,
  value: '',
  options: [],
  className: 'flex flex-dir-row',
};

export default CustomRadioGroup;
