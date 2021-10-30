import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../../utils/Spinner";
import { Text, FlexCentered, FlexItem } from "../../styles/General.styled";
const PrivateRoute = props => {
  const { loading, isAuthenticated } = useSelector(state => state.user);

  if (loading) {
    return (
      <FlexCentered h="100vh">
        <FlexItem as="center" h="auto">
          <Spinner />
          <Text m="2rem 0 0 0">Please wait while resource is loading...</Text>
        </FlexItem>
      </FlexCentered>
    );
  } else if (isAuthenticated) {
    return <Route {...props} />;
  }

  // If unauthenticated, redirect user to home page
  return <Redirect to="/signin" />;
};

export default PrivateRoute;
