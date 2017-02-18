import React, { Component } from 'react';
import './Game.css';
import StatusBar from '../components/StatusBar';
import Obstacle from '../components/Obstacle';
import Npc from '../components/Npc';
let keyState = {};

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameOver: false,
      intervalId: null
    }
    this.gameLoop = this.gameLoop.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      keyState[e.keyCode || e.which] = true;
      this.gameLoop();
    });

    window.addEventListener('keyup', (e) => {
      keyState[e.keyCode || e.which] = false;
      this.props.resetSprite(this.props.hero);
    });
  }

  gameLoop() {
    let speed = 4;
    let currentXPosition = this.props.hero.coordinates.x;
    let currentYPosition = this.props.hero.coordinates.y;
    let lastMove;

    if (keyState[37] || keyState[65]) { // a
      currentXPosition -= speed;
      lastMove = 'left';
    }

    if (keyState[39] || keyState[68]) { // d
      currentXPosition += speed;
      lastMove = 'right';
    }

    if (keyState[38] || keyState[87]) { // w
      currentYPosition -= speed;
      lastMove = 'up';
    }

    if (keyState[40] || keyState[88]) { // x
      currentYPosition += speed;
      lastMove = 'down';
    }

    this.props.moveCharacter(currentXPosition, currentYPosition, lastMove);
  }


  render() {
    let heroStyle = {
      position: 'absolute',
      left: this.props.hero.coordinates.x,
      top: this.props.hero.coordinates.y
    }

    let obstacles = this.props.obstacles.map((obstacle, index) => {
      let obstacleStyle = {
        position: 'absolute',
        left: obstacle.coordinates.x,
        top: obstacle.coordinates.y
      }
      return <Obstacle obstacle={obstacle} position={obstacleStyle} key={index}/>
    });

    let npcs = this.props.npcs.map((npc, index) => {
      let npcStyle = {
        position: 'absolute',
        left: npc.coordinates.x,
        top: npc.coordinates.y
      }
      return <Npc npc={npc} position={npcStyle} key={index}/>
    });



    let statusBarStyle = {
      left: 0,
      top: 10
    }

    return (
      <div>
        <StatusBar style={statusBarStyle}/>
        <img
          src={this.props.hero.currentSprite}
          alt='hero'
          style={heroStyle}
          >
        </img>
        {obstacles}
        {npcs}
      </div>
    );
  }
}
