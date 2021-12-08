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
          <Route path="/signup" exact component={SignUpIn} />
          <Route path="/signin" exact component={SignUpIn} />
          <Route path="/voice_call" exact component={(props) => <VoiceCall {...props} key={window.location.pathname}/>} />
          <PrivateRoute path="/dashboard" exact component={Dashboard} />
          <PrivateRoute path="/profile-form" exact component={ProfileForm} />
          <PrivateRoute path="/interests" exact component={InterestForm} />
        </Switch>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
