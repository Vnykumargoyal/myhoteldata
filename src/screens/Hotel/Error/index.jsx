import React from 'react';

import Error404 from './404';
import Error500 from './500';
import ErrorNoAccess from './NoAccess';
import NoInternet from './NoInternet';

const ErrorMap = {
  404: <Error404 />,
  500: <Error500 />,
  'no-service': <NoInternet />,
  'no-access': <ErrorNoAccess />,
};

const ErrorPage = ({
  match: {
    params: { errorCode = 404 },
  },
}) => ErrorMap[errorCode];

export default ErrorPage;
