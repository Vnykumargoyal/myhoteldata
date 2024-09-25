import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import HotelInfoRoutes from './HotelInfoRoutes';
import PineLoader from '../components/PineLoader';
import { HotelContextWrapper } from '../contexts/HotelContext';

const AppRoutes = () => (
  <Router>
    <Suspense fallback={<PineLoader />}>
      <Switch>
        <Route path="/">
          <Router basename="/">
            <Switch>
              <Route path="/">
                <HotelContextWrapper>
                  <HotelInfoRoutes />
                </HotelContextWrapper>
              </Route>
            </Switch>
          </Router>
        </Route>
      </Switch>
    </Suspense>
  </Router>
);

export default AppRoutes;
