import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthHandler from '../utils/AuthHandler';

// Mock authentication check (you can replace this with your real logic)


const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { authCheck, signIn } = AuthHandler;
  const isAuthenticated = () => {
    const getToken = () => AuthHandler.authCheck()?.access_token;
    // For example, you can check a token or user data in localStorage, cookies, etc.
    // return !!localStorage.getItem('authToken');
    return getToken ? true : false;
  };
  return (
    <Route
      {...rest}
      render={(props) => 
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;