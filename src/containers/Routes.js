import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { history } from '../store';
import App from './App';
import Game from './Game';
import About from './About';
import heroSpriteDown from '../assets/images/sprites/Zelda3Sheet1_250.png';
import heroSpriteRight from '../assets/images/sprites/Zelda3Sheet1_251.png';
import heroSpriteUp from '../assets/images/sprites/Zelda3Sheet1_252.png';
import heroSpriteLeft from '../assets/images/sprites/Zelda3Sheet1_253.png';
import tree from '../assets/images/sprites/Zelda3Sheet1_111.png';
import house from '../assets/images/sprites/Zelda3Sheet3_129.png';


export const Routes =
  (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={() => (<Game
          heroSpriteDown={heroSpriteDown}
          heroSpriteRight={heroSpriteRight}
          heroSpriteUp={heroSpriteUp}
          heroSpriteLeft={heroSpriteLeft}
          tree={tree}
          house={house}
        />)}/>
        <Route path="/about" component={About}/>
      </Route>
    </Router>
  );
