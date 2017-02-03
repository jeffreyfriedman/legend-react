import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';

import React, { Component } from 'react';
import './App.css';
import Hero from './components/Hero';
import Obstacle from './components/Obstacle';
import GameOver from './components/GameOver';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridCols = 1920,
      gridRows = 1080,
      hero: 540,  // starting y coordinate
      obstacles: [],
      gameOver: false
    }
    this.moveCharacter = this.moveCharacter.bind(this);
  }

  moveCharacter(event) {
    let newPosition = this.state.hero;
    if(event.keyCode == 38) {
      newPosition += 1;
    } else if(event.keyCode == 40) {
      newPosition -= 1;
    };
    if (newPosition >= this.state.gridRows || newPosition <= -1) {
      this.setState({ gameOver: true });
    } else {
      this.setState({ hero: newPosition });
    }
  };

  componentDidMount() {
    document.body.addEventListener('keydown', (event) => {
      this.moveCharacter(event);
    });
  }

  render() {
    let hero = this.props.heroSprite;
    let tree = this.props.tree;
    let movement = this.moveCharacter;
    let grid = [];
    let gameScreen;
    const divStyle = {
      'borderStyle': 'solid'
    };

    // top border
    grid.push(
      <div style={divStyle} key={-1}> </div>
    )

    // main grid
    for (let i = 0; i < this.state.gridRows; i++) {
      if (this.state.hero === i) {
        grid.push(
          <div className='row game' key={i} onKeyDown={movement}>
            <Hero
              hero={hero}
            />
          </div>
        )
      } else {
        grid.push(
          <div className='row game' key={i}>&nbsp;</div>
        )
      }
    }

    // bottom border
    grid.push(
      <div style={divStyle} key={this.state.gridRows}> </div>
    )

    if (this.state.gameOver) {
      gameScreen = <GameEnd/>
    } else {
      gameScreen = grid;
    }

    return (
      <div>
        {gameScreen}
      </div>
    );
  }
}

export default App;
