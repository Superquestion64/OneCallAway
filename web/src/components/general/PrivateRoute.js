import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { logOut } from "../../actions/user";
import {
  Container,
  FlexCentered,
  FlexItem,
  Text
} from "../../styles/General.styled";
import Spinner from "../../utils/Spinner";
import Navbar from "./Navbar";

const PrivateRoute = props => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated } = useSelector(state => state.user);

  const navItems = [
    {
      title: "sign out",
      path: "/signin",
      onClick() {
        dispatch(logOut());
      }
    }
  ];

  if (loading) {
    return (
      <FlexCentered h="100vh">
        <FlexItem as="center" h="auto">
          <Spinner />
          <Text m="2rem 0 0 0">Please wait while resource is loading...</Text>
        </FlexItem>
      </FlexCentered>
    );
  } else if (!isAuthenticated) {
    return (
      <>
        <Container mh="100vh">
          <h1>hello</h1>
          <Navbar navItems={navItems} />
          <Route {...props} />
        </Container>
      </>
    );
  }

  // If unauthenticated, redirect user to home page
  return <Redirect to="/signin" />;
};

export default PrivateRoute;
