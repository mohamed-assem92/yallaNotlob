import React, { Component } from 'react';
import logo from './logo.svg';
// import './App.css';
import Login from './components/login';
import Orders from './components/orders';
import Friend from './components/friend';
import Register from './components/register';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
          <div>
              <Route path="/friends" Component={Friend} />
          </div>
          <div>
              <Route exact path="/Orders" Component={Orders} />
          </div>
          <div>
              <Route exact path="/Login" Component={Login} />
          </div>
          <div>
              <Route exact path="/Register" Component={Register} />
          </div>
      </Router>
      </div>
    );
  }
}

export default App;
