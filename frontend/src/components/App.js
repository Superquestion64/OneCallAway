import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { LOGOUT } from "../actions/types";
import { loadUser } from "../actions/user";
import PrivateRoute from "../components/general/PrivateRoute";
import InterestForm from "../components/pages/profile/InterestForm";
import ProfileForm from "../components/pages/profile/ProfileForm";
import GlobalStyles from "../styles/Global";
import theme from "../styles/theme";
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
    }
    dispatch(loadUser());
    // log user out from entire window if they log out from one tab
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
          <Route path="/signup" component={SignUpIn} />
          <Route path="/signin" component={SignUpIn} />
          <Route path="/voice_call" component={VoiceCall}/>
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/profile-form" component={ProfileForm} />
          <PrivateRoute path="/interests" component={InterestForm} />
        </Switch>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
