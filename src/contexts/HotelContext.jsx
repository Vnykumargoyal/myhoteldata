/* eslint-disable import/no-cycle */
import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

import { LOGIN_FROM } from '../config/auth';

const HotelContext = createContext();

const HotelContextWrapper = ({ children }) => {
  const [data, setData] = useState({});
  const [loggedFrom, setLoggedFrom] = useState(LOGIN_FROM.BROWSER);
  const updateContext = (dataToAdd) => {
    setData((currentData) => ({ ...currentData, ...dataToAdd }));
  };
  const [increaseCreditProof, setIncreaseCreditProof] = useState({});
  const clearContext = () => {
    setData({});
  };
  // TODO removed code

  return (
    <HotelContext.Provider
      value={{
        data,
        updateContext,
        setData,
        clearContext,
        loggedFrom,
        setLoggedFrom,
        setIncreaseCreditProof,
        increaseCreditProof,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

HotelContextWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export { HotelContextWrapper };
export default HotelContext;
