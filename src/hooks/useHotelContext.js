/* eslint-disable import/no-cycle */
import { useContext } from 'react';

import HotelContext from '../contexts/HotelContext';

const useHotelContext = () => useContext(HotelContext);

export default useHotelContext;
