import React from 'react';
import ColumnCreator from './ColumnCreator';

const RowCreator = props => {
  let row = [];
  for (let i = 0; i < props.numColumns; i++) {
    let coordinate = i;
    row.push(
      <ColumnCreator
        key={coordinate}
        row={props.row}
        col={i}
        heroXCoord={props.heroXCoord}
        heroYCoord={props.heroYCoord}
        heroSprite={props.heroSprite}
        obstacles={props.obstacles}
      />
    )
  }

  return (
    <div className='row'>
      &nbsp;{row}
    </div>
  )
}

export default RowCreator;
