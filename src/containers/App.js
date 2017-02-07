import React, { Component } from 'react';
import './App.css';
import RowCreator from '../components/RowCreator';
import GameOver from '../components/GameOver';

class App extends Component {
  debugger;
  constructor(props) {
    super(props);
    this.state = {
      gridCols: 12,
      gridRows: 12,
      heroCoord: { // starting coordinate
        x: 6,
        y: 6
      },
      lastMove: 'down',
      obstacles: [],
      gameOver: false,
      intervalId: null
    }
    this.moveCharacter = this.moveCharacter.bind(this);
  }

  moveCharacter(event) {
    let newXPosition = this.state.heroCoord.x;
    let newYPosition = this.state.heroCoord.y;
    switch (event.keyCode) {
      case 37:
        newXPosition -= 1;
        this.setState({ lastMove: 'left'});
        break;

      case 39:
        newXPosition += 1;
        this.setState({ lastMove: 'right'});
        break;

      case 38:
        newYPosition -= 1;
        this.setState({ lastMove: 'up'});  // origin is upper left
        break;

      case 40:
        newYPosition += 1;
        this.setState({ lastMove: 'down'});
        break;

      default:
        break;
    }

    let occupiedSquare = this.state.obstacles.filter(obstacle => {
      return ((obstacle.x === newXPosition) && (obstacle.y === newYPosition));
    });

    if (occupiedSquare.length === 0) {
      this.setState({
        heroCoord: { x: newXPosition, y: newYPosition }
      });
    }
  };

  componentDidMount() {
    document.body.addEventListener('keydown', (event) => {
      this.moveCharacter(event);
    });
    let obstacleArray = [...this.state.obstacles];
    // tree
    obstacleArray.push({
      image: this.props.tree,
      height: 34,
      width: 32,
      x: 7,
      y: 7
    });

    // house
    obstacleArray.push({
      image: this.props.house,
      height: 102,
      width: 96,
      x: 2,
      y: 2
    })

    let spacerArray = [];
    let isSquare = 0;
    obstacleArray.forEach(obstacle => {
      if (obstacle.width && Math.floor(obstacle.width / 48) >= 1) {
        isSquare++;
        for (let i = 1; i < Math.floor(obstacle.width / 48); i++) {
          spacerArray.push({
            x: obstacle.x + i,
            y: obstacle.y
          })
        }
      }
      if (obstacle.height && Math.floor(obstacle.height / 50) >= 2) {
        isSquare++;
        for (let i = 1; i < Math.floor(obstacle.height / 50); i++) {
          spacerArray.push({
            x: obstacle.x,
            y: obstacle.y + i
          })
        }
      }
      if (isSquare === 2) {
        spacerArray.push({
          x: obstacle.x + 1,
          y: obstacle.y + 1
        })
      }
    })

    this.setState({ obstacles: obstacleArray.concat(spacerArray) })
  }

  render() {
    let gameGrid = [];
    let heroSprite;
    let gameScreen;

    switch (this.state.lastMove) {
      case 'down':
        heroSprite = this.props.heroSpriteDown;
        break;

      case 'up':
        heroSprite = this.props.heroSpriteUp;
        break;

      case 'right':
        heroSprite = this.props.heroSpriteRight;
        break;

      case 'left':
        heroSprite = this.props.heroSpriteLeft;
        break;

      default:
        break;
    }

    // main grid
    for (let i = 0; i < this.state.gridRows; i++) {
      gameGrid.push(<RowCreator
        key={i}
        row={i}
        numColumns={this.state.gridCols}
        heroCoord={this.state.heroCoord}
        heroSprite={heroSprite}
        obstacles={this.state.obstacles}
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

export default App;
