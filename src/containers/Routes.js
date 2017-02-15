import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { history } from '../store';
import App from './App';
import Game from './Game';
import Alternative from './Alternative';
import About from './About';

export const Routes =
  (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Game}/>
        <Route path="/alternative" component={Alternative}/>
        <Route path="/about" component={About}/>
      </Route>
    </Router>
  );
