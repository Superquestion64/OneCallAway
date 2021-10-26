import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = props => {
  const { isAuthenticated } = useSelector(state => state.user);

  // If authenticated, render the target page
  if (isAuthenticated) {
    return <Route {...props} />;
  }

  // If unauthenticated, redirect user to home page
  return <Redirect to="/" />;
};

export default PrivateRoute;
