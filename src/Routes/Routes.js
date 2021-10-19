import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "../Pages/HomePage";

const Router = () => {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />

      <Redirect path="*" to="/" />
    </Switch>
  );
};

export default Router;
