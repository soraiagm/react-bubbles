import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import Login from "./components/Login";
import BubblePage from './components/BubblePage.js';
import PrivateRoute from './components/PrivateRoute.js';

import "./styles.scss";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="wrapper">
        <nav className="nav">
          <Link to="/login">Login</Link>
          <Link to="/protected">Bubble Page</Link>
        </nav>

        <Switch className="App">
          <PrivateRoute path="/protected" component={BubblePage} />
          <Route path="/" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
