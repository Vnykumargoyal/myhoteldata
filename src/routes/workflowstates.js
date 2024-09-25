/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
import { routes } from './constant';
// const { documentType } = useParams();
const WORKFLOW = {
  // '-1': { path: routes.pageNotFound },
  1: { path: routes.auth.login },
  2: { path: routes.auth.logout },
  5: { path: routes.redirect },
};
const URL_WORKFLOW_STATE = {
  [routes.pageNotFound]: {
    current: '-1',
    previous: -1,
    next: -1,
  },
  [routes.auth.login]: {
    current: 1,
    previous: -1,
    next: -1,
  },
  [routes.auth.logout]: {
    current: 2,
    previous: -1,
    next: -1,
  },
  [routes.auth.chouseJourany]: {
    current: 7,
    previous: -1,
    next: -1,
  },
};

export { WORKFLOW, URL_WORKFLOW_STATE };
