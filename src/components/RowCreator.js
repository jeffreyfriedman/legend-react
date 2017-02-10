import React from 'react';
import ColumnCreator from './ColumnCreator';

const RowCreator = props => {
  let row = [];
  for (let i = 0; i < props.numColumns; i++) {
    let coordinate = i;
    // pass in obstacle that will be present in the next rendered cell
    let obstacleCell = props.obstacles.filter(obstacle => {
      return (obstacle && props.row === obstacle.y) && (i === obstacle.x)
    });

    row.push(
      <ColumnCreator
        key={coordinate}
        row={props.row}
        col={i}
        heroCoord={props.heroCoord}
        statusBar={props.statusBar}
        heroSprite={props.heroSprite}
        obstacle={obstacleCell[0]}
      />
    )

    let spacer = {
      x: i + 1,
      y: props.row
    }

    if (obstacleCell[0]) {
      let multiCols = Math.floor(obstacleCell[0].width / 50); // 50 is arbitrarily chosen
      if (multiCols > 0) {
        row.push(
          <ColumnCreator
            key={`spacer_${coordinate}`}
            row={spacer.y}
            col={spacer.x}
            heroCoord={props.heroCoord}
            heroSprite={props.heroSprite}
            obstacle={spacer}
          />)
        i += multiCols;
      }
    }
  }

  return (
    <tr>
      {row}
    </tr>
  )
}

export default RowCreator;
