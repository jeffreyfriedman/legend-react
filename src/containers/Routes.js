import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { history } from '../store';
import App from './App';
import Game from './Game';
import About from './About';

export const Routes =
  (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Game}/>
        <Route path="/about" component={About}/>
      </Route>
    </Router>
  );
