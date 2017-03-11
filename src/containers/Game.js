import React, { Component } from 'react';
import './Game.css';
import StatusBar from '../components/StatusBar';
import Obstacle from '../components/Obstacle';
import Enemy from '../components/Enemy';
import Npc from '../components/Npc';
import MobileControls from '../components/MobileControls';

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
    this.simulateKeyPress = this.simulateKeyPress.bind(this);
  }

  componentDidMount() {
    let newKeyState = {},
        hashKey;

    window.addEventListener('keydown', (e) => {
      hashKey = e.key || e.code;
      newKeyState[hashKey] = true;
      this.setState({ keyState: newKeyState });
      this.gameLoop();
    });

    window.addEventListener('keyup', (e) => {
      hashKey = e.key || e.code;
      newKeyState[hashKey] = false;
      this.setState({ keyState: newKeyState });
      this.props.resetSprite(this.props.hero);
    });

    let intervalId = setInterval(this.animate, 100);
    this.setState({intervalId: intervalId});
  }

  simulateKeyPress(keyCode) {
    let keyPress = new KeyboardEvent('keydown', { code : keyCode });
    window.dispatchEvent(keyPress);
  }

  stopKeyPress(keyCode) {
    let keyPress = new KeyboardEvent('keyup', { code : keyCode });
    window.dispatchEvent(keyPress);
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

    if (this.state.keyState['ArrowLeft'] || this.state.keyState['KeyA'] || this.state.keyState['a']) { // a - left
      if (currentXPosition >= this.state.scrollMargin) currentXPosition -= speed;
      lastMove = 'left';
    }

    if (this.state.keyState['ArrowRight'] || this.state.keyState['KeyD'] || this.state.keyState['d']) { // d - right
      if (this.state.screenWidth - currentXPosition >= this.state.scrollMargin) currentXPosition += speed;
      lastMove = 'right';
    }

    if (this.state.keyState['ArrowUp'] || this.state.keyState['KeyW'] || this.state.keyState['w']) { // w - up
      if (currentYPosition >= this.state.scrollMargin) currentYPosition -= speed;
      lastMove = 'up';
    }

    if (this.state.keyState['ArrowDown'] || this.state.keyState['KeyX'] || this.state.keyState['x']) { // x - down
      if (this.state.screenHeight - currentYPosition >= this.state.scrollMargin) currentYPosition += speed;
      lastMove = 'down';
    }

    if ((this.state.keyState['KeyZ']) || this.state.keyState['z']) {  // z
      lastMove = 'swordAttack';
    }

    this.props.moveCharacter(currentXPosition, currentYPosition, lastMove, speed, this.state.scrollMargin, this.state.screenWidth, this.state.screenHeight);
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

    let simulateLeft = () => this.simulateKeyPress('ArrowLeft'),
        simulateUp = () => this.simulateKeyPress('ArrowUp'),
        simulateRight = () => this.simulateKeyPress('ArrowRight'),
        simulateDown = () => this.simulateKeyPress('ArrowDown'),
        stopLeft = () => this.stopKeyPress('ArrowLeft'),
        stopUp = () => this.stopKeyPress('ArrowUp'),
        stopRight = () => this.stopKeyPress('ArrowRight'),
        stopDown = () => this.stopKeyPress('ArrowDown');

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
        <MobileControls
          simulateLeft={simulateLeft}
          simulateRight={simulateRight}
          simulateUp={simulateUp}
          simulateDown={simulateDown}
          stopUp={stopUp}
          stopRight={stopRight}
          stopDown={stopDown}
          stopLeft={stopLeft}
        />
      </div>
    );
  }
}
