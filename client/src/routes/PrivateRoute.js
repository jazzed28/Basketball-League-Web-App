import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, loggedIn: loggedIn, ...rest }) => {
  console.log("wow", loggedIn);
  return <Route {...rest} render={(props) => (
    loggedIn === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
}

export default PrivateRoute;