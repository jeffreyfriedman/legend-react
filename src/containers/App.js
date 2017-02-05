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
        heroCoord: {x: newXPosition, y: newYPosition}
      });
    }
  };

  conveyorBelt() {
    // let intervalId = setInterval(function() {
      let obstacleArray = [...this.state.obstacles];
      let newArray = obstacleArray.map(obstacle => {
        return obstacle - 1;
      })
      this.setState({ obstacles: newArray })
    // }.bind(this), 500);
    //
    // this.setState({ intervalId: intervalId });
  }

  componentDidMount() {
    document.body.addEventListener('keydown', (event) => {
      this.moveCharacter(event);
    });
    let obstacleArray = [...this.state.obstacles];
    obstacleArray.push({
      image: this.props.tree,
      x: 7,
      y: 7
    })
    this.setState({ obstacles: obstacleArray })
    // this.conveyorBelt();
  }

  render() {
    let gameGrid = [];
    let heroSprite;
    let gameScreen;
    const divStyle = {
      'borderStyle': 'solid'
    };

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

    // top border
    gameGrid.push(<div style={divStyle} key={-1}></div>)

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
    // bottom border
    gameGrid.push(<div style={divStyle} key={this.state.gridRows}></div>)

    if (this.state.gameOver) {
      gameScreen = <GameOver/>
    } else {
      gameScreen = gameGrid;
    }

    return (
      <div>
        {gameScreen}
      </div>
    );
  }
}

export default App;
