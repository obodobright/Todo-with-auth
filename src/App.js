import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "./Todo/header/header";
import Home from "./Todo/home";
import { New } from "./Todo/newTask/New";
import { Login } from "./Todo/login/login";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/newtask" exact component={New} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
