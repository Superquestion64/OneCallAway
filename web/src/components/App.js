import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from "./general/Footer";
import Landing from "./pages/Landing";
import SignUpIn from "./pages/SignUpIn";
import Dashboard from "./pages/Dashboard";
import theme from "../styles/theme";
import { ThemeProvider } from "styled-components";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/signup" exact component={SignUpIn} />
          <Route path="/signin" exact component={SignUpIn} />
          <Route path="/dashboard" exact component={Dashboard} />
        </Switch>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
