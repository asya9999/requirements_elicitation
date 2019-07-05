import React from 'react';
import MainPage from './mainPage';
import Entrance from './entrance';

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

const App = () => (
  <Router>
  <Switch>
      <Redirect exact from="/" to="/auth/login" />
      <Route path="/account" component={MainPage} />
      <Route path="/auth" component={Entrance} />
  </Switch>
  </Router>
);

export default App;
