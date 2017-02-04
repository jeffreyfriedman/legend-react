import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import Hero from '../components/Hero';
import RowCreator from '../components/RowCreator';
import Obstacle from '../components/Obstacle';
import GameOver from '../components/GameOver';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridCols: 12,
      gridRows: 12,
      heroXCoord: 6,
      heroYCoord: 6,  // starting y coordinate
      obstacles: [],
      gameOver: false,
      intervalId: null
    }
    this.moveCharacter = this.moveCharacter.bind(this);
  }

  moveCharacter(event) {
    let newXPosition = this.state.heroXCoord;
    let newYPosition = this.state.heroYCoord;
    switch (event.keyCode) {
      case 37:
        newXPosition -= 1;
        break;

      case 39:
        newXPosition += 1;
        break;

      case 38:
        newYPosition -= 1;
        break;

      case 40:
        newYPosition += 1;
        break;
    }

    // if(event.keyCode == 40) {
    //   newYPosition += 1;
    // } else if(event.keyCode == 38) {
    //   newYPosition -= 1;
    // };
    // if (newYPosition >= this.state.gridRows || newYPosition <= -1) {
    //   this.setState({ gameOver: true });
    // } else {
    //   this.setState({ heroYCoord: newYPosition });
    // }
    this.setState({
      heroXCoord: newXPosition,
      heroYCoord: newYPosition
    });
  };

  conveyorBelt() {
    let intervalId = setInterval(function() {
      let obstacleArray = [...this.state.obstacles];
      let newArray = obstacleArray.map(obstacle => {
        return obstacle - 1;
      })
      this.setState({ obstacles: newArray })
    }.bind(this), 500);

    this.setState({ intervalId: intervalId });
  }

  componentDidMount() {
    document.body.addEventListener('keydown', (event) => {
      this.moveCharacter(event);
    });
    let obstacleArray = [...this.state.obstacles];
    obstacleArray.push(11)
    this.setState({ obstacles: obstacleArray })
    // this.conveyorBelt();
  }

  render() {
    let tree = this.props.tree;
    let movement = this.moveCharacter;
    let gameGrid = [];
    let gameScreen;
    const divStyle = {
      'borderStyle': 'solid'
    };

    // top border
    gameGrid.push(<div style={divStyle}></div>)

    // main grid
    for (let i = 0; i < this.state.gridRows; i++) {
      gameGrid.push(<RowCreator
        key={i}
        row={i}
        numColumns={this.state.gridCols}
        heroXCoord={this.state.heroXCoord}
        heroYCoord={this.state.heroYCoord}
        heroSprite={this.props.heroSprite}
        obstacles={this.state.obstacles}
      />)
    }
    // bottom border
    gameGrid.push(<div style={divStyle}></div>)


    // grid.push(
    //   <div style={divStyle} key={this.state.gridRows}> </div>
    // )

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
