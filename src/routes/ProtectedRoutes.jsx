/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import {
  Route,
  Redirect,
  useHistory
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import AuthHandler from '../utils/AuthHandler';
import useHotelContext from '../hooks/useHotelContext';
import { routes } from './constant';
import { WORKFLOW } from './workflowstates';
import { WHITELIST_LEAVESITE_POPUP, skipAuthCheck } from '../config';
import { CTA_LABELS, ERRORS, LOCAL_STORAGE_HOTEL_ON_UNLOAD } from '../constants';
import { API_URL } from '../api/webServiceUrl';
import useCRUD from '../hooks/useCRUD';
import SomethingWentWrong from '../components/SomethingWentWrong';
import hideErrorPopup from '../helpers/hideErrorPopup';
import CenterLoader from '../components/Loader/CenterLoader';
import Loader from '../components/Loader';
import { getLocalStorage, updateLocalStorage } from '../utils/localStorageFunctions';
import { customerID, FirstTimeLogin } from '../helpers/functions';
import { FIRST_TIME_LOGIN } from '../config/auth';
// import { ACTIVE_LOAN_ID } from '../config/auth';

// import AuthHandler from '../util/AuthHandler';
// import {
//   DISABLE_WORKFLOW_REDIRECT,
//   skipAuthCheck,
//   WHITELIST_LEAVESITE_POPUP
// } from '../config';
const { authCheck } = AuthHandler;

const ProtectedRoutes = ({ component: Component, ...rest }) => {
  const isWorkflowLoaded = useRef(false);
  const [showWarning, setShowWarning] = useState(false);
  const [workflowCalled, setWorkflowCalled] = useState(false);
  const [loading, setLoading] = useState(true);
  const { data, updateContext } = useHotelContext();
  const router = useHistory();
  const allURLPathCode = Object.keys(WORKFLOW);
  const LOS_SERVICE = process.env.REACT_APP_LOS_SERVICE_API;
  const [fetchCJP, fetchCJPRes, fetchCJPLoading, fetchCJPErr] = useCRUD({
    type: 'create',
    url: LOS_SERVICE + (data.customerJourneyId || customerID()) + '/fetchcjp',
    // url: API_URL.fetchCJP,
  });
  useEffect(() => {
    const url = window.location.href;
    if (url.includes('logout')) {
      router.replace(routes.auth.logout);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    // setWorkflowCalled(true);
    isWorkflowLoaded.current = true;
    if (!workflowCalled) {
      const id = customerID();
      const fiestTimeLogin = FirstTimeLogin();
      if (router.location.pathname === routes.kyc.nonGst) {
        setWorkflowCalled(true);
        const workflow = 650;
        updateContext({
          stageId: workflow,
          // stage: 
        });
        return;
      } else if (router.location.pathname === routes.kyc.businessIntro) {
        setWorkflowCalled(true);
        const workflow = 691;
        updateContext({
          stageId: workflow,
        });
        return;
      } else if (router.location.pathname === routes.auth.chouseJourany) {
        setWorkflowCalled(true);
        const workflow = 7;
        updateContext({
          stageId: workflow,
        });
        return;
      } else if (router.location.pathname === routes.kyc.bankingAndGST) {
        setWorkflowCalled(true);
        const workflow = 692;
        updateContext({
          stageId: workflow,
        });
        return;
      } else if (router.location.pathname === routes.kyc.existingLoanDetails) {
        setWorkflowCalled(true);
        const workflow = 693;
        updateContext({
          stageId: workflow,
        });
        return;
      } else if (router.location.pathname === routes.amber.amberBankStatementUpload) {
        setWorkflowCalled(true);
        const workflow = 810;
        updateContext({
          stageId: workflow,
        });
        return;
      } else if (router.location.pathname === routes.kyc.incomeTax) {
        setWorkflowCalled(true);
        const workflow = 3045;
        updateContext({
          stageId: workflow,
        });
        return;
      } else if (router.location.pathname.includes('upload-documents')) {        
        setWorkflowCalled(true);
        const workflow = 650;
        updateContext({
          stageId: workflow,
        });
        return;
      } else if (data?.customerJourneyId || id) {
        fetchCJP({
          data: {
            select: {
              customer_journey: ['_all'],
            },
            isOfferValid: data?.isOfferValid ? data?.isOfferValid : false,
            firstCallAfterLogin: fiestTimeLogin === 'true' ? true : false,
          },
        });
      }
    }
  }, []);

  // else if (router.location.pathname === routes.kyc.basicInfo
  //   || router.location.pathname === routes.kyc.commonPanScreen
  //   || router.location.pathname === routes.kyc.personalInfo) {
  //   setWorkflowCalled(true);
  //   const workflow = 7;
  //   updateContext({
  //     stageId: workflow,
  //   });
  //   return;
  // }
  useEffect(() => {
    setWorkflowCalled(false);
    isWorkflowLoaded.current = true;
    setLoading(true);
    const id = customerID();
    if (isWorkflowLoaded.current && Component && data?.stage?.previousStageId === -1) {
      if (router.location.pathname === routes.kyc.nonGst) {
        setWorkflowCalled(true);
        const workflow = 650;
        updateContext({
          stageId: workflow,
          // stage: 
        });
        return;
      } else if (router.location.pathname === routes.auth.chouseJourany) {
        setWorkflowCalled(true);
        const workflow = 7;
        updateContext({
          stageId: workflow,
        });
        return;
      } else if (router.location.pathname === routes.kyc.businessIntro) {
        setWorkflowCalled(true);
        const workflow = 691;
        updateContext({
          stageId: workflow,
        });
        return;
      } else if (router.location.pathname === routes.kyc.bankingAndGST) {
        setWorkflowCalled(true);
        const workflow = 692;
        updateContext({
          stageId: workflow,
        });
        return;
      } else if (router.location.pathname === routes.kyc.existingLoanDetails) {
        setWorkflowCalled(true);
        const workflow = 693;
        updateContext({
          stageId: workflow,
        });
        return;
      } else if (router.location.pathname === routes.amber.amberBankStatementUpload) {
        setWorkflowCalled(true);
        const workflow = 810;
        updateContext({
          stageId: workflow,
        });
        return;
      } else if (router.location.pathname === routes.kyc.incomeTax) {
        setWorkflowCalled(true);
        const workflow = 3045;
        updateContext({
          stageId: workflow,
        });
        return;
      } else if (router.location.pathname.includes('upload-documents')) {
        setWorkflowCalled(true);
        const workflow = 650;
        updateContext({
          stageId: workflow,
        });
        return;
      } else if (data?.customerJourneyId || id) {
        const fiestTimeLogin = FirstTimeLogin();
        fetchCJP({
          data: {
            select: {
              customer_journey: ['_all'],
            },
            isOfferValid: data?.isOfferValid,
            firstCallAfterLogin: fiestTimeLogin === 'true' ? true : false
          },
        });
      } else {
        setWorkflowCalled(true);
      }
    } else {
      updateContext({
        stageId: data?.stage?.previousStageId,
      });
      setWorkflowCalled(true);
    }
  }, [Component]);

  const handleLogout = () => {
    setShowWarning(false);
    router.replace(routes.auth.logout);
  };

  useEffect(() => {
    if (fetchCJPRes) {
      setLoading(false);
      if (
        fetchCJPRes?.data
        && fetchCJPRes?.data?.stage
      ) {
        updateLocalStorage(FIRST_TIME_LOGIN, false);
        setWorkflowCalled(true);
        const workflow = +get(fetchCJPRes, 'data.stage.stageId', -1);
        updateContext({
          ...fetchCJPRes.data,
          stage: fetchCJPRes?.data?.stage,
          stageId: workflow,
        });
        if (WORKFLOW[workflow]?.path) {
          router.replace(WORKFLOW[workflow]?.path);
        } else {
          router.replace(routes.auth.logout);
        }
        isWorkflowLoaded.current = true;
      } else {
        hideErrorPopup(updateContext);
        setWorkflowCalled(false);
        setShowWarning(true);
      }
    }
  }, [fetchCJPRes]);

  useEffect(() => {
    if (fetchCJPErr) {
      // updateContext({
      //   msgSnackbar: fetchCJPErr,
      // });
      hideErrorPopup(updateContext);
      setWorkflowCalled(false);
      setShowWarning(true);
    }
  }, [fetchCJPErr]);

  useEffect(() => {
    if (!WHITELIST_LEAVESITE_POPUP.includes(router.location.pathname)) {
      window.onbeforeunload = () => true; // having extra code before/after this doesn't trigger this link
    } else {
      window.onbeforeunload = null;
    }
  }, [router.location]);

  let session = sessionStorage.getItem(LOCAL_STORAGE_HOTEL_ON_UNLOAD);
  if (session) {
    session = JSON.parse(session);
  }

  if (showWarning) {
    return (
      <SomethingWentWrong
        buttonLabel={CTA_LABELS.GOT_IT}
        open={showWarning}
        setOpen={handleLogout}
      />
    );
  }
  // if (fetchCJPLoading) <CenterLoader />;
  if (workflowCalled) {
    const workflow = +get(fetchCJPRes, 'data.stage.stageId', -1);
    return (
      <>
        {fetchCJPLoading ? (
          <CenterLoader showLoadingText />
        ) : (
          <Route
            {...rest}
            render={(props) => {
              if (data.access_token || skipAuthCheck || session?.access_token) {
                return (
                  <Component
                    {...rest}
                    {...props}
                    // workflowData={fetchCJPRes?.data || {}}
                    stageId={+get(fetchCJPRes, 'data.stage.stageId', -1)}
                  />
                );
              }
              const workflow = +get(fetchCJPRes, 'data.stage.stageId', -1);
              updateContext({
                ...authCheck(),
                ...fetchCJPRes?.data,
                stageId: workflow,
              });
              // return <Redirect to={WORKFLOW['50'].path} />;
              // return null;
            }}
          />
        )}
      </>
    );
  } else {
    return <CenterLoader showLoadingText />;
  }
};

ProtectedRoutes.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  component: PropTypes.any.isRequired,
};

export default ProtectedRoutes;
