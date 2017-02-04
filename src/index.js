import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import './index.css';
import heroSprite from '../public/assets/images/hero_1.png';

ReactDOM.render(
  <App heroSprite={heroSprite}/>,
  document.getElementById('root')
);
