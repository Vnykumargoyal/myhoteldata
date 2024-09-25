/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import React, { Suspense, useEffect } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import {
  BrowserRouter as Router,
  Switch,
  Route
  // useHistory
} from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import moment from 'moment';
import { includes } from 'lodash';

import { routes } from './constant';
import {
  AUTH_HOTEL_CALL_JWT_MINUTES,
  AUTH_HOTEL_NAME,
  DISABLE_REFRESH_TOKEN,
  INACTIVITY_TIMEOUT_DURATION,
  WHITELIST_PAGES
} from '../config/auth';
import NetworkDetector from '../hoc/NetworkDetector';
import PineLoader from '../components/PineLoader';
import ProtectedRoutes from './ProtectedRoutes';
import AuthHandler from '../utils/AuthHandler';
import useHotelContext from '../hooks/useHotelContext';
import { API_URL } from '../api/webServiceUrl';
import { WHITELIST_LEAVESITE_POPUP } from '../config';
import { LOCAL_STORAGE_HOTEL_ON_UNLOAD } from '../constants';
// import HandleAppRedirection from '../screens/Hotel/Authentication/HandleAppRedirection';
import ToBeReleased from '../components/ToBeReleased';
import Authentication from '../screens/Hotel/Authentication';
import StartApp from '../screens/Hotel/StartApp';
import Login from '../screens/Hotel/Login';
import Registration from '../screens/Hotel/Registration';
import OTPScreen from '../screens/Hotel/OTPScreen';
import HotelLocation from '../screens/Hotel/HotelLocation';
import AddHotelAddress from '../screens/Hotel/AddHotelAddress';
import AddHotelDetails from '../screens/Hotel/AddHotelDetails';
import AddRoomDetails from '../screens/Hotel/AddRoomDetails';
import AddFoodDetails from '../screens/Hotel/AddFoodDetails';
import AddEmployeeDetails from '../screens/Hotel/AddEmployeeDetails';
import MyBusinessDetails from '../screens/Hotel/MyBusinessDetails';
import TotalRevenue from '../screens/Hotel/TotalRevenue';
import TotalExpense from '../screens/Hotel/TotalExpense';
import TotalProfit from '../screens/Hotel/TotalProfit';
// import AmberReject from '../screens/TermLoans/AmberFlow/AmberReject';

const HotelInfoRoutes = () => {
  const {
    data,
    loggedFrom,
    updateContext,
    setLoggedFrom,
  } = useHotelContext();
  const { authCheck, signIn } = AuthHandler;
  const router = useHistory();
  const onIdle = () => {
    if (includes(WHITELIST_PAGES, router?.location?.pathname)) return false;
    router.replace(routes.auth.logout);
  };
  const onActive = () => {};

  useEffect(() => {
    const hotelContext = sessionStorage.getItem(
      LOCAL_STORAGE_HOTEL_ON_UNLOAD
    );
    const hotelContextData = JSON.parse(hotelContext);
    if (router?.location?.pathname !== routes.auth.login) {
      updateContext(hotelContextData?.data);
    }
    if (hotelContextData?.loggedFrom) setLoggedFrom(hotelContextData.loggedFrom);
    sessionStorage.removeItem(LOCAL_STORAGE_HOTEL_ON_UNLOAD);
  }, []);

  useEffect(() => {
    if (!WHITELIST_LEAVESITE_POPUP.includes(router?.location?.pathname)) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = null;
    }
  }, [router?.location]);

  window.addEventListener('unload', () => {
    sessionStorage.setItem(
      LOCAL_STORAGE_HOTEL_ON_UNLOAD,
      JSON.stringify({ data, loggedFrom })
    );
  });

  const prolongationJWT = () => () => {
    // eslint-disable-next-line max-len
    if (includes(WHITELIST_PAGES, router?.location?.pathname)) return false; // return if this page is whitelist for silent jwt
    const url = API_URL.refreshToken;
    const refreshToken = authCheck()?.refresh_token;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${refreshToken}`);
    // console.info('[prolongationJWT refreshToken]:', refreshToken);
    // TODO:  fetch bearer token from here.
    const options = {
      method: 'POST',
      headers,
    };
    fetch(url, options)
      .then((response) => response.json())
      .then((res) => {
        if (res?.data?.access_token) {
          updateContext({
            ...res.data,
          });
          signIn(AUTH_HOTEL_NAME, res.data);
        } else {
          // eslint-disable-next-line no-unused-expressions
          !DISABLE_REFRESH_TOKEN && router.replace(routes.auth.logout);
          // if refresh token is enable then it will logout
          // user as soon as it recevies non 200 response
        }
      })
      // eslint-disable-next-line no-console
      .catch((e) => console.log('error when refreshing auth', e));
  };

  const onAction = () => {
    // const expireTime = data?.otp_expiry_time;
    const GET_AUTH_TOKEN = authCheck()?.access_token;
    if (GET_AUTH_TOKEN) {
      const payload = GET_AUTH_TOKEN.split('.')[1]; // payload
      const getBase64Value = JSON.parse(atob(payload));
      const currentDate = moment(new Date());
      const expDate = moment(new Date(getBase64Value.exp * 1000));
      // // force logout if jwt exp time is less than now()
      if (expDate.valueOf() < new Date().valueOf()) {
        router?.replace(routes.auth.logout);
      }
      const expiresInMin = expDate.diff(currentDate, 'minutes');
      if (getBase64Value && expiresInMin < AUTH_HOTEL_CALL_JWT_MINUTES) {
        // eslint-disable-next-line no-unused-expressions
        prolongationJWT('checkAuth')();
      }
    }
  };

  // onAction();
  // handleOnAction(data?.otp_expiry_time);
  useIdleTimer({
    onIdle,
    onActive,
    timeout: INACTIVITY_TIMEOUT_DURATION,
    debounce: 900,
    onAction,
  });

  return (
    <Suspense fallback={<PineLoader />}>
      <Switch>
        <Route
          exact
          path={routes.auth.statApp}
          component={StartApp}
        />
        <Route
          exact
          path={routes.auth.login}
          component={Login}
          // component={AmberBankStateMent}
        />
        <Route
          exact
          path={routes.auth.registration}
          component={Registration}
          // component={AmberBankStateMent}
        />
         <Route
          exact
          path={routes.auth.otp}
          component={OTPScreen}
          // component={AmberBankStateMent}
        />
        <Route
          exact
          path={routes.auth.hotelLocation}
          component={HotelLocation}
          // component={AmberBankStateMent}
        />
        <Route
          exact
          path={routes.auth.hotelAddress}
          component={AddHotelAddress}
          // component={AmberBankStateMent}
        />
        <Route
          exact
          path={routes.hotel.addDetails}
          component={AddHotelDetails}
          // component={AmberBankStateMent}
        />
        <Route
          exact
          path={routes.hotel.addRoom}
          component={AddRoomDetails}
          // component={AmberBankStateMent}
        />
        <Route
          exact
          path={routes.hotel.addFood}
          component={AddFoodDetails}
          // component={AmberBankStateMent}
        />
        <Route
          exact
          path={routes.hotel.addEmployee}
          component={AddEmployeeDetails}
          // component={AmberBankStateMent}
        />
        <Route
          exact
          path={routes.hotel.businessDetails}
          component={MyBusinessDetails}
          // component={AmberBankStateMent}
        />

        <Route
          exact
          path={routes.hotel.totalRevenue}
          component={TotalRevenue}
          // component={AmberBankStateMent}
        />

        <Route
          exact
          path={routes.hotel.totalExpense}
          component={TotalExpense}
          // component={AmberBankStateMent}
        />
        <Route
          exact
          path={routes.hotel.totalProfit}
          component={TotalProfit}
          // component={AmberBankStateMent}
        />
       
        {/* <Route
          exact
          path={routes.auth.logout}
          component={Logout}
        />
        <Route
          exact
          path={routes.errorPageCode}
          component={ErrorPage}
        /> */}
        
      </Switch>
    </Suspense>
  );
};

export default NetworkDetector(HotelInfoRoutes);
