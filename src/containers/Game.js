import React, { Component } from 'react';
import './Game.css';
import RowCreator from '../components/RowCreator';
import GameOver from '../components/GameOver';
import StatusBar from '../components/StatusBar';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: {
        cols: 175,
        rows: 20,
        cellWidth: 1,
        cellHeight: 1
      },
      gameOver: false,
      intervalId: null
    }
  }

  componentDidMount() {
    document.body.addEventListener('keydown', (event) => {
      this.props.moveCharacter(event);
    });
  }

  render() {
    let gameGrid = [];
    let gameScreen;

    // Status bar floats above main grid
    let statusBarStyle = {
      textAlign: 'right'
    }
    gameGrid.push(
      <tr style={statusBarStyle} key={-1}>
        <StatusBar hero={this.props.hero}/>
      </tr>)

    // main grid
    for (let i = 0; i < this.state.grid.rows; i++) {
      gameGrid.push(<RowCreator
        key={i}
        row={i}
        gridDetails={this.state.grid}
        heroCoord={this.props.hero.coordinates}
        heroSprite={this.props.hero.sprite}
        obstacles={this.props.obstacles}
        {...this.props}
      />)
    }

    if (this.state.gameOver) {
      gameScreen = <GameOver/>
    } else {
      gameScreen = gameGrid;
    }

    return (
      <div>
        <table className="fixed">
          <tbody>
            {gameScreen}
          </tbody>
        </table>
      </div>
    );
  }
}
