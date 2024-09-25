/* eslint-disable operator-linebreak */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable */
import { useState, useCallback } from 'react';
import { useHistory, generatePath } from 'react-router-dom';

import {
  // prettier-ignore
  get,
  post,
  put,
  deleteApi
} from '../api';
import { DEFAULT_TIMEOUT } from '../config';
import {
  disableErrorMessages,
  DISABLE_WORKFLOW_REDIRECT,
  FORCE_REDIRECT_401,
  IS_ENABLE_DEV_ERRORS
} from '../config/auth';
import { CLEVERTAP_EVENTS, CONSTANTS, SOMETHING_WENT_WRONG } from '../constants';
import { getEndpointFromURL, pushClevertapEvent } from '../helpers/functions';
import { routes } from '../routes/constant';
// import { disableErrorMessages, SOMETHING_WENT_WRONG } from '../constant';
import AuthHandler from '../utils/AuthHandler';
import useHotelContext from './useHotelContext';

export default function useCRUD({
  // prettier-ignore
  url,
  type,
  multipart,
  initialValue,
  showError = true,
  timeout,
  disableCTLogging = false,
}) {
  const { data, updateContext } = useHotelContext();
  // prettier-ignore
  const getToken = () => AuthHandler.authCheck()?.access_token || data.access_token;
  const [response, setResponse] = useState(initialValue || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useHistory();

  const sendCTEventIfError = useCallback((actualResponse) => {
    if (actualResponse && !disableCTLogging) {
      // eslint-disable-next-line object-curly-newline
      const { status, statusCode, statusText, data } = actualResponse;
      const isStatusCodeNot200 =
        statusCode !== undefined && statusCode !== 200 && statusCode !== 201 && statusCode !== 204;
      const isStatusNot200 =
        status !== undefined && status !== 200 && status !== 201 && status !== 204;
      const message = data && data?.error && data?.error?.length > 0
        ? data?.error[0]?.message : CONSTANTS.SOMETHING_WENT_WRONG;
      const errType = data && data?.error && data?.error?.length > 0
        ? data?.error[0]?.type : CONSTANTS.SOMETHING_WENT_WRONG;
      // Pushing Clevertap event on failing of any API
      if (isStatusNot200 || statusText || isStatusCodeNot200) {
        const endpoint = getEndpointFromURL(url);
        pushClevertapEvent(CLEVERTAP_EVENTS.COMMON.API_FAILURE, {
          api: endpoint,
          status: status || statusCode,
          message: message || statusText,
          errorType: errType,
          screenName: router.location.pathname === routes.auth.login ? '/login' : router.location.pathname,
        });
      }
    }
  }, [url, disableCTLogging]);

  const redirectToErrorPage = (errorCode) => {
    if (errorCode === 404 || errorCode === 50) {
      updateContext({ msgSnackbar: '' });
      router.push(generatePath(routes.errorPageCode, { errorCode }));
    }
  };

  const handleErrors = (res, is500 = false) => {
    if (res?.status === 200) {
      updateContext({
        msgSnackbar: '',
      });
    }
    // eslint-disable-next-line no-param-reassign
    if (res?.response) res = res?.response;
    // TODO: Check 401 redirect`
    if (res?.data?.error?.message) {
      setError(res?.data?.error?.message)
    }
    if (FORCE_REDIRECT_401 && res?.status === 401) {
      router.replace(routes.auth.logout);
    }
    sendCTEventIfError(res);
    if (res?.status === 400 || res?.status === 504
      || res?.code || res?.status === 500 || !res?.data?.success) {
      // setError(res?.error?.message || res.statusText);
      if (res?.status === 400 || res?.status === 500) {
        updateContext({ msgSnackbar: SOMETHING_WENT_WRONG });
      }
      if (res?.status === 504 || res?.code) {
        setLoading(false);
        const TIMEOUT = timeout || DEFAULT_TIMEOUT;
        updateContext({ msgSnackbar: `timeout of ${TIMEOUT / 1000}s exceeded` });
      }
    }
    if (res?.status === 204) {
      updateContext({
        msgSnackbar: '',
        stage: {
          ...data?.stage,
          previousStageId: -1,
        },
      });
      router.replace(routes.redirect);
    }
    // only redirect if user is not on the same page, other it will create loop
    // if (
    //   !DISABLE_WORKFLOW_REDIRECT &&
    //   res?.status === 403
    //   && data.stageId !==
    //     URL_WORKFLOW_STATE[router.location.pathname].current
    // ) {
    //   router.replace(routes.redirect);
    // }
    if (res?.error) {
      const err = res.error;
      if (err?.message?.length > 0) {
        setError(err.message);
      }
      setLoading(false);
    }
    // if (res?.status === 400) {
    //   setError(res?.error?.message || res.statusText);
    // }

    if (is500 && IS_ENABLE_DEV_ERRORS) {
      updateContext({ snackbar: '500 occured on server' });
    }

    if (is500) {
      // changed below code to replace instead push
      router.push(
        generatePath(routes.errorPageCode, { errorCode: 500 })
      );
    }
    if (res?.status !== 200 && res?.status !== 201 && res?.status !== 204 && res?.statusText && navigator?.onLine && (!disableErrorMessages.includes(res?.statusText) || /timeout.*exceeded/.test(res?.statusText))) {
      if (/timeout.*exceeded/.test(res.statusText) || res.status === 504) {
        const TIMEOUT = timeout || DEFAULT_TIMEOUT;
        if (TIMEOUT) {
          updateContext({ msgSnackbar: `timeout of ${TIMEOUT / 1000}s exceeded` });
        } else {
          updateContext({ msgSnackbar: res?.statusText });
        }
      } else {
        updateContext({ msgSnackbar: SOMETHING_WENT_WRONG });
      }
    }

    if (res?.devErrorMessage) {
      updateContext({ devSnackbar: res?.devErrorMessage });
    } else {
      updateContext({ devSnackbar: '' });
    }

    return redirectToErrorPage(res?.status);
  };

  const op = {};
  /* Function to make read request to server for type READ */

  op.read = useCallback(
    async ({ params }) => {
      setLoading(true);
      const apiResponse = await get({
        token: getToken(),
        url,
        params,
        timeout,
      }).catch((e) => handleErrors(e, true));
      if (apiResponse && apiResponse?.data) setResponse(apiResponse.data);
      handleErrors(apiResponse);
      setLoading(false);
      if (showError) redirectToErrorPage(apiResponse?.response?.status);
    },
    [url]
  );

  /* Function to make read request to server for type CREATE */

  op.create = useCallback(
    async ({ data, token, headers }) => {
      setLoading(true);
      const apiResponse = await post({
        token: token || getToken(),
        url,
        data,
        timeout,
        headers,
      }).catch((e) => handleErrors(e, true));
      if (apiResponse && apiResponse?.data) setResponse(apiResponse.data);
      handleErrors(apiResponse);
      setLoading(false);
      if (showError) redirectToErrorPage(apiResponse?.response?.status);
    },
    [url]
  );

  /* Function to make read request to server for type UPDATE */

  op.update = useCallback(
    async ({ data, formData }) => {
      setLoading(true);
      const apiResponse = await put({
        token: getToken(),
        url,
        data,
        multipart,
        formData,
        timeout,
      }).catch((e) => handleErrors(e, true));
      if (apiResponse && apiResponse?.data) setResponse(apiResponse.data);
      handleErrors(apiResponse);
      setLoading(false);
      if (showError) redirectToErrorPage(apiResponse?.response?.status);
    },
    [multipart, url]
  );

  /* Function to make read request to server for type DELETE */

  op.delete = useCallback(
    async ({ data }) => {
      setLoading(true);
      const apiResponse = await deleteApi({
        token: getToken(),
        url,
        data,
        timeout,
      }).catch((e) => handleErrors(e, true));
      if (apiResponse) setResponse(apiResponse);
      handleErrors(apiResponse);
      setLoading(false);
      if (showError) redirectToErrorPage(apiResponse?.response?.status);
    },
    [url]
  );

  const clear = useCallback((resetValue) => {
    setResponse(resetValue);
    setError(null);
    setLoading(false);
  }, []);

  return [op[type], response, loading, error, clear];
}
