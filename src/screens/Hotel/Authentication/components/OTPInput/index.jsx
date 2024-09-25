import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Divider, Grid, Typography } from '@material-ui/core';
import clsx from 'clsx';

import useStyles from '../../styles';
import BasicInput from '../../../../../components/BasicInput';
import { handleOTPInputChange } from '../../utils/helpers';
import { CLASSES } from '../../../../../constants';
import { isInvalidOTP } from '../../../../../helpers/utils';
import ConditionalRender from '../../../../../components/ConditionalRender';

const OTPInput = ({
  value,
  setValue,
  onSubmit,
  errorFromApi,
  setErrorFromApi,
  minLength,
  maxLength,
}) => {
  const classes = useStyles();
  const [error, setError] = useState('');

  useEffect(() => {
    if (errorFromApi) {
      setError(errorFromApi);
    }
  }, [errorFromApi]);

  const handleChange = (e) => handleOTPInputChange(e, setValue, setError, setErrorFromApi);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const err = isInvalidOTP(value);
    if (err) {
      setError(err);
    } else {
      onSubmit();
    }
  };

  return (
    <Grid container>
      <Grid item xs>
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" className={classes.mobileInput}>
            <BasicInput
              className={clsx(classes.input, classes.otpInput)}
              onChange={handleChange}
              maxLength={maxLength}
              minLength={minLength}
              pattern="(/d{6}+"
              inputMode="numeric"
              value={value}
              autoFocus
            />
          </Typography>
        </form>
        <Divider className={error && CLASSES.ERROR} />
        <ConditionalRender
          condition={Boolean(error)}
          truthyComponent={(
            <Typography color="error" className={classes.inputError}>
              {error}
            </Typography>
          )}
        />
      </Grid>
    </Grid>
  );
};

OTPInput.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errorFromApi: PropTypes.string.isRequired,
  setErrorFromApi: PropTypes.func.isRequired,
  minLength: PropTypes.string.isRequired,
  maxLength: PropTypes.string.isRequired,
};

export default OTPInput;
