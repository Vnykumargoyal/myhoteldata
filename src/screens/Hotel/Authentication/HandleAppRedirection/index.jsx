/* eslint-disable camelcase, react-hooks/exhaustive-deps */
import queryString from 'query-string';
import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import { useHistory } from 'react-router-dom';

import {
  EVENTS,
  generateFetchCJPPayload,
  generateCreateCJPPayload,
  generateConfigMasterPayload,
  generateFetchCJPListPayload,
  generateFetchEligibilityPayload
} from '../utils/helpers';
import {
  handleCreateCJPResponse,
  handleFetchCJPListResponse,
  handleFetchCJPResponse,
  handleFetchEligibilityResponse
} from '../utils/apiHandlers';
import useCRUD from '../../../../hooks/useCRUD';
import { API_URL } from '../../../../api/webServiceUrl';
import AuthHandler from '../../../../utils/AuthHandler';
import hideErrorPopup from '../../../../helpers/hideErrorPopup';
import { handleWebViewClose } from '../../../../helpers/appHandlers';
import CenterLoader from '../../../../components/Loader/CenterLoader';
import { CTA_LABELS, FIRST_LOGIN_NUMBER } from '../../../../constants';
import useTermLoansContext from '../../../../hooks/useTermLoansContext';
import SomethingWentWrong from '../../../../components/SomethingWentWrong';
import { AUTH_TERMLOANS_NAME, LOGIN_FROM, clearCreditStorage } from '../../../../config/auth';
import {
  customerID,
  convertToBoolean,
  pushClevertapUserLogin,
  pushLoginSuccessfullEvent
} from '../../../../helpers/functions';
import { LOGGED_IN_FROM } from '../../../../constants/eng';

const HandleAppRedirection = () => {
  const router = useHistory();
  const { signIn } = AuthHandler;
  const custID = useRef(null);
  const customEligibilityRef = useRef(false);
  const [showWarning, setShowWarning] = useState(false);
  const [custId, setCustId] = useState(null);
  const [isOfferValid, setIsOfferValid] = useState(null);
  const LOS_SERVICE = process.env.REACT_APP_LOS_SERVICE_API;
  const {
    data: {
      stage,
      externalID,
      mobileNumber,
      referralCodeValue,
    },
    data,
    clearContext,
    setLoggedFrom,
    updateContext,
  } = useTermLoansContext();
  const { key, rkey, mobile } = queryString.parse(router.location.search);

  const [getConfigMaster, masterResponse] = useCRUD({
    type: 'create',
    url: API_URL.getConfigMaster,
  });

  const [fetchCJPList, fetchCJPListResponse] = useCRUD({
    type: 'create',
    url: API_URL.fetchActive,
  });

  const [fetchCJP, fetchCJPResponse] = useCRUD({
    type: 'create',
    url: `${LOS_SERVICE}${custID.current}/fetchcjp`,
  });

  const [fetchEligibility, eligibilityResponse] = useCRUD({
    type: 'read',
    url: API_URL.fetchEligibilityForTermLoan,
  });

  const [createCJP, createCJPResponse, creatingJourney] = useCRUD({
    type: 'create',
    url: API_URL.customerJourney,
  });

  const [saveEvent, eventResponse] = useCRUD({ type: 'create', url: API_URL.saveEvent });

  useEffect(() => {
    if (eventResponse) hideErrorPopup(updateContext);
  }, [eventResponse]);

  const callCreateCJPAPI = useCallback((updatedData) => {
    if (!creatingJourney) {
      createCJP({ data: generateCreateCJPPayload({ ...data, ...updatedData }, {}) });
    }
  }, [createCJP, data, creatingJourney]);

  const onSuccessfulLogin = useCallback(() => {
    const firstLoginNumber = convertToBoolean(sessionStorage.getItem(FIRST_LOGIN_NUMBER));
    if (firstLoginNumber) {
      saveEvent({ data: { event: EVENTS.LOGGEDIN, mobileNumber, productType: 'TermLoan' } });
    }
    sessionStorage.removeItem(FIRST_LOGIN_NUMBER);
    pushLoginSuccessfullEvent(LOGIN_FROM.APP);
  }, [saveEvent, mobileNumber]);

  const showError = () => {
    hideErrorPopup(updateContext);
    clearCreditStorage();
    clearContext();
    setShowWarning(true);
  };

  const handleLogout = useCallback(() => {
    setShowWarning(false);
    clearCreditStorage();
    handleWebViewClose();
  }, [setShowWarning]);

  const updateDataAndStage = useCallback((updatedData = {}) => {
    updateContext({
      ...updatedData,
      stage: { ...stage, previousStageId: -1 },
    });
  }, [stage]);

  const onEligible = useCallback((updatedData) => {
    onSuccessfulLogin();
    callCreateCJPAPI(updatedData);
  }, [onSuccessfulLogin, callCreateCJPAPI]);

  const routeUserTo = useCallback((path) => router.replace(path), []);

  const onJourneyFound = useCallback((customerJourneyId, isValidOffer) => {
    setIsOfferValid(isValidOffer);
    setCustId(customerJourneyId);
    updateContext({ customerJourneyId, isOfferValid, stage: { ...stage, previousStageId: -1 } });
    custID.current = customerJourneyId;
  }, [stage]);

  const callFetchCJPAPI = useCallback(() => {
    const id = customerID();
    if (id && custID?.current) {
      fetchCJP(generateFetchCJPPayload(isOfferValid, referralCodeValue));
    }
  }, [isOfferValid, referralCodeValue]);

  useEffect(() => {
    callFetchCJPAPI();
  }, [custId, isOfferValid]);

  const callFetcEligibilityAPI = useCallback(() => {
    fetchEligibility(generateFetchEligibilityPayload(externalID, mobileNumber));
  }, [fetchEligibility, externalID, mobileNumber]);

  useEffect(() => {
    if (key) {
      sessionStorage.setItem(LOGGED_IN_FROM, LOGIN_FROM.APP);
      setLoggedFrom(LOGIN_FROM.APP);
      const tokens = { access_token: key, refresh_token: rkey };
      pushClevertapUserLogin(mobile);
      signIn(AUTH_TERMLOANS_NAME, tokens);
      updateContext({ ...tokens, mobileNumber: mobile });
      getConfigMaster(generateConfigMasterPayload());
    }
  }, [key, rkey, mobile, setLoggedFrom, getConfigMaster]);

  useEffect(() => {
    if (data.access_token && customEligibilityRef.current) {
      fetchCJPList(generateFetchCJPListPayload());
      customEligibilityRef.current = false;
    }
  }, [data, fetchCJPList]);

  useEffect(() => {
    if (masterResponse) {
      updateContext({ masterConfigData: masterResponse });
      customEligibilityRef.current = true;
    }
  }, [masterResponse]);

  useEffect(() => {
    handleFetchCJPListResponse(
      fetchCJPListResponse,
      onJourneyFound,
      callFetcEligibilityAPI,
      showError
    );
  }, [fetchCJPListResponse]);

  useEffect(() => {
    handleFetchCJPResponse(
      fetchCJPResponse,
      updateContext,
      router,
      onSuccessfulLogin
    );
  }, [fetchCJPResponse, onSuccessfulLogin]);

  useEffect(() => {
    handleFetchEligibilityResponse(
      eligibilityResponse,
      updateDataAndStage,
      onEligible,
      routeUserTo,
      showError
    );
  }, [eligibilityResponse, onEligible, routeUserTo]);

  useEffect(() => {
    handleCreateCJPResponse(
      createCJPResponse,
      updateDataAndStage,
      routeUserTo,
      showError
    );
  }, [createCJPResponse, routeUserTo]);

  if (showWarning) {
    return (
      <SomethingWentWrong
        buttonLabel={CTA_LABELS.GOT_IT}
        open={showWarning}
        setOpen={handleLogout}
      />
    );
  }
  return <CenterLoader />;
};

export default HandleAppRedirection;
