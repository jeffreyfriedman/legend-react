import React from 'react';
import Hero from './Hero';
import Obstacle from './Obstacle';

const ColumnCreator = props => {
  let cellWidth = props.gridDetails ? props.gridDetails.cellWidth : 1,
      col,
      colStyle,
      colSpan,
      rowSpan;

  if ((props.row === props.heroCoord.y) && (props.col === props.heroCoord.x)) {
    colStyle = {
      display: 'inline-block',
      width: 3 * cellWidth
    }

    col =
    <Hero
      heroSprite={props.heroSprite}
    />
  }

  if (props.obstacle) {
    colSpan = props.multiCols ? props.multiCols : 2;
    rowSpan = 2;
    colStyle = {
      display: 'inline-block',
      overflow: 'visible',
      width: 3 * cellWidth
    }
    col = <Obstacle
      obstacle={props.obstacle}
      gridDetails={props.gridDetails}
      />
  }

  if (!col) {
    colStyle = {
      display: 'inline-block',
      width: 3 * cellWidth
    }
    col = '';
  }

  return (
    <td style={colStyle} colSpan={colSpan} rowSpan={rowSpan} height='50em'>
      {col}
    </td>
  )
}

export default ColumnCreator;
