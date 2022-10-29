import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Main, About } from '../views';

const Router = () => {
  return <HashRouter>
    <Switch>
      <Route path='/main' component={Main} />
      <Route path='/about' component={About} />
    </Switch>
  </HashRouter>;
};

export default Router;