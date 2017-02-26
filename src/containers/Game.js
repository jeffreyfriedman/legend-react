import React, { Component } from 'react';
import './Game.css';
import StatusBar from '../components/StatusBar';
import Obstacle from '../components/Obstacle';
import Enemy from '../components/Enemy';
import Npc from '../components/Npc';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameOver: false,
      intervalId: null,
      keyState: {},
      screenWidth: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      screenHeight: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
      scrollMargin: 150
    }
    this.gameLoop = this.gameLoop.bind(this);
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    let newKeyState = {},
        hashKey;

    window.addEventListener('keydown', (e) => {
      hashKey = e.keyCode || e.which;
      newKeyState[hashKey] = true;
      this.setState({ keyState: newKeyState });
      this.gameLoop();
    });

    window.addEventListener('keyup', (e) => {
      hashKey = e.keyCode || e.which;
      newKeyState[hashKey] = false;
      this.setState({ keyState: newKeyState });
      this.props.resetSprite(this.props.hero);
    });

    let intervalId = setInterval(this.animate, 100);
    this.setState({intervalId: intervalId});
  }

  componentWillUnMount() {
    clearInterval(this.state.intervalId);
  }

  animate() {
    if (this.props && this.props.hero.action.swingingSword) {
      let currentXPosition = this.props.hero.coordinates.x;
      let currentYPosition = this.props.hero.coordinates.y;
      this.props.moveCharacter(currentXPosition, currentYPosition, 'swordAttack');
    }
    if (!this.props.hero.action.swingingSword && this.props.hero.lastMove === 'swordAttack') {
      this.props.resetSprite(this.props.hero);
    }
  }

  gameLoop() {
    let speed = 4;
    let currentXPosition = this.props.hero.coordinates.x;
    let currentYPosition = this.props.hero.coordinates.y;
    let lastMove;

    if (this.state.keyState[37] || this.state.keyState[65]) { // a - left
      if (currentXPosition >= this.state.scrollMargin) currentXPosition -= speed;
      lastMove = 'left';
    }

    if (this.state.keyState[39] || this.state.keyState[68]) { // d - right
      if (this.state.screenWidth - currentXPosition >= this.state.scrollMargin) currentXPosition += speed;
      lastMove = 'right';
    }

    if (this.state.keyState[38] || this.state.keyState[87]) { // w - up
      if (currentYPosition >= this.state.scrollMargin) currentYPosition -= speed;
      lastMove = 'up';
    }

    if (this.state.keyState[40] || this.state.keyState[88]) { // x - down
      if (this.state.screenHeight - currentYPosition >= this.state.scrollMargin) currentYPosition += speed;
      lastMove = 'down';
    }

    if (this.state.keyState[90]) {  // z
      lastMove = 'swordAttack';
      
    // 150 pixels from edge before scrolling
    if (currentXPosition < this.state.scrollMargin && lastMove === 'left') this.props.scrollLeft(speed);
    if (this.state.screenWidth - currentXPosition < this.state.scrollMargin && lastMove === 'right') this.props.scrollRight(speed);
    if (currentYPosition < this.state.scrollMargin && lastMove === 'up') this.props.scrollUp(speed);
    if (this.state.screenHeight - currentYPosition < this.state.scrollMargin && lastMove === 'down') this.props.scrollDown(speed);
    }
    
    this.props.moveCharacter(currentXPosition, currentYPosition, lastMove);

    
  }


  render() {
    let heroStyle = {
      position: 'absolute',
      left: this.props.hero.coordinates.x,
      top: this.props.hero.coordinates.y,
      zIndex: 100
    }

    let obstacles = this.props.obstacles.map((obstacle, index) => {
      let obstacleStyle = {
        position: 'absolute',
        left: obstacle.coordinates.x,
        top: obstacle.coordinates.y,
        zIndex: 0
      }
      return <Obstacle obstacle={obstacle} position={obstacleStyle} key={index}/>
    });

    let enemies = this.props.enemies.map((enemy, index) => {
      let enemyStyle = {
        position: 'absolute',
        left: enemy.coordinates.x,
        top: enemy.coordinates.y,
        zIndex: 0
      }
      return <Enemy enemy={enemy} position={enemyStyle} key={index}/>
    });

    let npcs = this.props.npcs.map((npc, index) => {
      let npcStyle = {
        position: 'absolute',
        left: npc.coordinates.x,
        top: npc.coordinates.y,
        zIndex: 1
      }
      return <Npc npc={npc} position={npcStyle} key={index}/>
    });

    let statusBarStyle = {
      left: 0,
      top: 10
    }

    return (
      <div className='game-viewport'>
        <StatusBar style={statusBarStyle}/>
        <img
          src={this.props.hero.currentSprite}
          alt='hero'
          style={heroStyle}
          >
        </img>
        {obstacles}
        {enemies}
        {npcs}
      </div>
    );
  }
}
