import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import './index.css';
import heroSpriteDown from '../public/assets/images/sprites/Zelda3Sheet1_252.png';
import heroSpriteRight from '../public/assets/images/sprites/Zelda3Sheet1_251.png';
import heroSpriteUp from '../public/assets/images/sprites/Zelda3Sheet1_250.png';
import heroSpriteLeft from '../public/assets/images/sprites/Zelda3Sheet1_253.png';

ReactDOM.render(
  <App
    heroSpriteDown={heroSpriteDown}
    heroSpriteRight={heroSpriteRight}
    heroSpriteUp={heroSpriteUp}
    heroSpriteLeft={heroSpriteLeft}
  />,
  document.getElementById('root')
);
