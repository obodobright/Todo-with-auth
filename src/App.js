import "./App.css";
import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "./Todo/header/header";
import Home from "./Todo/home";
import { New } from "./Todo/newTask/New";
import { Login } from "./Todo/login/login";
import MyHome from "./firebaseAuthPractice/main";
import Main from "./firebaseAuthPractice/main";
// import Register from "./loginAuth/register";

function App() {
  return (
    <div>
      <Main />
    </div>
  );
}

export default App;
// <Router>
//   <Header />
//   <Switch>
//     <Route path="/" exact component={Home} />
//     <Route path="/newtask" exact component={New} />
//     <Route path="/login" exact component={Login} />
//     <Route path="/home" exact component={MyHome} />
//   </Switch>
// </Router>
