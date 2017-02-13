import React from 'react';
import ColumnCreator from './ColumnCreator';

const RowCreator = props => {
  let row = [];
  let screenWidth = props.gridDetails.cols;
  for (let i = 0; i < screenWidth; i++) {
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
        gridDetails={props.gridDetails}
        heroCoord={props.heroCoord}
        heroSprite={props.heroSprite}
        obstacle={obstacleCell[0]}
      />
    )
  }

  return (
    <tr>
      {row}
    </tr>
  )
}

export default RowCreator;
