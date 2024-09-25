import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Divider, Grid, Typography } from '@material-ui/core';

import useStyles from '../../styles';
import BasicInput from '../../../../../components/BasicInput';
import { handleMobileInputChange } from '../../utils/helpers';
import { CLASSES, CONSTANTS } from '../../../../../constants';
import { isInvalidMobileNumber } from '../../../../../helpers/utils';
import ConditionalRender from '../../../../../components/ConditionalRender';

const MobileInput = ({
  value,
  setValue,
  onSubmit,
  errorFromApi,
  setErrorFromApi,
}) => {
  const classes = useStyles();
  const [error, setError] = useState('');

  const handleChange = (e) => handleMobileInputChange(e, setValue, setError, setErrorFromApi);
  useEffect(() => {
    if (errorFromApi) {
      setError(errorFromApi);
    }
  }, [errorFromApi]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const err = isInvalidMobileNumber(value);
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
            <Typography color="secondry" component="span">
              {CONSTANTS.COUNTRY_CODE}
            </Typography>
            <BasicInput
              className={classes.input}
              onChange={handleChange}
              maxLength="10"
              minLength="10"
              pattern="([6-9]/d{1}[0-9]/d{9})+"
              inputMode="numeric"
              value={value}
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

MobileInput.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errorFromApi: PropTypes.string,
  setErrorFromApi: PropTypes.func,
};

MobileInput.defaultProps = {
  errorFromApi: '',
  setErrorFromApi: () => {},
};

export default MobileInput;
