import React, { Component } from 'react';
import './Game.css';
import heroSpriteDown from '../assets/images/sprites/Zelda3Sheet1_250.png';
let  keyState = {};

export default class Alternative extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heroStyle: {
        position: 'absolute',
        left: 100,
        top: 100
      }
    }
    this.gameLoop = this.gameLoop.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      keyState[e.keyCode || e.which] = true;
    });

    window.addEventListener('keyup', (e) => {
      keyState[e.keyCode || e.which] = false;
    });

    this.gameLoop();
  }

  gameLoop() {
    let currentXPosition = this.state.heroStyle.left;
    let currentYPosition = this.state.heroStyle.top;

    if (keyState[37] || keyState[65]) { // a
      currentXPosition -=1;
      this.setState({
        heroStyle: {
          position: 'absolute',
          left: currentXPosition,
          top: currentYPosition
        }
      })
    }

    if (keyState[39] || keyState[68]) { // d
      currentXPosition += 1;
      this.setState({
        heroStyle: {
          position: 'absolute',
          left: currentXPosition,
          top: currentYPosition
        }
      })
    }

    if (keyState[38] || keyState[87]) { // w
      currentYPosition -= 1;
      this.setState({
        heroStyle: {
          position: 'absolute',
          left: currentXPosition,
          top: currentYPosition
        }
      })
    }

    if (keyState[40] || keyState[88]) { // x
      currentYPosition += 1;
      this.setState({
        heroStyle: {
          position: 'absolute',
          left: currentXPosition,
          top: currentYPosition
        }
      })
    }

    setTimeout(this.gameLoop, 10);
  }


  render() {
    return (
      <div>
        <img
          src={heroSpriteDown}
          id='hero'
          alt='hero'
          style={this.state.heroStyle}>
        </img>
      </div>
    );
  }
}
