/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import get from 'lodash/get';
import PropTypes from 'prop-types';
import Cross from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core';
import React, {
  useRef,
  useState,
  useEffect,
  useCallback
} from 'react';

// import FormInputControl from '../FormInputControl';
import Loader from '../Loader';
import EmailsList from '../EmailsList';
import CustomInput from '../CustomInput';
import { ERRORS } from '../../constants';
import useCRUD from '../../hooks/useCRUD';
// import {  } from '../../helpers/functions';
import { API_URL } from '../../api/webServiceUrl';
import ConditionalRender from '../ConditionalRender';
import useBreakpoints from '../../hooks/useBreakpoints';
import { validateEmail, notContainsSpace } from '../../helpers/functions';
import hideErrorPopup from '../../helpers/hideErrorPopup';
import useHotelContext from '../../hooks/useHotelContext';

const useStyles = makeStyles(() => ({
  crossIcon: {
    height: '20px',
    width: '20px',
    cursor: 'pointer',
  },
}));

const EmailField = ({
  // prettier-ignore
  error,
  value,
  handleChange,
  handleBlur,
  onEmailClear,
  emailsList,
  onEmailSelect,
  name,
}) => {
  const classes = useStyles();
  const emailRef = useRef(null);
  const { updateContext } = useHotelContext();
  const { downSm } = useBreakpoints();
  const validatedEmailRef = useRef('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [emailFailureCount, setEmailFailureCount] = useState(0);
  const [validateEmailAddress, emailValidationResponse, validatingEmail] = useCRUD({
    type: 'create',
    url: API_URL.validateEmail,
    disableCTLogging: true,
  });

  const callValidateEmailAPI = useCallback((email) => {
    if (validateEmail(email)) {
      // validateEmailAddress({ data: { email }, headers: { productCode: 'TL' } });
    }
  }, [validateEmailAddress]);

  useEffect(() => {
    if (!validatedEmailRef.current && emailsList?.length) {
      callValidateEmailAPI(emailsList[0]);
    }
  }, [callValidateEmailAPI, emailsList]);

  useEffect(() => {
    setIsDisabled(emailFailureCount >= 2);
  }, [emailFailureCount]);

  useEffect(() => {
    if (emailValidationResponse) {
      const event = { target: { name, value } };
      hideErrorPopup(updateContext);
      if (emailValidationResponse.responseCode === '0') {
        const isValidEmail = get(emailValidationResponse, 'data.isValid', false);
        if (!isValidEmail) {
          if (validatedEmailRef.current) setEmailFailureCount((prev) => prev + 1);
          handleBlur(event, ERRORS.ENTER_VALID_EMAIL);
        } else {
          setEmailFailureCount(0);
          handleBlur(event, ERRORS.NO_ERROR);
        }
        validatedEmailRef.current = value;
      } else {
        handleBlur(event, ERRORS.NO_ERROR);
      }
    }
  }, [name, emailValidationResponse]);

  const handleCrossClick = () => {
    emailRef?.current?.focus();
    onEmailClear();
  };

  const handleEmailChange = (e) => {
    const { value: val } = e.target;
    if (notContainsSpace(val) || !val.length) {
      handleChange(e, val, ERRORS.NO_ERROR);
    }
  };

  const handleEmailBlur = (e) => {
    const { value: email } = e.target;
    if (!validateEmail(email)) {
      handleBlur(e, ERRORS.ENTER_VALID_EMAIL);
    } else {
      // eslint-disable-next-line no-lonely-if
      if (validatedEmailRef.current !== email) {
        validatedEmailRef.current = email;
        callValidateEmailAPI(email);
      }
    }
  };

  const handleEmailSelect = useCallback((email, index) => {
    if (!isDisabled) {
      onEmailSelect(email, index);
      if (validatedEmailRef.current !== email) {
        validatedEmailRef.current = email;
        callValidateEmailAPI(email);
      }
    }
  }, [isDisabled, callValidateEmailAPI, onEmailSelect]);

  return (
    <>
      <ConditionalRender condition={validatingEmail} truthyComponent={<Loader />} />
      <CustomInput
        label="Personal Email ID"
        error={error}
        value={value}
        name={name}
        handleChange={handleEmailChange}
        handleBlur={handleEmailBlur}
        autoComplete="off"
        ref={emailRef}
        disabled={isDisabled}
        downScreen={downSm}
        maxLength="50"
        lowerStyle
        disableEndAdornment
        endAdornment={(
          <ConditionalRender
            condition={validateEmail(value) && !isDisabled}
            truthyComponent={(
              <Cross
                className={classes.crossIcon}
                onClick={handleCrossClick}
                color="secondary"
              />
            )}
          />
        )}
      />
      <EmailsList
        selected={value}
        list={emailsList}
        onEmailSelect={handleEmailSelect}
      />
    </>
  );
};

EmailField.propTypes = {
  error: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  onEmailClear: PropTypes.func.isRequired,
  emailsList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onEmailSelect: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default EmailField;
