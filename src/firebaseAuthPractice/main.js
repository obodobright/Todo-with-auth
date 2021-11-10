import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import styled from "styled-components";
import Login from "./component/login";
import Nav from "./component/nav";
import SignUp from "./component/signup";
import MyHome from "./myHome";

const Main = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/" exact component={MyHome}></Route>
        <Route path="/login" exact component={Login}></Route>
        <Route path="/signup" exact component={SignUp}></Route>
      </Switch>
    </Router>
  );
};

export default Main;
