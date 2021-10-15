import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import Trocado from "../Pages/Trocado";

const Router = () => {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/trocado" exact component={Trocado} />

      <Redirect path="*" to="/" />
    </Switch>
  );
};

export default Router;
