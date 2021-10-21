import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from "./pages/general/Footer";
import Landing from "./pages/Landing";
import SignInOut from "./pages/SignInOut";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/signup" exact component={SignInOut} />
        <Route path="/signin" exact component={SignInOut} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
