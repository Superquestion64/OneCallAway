import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from "./general/Footer";
import Landing from "./pages/Landing";
import VoiceCall from "./pages/VoiceCall";
import SignUpIn from "./pages/SignUpIn";
import Dashboard from "./pages/dashboard/Dashboard";
import theme from "../styles/theme";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "../styles/Global";
import PrivateRoute from "./general/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/signup" exact component={SignUpIn} />
          <Route path="/signin" exact component={SignUpIn} />
          <PrivateRoute path="/dashboard" exact component={Dashboard} />
          <PrivateRoute path="/voice_call" exact component={VoiceCall} />
        </Switch>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
