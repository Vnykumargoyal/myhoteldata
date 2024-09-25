import get from 'lodash/get';

import { ACTIVE_LOAN_ID, FIRST_TIME_LOGIN } from '../../../../config/auth';
import { updateLocalStorage } from '../../../../utils/localStorageFunctions';
import { WORKFLOW } from '../../../../routes/workflowstates';
import { routes } from '../../../../routes/constant';

const SEGMENTS = ['pa', 'pq', 'npq', 'financial services - om'];

const handleFetchCJPListResponse = (
  response,
  onJourneyFound,
  onNoJourneyFound,
  onError
) => {
  if (response) {
    if (response.data) {
      if (response.data.length > 0) {
        const activeJourney = response.data[0];
        updateLocalStorage(FIRST_TIME_LOGIN, true);
        updateLocalStorage(ACTIVE_LOAN_ID, activeJourney.customerJourneyId);
        onJourneyFound(
          activeJourney.customerJourneyId,
          activeJourney.isOfferValid
        );
      } else {
        updateLocalStorage(FIRST_TIME_LOGIN, true);
        onNoJourneyFound();
      }
    } else onError();
  }
};

const handleFetchEligibilityResponse = (
  response,
  updateDataAndStage,
  onEligible,
  onNotEligible,
  onError
) => {
  if (response) {
    if (response.data) {
      const dataToBeUpdated = { ...response.data, businessName: response.data.tradeName || '' };
      updateDataAndStage(dataToBeUpdated);
      const segment = response.data.segment?.toLowerCase();
      if (SEGMENTS.includes(segment)) {
        onEligible(dataToBeUpdated);
      } else {
        onNotEligible(routes.error.welComePageError);
      }
    } else onError();
  }
};

const handleFetchCJPResponse = (
  response,
  updateContext,
  router,
  onLogin,
  setLoading = () => {}
) => {
  if (response) {
    if (response.data && response.data.stage) {
      const workflow = +get(response, 'data.stage.stageId', -1);
      updateContext({
        ...response.data,
        stage: response.data.stage,
        stageId: workflow,
      });
      setLoading(false);
      if (WORKFLOW[workflow]?.path) {
        onLogin();
        if (workflow === 50 || workflow === 130 || workflow === 330) {
          router.replace(WORKFLOW[7].path);
        } else {
          router.replace(WORKFLOW[workflow]?.path);
        }
      } else {
        router.replace(routes.auth.logout);
      }
    }
  }
};

const handleCreateCJPResponse = (
  response,
  updateDataAndStage,
  onSuccess,
  onError,
  setLoading = () => {}
) => {
  if (response) {
    setLoading(false);
    if (response.data) {
      updateDataAndStage({ ...response.data, stageId: '10' });
      updateLocalStorage(ACTIVE_LOAN_ID, response.data.customerJourneyId);
      onSuccess(routes.auth.welcomeOffer);
    } else onError();
  }
};

export {
  handleFetchCJPListResponse,
  handleFetchEligibilityResponse,
  handleFetchCJPResponse,
  handleCreateCJPResponse
};
