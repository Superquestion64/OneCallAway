import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { loadUser } from "../actions/user";
import PrivateRoute from "../components/general/PrivateRoute";
import GlobalStyles from "../styles/Global";
import theme from "../styles/theme";
import { LOGOUT } from "../types";
import setAuthToken from "../utils/setAuthToken";
import Footer from "./general/Footer";
import Dashboard from "./pages/dashboard/Dashboard";
import Landing from "./pages/Landing";
import SignUpIn from "./pages/SignUpIn";
import VoiceCall from "./pages/VoiceCall";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      dispatch(loadUser());
    }
    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) dispatch({ type: LOGOUT });
    });
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/signup" exact component={SignUpIn} />
          <Route path="/signin" exact component={SignUpIn} />
          <PrivateRoute path="/dashboard" exact component={Dashboard} />
          <Route path="/voice_call" exact component={VoiceCall} />
        </Switch>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
